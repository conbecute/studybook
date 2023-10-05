<?php

namespace App\Repositories\Lms;

use App\Models\Lms\Role;
use App\Repositories\EloquentRepository;

class RoleRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return Role::class;
    }

}
