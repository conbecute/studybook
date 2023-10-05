<?php

use Illuminate\Database\Seeder;
use App\Repositories\Lms\PageRepository;
use App\Services\ServiceConnect\MediaConnectService;

class PageDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $pageRepository;
    private $mediaConnectService;

    public function __construct(
        PageRepository  $pageRepository,
        MediaConnectService $mediaConnectService
    )
    {
        $this->pageRepository               = $pageRepository;
        $this->mediaConnectService          = $mediaConnectService;
    }
    public function run()
    {
        $this->upZip();
        echo("done");
    }

    private function updateStatusForPage() {
        $data = [
            [
                'book_id'                       => 112,
                'hidden_greater_ids'            => 52,
            ]
        ];

        foreach($data as $index => $item) {
            $list_page = $this->pageRepository->getPageByBookId($item['book_id']);
            foreach ($list_page as $indexChild => $page) {
                echo $index . "|" . $item['book_id'] . "|" . $page['id'] . "\n";
                $page->status = 1;
                $page->save();
            }
        }

        foreach($data as $index => $item) {
            $list_page = $this->pageRepository->getPageWithCondition($item['book_id'], $item['hidden_greater_ids']);
            foreach ($list_page as $indexChild => $page) {
                echo $index . "|" . $item['book_id'] . "|" . $page['id'] . "\n";
                $page->status = 0;
                $page->save();
            }
        }

        $data = [
            [
                'book_id'                   => 78,
                'x1'                        => 51,
                'y1'                        => 128,
                'hidden_greater_ids'        => 130
            ]
        ];

        foreach($data as $index => $item) {
            $list_page = $this->pageRepository->getPageByBookId($item['book_id']);
            foreach ($list_page as $indexChild => $page) {
                echo $index . "|" . $item['book_id'] . "|" . $page['id'] . "\n";
                $page->status = 1;
                $page->save();
            }
        }

        foreach($data as $index => $item) {
            $list_page = $this->pageRepository->getPageWithCondition($item['book_id'], $item['hidden_greater_ids']);
            foreach ($list_page as $indexChild => $page) {
                echo $index . "|" . $item['book_id'] . "|" . $page['id'] . "\n";
                $page->status = 0;
                $page->save();
            }

            $list_page_2 = $this->pageRepository->getPageWithCondition2($item['book_id'], $item['x1'], $item['y1']);
            foreach ($list_page_2 as $indexChild => $page) {
                echo $index . "|" . $item['book_id'] . "|" . $page['id'] . "\n";
                $page->status = 0;
                $page->save();
            }
        }
    }

    private function insertPage(){
        $data = [
            [
                'id_old' => 78,
                'id_new' => 111,
            ]
        ];

        foreach($data as $index => $item) {
            echo $index . "|" . $item['id_old'] . "|" . $item['id_new'] . "\n";
            $pages = $this->pageRepository->getPages($item['id_new'])->toArray();
            $result = $this->pageRepository->deleteByOneField('book_id', $item['id_old']);
            echo $result . "\n";
            foreach($pages as $page){
                $data = [
                    'book_id' => $item['id_old'],
                    'index' => $page['index'],
                    'background' => $page['background'],
                    'status' => $page['status'],
                    'time_created' => time(),
                    'time_updated' => time()
                ];
                $this->pageRepository->create($data);
            }
        }
    }

    public function upZip() {
        $bookId = 124;
        $pathFolder = storage_path("book");
        $files = scandir($pathFolder);
        $i = 0;

        foreach ($files as $file) {
            if ($file == "." || $file == "..") {
                continue;
            }
            $statusUpload = $this->mediaConnectService->uploadFile($pathFolder . "/" . $file, 'E_Learning/page', "page of book", $file, false, '', env('TOKEN_TO_SERVER'));

            if ($statusUpload['status'] == "success") {
                $index = explode("_", $file)[0];
                if (is_numeric($index)) {
                    $index = (int)$index;
                    $page = $this->pageRepository->getPage($bookId, $index + 1);
                    if ($page) {
                        $dataUpdatePage = [
                            'background' => 'E_Learning/page/' . $file,
                            'time_updated' => time(),
                        ];
                        $this->pageRepository->update($page->id, $dataUpdatePage);
                    } else {
                        $dataCreatePage = [
                            'book_id' => $bookId,
                            'index' => $index + 1,
                            'background' => 'E_Learning/page/' . $file,
                            'time_created' => time(),
                            'time_updated' => time(),
                        ];
                        $this->pageRepository->create($dataCreatePage);
                    }
                }
            }
            unlink($pathFolder . "/" . $file);
            $i++;
        }
    }
}
