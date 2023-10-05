<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $table      = 'subject';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'id',
        'title',
        'grade_id',
        'status',
        'time_updated'
    ];

    public function grade()
    {
        return $this->belongsTo(Grade::class, 'grade_id', 'id');
    }
}
