<?php


namespace App\Repositories\Lms;


use App\Models\Lms\Book;
use App\Models\Lms\Licence;
use App\Models\Lms\UserHasLicence;
use App\Repositories\EloquentRepository;

class LicenceRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */

    public function getModel()
    {
        return Licence::class;
    }

    public function getInfo($licence = "", $serial = "", $bookId = "")
    {
        $query = $this->_model->select('licence.id', 'licence.time_created', 'book.grade_id', 'book.id as book_id')
        ->join('book', 'licence.book_id', '=', 'book.id')
        ;
        if ($bookId) {
            $query = $query->where('licence.book_id', $bookId);
        }
        if ($licence) {
            $query = $query->where('licence.licence', $licence)->orWhere('licence.licence', strtolower($licence));
        }
        if ($serial) {
            $query = $query->where('licence.serial', $serial);
        }

        return $query->first();
    }

    public function getInfoByLicence($licence) {
        return $this->_model
            ->select('id')
            ->where('licence', $licence)
            ->first();
    }

    public function getListBookActivatedByUserId($userId)
    {
        return $this->_model
            ->distinct(Book::TABLE . '.' . Book::_ID)
            ->select(
                Book::TABLE . '.' . Book::_ID,
                Book::TABLE . '.' . Book::_TITLE,
                Book::TABLE . '.' . Book::_GRADE_ID
            )
            ->join(Book::TABLE, Book::TABLE . '.' . Book::_ID, Licence::TABLE . '.' . Licence::_BOOK_ID)
            ->join(UserHasLicence::TABLE, UserHasLicence::TABLE . '.' . UserHasLicence::_LICENCE_ID, Licence::TABLE . '.' . Licence::_ID)
            ->where(UserHasLicence::TABLE . '.' . UserHasLicence::_USER_ID, $userId)
            ->get();
    }
}
