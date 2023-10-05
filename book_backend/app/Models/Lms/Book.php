<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    const TABLE = 'book';
    protected $table      = self::TABLE;
    protected $connection = 'edu_lms';
    public    $timestamps = false;

    const HOAT_DONG_TRAI_NGHIEM_2 = 21;
    const AM_NHAC_2               = 17;

    const _ID           = 'id';
    const _TITLE        = 'title';
    const _GRADE_ID     = 'grade_id';
    const _SUBJECT_ID   = 'subject_id';
    const _BOOK_TYPE_ID = 'book_type_id';
    const _LINK_HTML    = 'link_html';
    const _THUMB        = 'thumb';
    const _ORDER_BOOK   = 'order_book';
    const _TIME_CREATED = 'time_created';
    const _TIME_UPDATED = 'time_updated';
    const _IS_BLOCKED   = 'is_blocked';
    const _IS_FREE      = 'is_free';
    const _IS_LICENCE   = 'is_licence';

    const LANGUAGE_VIETNAMESE = 1;
    const LANGUAGE_ENGLISH = 2;

    protected $fillable = [
        'id',
        'title',
        'grade_id',
        'subject_id',
        'book_type_id',

        'link_html',
        'thumb',
        'order_book',
        'time_created',
        'time_updated',
        'is_blocked',
        'is_free',
        'language',
        'status',
        'is_licence'
    ];
}
