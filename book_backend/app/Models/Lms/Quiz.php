<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $table      = 'quiz';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    const QUIZ_TAP_HUAN = 1;

    const GREAT        = 1;
    const GOOD         = 2;
    const REACHED      = 3;
    const NOT_REACHED  = 4;

    protected $fillable =
    [
        'id',
        'title',
        'type',
        'subject_id',
        'total',
        'time_updated'
    ];
}
