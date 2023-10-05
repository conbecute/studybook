<?php


namespace App\Services\ServiceConnect;

use App\Services\CurlService;

class AppConnectService
{
    private $curlService;

    public function __construct(
        CurlService $curlService
    ) {
        $this->curlService = $curlService;
    }

    public function createAccount($email, $phone, $name, $userName, $passWord)
    {
        $data['email'] = $email;
        $data['phone'] = $phone;
        $data['name']  = $name;
        $data['user_name']  = $userName;
        $data['pass_word']  = $passWord;

        $url      = config('environment.API_SERVICE_APP') . "api/v1/create-account?is_web=1";
        $response = $this->curlService->_curlPost($url, $data);
        $userInfo = json_decode($response, true);
        if ($userInfo['code'] == 200 || $userInfo["code"] == 302) {
            return [$userInfo['status'], $userInfo["code"], $userInfo['message'], $userInfo['data']];
        }
        return [false, false,false, false];
    }

    public function updateAccount($email, $phone, $userId)
    {
        $data['email']    = $email;
        $data['phone']    = $phone;
        $data['user_id']  = $userId;

        $url      = config('environment.API_SERVICE_APP') . "api/v1/update-account?is_web=1";
        $response = $this->curlService->_curlPost($url, $data);
        $userInfo = json_decode($response, true);
        if ($userInfo['code'] == 200) {
            return true;
        }
        return false;
    }

    public function getUserId($phone, $email, $userId = "")
    {
        $data['phone'] = $phone;
        $data['email'] = $email;
        if ($userId) {
            $data['user_id'] = $userId;
        }
        $data['is_web'] = 1;

        $url      = config('environment.API_SERVICE_APP') . "api/v1/get-user-id";
        $response = $this->curlService->curlGetData($url, $data);
        $userInfo = json_decode($response, true);

        if ($userInfo['status'] == "success") {
            return $userInfo['data'];
        }
        return [];
    }

    public function getUserName($listUserId)
    {
        $data['list_user_id'] = $listUserId;
        $data['is_web'] = 1;

        $url      = config('environment.API_SERVICE_APP') . "api/v1/get-user-name";
        $response = $this->curlService->curlGetData($url, $data);
        $userInfo = json_decode($response, true);

        if ($userInfo['code'] == 200) {
            return $userInfo['data'];
        }
        return [];
    }

}
