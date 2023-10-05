<?php


namespace App\Repositories\Lms;


use App\Models\Lms\Subject;
use App\Repositories\EloquentRepository;

class SubjectRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return Subject::class;
    }

    public function getListSubject($gradeId = "", $title = "", $limit = "", $offset = "")
    {
        $query = $this->_model
            ->with(['grade' => function($q) {
                $q->select('id', 'name');
            }]);
        if ($gradeId) {
            $query = $query->where('grade_id', $gradeId);
        }
        if($title) {
            $query = $query->where('title', 'like', "%".$title."%");
        }
        if ($limit) {
            $query = $query->limit($limit)
                ->offset($offset);
        }
        $query = $query->select('id', 'title', 'grade_id', 'status')->orderBy('id', 'desc');
        return $query->get();
    }

}
