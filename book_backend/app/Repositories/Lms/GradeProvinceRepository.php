<?php


namespace App\Repositories\Lms;


use App\Models\Lms\GradeProvince;
use App\Repositories\EloquentRepository;

class GradeProvinceRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return GradeProvince::class;
    }


}
