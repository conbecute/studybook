<?php


namespace App\Repositories\Lms;

use App\Models\Lms\UserRole;
use App\Repositories\EloquentRepository;

class UserRoleRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return UserRole::class;
    }


}
