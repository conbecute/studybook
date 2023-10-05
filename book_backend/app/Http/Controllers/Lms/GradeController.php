<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Repositories\Lms\BookTypeRepository;
use App\Repositories\Lms\GradeRepository;
use Illuminate\Http\Request;

class GradeController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $gradeRepository;

    public function __construct(
        GradeRepository $gradeRepository
    ) {
        $this->gradeRepository = $gradeRepository;
    }

    public function listGrade(Request $request)
    {
        $getAll = $request->input('get_all', false);
        $listBookType = $this->gradeRepository->getListGrade($getAll);

        $this->status  = 'success';
        $this->message = 'Lấy danh sách list grade thành công';

        return $this->responseData($listBookType);

    }


}
