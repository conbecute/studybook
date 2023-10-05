<?php

namespace App\Services;
use \Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Illuminate\Support\Facades\Config;

class AuthenService
{

    private $redisService;
    private $keyLastTimeLogin = 'KEY_LAST_TIME_LOGIN';

    public function __construct(
        RedisService $redisService
    ) {
        $this->redisService = $redisService;
    }

    public function setToken($data = [], $timeExpire = '') 
    {
        if ($timeExpire) {
            $data['exp'] = $timeExpire;
        }
        $encoded     = JWT::encode($data, Config::get('constants.key_token'));
        return $encoded;
    }

    public function deToken($access_token) 
    {
        try {
            $tokenArray = JWT::decode($access_token, Config::get('constants.key_token'), array('HS256'));
            return $tokenArray;
        } catch (\Firebase\JWT\ExpiredException $e) {
            return false;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function setTimeExpireForToken () 
    {
        return time() + 60 * 60 * 24 * 30;
    }

    public function checkIsLastLogin($user, $token)
    {
        if ($token === env('TOKEN_TO_SERVER')) {
            return true;
        }
        $timeLastLogin = $this->redisService->hGet($this->keyLastTimeLogin, $user['id']);
        if (!isset($user['time_login'])) {
            return false;
        }
        if ($timeLastLogin != $user['time_login']) {
            return false;
        }
        return true;
    }

    public function getTimeNow($timeNow)
    {
        $array = explode('-', $timeNow);
        $time  = (int)($array[0]) * 60 * 60 + (int)($array[1]) * 60 + (int)$array[2];
        return $time;
    }

}
