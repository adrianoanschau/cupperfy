<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 32)->nullable();
            $table->smallInteger('order');
            $table->uuid('tournament_id');
            $table->foreign('tournament_id')
                  ->references('id')->on('tournaments');
            $table->unique(['order', 'tournament_id']);
            $table->smallInteger('groups')->nullable();
            $table->smallInteger('participants')->nullable();
            $table->smallInteger('turns')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stages');
    }
}
