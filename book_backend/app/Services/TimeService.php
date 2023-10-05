<?php

namespace App\Services;
use \Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Illuminate\Support\Facades\Config;

class TimeService
{

    private $redisService;

    public function __construct(
        RedisService $redisService
    ) {
        $this->redisService = $redisService;
    }

    public function getTimeNow($timeNow)
    {
        $array = explode('-', $timeNow);
        $time  = (int)($array[0]) * 60 * 60 + (int)($array[1]) * 60 + (int)$array[2];
        return $time;
    }

}
