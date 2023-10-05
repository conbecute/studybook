<?php

namespace App\Services;

use Illuminate\Http\Request;

class UserService
{
    private $authenService;

    public function __construct(
        AuthenService $authenService
    )
    {
        $this->authenService = $authenService;
    }

    public function getInfoUser(Request $request)
    {
        $token = $request->header('token');
        if (!$token) {
            $token = $request->get('token');
        }

        if (!$token || $token == 'null') {
            return false;
        }

        $infoUser = $this->authenService->deToken($token);

        if (!$infoUser) {
            return false;
        }

        $infoUser = (array)$infoUser;

        return $infoUser;
    }

    public function verifyToken($token)
    {
        if (!$token) {
            $token = $this->request()->get('token');
        }

        if ($token === env('TOKEN_TO_SERVER')) {
            return true;
        }

        if (!$token || $token == 'null') {
            return false;
        }

        $infoUser = $this->authenService->deToken($token);

        if (!$infoUser) {
            return false;
        }

        $infoUser = (array)$infoUser;

        return $infoUser;
    }

    public function listUserTestHoc10()
    {
        return [
            "nhung.dao@monkey.edu.vn",
            "ly.pham@monkey.edu.vn",
            "binh.phan@hoc10.com",
            "nhung.ta@hoc10.com",
            "xuananh.nguyen@hoc10.com",
            "linhchi.nguyen@hoc10.com",
            "thuhang.nguyen@hoc10.com",
            "hoa.nguyen@hoc10.com",
            "linh.pham@hoc10.com",
            "phuong.le@hoc10.com",
            "nga.vo@hoc10.com",
            "long.pham@monkey.edu.vn",
            "phuong.nguyen@hoc10.com",
            "pta100293@gmail.com",
            "hieu.ta@monkey.edu.vn",
            "lyph2211@gmail.com",
            "giang.to@hoc10.com",
            "nhung.phan@monkey.edu.vn",
            "hien.nguyen@hoc10.com",
            "baanh.monkey@gmail.com",
            "binhbures.duc.do@gmail.com"
        ];
    }

}
