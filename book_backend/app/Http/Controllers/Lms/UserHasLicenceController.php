<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Repositories\Lms\UserHasLicenceRepository;
use Illuminate\Http\Request;

class UserHasLicenceController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $userHasLicenceRepository;

    public function __construct(
        UserHasLicenceRepository $userHasLicenceRepository
    ) {
        $this->userHasLicenceRepository = $userHasLicenceRepository;
    }

    public function listBookUsed(Request $request)
    {
        $bookType   = $request->input('book_type_id');
        $gradeId    = $request->input('grade_id');
        $status     = $request->input('status');
        $userId = $this->infoUserId();

        //set for campaign intro
        $userId = 1;

        $data = [];
        $limit   = $request->input('limit');
        $page    = $request->input('page', 1);
        $offset  = (int)($page - 1) * $limit;

        if (!$userId) {
            $this->message = __('app.invalid_params');
            goto next;
        }
        $data['total']   = $this->userHasLicenceRepository->listBookUsed($userId, $bookType, $gradeId, '', '', '', $status)->count();

        $listBookUsed = $this->userHasLicenceRepository->listBookUsed($userId, $bookType, $gradeId, $limit, $offset, '', $status)->toArray();
        foreach ($listBookUsed as &$book) {
            $book['is_active'] = true;
        }

        $data['list_book_used'] = $listBookUsed;

        $this->status  = 'success';
        $this->message = 'Lấy danh sách list book user thành công';

        next:
        return $this->responseData($data);
    }

}
