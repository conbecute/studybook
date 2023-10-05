<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class UserContact extends Model
{
    protected $table      = 'contact';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'id',
        'user_id',
        'full_name',
        'email',
        'phone'
    ];
}
