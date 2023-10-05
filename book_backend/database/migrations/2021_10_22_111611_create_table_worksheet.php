<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableWorksheet extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('edu_lms')->create('worksheet', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('book_id')->default(null);
            $table->integer('grade_id')->default(null);
            $table->integer('type_document')->nullable(false);
            $table->string('url')->nullable(true);
            $table->string('title')->nullable(true);
            $table->string('thumb')->nullable(true);
            $table->integer('status')->default(1);
            $table->integer('is_free')->default(1);
            $table->integer('time_created');
            $table->integer('time_updated');
            $table->integer('category')->nullable(true)->default(null);
            $table->integer('subject_id')->nullable(true)->default(null);
            $table->string('published_date')->nullable(true)->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('edu_lms')->dropIfExists('worksheet');
    }
}
