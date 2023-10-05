<?php

namespace App\Console;

use App\Console\Commands\ConvertDataPage;
use App\Console\Commands\ConvertTouchVector;
use App\Console\Commands\GenerateLicenceSerialForBook;
use App\Console\Commands\GenerateLicenceSerialForBookV2;
use App\Console\Commands\GenerateLicenceSerialForBookV3;
use App\Console\Commands\GetInfoImage;
use App\Console\Commands\ConvertWorkSheet;

use Illuminate\Console\Scheduling\Schedule;
use Laravel\Lumen\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
        GenerateLicenceSerialForBook::class,
        GenerateLicenceSerialForBookV2::class,
        GenerateLicenceSerialForBookV3::class,
        ConvertTouchVector::class,
        ConvertDataPage::class,
        GetInfoImage::class,
        ConvertWorkSheet::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        //
    }
}
