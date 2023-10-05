<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Repositories\Lms\LicenceRepository;
use App\Repositories\Lms\UserHasLicenceRepository;
use App\Services\LimitRequestService;
use App\Services\RedisService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class LicenceController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $licenceRepository;
    private $userHasLicenceRepository;
    private $limitRequestService;
    private $redisService;

    public function __construct(
        LicenceRepository  $licenceRepository,
        UserHasLicenceRepository $userHasLicenceRepository,
        LimitRequestService $limitRequestService,
        RedisService $redisService
    ) {
        parent::__construct();
        $this->licenceRepository        = $licenceRepository;
        $this->userHasLicenceRepository = $userHasLicenceRepository;
        $this->limitRequestService      = $limitRequestService;
        $this->redisService             = $redisService;
    }

    public function checkSerial(Request $request)
    {
        $serial = $request->input('serial');
        $data = [];
        if (!$serial) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $keyCheckLicenceInfo = "CHECK_INFO_SERIAL";
        if (!$this->limitRequestService->checkLimitRequest($keyCheckLicenceInfo, $this->ip, 10, 60*60) ) {
            $this->message = __('app.many_request');
            goto next;
        };

        $this->redisService->delete($keyCheckLicenceInfo.'_'.$this->ip);

        $checkSerial = $this->licenceRepository->findOneField('serial', $serial);
        if (!$checkSerial) {
            $this->message = __('app.serial_error');
            goto next;
        }

        $this->message = __('app.serial_success');
        $this->status = 'success';

        next:
        return $this->responseData($data);
    }

    public function checkLicence(Request $request)
    {
        $licence = $request->input('licence');
        if (!$licence) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $infoLicence = $this->licenceRepository->getInfoByLicence($licence);
        if (!$infoLicence) {
            $this->message = __('app.licence_not_found');
            goto next;
        }

        $userHasLicence = $this->userHasLicenceRepository->getUserByLicenceId($infoLicence['id']);
        if ($userHasLicence) {
            $this->message = __('app.licence_has_been_activated');
            goto next;
        }

        $this->message = __('app.licence_has_not_been_activated');
        $this->status  = 'success';
        next:
        return $this->responseData();
    }


}
