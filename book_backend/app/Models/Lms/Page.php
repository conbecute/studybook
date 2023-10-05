<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $table      = 'page';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    const STATUS_FREE    = 1;
    const STATUS_ACTIVE  = 0;

    protected $fillable =
    [
        'id',
        'book_id',
        'index',
        'background',
        'time_created',
        'time_updated',
        'status'
    ];

    public function objects()
    {
        return $this->hasMany(ObjectInPage::class, 'page_id', 'id');
    }
}
