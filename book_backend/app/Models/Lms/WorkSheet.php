<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class WorkSheet extends Model
{
    protected $table      = 'worksheet';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    const CATEGORY_ELEARNING_DOCUMENT = 1;  // học liệu điện tử
    const CATEGORY_BOOK_DOCUMENT = 2;       // tủ sách
    const CATEGORY_TRANING_DOCUMENT = 3;    // Tài liệu tập huấn

    const VERSION_FREE = 1;
    const VERSION_FULL = 2;

    const PDF   = 1;
    const VIDEO = 2;
    const AUDIO = 3;
    const WORD   = 4;
    const PPT   = 5;
    const ZIP   = 6;

    const IS_FREE  = 1;
    const NOT_FREE = 0;

    protected $fillable =
        [
            'id',
            'book_id',
            'grade_id',
            'thumb',
            'type_document',
            'category',
            'subject_id',
            'url',
            'published_date',
            'title',
            'status',
            'is_free',
            'time_created',
            'time_updated'
        ];
}
