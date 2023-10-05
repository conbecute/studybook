<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class ObjectInPage extends Model
{
    protected $table      = 'object';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    const TYPE_GAME                     = 1;
    const TYPE_IMG_002_VIDEO            = 2;
    const TYPE_IMG_002_AUDIO            = 3;
    const TYPE_IMG_002_IMAGE_TEXT       = 4;

    protected $fillable =
    [
        'id',
        'page_id',
        'name',
        'touch_vector',
        'type',
        'time_created',
        'time_updated'
    ];
}
