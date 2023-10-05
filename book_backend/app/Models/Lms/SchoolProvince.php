<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class SchoolProvince extends Model
{
    protected $table      = 'school_province';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    const ACTIVE     = 1;
    const NOT_ACTIVE = 0;

    protected $fillable =
    [
        'school_id',
        'province_id',
        'grade_id',
        'status'
    ];
}
