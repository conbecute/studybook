<?php


namespace App\Services\ServiceConnect;

use App\Services\CurlService;

class MediaConnectService
{
    private $curlService;

    public function __construct(
        CurlService $curlService
    ) {
        $this->curlService = $curlService;
    }

    public function upload($file, $folderPath, $description = '', $overwrite = false, $file_overwrite_path = '')
    {
        $url                         = config('environment.API_SERVICE_MEDIA') . "/api/upload";
        $data["folder_path"]         = $folderPath;
        $data["description"]         = $description;
        $data["overwrite"]           = $overwrite;
        $data["file_overwrite_path"] = $file_overwrite_path;

        $response = $this->curlService->curlPostUploadFile($url, $data, env('TOKEN_TO_SERVER'), $file);
        $response = json_decode($response, true);

        return $response;
    }

    public function uploadFile($file, $folderPath, $description, $nameFile, $overwrite = false, $file_overwrite_path = '', $token = '')
    {
        $data = [
            'file'        => $file,
            'folder_path' => $folderPath,
            'description' => $description,
            'nameFile'    => $nameFile,
        ];

        if ($overwrite) {
            $data['overwrite']           = $overwrite;
            $data['file_overwrite_path'] = $file_overwrite_path;
        }

        $url          = config('environment.API_SERVICE_MEDIA') . "/api/upload-file-export";
        $dataResponse = $this->curlService->curlPostUploadFile($url, $data, $token, $file);
        $dataResponse = json_decode($dataResponse, true);

        return $dataResponse;
    }

}
