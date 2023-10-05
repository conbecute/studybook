<?php


namespace App\Repositories\Lms;


use App\Models\Lms\SchoolProvince;
use App\Repositories\EloquentRepository;

class SchoolProvinceRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return SchoolProvince::class;
    }

    public function getSchoolByProvince($provinceId, $gradeId = "")
    {
        $query = $this->_model->select('school.id', 'school.name')
            ->distinct('school.id')
            ->join('school', 'school.id', '=', 'school_province.school_id')
            ->where('school_province.province_id', $provinceId)
            ->where('school_province.status', SchoolProvince::ACTIVE);

        if ($gradeId) {
            $query = $query->where('school_province.grade_id', $gradeId);
        }
        return $query->get();
    }


}
