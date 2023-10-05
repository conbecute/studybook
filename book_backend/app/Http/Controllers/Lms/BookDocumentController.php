<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Models\Lms\BookDocument;
use App\Repositories\Lms\BookDocumentRepository;
use App\Repositories\Lms\UserHasLicenceRepository;
use App\Services\RedisService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use App\Services\ServiceConnect\MediaConnectService;

class BookDocumentController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $redisService;
    private $bookDocumentRepository;
    private $mediaConnectService;
    private $userHasLicenceRepository;
    private $userService;

    public function __construct(
        BookDocumentRepository $bookDocumentRepository,
        UserHasLicenceRepository $userHasLicenceRepository,
        RedisService $redisService,
        MediaConnectService $mediaConnectService,
        UserService $userService
    ) {
        $this->bookDocumentRepository   = $bookDocumentRepository;
        $this->userHasLicenceRepository = $userHasLicenceRepository;
        $this->redisService             = $redisService;
        $this->mediaConnectService      = $mediaConnectService;
        $this->userService              = $userService;
    }

    public function listBookDocument(Request $request)
    {
        $typeDocument = $request->input('type_document');
        $gradeId      = $request->input('grade_id');
        $title        = $request->input('title');
        $status        = $request->input('status');
        $limit        = $request->input('limit');
        $page         = $request->input('page', 1);
        $bookId       = $request->input('book_id');
        $isActive     = $request->input('is_active');
        $offset       = (int)($page - 1) * $limit;

        $data         = [];
        if (!$typeDocument) {
            $this->message = __('app.invalid_params');
            goto next;
        }
        $infoUser = $this->userService->getInfoUser($request);
        $userId   = $infoUser['id'] ?? '';
        $listBookId = [];
        if($userId) {
            $listBookActivated = $this->userHasLicenceRepository->getListBookByUserId($userId, $bookId)->keyBy('book_id')->toArray();
            $listBookId        = array_keys($listBookActivated);
        }

        $total = $this->bookDocumentRepository->listBookDocument($typeDocument, $gradeId, $title, "", $offset, $listBookId, $isActive, $bookId, $status)->count();
        $data['total'] = $total;

        $listBookDocument = $this->bookDocumentRepository->listBookDocument($typeDocument, $gradeId, $title, $limit, $offset, $listBookId, $isActive, $bookId, $status)->toArray();

        foreach ($listBookDocument as &$document) {
            if ($document['type_document'] == BookDocument::WORK_SHEET
                || $document['type_document'] == BookDocument::BOOK_INTRO_VIDEO
                || $document['type_document'] == BookDocument::TRAINING_VIDEO
                || $document['type_document'] == 15

            ) {
                $document['url'] = $document['url'];
            } else {
                $document['url'] = Config::get('constants.url_cdn_media') . $document['url'];
            }
            if ($document['thumb']) {
                $document['thumb'] = Config::get('constants.url_cdn_media') . $document['thumb'];
            } else {
                $document['thumb'] = "";
            }
        }

        $data['data'] = $listBookDocument;

        $this->status  = 'success';
        $this->message = 'Lấy danh sách list book document thành công';
        next:
        return $this->responseData($data);
    }
    public function createOrEditDocument(Request $request)
    {
        $id = $request->input('id');
        $bookId = $request->input('book_id');
        $title = $request->input('title');
        $gradeId = $request->input('grade_id');
        $typeDocument = $request->input('type_document');
        $url = $request->file('url');
        $thumb = $request->file('thumb');
        $status = $request->input('status');

        $data = [];
        if($title) {
            $data['title'] = $title;
        }

        if($gradeId) {
            $data['grade_id'] = $gradeId;
        }

        if($typeDocument) {
            $data['type_document'] = $typeDocument;
        }

        if($bookId) {
            $data['book_id'] = $bookId;
        }

        $statusUpload = '';
        if ($url) {
            $result = $this->updateMedia($url, "document");
            if($result) {
                $data['url'] = $result;
            }
        }

        if ($thumb) {
            $result = $this->updateMedia($thumb, "thumb");
            if($result) {
                $data['thumb'] = $result;
            }
        }

        if ($status) {
            $data['status'] = $status;
        }
        $data['time_updated'] = time();

        if($id) {
            if (!$this->bookDocumentRepository->update($id, $data)) {
                throw new \Exception("Error update document : id " . $id, 1);
            } else {
                $this->message = 'Update document success';
            }

        } else {
            if (!$this->bookDocumentRepository->create($data)) {
                throw new \Exception("Error create document" , 1);
            } else {
                $this->message = 'Create document success';
            }

        }
        $this->status = 'success';
        next:
        return $this->responseData();
    }

    private function updateMedia($file, $type){
        $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $statusUpload = $this->mediaConnectService->uploadFile($file, 'E_Learning/'.$type, $type, $filename . "." . $extension, false, '', env('TOKEN_TO_SERVER'));
        if(isset($statusUpload['status']) && $statusUpload['status'] == "success") {
            return $statusUpload['data']['path'];
        } else {
            return null;
        }
    }
}
