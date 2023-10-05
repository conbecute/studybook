<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class Licence extends Model
{
    const TABLE           = 'licence';
    protected $table      = self::TABLE;
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    const STATUS_NOT_ACTIVED = 1;
    const STATUS_USED        = 2;
    const STATUS_LOCK        = 0;

    const _ID           = 'id';
    const _SERIAL       = 'serial';
    const _LICENCE      = 'licence';
    const _BOOK_ID      = 'book_id';
    const _STATUS       = 'status';
    const _TIME_CREATED = 'time_created';
    const _TIME_UPDATED = 'time_updated';

    protected $fillable =
    [
        'id',
        'serial',
        'licence',
        'book_id',
        'status',
        'time_created',
        'time_updated'
    ];
}
