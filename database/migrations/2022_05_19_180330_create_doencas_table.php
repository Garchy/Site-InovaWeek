<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        # Lembrete: alterar para table suspeitas
        Schema::create('doencas', function (Blueprint $table) {
            $table->id();
            $table->string('nome_doenca');
            $table->text('diagnostico');
            $table->text('sintomas');
            $table->text('tratamento');
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
        Schema::dropIfExists('doencas');
    }
};
