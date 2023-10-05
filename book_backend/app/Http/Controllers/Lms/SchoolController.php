<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Repositories\Lms\SchoolProvinceRepository;
use Illuminate\Http\Request;

class SchoolController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $schoolProvinceRepository;

    public function __construct(
        SchoolProvinceRepository $schoolProvinceRepository
    ) {
        $this->schoolProvinceRepository = $schoolProvinceRepository;
    }

    public function listSchoolByProvince(Request $request)
    {
        $provinceId = $request->input('province_id');
        $gradeId = $request->input('grade_id');
        $dataSchool = [];
        if(!$provinceId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $dataSchool = $this->schoolProvinceRepository->getSchoolByProvince($provinceId, $gradeId)->toArray();
        array_push($dataSchool, ['id' => -1, 'name' => "Khác"]);

        $this->status  = 'success';
        $this->message = 'Lấy danh sách list school type thành công';
        next:
        return $this->responseData($dataSchool);
    }


}
