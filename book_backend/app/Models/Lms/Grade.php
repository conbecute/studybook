<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    protected $table      = 'grade';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    const STATUS_ACTIVED = 1;
    const STATUS_NOT_ACTIVED = 0;

    protected $fillable =
    [
        'id',
        'name',
        'parent_id',
        'time_created',
        'time_updated'
    ];
}
