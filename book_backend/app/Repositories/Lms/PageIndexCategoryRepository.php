<?php


namespace App\Repositories\Lms;

use App\Models\Lms\PageIndexCategory;
use App\Repositories\EloquentRepository;

class PageIndexCategoryRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return PageIndexCategory::class;
    }


}
