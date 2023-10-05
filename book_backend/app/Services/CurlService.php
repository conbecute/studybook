<?php

namespace App\Services;

use Illuminate\Http\Request;
use Ixudra\Curl\Facades\Curl;

class CurlService
{

    private $request;

    public function __construct(
        Request $request
    )
    {
        $this->request = $request;
    }

    public function _curlPostAuth($url, $data, $checkHeader = false, $token = '')
    {
        if ($checkHeader) {
            $response = Curl::to($url)
                ->withData(json_encode($data))
                ->withHeader('Content-Type:application/json')
                ->withHeader('Authorization:' . $token)
                ->post();
            return $response;
        }
        $response = Curl::to($url)
            ->withData($data)
            ->post();
        return $response;
    }

    public function _curlPost($url, $data, $checkHeader = false, $token = '')
    {
        if (!$token) {
            $token = $this->request->header('token');
        }
        if (!$token) {
            $token = env('TOKEN_TO_SERVER');
        }
        if ($checkHeader) {
            $response = Curl::to($url)
                ->withData($data)
                ->withHeader('Content-Type:application/json')
                ->withHeader('Token:' . $token)
                ->asJson(true)
                ->post();
            return $response;
        }
        $response = Curl::to($url)
            ->withData($data)
            ->post();
        return $response;
    }

    public function _curlGet($url)
    {
        $response = Curl::to($url)
            ->get();
        return $response;
    }

    public function curlGetData($url, $data = [], $token = null)
    {
        $response = Curl::to($url)
                ->withData($data)
                ->get();

        return $response;
    }

    public function curlPostUploadFile($url, $data = [], $token = null, $file = null)
    {
        if (!$token) {
            $token = $this->request->header('token');
        }
        if (!$token) {
            $token = env('TOKEN_TO_SERVER');
        }

        if ($token) {
            $response = Curl::to($url)
                ->withData($data)
                ->withHeader('Token:' . $token)
                ->withFile('file', $file)
                ->post();
            return $response;
        }
        $response = Curl::to($url)
            ->withData($data)
            ->withFile('file', $file)
            ->post();

        return $response;
    }

    public function _curlGetData($url, $data = [], $token = null)
    {
        if (!$token) {
            $token = $this->request->header('token');
        }
        if (!$token) {
            $token = env('TOKEN_TO_SERVER');
        }
        if ($token) {
            $response = Curl::to($url)
                ->withData($data)
                ->withHeader('Token:' . $token)
                ->withHeader('authorization:' . $token)
                ->get();

            return $response;
        }

        $response = Curl::to($url)
            ->withData($data)
            ->get();

        return $response;
    }

    public function curlPost($url, $data = [], $token = null)
    {
        if (!$token) {
            $token = $this->request->header('token');
        }
        if (!$token) {
            $token = env('TOKEN_TO_SERVER');
        }
        if ($token) {
            $response = Curl::to($url)
                ->withData($data)
                ->withHeader('Token:' . $token)
                ->asJson(true)
                ->post();
            return $response;
        }
        $response = Curl::to($url)
            ->withData($data)
            ->asJson(true)
            ->post();

        return $response;
    }

}
