<?php


namespace App\Repositories\Lms;

use App\Models\Lms\BookContent;
use App\Repositories\EloquentRepository;
use Illuminate\Http\Request;

class BookContentRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return BookContent::class;
    }

    public function getBookContent($bookId) {
        return $this->_model->where('book_id', $bookId)
                    ->where('parent_id', 0)
                    ->with('children')
                    ->get();
    }
}
