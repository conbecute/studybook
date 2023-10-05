<?php

namespace App\Repositories\Lms;

use App\Models\Lms\ObjectHasActivities;
use App\Repositories\EloquentRepository;

class ObjectHasActivitiesRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return ObjectHasActivities::class;
    }

    public function getObjectHasActivity($objectId)
    {
        $query = $this->_model->select('activity_id', 'status')
            ->where('object_id', $objectId);
        return $query->first();
    }

    public function getObject($objectId, $activity_id) {
        $query = $this->_model->select('id', 'activity_id', 'status')
            ->where('object_id', $objectId)
            ->where('activity_id', $activity_id);
        return $query->get();
    }

    public function getActivityByBookId ($bookId)
    {
        $query = $this->_model->select('object_has_activities.activity_id', 'object_has_activities.activity_name', 'object.id as object_id')
            ->join('object', 'object.id', 'object_has_activities.object_id')
            ->join('page', 'page.id', 'object.page_id')
            ->where('page.book_id', $bookId);
        return $query->get()->toArray();
    }

}
