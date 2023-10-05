<?php


namespace App\Repositories\Lms;


use App\Models\Lms\Quiz;
use App\Repositories\EloquentRepository;

class QuizRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return Quiz::class;
    }


}
