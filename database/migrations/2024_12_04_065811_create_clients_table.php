<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id(); 
            $table->string('company_name'); 
            $table->string('company_logo')->nullable(); 
            $table->string('email')->unique(); 
            $table->string('mobile', 15)->nullable(); 
            $table->boolean('is_superadmin')->default(false); 
            $table->boolean('is_subscribed')->default(false); 
            $table->text('primary_address'); 
            $table->unsignedBigInteger('timezone_id')->nullable(); 
            $table->timestamps(); 
            $table->softDeletes(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
