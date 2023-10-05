<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table      = 'role';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
        [
            'id',
            'title'
        ];
}
