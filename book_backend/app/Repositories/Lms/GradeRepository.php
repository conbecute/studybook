<?php


namespace App\Repositories\Lms;

use App\Models\Lms\Grade;
use App\Repositories\EloquentRepository;

class GradeRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return Grade::class;
    }

    public function getListGrade($getAll)
    {
        $query = $this->_model
            ->select('id', 'name');
        if ($getAll) {
            $query = $query->whereNotIn('id', [1, 2, 3]);
        } else {
            $query = $query->where('status',  Grade::STATUS_ACTIVED);
        }
        return $query->get()->toArray();
    }


}
