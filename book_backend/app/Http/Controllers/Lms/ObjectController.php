<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Repositories\Lms\BookRepository;
use App\Repositories\Lms\ObjectHasActivitiesRepository;
use App\Repositories\Lms\ObjectRepository;
use App\Repositories\Lms\PageRepository;
use App\Services\AuthenService;
use App\Services\UserService;
use App\Services\ServiceConnect\PlatformConnectService;
use Illuminate\Http\Request;

class ObjectController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    private $objectRepository;
    private $objectHasActivitiesRepository;
    private $pageRepository;
    private $platformConnectService;
    private $bookRepository;
    private $authenService;
    private $userService;

    public function __construct(
        ObjectRepository $objectRepository,
        ObjectHasActivitiesRepository $objectHasActivitiesRepository,
        PageRepository $pageRepository,
        PlatformConnectService $platformConnectService,
        BookRepository $bookRepository,
        AuthenService $authenService,
        UserService $userService
    )
    {
        parent::__construct();
        $this->objectRepository                 = $objectRepository;
        $this->objectHasActivitiesRepository    = $objectHasActivitiesRepository;
        $this->pageRepository                   = $pageRepository;
        $this->platformConnectService           = $platformConnectService;
        $this->bookRepository                   = $bookRepository;
        $this->authenService                    = $authenService;
        $this->userService                      = $userService;
    }

    public function getDetailObject(Request $request)
    {
        $data = [];
        $objectId = $request->input('object_id');
        if (!$objectId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $infoUser = $this->userService->getInfoUser($request);
        $email   = $infoUser['email'] ?? '';

        if (isset($email)) {
            if (in_array($email, $this->userService->listUserTestHoc10())) {
                $this->isTestHoc10 = true;
            }
        }

        $infoActivity = $this->objectHasActivitiesRepository->getObjectHasActivity($objectId);
        if(!$infoActivity) {
            goto next;
        }
        if (!$this->isTestHoc10) {
            if ($infoActivity->status != 1 && !$this->isNetworkEarlyStart) {
                goto next;
            }
        }

        $data = $this->platformConnectService->getDetailActivity($infoActivity->activity_id);
        $this->status = 'success';
        $this->message = 'success';
        next:
        return $this->responseData($data);
    }

    public function listObjectHasActivity(Request $request)
    {
        $bookId = $request->input("book_id");
        $numberPage = $request->input("number_page");
        $numberPage = explode(",", $numberPage);
        $data = [];
        if (!$bookId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $dataFormat = $this->objectRepository->getListObjectHasActivity($bookId, $numberPage);

        foreach ($dataFormat as $format) {
            $data[$format['index']][] = $format;
        }

        $this->status = 'success';
        $this->message = 'success';
        next:
        return $this->responseData($data);
    }

    public function renameObject(Request $request)
    {
        $dataImportFile = $request->input('data_import_file');
        $bookId = $request->input('book_id');
        $data = [];

        $dataListObject = json_decode($dataImportFile);

        $listPage = $this->pageRepository->findOneField('book_id', $bookId);
        $arrayListPage = array_column($listPage, 'id');

        $arrayError = [];
        foreach ($dataListObject as $object) {
            if (!isset($object->id)) {
                continue;
            }
            $findObject = $this->objectRepository->getObject($object->id, $arrayListPage)->toArray();
            if ($findObject) {
                $this->objectRepository->update( $findObject[0]['id'],['name' => $object->ten_moi]);
            } else {
                array_push($arrayError, $object->ten_cu);
            }
        }

        if (count($arrayError) > 0) {
//            $this->status = 'false';
//            $this->message = "false";
//            $data = $arrayError;
//            goto next;
        }

        $this->status = 'success';
        $this->message = 'Update name object success';

        next:
        return $this->responseData($data);

    }

    public function listObject(Request $request)
    {
        $pageId = $request->input('page_id');
        $data = [];
        $limit = $request->input('limit');
        $page = $request->input('page', 1);
        $offset = (int)($page - 1) * $limit;

        if (!$pageId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $listObject = $this->objectRepository->getListObject($pageId)->toArray();

        $data['list_object'] = $listObject;

        $this->status = 'success';
        $this->message = 'Lấy danh sách list object thành công';

        next:
        return $this->responseData($data);
    }

    public function exportNameObject(Request $request)
    {
        $data = [];
        $bookId = $request->input('book_id');
        if (!$bookId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $infoBook = $this->bookRepository->find($bookId);

        $data['title'] = $infoBook->title;

        $data['data'] = $this->objectRepository->exportNameObject($bookId);

        $this->status = 'success';
        $this->message = 'Lấy danh sách list object thành công';

        next:
        return $this->responseData($data);

    }

    public function createObject(Request $request)
    {
        $pageId = $request->input('page_id');
        $name = $request->input('name');
        $touchVector = $request->input('touch_vector');

        $data = [
            'page_id' => $pageId,
            'name' => $name,
            'touch_vector' => $touchVector,
            'time_created' => time(),
            'time_updated' => time()

        ];

        if (!$pageId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        if (!$this->objectRepository->create($data)) {
            $this->message = 'Create object fail';
            goto next;
        };

        $this->status = 'success';
        $this->message = 'Create object success';

        next:
        return $this->responseData($data);
    }

    public function deleteObject(Request $request)
    {
        $objectId = $request->input('object_id');
        $data = [];
        if (!$objectId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $this->objectRepository->delete($objectId);
        $this->objectHasActivitiesRepository->deleteByOneField('object_id', $objectId);

        $this->status = 'success';
        $this->message = 'Delete object success';

        next:
        return $this->responseData($data);
    }

    public function updateTouchVector(Request $request)
    {
        $touchVectors = $request->input('touch_vector');
        $data         = [];
        if (!$touchVectors) {
            $this->message = __('app.invalid_params');
            goto next;
        }
        $touchVectors = json_decode($touchVectors, true);
        foreach ($touchVectors as $objectId => $touchVector) {
            $dataUpdate = [
                'touch_vector' => $touchVector
            ];
            $this->objectRepository->update($objectId, $dataUpdate);
        }
        $this->status  = 'success';
        $this->message = 'Update object success';
        next:
        return $this->responseData($data);
    }
}
