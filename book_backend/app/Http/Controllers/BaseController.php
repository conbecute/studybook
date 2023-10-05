<?php

namespace App\Http\Controllers;


use App\Services\DetectIpService;
use Illuminate\Support\Facades\Request;

class BaseController extends Controller
{
    protected $lang_id;
    protected $is_vn = false;
    protected $ip;
    protected $lang;
    protected $limit = 20;
    protected $status = 'fail';

    protected $message = '';
    protected $isNetworkEarlyStart = false;
    protected $isTestHoc10         = false;

    protected $code = 200;

    public function __construct(
    ){
        $this->checkLocation();
        $this->isNetworkEarlyStart = $this->setNetworkEarlyStart();
        $this->isTestHoc10         = $this->isTestHoc10();
        app('translator')->setLocale('vi');
    }

    protected function responseData($data = [], $more = '', $code = 200)
    {
        if(!$data) {
            $data = (object) $data;
        }
        $res = [
            'status' => $this->status,
            'message' => $this->message,
            'code' => $this->code,
            'data' => $data
        ];
        if ($more) {
            $res = array_merge($res, $more);
        }
        return response()->json($res, $code);
    }

    private function setNetworkEarlyStart()
    {
        $ipList = ['113.190.232.224', '118.70.176.20', '118.70.186.162', '222.252.17.100', '222.252.84.250'];
        if (in_array($this->ip, $ipList)) {
            return true;
        }
        return false;
    }

    private function isTestHoc10()
    {

    }

    public function checkLocation()
    {
        $detectIpService = new DetectIpService();
        $is_test = isset($_REQUEST['is_test']) ? $_REQUEST['is_test'] : false;
        $ip = isset($_REQUEST['ip']) ? $_REQUEST['ip'] : "";
        $this->ip = $detectIpService->ip_address();
        $this->is_vn = $is_test ? false : $detectIpService->isVn($ip);
    }

    protected function infoUser()
    {
        return $this->request()->attributes->get('userInfo');
    }

    protected function infoUserId()
    {
        $user = $this->infoUser();
        return $user['id'];
    }

    protected function request($key = null, $default = null)
    {
        if (is_null($key)) {
            return app('request');
        }

        if (is_array($key)) {
            return app('request')->only($key);
        }

        return data_get(app('request')->all(), $key, $default);
    }

}
