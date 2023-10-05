<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class LicenceHasBook extends Model
{
    protected $table      = 'licence_has_book';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'id',
        'licence',
        'book_id',
        'time_created',
    ];
}
