<?php

namespace App\Http\Controllers\Lms;

use App\Exports\DataSupportExport;
use App\Http\Controllers\BaseController;
use App\Repositories\Lms\ProvinceRepository;
use App\Repositories\Lms\SchoolProvinceRepository;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ProvinceController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $provinceRepository;
    private $schoolProvinceRepository;

    public function __construct(
        ProvinceRepository $provinceRepository,
        SchoolProvinceRepository  $schoolProvinceRepository
    ) {
        parent::__construct();
        $this->provinceRepository = $provinceRepository;
        $this->schoolProvinceRepository = $schoolProvinceRepository;
    }

    public function listProvince(Request $request)
    {
        $parentId = $request->input('parent_id');

        $listProvince = $this->provinceRepository->listProvince($parentId)->toArray();

        $this->status  = 'success';
        $this->message = 'Lấy danh sách province thành công';
        next:
        return $this->responseData($listProvince);
    }

    public function exportProvince(Request $request)
    {
        $data = [];
        $id = $request->input('id');
        if (!$id) {
            return "invalid params";
        }
        $provinces = $this->provinceRepository->getInfoProvince([$id])->toArray();
        foreach ($provinces as $province) {
            $districts = $this->provinceRepository->getInfoProvinceByParentId($province["id"])->toArray();
            foreach ($districts as $district) {
                $wards = $this->provinceRepository->getInfoProvinceByParentId($district["id"])->toArray();
                foreach ($wards as $ward) {

                    $schools = $this->schoolProvinceRepository->getSchoolByProvince($ward["id"])->toArray();

                    foreach ($schools as $school) {
                        $data[$province['name']."*".$province["id"]][$district["name"]."*".$district["id"]][$ward["name"]."*".$ward["id"]][$school["name"]."_".$school["id"]."*".$district["name"]."_".$district["id"]."*".$ward["name"]."_".$ward["id"]] = [];
                    }

                }
            }

            return $this->responseData($data);

        }
    }

    public function exportExcel(Request $request) {
        $listUsers = $this->provinceRepository->listProvince(1)->toArray();
        $usersExport           = new DataSupportExport($listUsers);
        $check                 = Excel::download($usersExport, 'rexx.xls');
        return $check;
    }

}
