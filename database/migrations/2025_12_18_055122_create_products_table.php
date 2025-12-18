<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();                 // primary key
            $table->string('name');       // product name
            $table->string('category');   // product category
            $table->integer('price');     // product price

            // active = show product
            // deleted = hide product
            $table->enum('status', ['active', 'deleted'])
                  ->default('active');

            $table->softDeletes();        // deleted_at column
            $table->timestamps();         // created_at & updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
