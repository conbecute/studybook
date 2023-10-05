<?php


namespace App\Console\Commands;

use App\Repositories\Lms\ObjectRepository;
use Illuminate\Console\Command;

class ConvertTouchVector extends Command
{
    protected $signature = "ConvertTouchVector:convert";

    protected $description = "Convert touch vector";

    private $objectRepository;

    public function handle(
        ObjectRepository $objectRepository
    ) {

        $this->objectRepository = $objectRepository;

        $listObject = $this->objectRepository->getAll()->toArray();

        $i = 1;
        foreach ($listObject as $object) {
            $touchVector = json_decode($object["touch_vector"]);
            $dataUpdateTouchVector = [];
            foreach ($touchVector as $vector) {
                $point = explode(",", $vector);
                array_push($dataUpdateTouchVector, (object)[
                    "x" => (float) number_format($point[0], 2),
                    "y" => (float) number_format($point[1], 2),
                ]);
            }
            $this->objectRepository->update($object['id'], ["touch_vector" => json_encode($dataUpdateTouchVector)]);
            echo $i.PHP_EOL;
            $i ++;
        }

        echo "done";
    }


}
