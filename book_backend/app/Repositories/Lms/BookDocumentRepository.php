<?php


namespace App\Repositories\Lms;

use App\Models\Lms\Book;
use App\Models\Lms\BookDocument;
use App\Repositories\EloquentRepository;

class BookDocumentRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return BookDocument::class;
    }

    public function listBookDocument($typeDocument, $gradeId, $title = "", $limit = "", $offset = "", $listBookIdActive = [], $isActive = "", $bookId = 0, $status = "")
    {
        $query = $this->_model->select('id', 'title', 'url', 'thumb', 'type_document', 'grade_id', 'status')
            ->where('type_document', $typeDocument);
        if ($gradeId) {
            $query = $query->where('grade_id', $gradeId);
        }
        if ($bookId) {
            $query = $query->where('book_id', $bookId);
        }
        if ($status) {
            $query = $query->where('status', $status);
        }
        if ($isActive) {
            if ($listBookIdActive) {
                $query = $query->where(
                    function ($query) use ($listBookIdActive) {
                        $query->whereIn('book_id', $listBookIdActive);
                    }
                );
            }
        } else {
            if ($listBookIdActive) {
                $query = $query->where(
                    function ($query) use ($listBookIdActive) {
                        $query->whereIn('book_id', $listBookIdActive)
                            ->orWhere('is_free', BookDocument::IS_FREE);
                    }
                );
            } else {
                $query = $query->where('is_free', BookDocument::IS_FREE);
            }
        }

        if ($title) {
            $query = $query->where('title', 'like', '%' . $title . '%');
        }
        if ($limit) {
            $query = $query->limit($limit)
                ->offset($offset);
        }
        return $query->get();
    }

}
