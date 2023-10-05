<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class QuizHasActivity extends Model
{
    protected $table      = 'quiz_has_activity';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'id',
        'quiz_id',
        'activity_id',
        'time_updated'
    ];
}
