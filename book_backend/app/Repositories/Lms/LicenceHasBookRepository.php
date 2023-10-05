<?php

namespace App\Repositories\Lms;

use App\Models\Lms\LicenceHasBook;
use App\Repositories\EloquentRepository;

class LicenceHasBookRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */

    public function getModel()
    {
        return LicenceHasBook::class;
    }

    public function getInfo($licenceId = "", $bookId = "")
    {
        $query = $this->_model->select('id', 'licence_id', 'book_id');
        if ($bookId) {
            $query = $query->where('book_id', $bookId);
        }
        if ($licenceId) {
            $query = $query->where('licence_id', $licenceId);
        }


        return $query->first();
    }

}
