<?php


namespace App\Repositories\Lms;


use App\Models\Lms\UserContact;
use App\Repositories\EloquentRepository;

class UserContactRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return UserContact::class;
    }

    public function getUserContact($userId)
    {
        $query = $this->_model
            ->select('id')
            ->where('user_id', $userId);
        return $query->get()->toArray();
    }

}
