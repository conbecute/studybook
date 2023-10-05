<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;

class DataSupportExport implements FromCollection, WithHeadings, ShouldAutoSize
{

    private $dataExport;

    public function __construct($dataExport)
    {
        $this->dataExport = $dataExport;
    }

    public function collection()
    {
        return (collect($this->dataExport));
    }

    public function headings(): array
    {
        $i = 0;
        foreach ($this->dataExport as $key => $value) {
            if($i == 0) {
                $heading = array_keys($value);
            }
            $i++;
        }
        return $heading;
    }
}
