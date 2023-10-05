<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class HistoryQuiz extends Model
{
    protected $table      = 'history_quiz';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'id',
        'quiz_id',
        'score',
        'user_id',
        'time_updated'
    ];
}
