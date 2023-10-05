<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Models\Lms\Book;
use App\Models\Lms\BookType;
use App\Repositories\Lms\BookRepository;
use App\Repositories\Lms\BookTypeRepository;
use App\Repositories\Lms\LicenceRepository;
use App\Repositories\Lms\UserHasLicenceRepository;
use App\Services\RedisService;
use App\Services\TimeService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use App\Services\ServiceConnect\MediaConnectService;

class BookController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $bookTypeRepository;
    private $bookRepository;
    private $userHasLicenceRepository;
    private $licenceRepository;
    private $timeService;
    private $redisService;
    private $userService;
    private $mediaConnectService;

    public function __construct(
        BookTypeRepository $bookTypeRepository,
        BookRepository $bookRepository,
        UserHasLicenceRepository $userHasLicenceRepository,
        LicenceRepository $licenceRepository,
        TimeService  $timeService,
        RedisService $redisService,
        UserService $userService,
        MediaConnectService $mediaConnectService
    )
    {
        $this->bookTypeRepository = $bookTypeRepository;
        $this->bookRepository = $bookRepository;
        $this->userHasLicenceRepository = $userHasLicenceRepository;
        $this->licenceRepository = $licenceRepository;
        $this->timeService = $timeService;
        $this->redisService = $redisService;
        $this->userService = $userService;
        $this->mediaConnectService = $mediaConnectService;
    }

    public function listBookType()
    {
        $listBookType = $this->bookTypeRepository->getListBookType();

        $this->status = 'success';
        $this->message = 'Lấy danh sách list book type thành công';

        return $this->responseData($listBookType);

    }

    public function searchBook(Request $request)
    {
        $gradeId = $request->input('grade_id');
        $title = $request->input('title');
        $status = $request->input('status');
        $typeBook = $request->input('type_book');
        $userId = $this->infoUserId();
        $data = [];
        if (!$gradeId || !$typeBook) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $listBookUsed = $this->userHasLicenceRepository->listBookUsed($userId, '', $gradeId, '', '', $title, $status)->toArray();

        foreach ($listBookUsed as &$book) {
            $book['is_active'] = true;
        }

        $arrayBookUsed = [];
        if ($listBookUsed) {
            $arrayBookUsed = array_column($listBookUsed, 'id');
        }
        $listBook = $this->bookRepository->getFindBook($gradeId, $title);

            foreach ($listBook as &$book) {
                $book['is_active'] = true;
                if ($typeBook != BookType::LIST_BOOK_TEACHER) {
                    if (!in_array($book['id'], $arrayBookUsed)) {
                    $book['is_active'] = false;
                }
            }
        }
        if ($typeBook == BookType::LIST_BOOK) {
            $data['list_book'] = $listBook;
        } else {
            $data['list_book_used'] = $listBookUsed;
        }

        $this->status = 'success';
        $this->message = 'success';
        next:
        return $this->responseData($data);
    }

    public function getDetailBook(Request $request)
    {
        $keyUrnCdnBook = 'URL_CDN_LINK_BOOK_V4';
        $bookId = $request->input('book_id');
        $userId = $this->infoUserId();

        //set for campaign intro
        $userId = 1;

        $data = [];

        $userHasLicence = $this->userHasLicenceRepository->listBookUsed($userId)->toArray();

        if (!in_array($bookId, array_column($userHasLicence, 'id'))) {
            goto next;
        }

        if (!$bookId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $url = $this->redisService->get($keyUrnCdnBook . $bookId);

        if (!$url) {

            $timeNow = $this->timeService->getTimeNow(date("H-i-s"));

            $infoBook = $this->bookRepository->getDetail($bookId)->toArray();

            $filePath = $infoBook['link_html'] . '/index.html';
            $expiredTime = strtotime('+10 day', time()) * 1000;
            $passPhase = Config::get('constants.pass_phase_url_cdn_book');
            $token = md5($passPhase . '/' . $filePath . $expiredTime);
//            $url = Config::get('constants.url_cdn_book') . $token . '/' . $expiredTime . '/' . $filePath;
            $url = Config::get('constants.url_cdn_book') . $filePath;

            $this->redisService->set($keyUrnCdnBook . $bookId, json_encode($url), 24 * 60 * 60 - $timeNow);
        }

        $data['url'] = $url;

        $this->status = 'success';
        $this->message = 'success';
        next:
        return $this->responseData($data);

    }

    public function listBookCms(Request $request)
    {
        $gradeId = $request->input('grade_id');
        $title = $request->input('title');
        $bookTypeId = $request->input('book_type_id', 1);
        $subjectId = $request->input('subject_id');
        $status = $request->input('status');
        $data = [];
        $limit = $request->input('limit');
        $page = $request->input('page', 1);
        $offset = (int)($page - 1) * $limit;

        if (!$gradeId) {
            $this->message = __('app.invalid_params');
            goto next;
        }
        $data['total'] = $this->bookRepository->getListBook($bookTypeId, $gradeId, $title, null, null, $status, $subjectId)->count();

        $listBook = $this->bookRepository->getListBook($bookTypeId, $gradeId, $title, $limit, $offset, $status, $subjectId)->toArray();

        $data['list_book'] = $listBook;

        $this->status = 'success';
        $this->message = 'Lấy danh sách list book type thành công';

        next:
        return $this->responseData($data);
    }

    public function listBook(Request $request)
    {
        $bookType = $request->input('book_type_id');
        $gradeId  = $request->input('grade_id');
        $status   = $request->input('status');
        $limit    = $request->input('limit');
        $page     = $request->input('page', 1);
        $offset   = (int)($page - 1) * $limit;
        $infoUser = $this->userService->getInfoUser($request);
        $userId   = $infoUser['id'] ?? '';
        $data = [];
        if (!$bookType) {
            $this->message = __('app.invalid_params');
            goto next;
        }
        $data['total'] = $this->bookRepository->getListBook($bookType, $gradeId, '', '', '', $status, '')->count();

        $listBook     = $this->bookRepository->getListBook($bookType, $gradeId, '', $limit, $offset, $status, '')->toArray();
        $listBookId   = array_column($listBook, 'id');
        if($userId) {
            $listBookUsed = $this->userHasLicenceRepository->getListBookUsed($userId, $listBookId, $status)->pluck('id', 'id')->toArray();
        }
        foreach ($listBook as &$book) {
            $book['is_active'] = false;
            if (isset($listBookUsed[$book['id']])) {
                $book['is_active'] = true;
            }
        }

        $data['list_book'] = $listBook;
        $this->status      = 'success';
        $this->message     = 'Lấy danh sách list book type thành công';

        next:
        return $this->responseData($data);
    }

    public function getListBookActivated()
    {
        $userId = $this->infoUserId();
        $licenceActivated = $this->licenceRepository->getListBookActivatedByUserId($userId)->toArray();
        $this->status = 'success';
        $this->message = 'Lấy danh sách list book kích hoạt thành công';
        return $this->responseData($licenceActivated);
    }

    public function createOrUpdateBook(Request $request) {
        $id = $request->input('id');
        $title = $request->input('title');
        $gradeId = $request->input('grade_id');
        $bookTypeId = $request->input('book_type_id');
        $thumb = $request->file('thumb');
        $orderBook = $request->input('order_book');
        $language = $request->input('language');
        $status = $request->input('status');


        $data = [];
        if ($title) {
            $data['title']      = $title;
            $data['link_html']  = str_slug($title, "_");
        }

        if ($gradeId) {
            $data['grade_id'] = $gradeId;
        }

        if ($bookTypeId) {
            $data['book_type_id'] = $bookTypeId;
        }

        if ($orderBook) {
            $data['order_book'] = $orderBook;
        }

        if ($language) {
            $data['language'] = $language;
        }

        if ($thumb) {
            $result = $this->updateMedia($thumb);
            if($result) {
                $data['thumb'] = $result;
            }
        }

        if ($status) {
            $data['status'] = $status;
        }
        $data['time_updated'] = time();

        if($id) {
            if (!$this->bookRepository->update($id, $data)) {
                throw new \Exception("Error update book : id " . $id, 1);
            };
            $this->message = 'Update book success';
        } else {
            $data['time_created'] = time();
            if (!$this->bookRepository->create($data)) {
                throw new \Exception("Error create book" , 1);
            };
            $this->message = 'Create book success';
        }
        $this->status = 'success';
        next:
        return $this->responseData($data);
    }

    private function updateMedia($file){
        $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $statusUpload = $this->mediaConnectService->uploadFile($file, 'E_Learning/page', "page of book", $filename . "." . $extension, false, '', env('TOKEN_TO_SERVER'));
        if(isset($statusUpload['status']) && $statusUpload['status'] == "success") {
            return $statusUpload['data']['path'];
        } else {
            return null;
        }
    }
}
