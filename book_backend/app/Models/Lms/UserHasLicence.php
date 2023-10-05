<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class UserHasLicence extends Model
{
    const TABLE           = 'user_has_licence';
    protected $table      = self::TABLE;
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    const _ID           = 'id';
    const _USER_ID      = 'user_id';
    const _LICENCE_ID   = 'licence_id';
    const _TIME_ACTIVE  = 'time_active';
    const _TIME_EXPIRED = 'time_expired';
    const _TIME_UPDATED = 'time_updated';

    protected $fillable =
    [
        'id',
        'user_id',
        'licence_id',
        'time_active',
        'time_expired',
        'time_updated'
    ];
}
