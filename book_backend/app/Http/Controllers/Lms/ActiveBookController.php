<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Models\Lms\Book;
use App\Models\Lms\Licence;
use App\Repositories\Lms\BookRepository;
use App\Repositories\Lms\LicenceHasBookRepository;
use App\Repositories\Lms\LicenceRepository;
use App\Repositories\Lms\UserHasLicenceRepository;
use App\Services\LimitRequestService;
use App\Services\RedisService;
use App\Services\ServiceConnect\AppConnectService;
use Illuminate\Http\Request;

class ActiveBookController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    private $licenceRepository;
    private $userHasLicenceRepository;
    private $limitRequestService;
    private $licenceHasBookRepository;
    private $bookRepository;
    private $appConnectService;
    private $redisService;

    public function __construct(
        LicenceRepository $licenceRepository,
        UserHasLicenceRepository $userHasLicenceRepository,
        LimitRequestService $limitRequestService,
        LicenceHasBookRepository $licenceHasBookRepository,
        BookRepository $bookRepository,
        AppConnectService $appConnectService,
        RedisService $redisService
    ) {
        parent::__construct();

        $this->licenceRepository = $licenceRepository;
        $this->userHasLicenceRepository = $userHasLicenceRepository;
        $this->limitRequestService = $limitRequestService;
        $this->licenceHasBookRepository = $licenceHasBookRepository;
        $this->bookRepository = $bookRepository;
        $this->appConnectService = $appConnectService;
        $this->redisService = $redisService;
    }

    public function activeBook(Request $request)
    {
        $data = [];
        $licence = $request->input('licence');
        $bookId = $request->input('book_id');
        if (!$licence) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $licenceInfo = $this->checkLicenceInfo($licence, $bookId);

        if (!$licenceInfo) {
            goto next;
        };

        if ($licenceInfo->book_id == Book::HOAT_DONG_TRAI_NGHIEM_2 && $bookId == "") {
            $this->code = 301;
            $this->message = __('app.invalid_params');
            goto next;
        }

        $dataCreateUserHasLicence = [
            'user_id' => $this->infoUserId(),
            'licence_id' => $licenceInfo->id,
            'time_active' => time(),
            'time_expired' => strtotime('+18 months', time()),
            'time_updated' => time()
        ];
        if (!$this->userHasLicenceRepository->create($dataCreateUserHasLicence)) {
            throw new \Exception("Error create user has licence : not found product_id " . $licenceInfo->id, 1);
        }

        if ($licenceInfo->book_id == Book::HOAT_DONG_TRAI_NGHIEM_2 || $licenceInfo->book_id == Book::AM_NHAC_2) {
            $dataInsertLicenceHasBook = [
                "licence_id" => $licenceInfo->id,
                "book_id" => $bookId
            ];
            $this->licenceHasBookRepository->create($dataInsertLicenceHasBook);
        }
        $bookName = "";
        $bookId = "";
        $bookType = "";
        if ($licenceInfo->book_id) {
            $bookInfo = $this->bookRepository->getDetail($licenceInfo->book_id);
            if ($bookInfo) {
                $bookName = $bookInfo->title;
                $bookId = $bookInfo->id;
                $bookType = $bookInfo->book_type_id;
            }
        }

        $this->licenceRepository->update($licenceInfo->id, ['status' => Licence::STATUS_USED, 'time_updated' => time()]);

        $data['grade_id']  = $licenceInfo->grade_id;
        $data["book_name"] = $bookName;
        $data["book_id"]   = $bookId;
        $data["book_type"] = $bookType;

        $this->message = 'success';
        $this->status = 'success';
        next:
        return $this->responseData($data);
    }

    private function checkLicenceInfo($licence, $bookId)
    {
        if ($bookId == Book::HOAT_DONG_TRAI_NGHIEM_2 || $bookId == Book::AM_NHAC_2) {
            $bookId = "";
        }
        $licenceInfo = $this->licenceRepository->getInfo($licence, "",$bookId);

        if ($licenceInfo) {
            if ($bookId && ($licenceInfo->book_id == Book::HOAT_DONG_TRAI_NGHIEM_2 || $licenceInfo->book_id == Book::AM_NHAC_2) ) {
                $licenceHasBook = $this->licenceHasBookRepository->getInfo($licence, $bookId);
                if ($licenceHasBook) {
                    return false;
                }
            }
        }

        $keyCheckLicenceInfo = "CHECK_LICENCE_INFO";
        if (!$this->limitRequestService->checkLimitRequest($keyCheckLicenceInfo, $this->ip, 10, 60*60) ) {
            $this->message = __('app.many_request');
            return false;
        };

        if (!$licenceInfo) {
            $this->message = __('app.licence_not_found');
            return false;
        }
        if (strtotime('+3 years', $licenceInfo->time_created) <= time()) {
            $this->message = __('app.licence_has_expired_activation');
            return false;
        }
        $checkLicenceHasActive = $this->userHasLicenceRepository->getInfo($licenceInfo->id);
        if ($checkLicenceHasActive) {

            $userInfo = $this->appConnectService->getUserId("", "", $checkLicenceHasActive->user_id);
            if ($userInfo) {
                if ($userInfo[0]['phone']) {
                    $arrDataMess = [
                        'info' => $userInfo[0]['phone']
                    ];
                    $this->message = __('app.licence_activated_by_phone', $arrDataMess);
                    return false;
                }
                if ($userInfo[0]['email']) {
                    $arrDataMess = [
                        'info' => $userInfo[0]['email']
                    ];
                    $this->message = __('app.licence_activated_by_email', $arrDataMess);
                    return false;
                }
                if ($userInfo[0]['name']) {
                    $arrDataMess = [
                        'info' => $userInfo[0]['name']
                    ];
                    $this->message = __('app.licence_activated_by_name', $arrDataMess);
                    return false;
                }

                $this->message = __('app.licence_activated');
                return false;

            }

        }

        $this->redisService->delete($keyCheckLicenceInfo.'_'.$this->ip);

        return $licenceInfo;
    }


}
