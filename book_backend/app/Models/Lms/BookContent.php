<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class BookContent extends Model
{
    protected $table      = 'book_content';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
        [
            'id',
            'title',
            'book_id',
            'parent_id',
            'index_page',
            'time_created',
            'time_updated'
        ];

    public function children()
    {
        return $this->hasMany(BookContent::class, 'parent_id', 'id')->with('children');
    }

    public function parent()
    {
        return $this->belongsTo(BookContent::class, 'parent_id');
    }
}
