<?php


namespace App\Console\Commands;

use App\Repositories\Lms\BookRepository;
use App\Repositories\Lms\LicenceRepository;
use Illuminate\Console\Command;

class GenerateLicenceSerialForBookV3 extends Command
{
    protected $signature = "generateLicenceSerialForBookV3:GenerateLicenceSerialForBookV3";

    protected $description = "generate licence serial for book";

    private $bookRepository;
    private $licenceRepository;

    public function handle(
        BookRepository $bookRepository,
        LicenceRepository $licenceRepository
    ) {

        $this->bookRepository = $bookRepository;
        $this->licenceRepository = $licenceRepository;

        $arrayLicence = [];
        $arraySerial = [];

        $dataInsertLicence = [];

        echo time().PHP_EOL;
        $j = 1;
        $z = 0;
        for($i = 1; $i<=17500000; $i++) {
            if ($j > 35) {
                $j =1;
            }
            $licence = $this->generateLicence($arrayLicence);
            $arrayLicence[$licence] = $licence;

            $serial = $this->generateSerial($arraySerial);
            $arraySerial[$serial] = $serial;

            $dataInsertLicence[] = [
                'serial' => $serial,
                'licence' => $licence,
                'book_id' => $j,
                'time_created' => time(),
                'time_updated' => time()
            ];
            $z++;
            $j ++;
            if($z == 1000) {
                echo "__".$i.PHP_EOL;
                $this->licenceRepository->insert($dataInsertLicence);
                $dataInsertLicence = [];
                $z = 0;
            }
        }

        echo "done";
    }

    private function generateLicence($arrayLicence)
    {
        $licence = $this->generateRandom(4).'-'.$this->generateRandom(4).'-'.$this->generateRandom(4);

        if (isset($arrayLicence[$licence])) {
            return $this->generateLicence($arrayLicence);
        }

        return $licence;

    }

    private function generateSerial($arraySerial)
    {
        $serial = substr(date("Y"), 2, 2) . '-' . $this->generateRandom(10);

        if (isset($arrayLicence[$serial])) {
            return $this->generateLicence($arraySerial);
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
