<?php


namespace App\Repositories\Lms;


use App\Models\Lms\Page;
use App\Repositories\EloquentRepository;

class PageRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return Page::class;
    }

    public function getListPage($bookId = "", $limit = "", $offset = "", $status = "", $isTester = "")
    {
        $query = $this->_model
            ->select('index', 'background', 'id')
            ->with('objects');
        if ($bookId) {
            $query->where('book_id', $bookId);
        }

        if (!$isTester && $status) {
            $query->where('status', $status);
        }

        if ($limit) {
            $query = $query->limit($limit)
                ->offset($offset);
        }

        return $query->orderBy('index', 'asc')->get();

    }

    public function getListBook($bookId = "", $limit = "", $offset = "")
    {
        $query = $this->_model
            ->select('page.id', 'page.book_id', 'page.index', 'page.background', 'page.status', 'book.title')
            ->join('book', 'book.id', '=', 'page.book_id')
            ->with('objects')
        ;
        if ($bookId) {
            $query->where('book_id', $bookId);
        }

        if ($limit) {
            $query = $query->limit($limit)
                ->offset($offset);
        }

        return $query->orderBy('index', 'asc')->get();
    }

    public function getPage($bookId = '', $index='') {
        return $this->_model->select('id', 'background', 'book_id', 'index')
                    ->where('book_id', $bookId)
                    ->where('index', $index)
                    ->first();
    }

    public function getPageWithCondition($bookId = '', $index='') {
        return $this->_model->select('id', 'background', 'book_id', 'index', 'status')
            ->where('book_id', $bookId)
            ->where('index', '>', $index)
            ->get();
    }

    public function getPageByBookId($bookId = '') {
        return $this->_model->select('id', 'background', 'book_id', 'index', 'status')
            ->where('book_id', $bookId)
            ->get();
    }

    public function getPageWithCondition2($bookId = '', $x1, $y1) {
        return $this->_model->select('id', 'background', 'book_id', 'index', 'status')
            ->where('book_id', $bookId)
            ->where('index', '>', $x1)
            ->where('index', '<', $y1)
            ->get();
    }

    public function getPages($bookId = "", $ids = "")
    {
        $query = $this->_model->select('*');
        if ($bookId) {
            $query->where('book_id', $bookId);
        }
        if ($ids) {
            $query->whereIn('id', $ids);
        }
        return $query->get();
    }
}
