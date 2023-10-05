<?php


namespace App\Repositories\Lms;


use App\Models\Lms\HistoryQuiz;
use App\Repositories\EloquentRepository;
use Illuminate\Support\Facades\DB;

class HistoryQuizRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return HistoryQuiz::class;
    }

    public function findHistory($quizId, $userId)
    {
        $query = $this->_model
            ->select('id', 'score')
            ->where('quiz_id', $quizId)
            ->where('user_id', $userId)
            ->first();
        return $query;
    }

    public function getListHistory($userId, $orderBy = "")
    {
        $query = $this->_model
            ->select('quiz.title', 'history_quiz.score')
            ->join('quiz', 'quiz.id', 'history_quiz.quiz_id')
            ->where('history_quiz.user_id', $userId);
        if ($orderBy) {
            $query = $query->orderBy('quiz.id', 'desc');
        }    
        return $query->get();;
    }

    public function getHistoryQuiz($listUserId)
    {
        return $this->_model->select("score")->whereIn("user_id", $listUserId)->get();
    }

    public function getListHistoryByKey($userId)
    {
        return $this->_model->select("quiz_id", "score", "time_updated")
            ->where("user_id", $userId)
            ->get()->keyBy('quiz_id')->toArray();
    }

    public function getCountHistoryQuiz($listUserId)
    {
        return $this->_model
            ->select('user_id', DB::raw('count(*) as total'))
            ->whereIn('user_id', $listUserId)
            ->groupBy("user_id")
            ->get()->keyBy("user_id")->toArray();
    }

}
