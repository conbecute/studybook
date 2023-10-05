<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    protected $table      = 'user_role';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    const ACCOUNT_PROVINCE = 1;
    const ACCOUNT_DISTRICT = 2;
    const ACCOUNT_SCHOOL   = 3;
    const ACCOUNT_TEACHER  = 4;

    protected $fillable =
        [
            'id',
            'user_id',
            'role_id'
        ];
}
