<?php

namespace App\Repositories\Lms;

use App\Models\Lms\ObjectInPage;
use App\Repositories\EloquentRepository;

class ObjectRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return ObjectInPage::class;
    }

    public function getListObject($pageId = "", $limit = "", $offset = "")
    {
        $query = $this->_model
            ->select('object.id', 'object.page_id', 'object.name', 'object.touch_vector', 'object.type',
                'object_has_activities.activity_id', 'object_has_activities.activity_name')
            ->leftJoin('object_has_activities', 'object_has_activities.object_id', '=', 'object.id');
        ;
        if ($pageId) {
            $query->where('page_id', $pageId);
        }

        if ($limit) {
            $query = $query->limit($limit)
                ->offset($offset);
        }

        return $query->get();

    }

    public function getListObjectHasActivity($bookId, $numberPage)
    {
        $query = $this->_model->select('page.id as page_id', 'object.id as object_id', 'object.name', 'page.index', 'object_has_activities.activity_id', 'object_has_activities.status')
            ->leftJoin('page', 'page.id', '=', 'object.page_id')
            ->leftJoin('object_has_activities', 'object_has_activities.object_id', '=', 'object.id')
            ->where('page.book_id', $bookId);

        if (count($numberPage) > 1) {
            $query = $query->whereIn('page.index', $numberPage);
        }
        return $query->orderBy('page.index', 'asc')
            ->get()->toArray();
    }

    public function exportNameObject($bookId)
    {
        return $this->_model->select('object.id', 'object.name', 'page.index')
                            ->rightJoin('page', 'page.id', '=', 'object.page_id')
                            ->where('page.book_id', $bookId)
                            ->orderBy('page.index', 'asc')
                            ->get()->toArray();
    }

    public function getObject($id, $pageId)
    {
        return $this->_model->select('id', 'name', 'page_id')->where('id', $id)->whereIn('page_id', $pageId)->get();
    }

    public function getNameObject($name)
    {
        return $this->_model->where('name', 'like', "%".$name."%")->get();
    }

    public function getObjects($ids) {
        $query = $this->_model->select('id', 'name');

        if($ids) {
            $query = $query->whereIn('id', $ids);
        }

        return $query->get();
    }
}
