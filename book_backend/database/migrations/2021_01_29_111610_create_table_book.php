<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableBookDetail extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('edu_lms')->create('book', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('grade_id');
            $table->integer('book_type_id');
            $table->string('title');
            $table->string('link_html');
            $table->integer('order');
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
        Schema::connection('edu_lms')->dropIfExists('book');
    }
}
