<?php


namespace App\Repositories\Lms;

use App\Models\Lms\WorkSheet;
use App\Repositories\EloquentRepository;

class WorkSheetRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return WorkSheet::class;
    }

    public function listWorkSheet($category, $typeDocument, $gradeId, $subjectId, $title = "", $limit = "", $offset = "", $listBookIdActive = [], $isAdmin = "", $bookId = 0, $status = "", $isFree)
    {
        $query = $this->_model->select('worksheet.id', 'worksheet.title as worksheet_title', 'worksheet.url', 'worksheet.thumb',
                                        'worksheet.type_document', 'worksheet.category', 'worksheet.book_id',
                                        'worksheet.grade_id', 'worksheet.subject_id', 'worksheet.is_free',
                                        'worksheet.published_date', 'worksheet.status', 'book.title as book_title',
                                        'grade.name as grade_name', 'subject.title as subject_title');
        $query = $query->leftJoin('grade', 'worksheet.grade_id', '=', 'grade.id')
                       ->leftJoin('subject', 'worksheet.subject_id', '=','subject.id')
                       ->leftJoin('book', 'worksheet.book_id', '=','book.id');
        if($typeDocument) {
            $query = $query->where('worksheet.type_document', $typeDocument);
        }
        if ($category) {
            $query = $query->where('worksheet.category', $category);
        }
        if ($gradeId) {
            $query = $query->where('worksheet.grade_id', $gradeId);
        }
        if ($subjectId) {
            $query = $query->where('worksheet.subject_id', $subjectId);
        }
        if ($bookId) {
            $query = $query->where('worksheet.book_id', $bookId);
        }
        if ($status) {
            $query = $query->where('worksheet.status', $status);
        }
        if ($isFree) {
            $query = $query->where('worksheet.is_free', $isFree);
        }

        if (!$isAdmin) {
            $query = $query->where('worksheet.is_free', WorkSheet::VERSION_FREE)
                           ->orWhere(function($subQuery) use ($listBookIdActive) {
                               $subQuery->where('worksheet.is_free', WorkSheet::VERSION_FULL)
                                        ->whereIn('worksheet.book_id', $listBookIdActive);
                           });
        }
        if ($title) {
            $query = $query->where('worksheet.title', 'like', '%' . $title . '%');
        }
        if ($limit) {
            $query = $query->limit($limit)
                ->offset($offset);
        }
        return $query->get();
    }
}
