<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class PageIndexCategory extends Model
{
    protected $table      = 'page_index_category';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'id',
        'page_index',
        'category_id',
        'time_created',
        'time_updated'
    ];

}
