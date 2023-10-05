<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Models\Lms\WorkSheet;
use App\Repositories\Lms\WorkSheetRepository;
use App\Repositories\Lms\UserHasLicenceRepository;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use App\Services\ServiceConnect\MediaConnectService;

class WorkSheetController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $workSheetRepository;
    private $mediaConnectService;
    private $userHasLicenceRepository;
    private $userService;

    public function __construct(
        WorkSheetRepository $workSheetRepository,
        UserHasLicenceRepository $userHasLicenceRepository,
        MediaConnectService $mediaConnectService,
        UserService $userService
    ) {
        $this->workSheetRepository   = $workSheetRepository;
        $this->userHasLicenceRepository = $userHasLicenceRepository;
        $this->mediaConnectService      = $mediaConnectService;
        $this->userService              = $userService;
    }

    public function listWorkSheet(Request $request)
    {
        $typeDocument   = $request->input('type_document');
        $gradeId        = $request->input('grade_id');
        $subjectId        = $request->input('subject_id');
        $title          = $request->input('title');
        $category       = $request->input('category');
        $status         = $request->input('status');
        $isFree         = $request->input('is_free');
        $bookId         = $request->input('book_id');
        $limit          = $request->input('limit');
        $page           = $request->input('page', 1);
        $offset         = (int)($page - 1) * $limit;

        $isAdmin        = false;
        $data           = [];
        $infoUser = $this->userService->getInfoUser($request);
        $userId   = $infoUser['id'] ?? '';
        $listBookId = [];
        if($userId) {
            $listBookActivated = $this->userHasLicenceRepository->getListBookByUserId($userId)->keyBy('book_id')->toArray();
            $listBookId        = array_keys($listBookActivated);
        }

        $total = $this->workSheetRepository->listWorkSheet($category, $typeDocument, $gradeId, $subjectId, $title, "", $offset, $listBookId, $isAdmin, $bookId, $status, $isFree)->count();
        $data['total'] = $total;

        $listWorkSheet = $this->workSheetRepository->listWorkSheet($category, $typeDocument, $gradeId, $subjectId, $title, $limit, $offset, $listBookId, $isAdmin, $bookId, $status, $isFree)->toArray();

        foreach ($listWorkSheet as &$element) {
            if ($element['type_document'] == WorkSheet::VIDEO) {
                $element['url'] = $element['url'];
            } else {
                if(env('APP_ENV') == 'live') {
                    $element['url'] = Config::get('constants.url_cdn_media') . $element['url'];
                } else {
                    $element['url'] = Config::get('constants.url_cdn_media_dev') . $element['url'];
                }
            }
            if ($element['thumb']) {
                if(env('APP_ENV') == 'live') {
                    $element['thumb'] = Config::get('constants.url_cdn_media') . $element['thumb'];
                } else {
                    $element['thumb'] = Config::get('constants.url_cdn_media_dev') . $element['thumb'];
                }
            } else {
                $element['thumb'] = "";
            }
        }

        $data['data'] = $listWorkSheet;

        $this->status  = 'success';
        $this->message = 'Lấy danh sách list work sheet thành công';
        next:
        return $this->responseData($data);
    }

    public function listWorkSheetCms(Request $request)
    {
        $typeDocument   = $request->input('type_document');
        $gradeId        = $request->input('grade_id');
        $subjectId        = $request->input('subject_id');
        $title          = $request->input('title');
        $category       = $request->input('category');
        $status         = $request->input('status');
        $isFree         = $request->input('is_free');
        $bookId         = $request->input('book_id');
        $limit          = $request->input('limit');
        $page           = $request->input('page', 1);
        $offset         = (int)($page - 1) * $limit;

        $data           = [];
        $infoUser = $this->userService->getInfoUser($request);
        $userId   = $infoUser['id'] ?? '';
        $listBookId = [];
        $isAdmin = true;
        if($userId) {
            $listBookActivated = $this->userHasLicenceRepository->getListBookByUserId($userId)->keyBy('book_id')->toArray();
            $listBookId        = array_keys($listBookActivated);
        }

        $total = $this->workSheetRepository->listWorkSheet($category, $typeDocument, $gradeId, $subjectId, $title, "", $offset, $listBookId, $isAdmin, $bookId, $status, $isFree)->count();
        $data['total'] = $total;

        $listWorkSheet = $this->workSheetRepository->listWorkSheet($category, $typeDocument, $gradeId, $subjectId, $title, $limit, $offset, $listBookId, $isAdmin, $bookId, $status, $isFree)->toArray();

        foreach ($listWorkSheet as &$element) {
            if ($element['type_document'] == WorkSheet::VIDEO) {
                $element['url'] = $element['url'];
            } else {
                if(env('APP_ENV') == 'live') {
                    $element['url'] = Config::get('constants.url_cdn_media') . $element['url'];
                } else {
                    $element['url'] = Config::get('constants.url_cdn_media_dev') . $element['url'];
                }
            }
            if ($element['thumb']) {
                if(env('APP_ENV') == 'live') {
                    $element['thumb'] = Config::get('constants.url_cdn_media') . $element['thumb'];
                } else {
                    $element['thumb'] = Config::get('constants.url_cdn_media_dev') . $element['thumb'];
                }
            } else {
                $element['thumb'] = "";
            }
        }

        $data['data'] = $listWorkSheet;

        $this->status  = 'success';
        $this->message = 'Lấy danh sách list work sheet thành công';
        next:
        return $this->responseData($data);
    }
    public function createOrEdit(Request $request)
    {
        $id = $request->input('id');
        $isFree = $request->input('is_free');
        $category = $request->input('category');
        $bookId = $request->input('book_id');
        $title = $request->input('title');
        $gradeId = $request->input('grade_id');
        $subjectId = $request->input('subject_id');
        $typeDocument = $request->input('type_document');
        $url = $request->file('url') ? $request->file('url') : $request->input('url');
        $publishedDate = $request->input('published_date');
        $thumb = $request->file('thumb');
        $status = $request->input('status');

        $data = [];
        if($title) {
            $data['title'] = $title;
        }

        if($gradeId) {
            $data['grade_id'] = $gradeId;
        }

        if($subjectId) {
            $data['subject_id'] = $subjectId;
        }

        if($category) {
            $data['category'] = $category;
        }

        if($typeDocument) {
            $data['type_document'] = $typeDocument;
        }

        if($bookId) {
            $data['book_id'] = $bookId;
        }

        if($isFree) {
            $data['is_free'] = $isFree;
        }

        if($publishedDate) {
            $data['published_date'] = $publishedDate;
        }
        $statusUpload = '';
        if ($url) {
            if($typeDocument != WorkSheet::VIDEO){
                $result = $this->updateMedia($url, "document");
                if($result) {
                    $data['url'] = $result;
                }
            } else {
                $data['url'] = $url;
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
            if (!$this->workSheetRepository->update($id, $data)) {
                throw new \Exception("Error update document : id " . $id, 1);
            } else {
                $this->message = 'Update document success';
            }

        } else {
            if (!$this->workSheetRepository->create($data)) {
                throw new \Exception("Error create document" , 1);
            } else {
                $this->message = 'Create document success';
            }

        }
        $this->status = 'success';
        next:
        return $this->responseData(['url' => $url, 'thumb' => $thumb]);
    }

    public function updateAll(Request $request) {
        $ids = $request->input('ids');
        $ids = json_decode($ids,true);
        $name = $request->input('name');
        $value = $request->input('value');
        foreach($ids as $id) {
            if($name && $value) {
                $this->workSheetRepository->update($id, [$name => $value]);
            } else {
                $this->workSheetRepository->delete($id);
            }
        }
        $this->message = 'Update work sheet success';
        $this->status = 'success';
        next:
        return $this->responseData();
    }

    private function updateMedia($file, $type){
        $extension = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $statusUpload = $this->mediaConnectService->uploadFile($file, 'E_Learning/'.$type, $type, str_slug($filename, "_") . '_' . time() . "." . $extension, false, '', env('TOKEN_TO_SERVER'));
        if(isset($statusUpload['status']) && $statusUpload['status'] == "success") {
            return $statusUpload['data']['path'];
        } else {
            return null;
        }
    }
}
