<?php

use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//         $this->call(ProvinceSeeder::class);
//         $this->call(GradeProvinceSeeder::class);
//         $this->call(BookDocumentSeeder::class);
        $this->call(PageDataSeeder::class);
    }
}
