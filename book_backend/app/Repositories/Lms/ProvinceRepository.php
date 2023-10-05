<?php


namespace App\Repositories\Lms;


use App\Models\Lms\Province;
use App\Repositories\EloquentRepository;

class ProvinceRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return Province::class;
    }

    public function listProvince($parentId)
    {
        return $this->_model
            ->select('id', 'name')
            ->where('parent_id', $parentId)
            ->get();
    }

    public function getInfoProvinceByParentId($parentId)
    {
        return $this->_model
            ->select('id', 'name')
            ->where('parent_id', $parentId)
            ->get();
    }

    public function getInfoProvince($listProvince)
    {
        return $this->_model
            ->select('id', 'name')
            ->whereIn('id', $listProvince)
            ->get();
    }
}
