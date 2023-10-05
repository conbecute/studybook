<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $table      = 'province';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'id',
        'name',
        'parent_id'
    ];
}
