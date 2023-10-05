<?php


namespace App\Repositories\Lms;


use App\Models\Lms\UserGradeSubject;
use App\Repositories\EloquentRepository;
use Illuminate\Support\Facades\DB;

class UserGradeSubjectRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return UserGradeSubject::class;
    }

    public function deleteUserGradeSubject($listUserGradeId)
    {
        $this->_model->whereIn('user_grade_id', $listUserGradeId)->delete();
    }

    public function getCountGradeSubject($listUserId)
    {
        return $this->_model
            ->select('user_id', DB::raw('count(*) as total'))
            ->whereIn('user_id', $listUserId)
            ->groupBy("user_id")
            ->get()->keyBy("user_id")->toArray();
    }

    public function getListGradeSubject($userId)
    {
        return $this->_model
            ->select('user_grade.grade_id', 'user_grade_subject.subject_id')
            ->join('user_grade', 'user_grade.id', 'user_grade_subject.user_grade_id')
            ->where('user_grade_subject.user_id', $userId)
            ->groupBy("user_grade_subject.subject_id")
            ->get();
    }

    public function getList($userId, $type)
    {
        return $this->_model->select("quiz.title", "quiz.id", "quiz.total")
            ->join('quiz', 'quiz.subject_id', 'user_grade_subject.subject_id')
//            ->leftjoin('history_quiz', 'quiz.id', '=','history_quiz.quiz_id')
            ->where('user_grade_subject.user_id', $userId)
            ->where('quiz.type', $type)
            ->groupBy("user_grade_subject.subject_id")
            ->get();
    }

}
