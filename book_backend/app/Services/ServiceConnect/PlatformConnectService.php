<?php


namespace App\Services\ServiceConnect;

use App\Services\CurlService;

class PlatformConnectService
{
    private $curlService;

    public function __construct(
        CurlService $curlService
    ) {
        $this->curlService = $curlService;
    }

    public function getDetailActivity($activityId)
    {
        $data['activity_id'] = $activityId;

        $url      = config('environment.API_SERVICE_PLATFORM') . "/api/v1/get-detail-activity";
        $response = $this->curlService->_curlGetData($url, $data, env('TOKEN_TO_SERVER'));
//        $response = $this->curlService->curlGetData($url, $data);
        $activityInfo = json_decode($response, true);

        if ($activityInfo['code'] == 200) {
            return $activityInfo['data'];
        }
        return [];
    }

}
