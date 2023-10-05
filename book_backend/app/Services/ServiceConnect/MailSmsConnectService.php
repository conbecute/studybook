<?php


namespace App\Services\ServiceConnect;


use App\Services\CurlService;
use App\Services\RedisService;

class MailSmsConnectService
{

    const TYPE_CONFIRM_ORDER = 1;
    const TYPE_PAY_SUCCESS   = 2;

    private $curlService;
    private $redisService;

    public function __construct(
        CurlService $curlService,
        RedisService $redisService
    ) {
        $this->curlService  = $curlService;
        $this->redisService = $redisService;
    }


    public function sendReportError($emailReceiver, $emailUser, $templateSlug, $accountSlug, $name, $time, $nameBook, $page, $error, $note)
    {
        $url = config('environment.API_SERVICE_MAIL') . "/api/mail-to-data";

        $data["template_slug"]    = $templateSlug;
        $data["account_slug"]     = $accountSlug;
        $data["email_receiver"]   = $emailReceiver;
        $data["name"]             = $name;
        $data["email"]            = $emailUser;
        $data["time"]             = $time;
        $data["name_book"]        = $nameBook;
        $data["page"]             = $page;
        $data["error"]            = $error;
        $data["note"]             = $note;

        $response = $this->curlService->_curlPost($url, $data, true, '');
        $check    = false;
        if (isset($response['status']) && $response['status'] = 'success') {
            $check = true;
        }
        return $check;
    }



}
