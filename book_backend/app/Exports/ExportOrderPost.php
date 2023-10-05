<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ExportOrderPost implements FromCollection, WithHeadings, ShouldAutoSize
{
    private $listDataExport;

    public function __construct($listDataExport)
    {
        $this->listDataExport = $listDataExport;
    }

    public function collection()
    {
        return (collect($this->listDataExport));
    }

    public function headings(): array
    {
        $i = 0;
        foreach ($this->listDataExport as $key => $value) {
            if($i == 0) {
                $heading = array_keys($value);
            }
            $i++;
        }
        return $heading;
    }
}