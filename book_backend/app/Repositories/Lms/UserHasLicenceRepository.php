<?php


namespace App\Repositories\Lms;


use App\Models\Lms\UserHasLicence;
use App\Repositories\EloquentRepository;

class UserHasLicenceRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return UserHasLicence::class;
    }

    public function getInfo($licenceId)
    {
        return $this->_model
            ->where('licence_id', $licenceId)
            ->first();
    }

    public function listBookUsed($userId, $bookType = "", $gradeId = "", $limit = "", $offset = "", $title = "", $status =  null)
    {
        $query = $this->_model
            ->distinct('book.id')
            ->select('book.id', 'book.title', 'book.thumb', 'book.link_html', 'book.order_book', 'book.language')
            ->join('licence', 'licence.id', '=', 'user_has_licence.licence_id')
            ->join('book', 'book.id', '=', 'licence.book_id')
            ->where('user_has_licence.user_id', $userId);
        ;
        if ($bookType) {
            $query->where('book.book_type_id', $bookType);
        }
        if ($gradeId) {
            $query->where('book.grade_id', $gradeId);
        }
        if ($title) {
            $query->where('book.title', 'like', '%'.$title.'%');
        }
        if ($status) {
            $query->where('book.status', $status);
        }

        if ($limit) {
            $query = $query->limit($limit)
                ->offset($offset);
        }

        return $query->orderBy('book.order_book', 'asc')->get();
    }

    public function getListBookUsed($userId, $listBookId, $status = '')
    {
        $query = $this->_model
            ->select('book.id', 'book.is_licence')
            ->join('licence', 'licence.id', '=', 'user_has_licence.licence_id')
            ->join('book', 'book.id', '=', 'licence.book_id')
            ->where('user_has_licence.user_id', $userId)
            ->whereIn('licence.book_id', $listBookId);
        if ($status) {
            $query = $query->where('book.status', $status);
        }
        return $query->get();
    }

    public function getUserByLicenceId($licenceId) {
        return $this->_model
            ->select('id', 'user_id')
            ->where('licence_id', $licenceId)
            ->first();
    }

    public function getListBookByUserId($userId, $bookId = '')
    {
        $query = $this->_model
            ->select('book_id')
            ->join('licence', 'licence.id', '=', 'user_has_licence.licence_id')
            ->where('user_has_licence.user_id', $userId);
        if ($bookId) {
            $query->where('book_id', $bookId);
        }
        return $query->get();
    }

}
