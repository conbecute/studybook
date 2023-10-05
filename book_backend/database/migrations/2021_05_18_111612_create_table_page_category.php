<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePageIndexCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('edu_lms')->create('page_index_category', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('page_index');
            $table->integer('category_id');
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
        Schema::connection('edu_lms')->dropIfExists('page_index_category');
    }
}
