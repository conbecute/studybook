<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class UserJob extends Model
{
    protected $table      = 'user_grade';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'id',
        'user_id',
        'job_id',
        'time_updated'
    ];
}
