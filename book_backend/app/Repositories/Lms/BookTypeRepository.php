<?php


namespace App\Repositories\Lms;


use App\Models\Lms\BookType;
use App\Repositories\EloquentRepository;

class BookTypeRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return BookType::class;
    }

    public function getListBookType()
    {
        return $this->_model->select('id', 'name')->get()->toArray();
    }

}
