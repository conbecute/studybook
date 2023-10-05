<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class BookType extends Model
{
    protected $table      = 'book_type';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    const LIST_BOOK = 1;
    const LIST_BOOK_USED = 2;
    const LIST_BOOK_TEACHER = 3;
    const LIST_BOOK_REFERENCE_BOOKS = 5;

    protected $fillable =
    [
        'id',
        'name',
        'time_created',
        'time_updated'
    ];
}
