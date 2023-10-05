<?php


namespace App\Repositories\Lms;


use App\Models\Lms\School;
use App\Repositories\EloquentRepository;

class SchoolRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return School::class;
    }

    public function getInfo($name = "")
    {
        $query = $this->_model;
        if ($name) {
            $query = $query->where('name', $name);
        }
        return $query->first();
    }

}
