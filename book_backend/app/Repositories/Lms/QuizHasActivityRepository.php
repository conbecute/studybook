<?php


namespace App\Repositories\Lms;


use App\Models\Lms\QuizHasActivity;
use App\Repositories\EloquentRepository;

class QuizHasActivityRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return QuizHasActivity::class;
    }

    public function getInfo($activityId)
    {
        $query = $this->_model
            ->select('activity_id')
            ->where('quiz_id', $activityId);
        return $query->get();
    }

}
