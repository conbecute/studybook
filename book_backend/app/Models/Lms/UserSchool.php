<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class UserSchool extends Model
{
    protected $table      = 'user_school';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'user_id',
        'school_id',
        'gender_id',
        'full_name',
        'province_id',
        'district_id',
        'ward_id',
        'grade_id',
        'job_id',
        'birth_day',
        'notification',
        'status',
        'is_verify',
        'time_created',
        'time_updated'
    ];

    public function historyQuiz()
    {
        return $this->hasMany(HistoryQuiz::class, "user_id", "user_id");
    }
}
