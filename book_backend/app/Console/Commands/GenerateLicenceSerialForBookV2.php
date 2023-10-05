<?php


namespace App\Console\Commands;

use App\Repositories\Lms\BookRepository;
use App\Repositories\Lms\LicenceRepository;
use Illuminate\Console\Command;

class GenerateLicenceSerialForBookV2 extends Command
{
    protected $signature = "generateLicenceSerialForBookV2:GenerateLicenceSerialForBookV2 {number} {bookId}";

    protected $description = "generate licence serial for book";

    private $bookRepository;
    private $licenceRepository;

    public function handle(
        BookRepository $bookRepository,
        LicenceRepository $licenceRepository
    ) {

        $this->bookRepository = $bookRepository;
        $this->licenceRepository = $licenceRepository;

        $number = $this->argument('number');
        $bookId = $this->argument('bookId');


        for ($j = 1; $j <= $number; $j ++) {

            $arrayInsert = [];
            for($i = 1; $i <= 100; $i++) {
                echo "check ".$i.PHP_EOL;
                $licence = $this->generateLicence();
                $serial = $this->generateSerial();
                $dataInsertItem = [
                    'serial' => $serial,
                    'licence' => $licence,
                    'book_id' => $bookId,
                    'time_created' => time(),
                    'time_updated' => time()
                ];
                array_push($arrayInsert, $dataInsertItem);
            }

            echo "insert dome ".$j.PHP_EOL;
            $this->licenceRepository->insert($arrayInsert);
        }


        echo "done";

    }

    private function generateLicence()
    {
        $licence = $this->generateRandom(4).'-'.$this->generateRandom(4).'-'.$this->generateRandom(4);
        $checkExitsLicence = $this->licenceRepository->getInfo($licence);
        if ($checkExitsLicence) {
            return $this->generateLicence();
        }
        return $licence;
    }

    private function generateSerial()
    {
        $serial = substr(date("Y"), 2, 2) . '-' . $this->generateRandom(10);
        $checkExitsSerial = $this->licenceRepository->getInfo('', $serial);
        if ($checkExitsSerial) {
            return $this->generateSerial();
        }
        return $serial;
    }

    private function generateRandom($length)
    {
        $characters = 'ABCDEGHKMNPQRSTUVXY23456789';

        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }


}
