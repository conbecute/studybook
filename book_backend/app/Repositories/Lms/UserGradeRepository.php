<?php


namespace App\Repositories\Lms;


use App\Models\Lms\UserGrade;
use App\Repositories\EloquentRepository;

class UserGradeRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return UserGrade::class;
    }

    public function getUserGrade($userId)
    {
        $query = $this->_model
            ->select('id')
            ->where('user_id', $userId);
        return $query->get()->toArray();
    }

}
