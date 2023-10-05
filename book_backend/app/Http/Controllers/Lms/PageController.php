<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Models\Lms\Page;
use App\Models\Mongo\HistoryDraw;
use App\Repositories\Lms\PageIndexCategoryRepository;
use App\Repositories\Lms\PageRepository;
use App\Repositories\Lms\BookRepository;
use App\Repositories\Lms\UserHasLicenceRepository;
use App\Repositories\Mongo\HistoryDrawRepository;
use App\Services\ServiceConnect\MediaConnectService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use ZanySoft\Zip\Zip;

class PageController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    private $pageRepository;
    private $mediaConnectService;
    private $pageIndexCategoryRepository;
    private $userHasLicenceRepository;
    private $historyDrawRepo;
    private $userService;

    public function __construct(
        PageRepository $pageRepository,
        BookRepository $bookRepository,
        PageIndexCategoryRepository $pageIndexCategoryRepository,
        UserHasLicenceRepository $userHasLicenceRepository,
        HistoryDrawRepository $historyDrawRepo,
        MediaConnectService $mediaConnectService,
        UserService $userService
    ) {
        $this->bookRepository               = $bookRepository;
        $this->pageRepository               = $pageRepository;
        $this->mediaConnectService          = $mediaConnectService;
        $this->pageIndexCategoryRepository  = $pageIndexCategoryRepository;
        $this->userHasLicenceRepository     = $userHasLicenceRepository;
        $this->historyDrawRepo              = $historyDrawRepo;
        $this->userService                  = $userService;
    }

    public function updatePage(Request $request)
    {
        $bookId     = $request->input('book_id');
        $bookId     = 20;
        $allPage = $this->pageRepository->getListPage($bookId)->toArray();
        foreach ($allPage as $page) {
            $dataUpdate = [
                'background' => str_replace("png", "jpg", $page["background"])
                //                'index' => $page['index'] + 1
            ];
            $this->pageRepository->update($page['id'], $dataUpdate);
        }
        dd("done");
    }

    public function updateOnePage(Request $request)
    {
        $pageId     = $request->input('page_id');
        $status     = $request->input('status');

        if (!$pageId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $this->pageRepository->update($pageId, ['status' => $status]);

        $this->status = 'success';
        $this->message = 'Update page thành công';

        next:
        return $this->responseData();
    }

    public function editPage(Request $request)
    {
        $bookId     = $request->input('book_id');
        $index     = $request->input('index');
        $file     = $request->file('file');

        $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        if (!in_array($extension, ['png', 'jpeg', 'svg', 'jpg'])) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        if (!$bookId || !$index) {
            $this->message = __('app.invalid_params');
            goto next;
        }
        $page = $this->pageRepository->getPage($bookId, $index);
        if ($page) {
            $statusUpload = $this->mediaConnectService->uploadFile($file, 'E_Learning/page', "page of book", $filename . "." . $extension);
            if ($statusUpload['status'] == "success") {
                $page->background = 'E_Learning/page/' . $filename . "." . $extension;
                $page->save();
            }
        }

        $this->status = 'success';
        $this->message = 'Update page thành công';

        next:
        return $this->responseData();
    }

    public function updateStatusPage(Request $request)
    {
        $bookId = $request->input('book_id');
        $rangeIndex = $request->input('range_index');

        $rangeIndex = explode(",", $rangeIndex);
        $data['book_id'] = $bookId;
        $data['range_index'] = $rangeIndex;

        if (!$bookId || !$rangeIndex) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $allPage = $this->pageRepository->getListPage($bookId)->toArray();
        foreach ($allPage as $page) {
            if (in_array($page['index'], $rangeIndex)) {
                $dataUpdate = [
                    'status' => Page::STATUS_FREE,
                ];
            } else {
                $dataUpdate = [
                    'status' => Page::STATUS_ACTIVE,
                ];
            }
            $this->pageRepository->update($page['id'], $dataUpdate);
        }

        $this->status = 'success';
        $this->message = 'Update page thành công';

        next:
        return $this->responseData($allPage);
    }

    public function createPage(Request $request)
    {
        $bookId  = $request->input('book_id', 1);
        $fileZip = $request->file('file_zip');

        $extension = pathinfo($fileZip->getClientOriginalName(), PATHINFO_EXTENSION);
        $filename = pathinfo($fileZip->getClientOriginalName(), PATHINFO_FILENAME);
        if ($extension != 'zip') {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $book = $this->bookRepository->getDetail($bookId);
        if ($book->is_blocked) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $zip = Zip::open($fileZip);

        $dir = time();
        $zip->extract(storage_path('/' . $dir));

        $pathFolder = storage_path($dir);
        $files = scandir($pathFolder);
        $i = 0;

        foreach ($files as $file) {
            if ($file == "." || $file == "..") {
                continue;
            }
            $statusUpload = $this->mediaConnectService->uploadFile($pathFolder . "/" . $file, 'E_Learning/page', "page of book", $file, false, '', env('TOKEN_TO_SERVER'));

            if ($statusUpload['status'] == "success") {
                $index = explode("_", $file)[0];
                if (is_numeric($index)) {
                    $index = (int)$index;
                    $page = $this->pageRepository->getPage($bookId, $index + 1);
                    if ($page) {
                        $dataUpdatePage = [
                            'background' => 'E_Learning/page/' . $file,
                            'time_updated' => time(),
                        ];
                        $this->pageRepository->update($page->id, $dataUpdatePage);
                    } else {
                        $dataCreatePage = [
                            'book_id' => $bookId,
                            'index' => $index + 1,
                            'background' => 'E_Learning/page/' . $file,
                            'time_created' => time(),
                            'time_updated' => time(),
                        ];
                        $this->pageRepository->create($dataCreatePage);
                    }
                }
            } else {
                $this->message = __('app.invalid_params');
                goto next;
            }
            unlink($pathFolder . "/" . $file);
            $i++;
        }
        rmdir($pathFolder);
        $zip->close();

        $this->status = 'success';
        $this->message = 'Create page thành công';

        next:
        return $this->responseData();
    }

    public function createPageIndexCategory(Request $request)
    {
        $pageIndex = $request->input('page_index');
        $categoryId = $request->input('category_id');
        if (!$pageIndex || !$categoryId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $dataCreatePageIndex = [
            'page_index' => $pageIndex,
            'category_id' => $categoryId,
            'time_created' => time(),
            'time_updated' => time()
        ];

        $this->pageIndexCategoryRepository->create($dataCreatePageIndex);

        $this->status = 'success';
        $this->message = 'create page index success';

        next:
        return $this->responseData();
    }

    public function getDetailPage(Request $request)
    {
        $bookId = $request->input('book_id');
        $data   = [];
        $limit  = $request->input('limit');
        $page   = $request->input('page', 1);
        $offset = (int)($page - 1) * $limit;

        if (!$bookId) {
            $this->message = __('app.invalid_params');
            goto next;
        }
        $infoUser = $this->userService->getInfoUser($request);
        $userId   = $infoUser['id'] ?? '';
        $email   = $infoUser['email'] ?? '';
        if (isset($email)) {
            if (in_array($email, $this->userService->listUserTestHoc10())) {
                $this->isTestHoc10 = true;
            }
        }
        if ($userId) {
            $listBookUsed = $this->userHasLicenceRepository->getListBookUsed($userId, [$bookId])->pluck('id', 'id')->toArray();
        }
        $status       = Page::STATUS_ACTIVE;
        $isActive     = true;
        if (!isset($listBookUsed[$bookId])) {
            $isActive = false;
            $status = Page::STATUS_FREE;
        }

        if ($bookId <= 35) {
            $isActive = true;
        }
        $isLicence = true;
        $language = null;
        $bookType = null;

        $bookInfo = $this->bookRepository->getDetail($bookId);

        if ($bookInfo) {
            if (!$isActive) {
                $isLicence = $bookInfo->is_licence ? true : false;
            }
            $language = $bookInfo->language;
            $bookType = $bookInfo->book_type_id;
        }

        $data['total'] = $this->pageRepository->getListPage($bookId, null, null, $status, $this->isTestHoc10)->count();
        $listPage = $this->pageRepository->getListPage($bookId, $limit, $offset, $status, $this->isTestHoc10)->toArray();

        $listHistoryConvert = [];
        if ($userId) {
            $pageIds = array_column($listPage, 'id');
            $historyDraws = $this->historyDrawRepo->getHistoryDrawWithCondition($userId, $bookId, $pageIds)->toArray();
            foreach ($historyDraws as $historyDraw) {
                $listHistoryConvert[$historyDraw[HistoryDraw::_PAGE_ID]][] = $historyDraw;
            }
        }

        foreach ($listPage as &$page) {
            $page['draw'] = $listHistoryConvert[$page['id']][0] ?? "";
            $page['draws'] = $listHistoryConvert[$page['id']] ?? "";
        }

        $data['list_page'] = $listPage;
        $data['is_active'] = $isActive;
        $data['is_licence'] = $isLicence;
        $data['language'] = $language;
        $data['book_type_id'] = $bookType;

        $this->status  = 'success';
        $this->message = 'Lấy danh sách list page thành công';

        next:
        return $this->responseData($data);
    }

    public function listPage(Request $request)
    {
        $bookId = $request->input('book_id');
        $data = [];
        $limit = $request->input('limit');
        $page = $request->input('page', 1);
        $offset = (int)($page - 1) * $limit;

        if (!$bookId) {
            $this->message = __('app.invalid_params');
            goto next;
        }
        $listPage = $this->pageRepository->getListBook($bookId, $limit, $offset)->first()->toArray();
        $data['total'] = $this->pageRepository->getListBook($bookId)->count();
        $data['list_page'] = [$listPage];

        $this->status = 'success';
        $this->message = 'Lấy danh sách list page thành công';

        next:
        return $this->responseData($data);
    }

    public function getListPage(Request $request)
    {
        $bookId = $request->input('book_id');
        $limit = $request->input('limit');
        $page = $request->input('page', 1);
        $offset = (int)($page - 1) * $limit;

        if (!$bookId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $data = [];
        $listPage = $this->pageRepository->getListBook($bookId, $limit, $offset)->toArray();
        $data['total'] = $this->pageRepository->getListBook($bookId)->count();
        $data['list_page'] = [$listPage];

        $this->status = 'success';
        $this->message = 'Lấy danh sách list page thành công';

        next:
        return $this->responseData($data);
    }

    private function formatDataObject($listPage, $name)
    {
        $dataObjectFormat = [];

        if ($listPage['objects']) {
            foreach ($listPage['objects'] as $object) {
                $dataObject = json_decode($object['touch_vector']);
                $dataObjectProccess = [];
                if ($dataObject) {
                    foreach ($dataObject as $points) {
                        $point = explode(",", $points);
                        $startPoint = $point[0];
                        $endPoint = $point[1];
                        if ($name) {
                            array_push($dataObjectProccess, (object)[
                                'x' => (int) $startPoint,
                                'y' => (int) $endPoint,
                                'name' => $object['name']
                            ]);
                        } else {
                            array_push($dataObjectProccess, (object)[
                                'x' => (int) $startPoint,
                                'y' => (int) $endPoint,
                                'object_id' => (int) $object['id']
                            ]);
                        }
                    }
                }
                if ($dataObjectProccess) {
                    array_push($dataObjectFormat, $dataObjectProccess);
                }
            }
        }
        return $dataObjectFormat;
    }
}
