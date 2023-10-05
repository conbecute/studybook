<?php


namespace App\Repositories\Lms;


use App\Models\Lms\Book;
use App\Repositories\EloquentRepository;

class BookRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return Book::class;
    }

    public function getDetail($bookId)
    {
        $query = $this->_model
            ->select('link_html', 'is_blocked', 'title', 'is_licence', 'language', 'id', 'book_type_id')
            ->where('id', $bookId)
            ->first();
        return $query;
    }

    public function getFindBook($gradeId, $title = "")
    {
        $query = $this->_model
            ->where('grade_id', $gradeId);
        if ($title) {
            $query = $query->where('title', 'like', '%'.$title.'%');
        }
        return $query->get();
    }

    public function getListBook($bookType = "", $gradeId = "", $title = "", $limit = "", $offset = "", $status = "", $subjectId = "")
    {
        $query = $this->_model
            ->select('id', 'title', 'thumb', 'link_html', 'grade_id', 'book_type_id', 'language', 'order_book', 'status', 'is_blocked', 'subject_id', 'is_free', 'is_licence');
        if ($bookType) {
            $query->where('book_type_id', $bookType);
        }
        if ($gradeId) {
            $query->where('grade_id', $gradeId);
        }
        if ($subjectId) {
            $query->where('subject_id', $subjectId);
        }
        if ($title) {
            $query->where('title', $title);
        }
        if ($status) {
            $query->where('status', $status);
        }

        if ($limit) {
            $query = $query->limit($limit)
                  ->offset($offset);
        }

        return $query->orderBy('order_book', 'asc')->get();
    }
    public function getBook($ids = null)
    {
        $query = $this->_model->select('id', 'title');

        if ($ids) {
            $query = $query->whereIn('id', $ids);
        }

        return $query->get();
    }

    public function getNameBookAndNumberPage($bookId, $pageId)
    {
        return $this->_model->select('page.index', 'book.title')
            ->join('page', 'page.book_id', 'book.id')
            ->where('book.id', $bookId)
            ->where('page.id', $pageId)
            ->get()->toArray();
    }
}
