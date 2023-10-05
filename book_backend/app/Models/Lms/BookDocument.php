<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class BookDocument extends Model
{
    protected $table      = 'book_document';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    const BOOK_INTRO_VIDEO = 1;
    const BOOK_DOCUMENT_PDF = 2;
    const BOOK_DOCUMENT_POWERPOINT = 3;
    const BOOK_DOCUMENT_POWERPOINT_PDF = 4;
    const WORK_SHEET = 5;
    const TRAINING_VIDEO = 6;

    const PDF_ENGLISH_COURSEWARE = 11;
    const POWERPOINT_ENGLISH_COURSEWARE = 12;
    const AUDIO_SBT_ENGLISH_COURSEWARE = 13;
    const AUDIO_SKG_ENGLISH_COURSEWARE = 14;
    const VIDEO_ENGLISH_COURSEWARE = 15;
    const BOOK_DOCUMENT_POWERPOINT_TEACHER = 16;
    const ZIP_ENGLISH_COURSEWARE = 17;

    const IS_FREE  = 1;
    const NOT_FREE = 0;

    protected $fillable =
    [
        'id',
        'book_id',
        'grade_id',
        'thumb',
        'type_document',
        'url',
        'title',
        'status',
        'is_free',
        'time_created',
        'time_updated'
    ];
}
