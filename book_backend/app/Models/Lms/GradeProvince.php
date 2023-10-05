<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class GradeProvince extends Model
{
    protected $table      = 'grade_province';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'grade_id',
        'province_id'
    ];
}
