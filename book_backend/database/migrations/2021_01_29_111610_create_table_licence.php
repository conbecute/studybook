<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableLicence extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('edu_lms')->create('licence', function (Blueprint $table) {
            $table->increments('id');
            $table->string('serial');
            $table->string('licence');
            $table->string('book_id');
            $table->integer('status')->default(0);
            $table->integer('time_created');
            $table->integer('time_updated');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('edu_lms')->dropIfExists('licence');
    }
}
