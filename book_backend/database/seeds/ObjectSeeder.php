<?php

use Illuminate\Database\Seeder;
use App\Repositories\Lms\ObjectRepository;
use App\Repositories\Lms\PageRepository;
use App\Services\ServiceConnect\MediaConnectService;
use App\Models\Lms\BookDocument;
use App\Repositories\Lms\BookDocumentRepository;

use App\Services\ServiceConnect\PlatformConnectService;
use App\Models\Lms\ObjectInPage;
class ObjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    private $objectRepository;
    private $pageRepository;
    private $bookDocumentRepository;
    private $platformConnectService;
    private $mediaConnectService;


    public function __construct(
        ObjectRepository  $objectRepository,
        PageRepository  $pageRepository,
        BookDocumentRepository $bookDocumentRepository,
        PlatformConnectService $platformConnectService,
        MediaConnectService $mediaConnectService
    )
    {
        $this->objectRepository             = $objectRepository;
        $this->pageRepository               = $pageRepository;
        $this->bookDocumentRepository       = $bookDocumentRepository;
        $this->platformConnectService       = $platformConnectService;
        $this->mediaConnectService          = $mediaConnectService;
    }
    public function run()
    {
            $this->updateStatusForPage();
//        $bookId = null;
//        $gradeId = 4;
//        $type = BookDocument::ZIP_ENGLISH_COURSEWARE;
//        $this->updateDocument($bookId, $gradeId, $type);
//        $limit = 1000;
//        $time = time();
//        echo "Time now: " . $time . "\n";
//        $total = $this->objectRepository->countAll();
//        echo "Records: " . $total . "\n";
//        for($i = 0; $i < $total;) {
//
//            $objects = $this->objectRepository->getListObject(null, $limit, $i)->toArray();
//
//            for($j = 0; $j < count($objects); $j++) {
//                echo ($i + $j) . "|" . $objects[$j]['activity_id'] . "\n";
//                $data = $this->platformConnectService->getDetailActivity($objects[$j]['activity_id']);
//                $type = $this->getType($data);
//                if($type) {
//                    $this->objectRepository->update($objects[$j]['id'], ['type' => $type, 'time_updated' => $time]);
//                }
//
//            }
//            $i += $limit;
//        }
    }

    private function getType($data = null) {
        $type = null;
        if($data[0]) {
            if($data[0]['game_id'] == 446) {
                $typeGame = [];
                if(isset($data[0]['game_config']['type_game'])) {
                    $typeGame = $data[0]['game_config']['type_game'];
                }
                if(is_array($typeGame)){
                    if(in_array("video", $typeGame)) {
                        $type = ObjectInPage::TYPE_IMG_002_VIDEO;
                    } else if(in_array('audio', $typeGame)) {
                        $type = ObjectInPage::TYPE_IMG_002_AUDIO;
                    } else {
                        $type = ObjectInPage::TYPE_IMG_002_IMAGE_TEXT;
                    }
                } else {
                    $type = ObjectInPage::TYPE_IMG_002_IMAGE_TEXT;
                }
            } else {
                $type = ObjectInPage::TYPE_GAME;
            }
        }
        return $type;
    }

    private function updateStatusForPage() {
//        $data = [
//            [
//                'book_id'                       => 80,
//                'hidden_greater_ids'            => 10,
//            ],
//            [
//                'book_id'                       => 87,
//                'hidden_greater_ids'            => 10,
//            ],
//            [
//                'book_id'                       => 88,
//                'hidden_greater_ids'            => 16,
//            ],
//            [
//                'book_id'                       => 90,
//                'hidden_greater_ids'            => 18,
//            ],
//            [
//                'book_id'                       => 91,
//                'hidden_greater_ids'            => 23,
//            ],
//            [
//                'book_id'                       => 92,
//                'hidden_greater_ids'            => 24,
//            ],
//            [
//                'book_id'                       => 93,
//                'hidden_greater_ids'            => 12,
//            ],
//            [
//                'book_id'                       => 81,
//                'hidden_greater_ids'            => 12,
//            ],
//            [
//                'book_id'                       => 89,
//                'hidden_greater_ids'            => 14,
//            ],
//            [
//                'book_id'                       => 103,
//                'hidden_greater_ids'            => 13,
//            ],
//            [
//                'book_id'                       => 104,
//                'hidden_greater_ids'            => 16,
//            ],
//            [
//                'book_id'                       => 105,
//                'hidden_greater_ids'            => 12,
//            ],
//            [
//                'book_id'                       => 107,
//                'hidden_greater_ids'            => 20,
//            ],
//            [
//                'book_id'                       => 108,
//                'hidden_greater_ids'            => 24,
//            ],
//            [
//                'book_id'                       => 109,
//                'hidden_greater_ids'            => 15,
//            ],
//            [
//                'book_id'                       => 82,
//                'hidden_greater_ids'            => 19,
//            ],
//            [
//                'book_id'                       => 84,
//                'hidden_greater_ids'            => 19,
//            ],
//            [
//                'book_id'                       => 85,
//                'hidden_greater_ids'            => 15,
//            ],
//            [
//                'book_id'                       => 96,
//                'hidden_greater_ids'            => 11,
//            ],
//            [
//                'book_id'                       => 98,
//                'hidden_greater_ids'            => 18,
//            ],
//            [
//                'book_id'                       => 99,
//                'hidden_greater_ids'            => 14,
//            ],
//            [
//                'book_id'                       => 101,
//                'hidden_greater_ids'            => 13,
//            ],
//            [
//                'book_id'                       => 102,
//                'hidden_greater_ids'            => 19,
//            ],
//        ];

//        $data = [
//            [
//                'book_id'                       => 106,
//                'hidden_greater_ids'            => 13,
//            ]
//        ];

//        $data = [
//            [
//                'book_id'                       => 110,
//                'hidden_greater_ids'            => 29,
//            ],
//            [
//                'book_id'                       => 111,
//                'hidden_greater_ids'            => 51,
//            ],
//            [
//                'book_id'                       => 112,
//                'hidden_greater_ids'            => 52,
//            ]
//        ];
        $data = [
            [
                'book_id'                       => 65,
                'hidden_greater_ids'            => 76,
            ]
        ];

        foreach($data as $index => $item) {
            $list_page = $this->pageRepository->getPageWithCondition($item['book_id'], $item['hidden_greater_ids']);
            foreach ($list_page as $indexChild => $page) {
                echo $index . "|" . $item['book_id'] . "|" . $page['id'] . "\n";
                $page->status = 0;
                $page->save();
            }
        }

//        $data = [
//            [
//                'book_id'                   => 86,
//                'x1'                        => 11,
//                'y1'                        => 49,
//                'hidden_greater_ids'        => 52
//            ],
//            [
//                'book_id'                   => 95,
//                'x1'                        => 21,
//                'y1'                        => 105,
//                'hidden_greater_ids'        => 107
//            ],
//
//        ];
//
//        foreach($data as $index => $item) {
//            $list_page = $this->pageRepository->getPageWithCondition($item['book_id'], $item['hidden_greater_ids']);
//            foreach ($list_page as $indexChild => $page) {
//                echo $index . "|" . $item['book_id'] . "|" . $page['id'] . "\n";
//                $page->status = 0;
//                $page->save();
//            }
//
//            $list_page_2 = $this->pageRepository->getPageWithCondition2($item['book_id'], $item['x1'], $item['y1']);
//            foreach ($list_page_2 as $indexChild => $page) {
//                echo $index . "|" . $item['book_id'] . "|" . $page['id'] . "\n";
//                $page->status = 0;
//                $page->save();
//            }
//
//        }

    }

    private function updateDocument($bookId, $gradeId, $type){
        $pathFolder = storage_path("document");
        $files = scandir($pathFolder);
        $i = 0;

        foreach($files as $index => $file) {
            if ($file == "." || $file == "..") {
                continue;
            }
            $filename   = explode(".", $file)[0];
            $extension  = explode(".", $file)[1];
//            $title      = explode("_", $filename)[0];
            if($type == BookDocument::BOOK_DOCUMENT_PDF || $type == BookDocument::BOOK_DOCUMENT_POWERPOINT
                || $type == BookDocument::PDF_ENGLISH_COURSEWARE || $type == BookDocument::POWERPOINT_ENGLISH_COURSEWARE
                || $type == BookDocument::BOOK_DOCUMENT_POWERPOINT_TEACHER || $type == BookDocument::ZIP_ENGLISH_COURSEWARE){
                $statusDocument = $this->mediaConnectService->uploadFile($pathFolder . "/" . $file, 'E_Learning/document', "document", str_slug($filename) . "." . $extension);
                $statusThumb = $this->mediaConnectService->uploadFile(storage_path("thumb") . "/" . $filename . ".png", 'E_Learning/thumb', "document", str_slug($filename) . ".png");

                dd($statusThumb);
                if ($statusDocument['status'] == "success" && $statusThumb['status'] == "success") {
                    $data = [
                        'book_id'           => !empty($bookId) ? $bookId : null,
                        'grade_id'          => !empty($gradeId) ? $gradeId : null,
                        'type_document'     => $type,
                        'url'               => 'E_Learning/document/' . str_slug($filename) . "." . $extension,
                        'title'             => $filename,
                        'thumb'             => 'E_Learning/thumb/' . str_slug($filename) . ".png",
                        'time_created'      => time(),
                        'time_updated'      => time(),
                    ];
                }
            } else {
                $statusDocument = $this->mediaConnectService->uploadFile($pathFolder . "/" . $file, 'E_Learning/document', "document", str_slug($filename) . "." . $extension);
                if ($statusDocument['status'] == "success") {
                    $data = [
                        'book_id'           => !empty($bookId) ? $bookId : null,
                        'grade_id'          => !empty($gradeId) ? $gradeId : null,
                        'type_document'     => $type,
                        'url'               => 'E_Learning/document/' . str_slug($filename) . "." . $extension,
                        'title'             => $filename,
                        'time_created'      => time(),
                        'time_updated'      => time(),
                    ];
                }
            }

            $this->bookDocumentRepository->create($data);
        }
    }
}
