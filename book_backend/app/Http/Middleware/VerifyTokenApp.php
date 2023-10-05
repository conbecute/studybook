<?php

namespace App\Http\Middleware;

use App\Repositories\App\UsersRepository;
use App\Services\AuthenService;
use Closure;
use Illuminate\Http\Request;

class VerifyTokenApp
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    private $authenService;

    public function __construct(
        AuthenService $authenService
    )
    {
        $this->authenService = $authenService;
    }

    public function handle(Request $request, Closure $next, $guard = null)
    {
        $token = $request->header('token');
        $user = $this->verifyToken($token);

        if(env('APP_ENV') == 'live') {
            // $checkIsLastLogin = $this->authenService->checkIsLastLogin($user, $token);
            // if (!$checkIsLastLogin) {
            //     $permissionDenied = [
            //         'message' => 'Permission denied'
            //     ];
            //     return $this->request()->json($permissionDenied, 401);
            // }
        }

        if ($token === env('TOKEN_TO_SERVER')) {
            $userId = $request->input('user_id');
            if ($userId) {
                $user =['id' => $userId];
            }
        }

        if (!$user) {
            $permissionDenied = [
                'message' => 'Permission denied'
            ];
            return $this->request()->json($permissionDenied, 401);
        }

        $request->attributes->add(['userInfo' => $user]);
        return $next($request);
    }



    private function verifyToken($token)
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

    private function request($key = null, $default = null)
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
