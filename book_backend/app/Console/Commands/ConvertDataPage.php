<?php


namespace App\Console\Commands;

use App\Repositories\Lms\PageRepository;
use Illuminate\Console\Command;

class ConvertDataPage extends Command
{
    protected $signature = "convertData:convertData";

    protected $description = "Convert data";

    private $pageRepository;

    public function handle(
        PageRepository $pageRepository
    ) {

        $this->pageRepository = $pageRepository;
        $pageInfo = $this->pageRepository->getPageByBookId(108)->toArray();

        $i = 0;
       foreach($pageInfo as $page) {
           $i ++;
           echo $i.PHP_EOL;
           $dataInsert = [
               "book_id" => 45,
               "index" => $page["index"],
               "background" => $page["background"],
               "status" => $page["status"],
               "time_created" => $page["time_created"],
               "time_updated" => $page["time_updated"]
           ];
           $this->pageRepository->create($dataInsert);
       }

        echo "done";
    }


}
