<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    protected $table      = 'school';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'id',
        'name'
    ];
}
