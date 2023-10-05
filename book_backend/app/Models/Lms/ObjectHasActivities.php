<?php

namespace App\Models\Lms;

use Illuminate\Database\Eloquent\Model;

class ObjectHasActivities extends Model
{
    protected $table      = 'object_has_activities';
    protected $connection = 'edu_lms';
    public $timestamps    = false;

    protected $fillable =
    [
        'id',
        'object_id',
        'activity_id',
        'activity_name',
        'status',
        'time_created',
        'time_updated'
    ];
}
