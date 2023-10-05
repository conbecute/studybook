<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableLicenceHasBook extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('edu_lms')->create('licence_has_book', function (Blueprint $table) {
            $table->increments('id');
            $table->string('licence_id');
            $table->string('book_id');
            $table->integer('time_created');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('edu_lms')->dropIfExists('licence_has_book');
    }
}
