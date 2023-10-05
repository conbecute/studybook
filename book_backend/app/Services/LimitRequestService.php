<?php

namespace App\Services;

class LimitRequestService
{
    private $redisService;
    private $authenService;

    public function __construct(
        RedisService $redisService,
        AuthenService $authenService
    )
    {
        $this->redisService = $redisService;
        $this->authenService = $authenService;
    }

    public function checkLimitRequest($key, $info, $limitedQuantity, $timeCheckRequest)
    {
//        $timeNow = $this->authenService->getTimeNow(date("H-i-s"));

        $keyCheckLimitRequest = $key .'_'. $info;

        $checkNumberRequest = $this->redisService->get($keyCheckLimitRequest);

        if ($checkNumberRequest >= $limitedQuantity) {
            return false;
        }

        $this->redisService->set($keyCheckLimitRequest, $checkNumberRequest + 1, $timeCheckRequest);

        return true;

    }

}
