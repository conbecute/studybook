<?php


namespace App\Console\Commands;

use App\Exports\ExportOrderPost;
use App\Repositories\Lms\ObjectHasActivitiesRepository;
use App\Repositories\Lms\PageRepository;
use App\Services\CurlService;
use App\Services\ServiceConnect\PlatformConnectService;
use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;

class GetInfoImage extends Command
{
    protected $signature = "getInfoImage:getInfoImage ";

    protected $description = "get info image";

    private $objectHasActivitiesRepository;
    private $platformConnectService;
    private $curlService;

    public function handle(
        ObjectHasActivitiesRepository $objectHasActivitiesRepository,
        PlatformConnectService $platformConnectService,
        CurlService $curlService
    ) {
        $this->objectHasActivitiesRepository = $objectHasActivitiesRepository;
        $this->platformConnectService = $platformConnectService;
        $this->curlService = $curlService;


        $listBook = [];

        foreach ($listBook as $bookId => $bookName) {
            $activityInfos = $this->objectHasActivitiesRepository->getActivityByBookId($bookId);
            $listImageData = [];
            foreach ($activityInfos as $activity) {
                $url      = "https://lms.monkeyuni.net/api/get-detail-object?object_id=".$activity['object_id'];
                $response = $this->curlService->_curlGetData($url, [], env('TOKEN_TO_SERVER'));
                echo $activity['object_id'].PHP_EOL;
                $dataInfo = json_decode($response, true);
                if (isset($dataInfo['data'][0]['icon_list'][0]['icons'])) {
                    foreach ($dataInfo['data'][0]['icon_list'][0]['icons'] as $icon) {
                    if (isset($dataInfo['data'][0]['game_config']['back_ground'])) {
                        if (isset($dataInfo['data'][0]['game_config']['back_ground']['icon_id'])) {
                            if ($icon['icon_id'] == $dataInfo['data'][0]['game_config']['back_ground']['icon_id']) {
                            $path = $icon['path'];
                            array_push($listImageData, [
                                "book_id" => $bookId,
                                "book_name" => $bookName,
                                "object_id" =>  $activity['object_id'],
                                "path" => $path,
                                "icon_id" => $icon['icon_id'],
                                "activity_id" => $activity['activity_id'],
                                "activity_name" => $activity["activity_name"]
                            ]);
                        }
                        }
                    } else {
                        array_push($listImageData, [
                            "book_id" => $bookId,
                            "book_name" => $bookName,
                            "object_id" =>  $activity['object_id'],
                            "path" => "",
                            "icon" => "",
                            "activity_id" => $activity['activity_id'],
                            "activity_name" => $activity["activity_name"]
                        ]);
                    }

                }
                }

            }

            $dataInfoImage = [];

            foreach ($listImageData as $image) {
                $width = "";
                $height = "";
                if (!empty($image['path'])) {
                    list($width, $height) = getimagesize('https://vnmedia.monkeyuni.com/upload/cms_platform/images/hdr/'.$image['path']);
                }
                array_push($dataInfoImage, [
                    "book_id" => $bookId,
                    "book_name" => $bookName,
                    "activity_id" => $image['activity_id'],
                    "activity_name" => $image["activity_name"],
                    "object_id" => $image["object_id"],
                    "path" => !empty($image['path']) ? $image['path'] : "",
                    "icon" => !empty($image['icon']) ? $image['icon'] : "",
                    "width" => $width,
                    "height" => $height
                ]);
            }

            $data = new ExportOrderPost($dataInfoImage);
            Excel::store($data, '/exports/' . $bookName . '.xls', 'public');
        }
        dd("done");


    }


}
