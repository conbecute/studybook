<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class UserGradeSubject extends Model
{
    protected $table      = 'user_grade_subject';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'id',
        'user_grade_id',
        'user_id',
        'subject_id',
        'time_updated'
    ];
}
