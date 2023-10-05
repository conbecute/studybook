<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableUserSchool extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('edu_lms')->create('user_school', function (Blueprint $table) {
            $table->integer('user_id');
            $table->integer('school_id')->nullable();
            $table->integer('gender_id')->nullable();
            $table->string('full_name')->nullable();
            $table->integer('province_id')->nullable();
            $table->integer('district_id')->nullable();
            $table->integer('ward_id')->nullable();
            $table->integer('grade_id')->nullable();
            $table->integer('job_id')->nullable();
            $table->integer('birth_day')->nullable();
            $table->integer('notification')->default(1);
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
        Schema::connection('edu_lms')->dropIfExists('user_school');
    }
}
