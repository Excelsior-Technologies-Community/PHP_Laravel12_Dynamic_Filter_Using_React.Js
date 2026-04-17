<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
public function run(): void
{
    //  Active products (bulk insert - fast)
    Product::insert([

        ['name'=>'Laptop','category'=>'Electronics','price'=>50000,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'Mobile','category'=>'Electronics','price'=>20000,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'TV','category'=>'Electronics','price'=>40000,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'Headphones','category'=>'Electronics','price'=>3000,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'Speaker','category'=>'Electronics','price'=>4500,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'Camera','category'=>'Electronics','price'=>35000,'status'=>'active','created_at'=>now(),'updated_at'=>now()],

        ['name'=>'Shirt','category'=>'Clothing','price'=>1500,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'Jeans','category'=>'Clothing','price'=>2500,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'Jacket','category'=>'Clothing','price'=>5000,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'T-Shirt','category'=>'Clothing','price'=>1200,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'Sweater','category'=>'Clothing','price'=>2200,'status'=>'active','created_at'=>now(),'updated_at'=>now()],

        ['name'=>'Shoes','category'=>'Footwear','price'=>3000,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'Sandals','category'=>'Footwear','price'=>1200,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'Sneakers','category'=>'Footwear','price'=>3500,'status'=>'active','created_at'=>now(),'updated_at'=>now()],

        ['name'=>'Watch','category'=>'Accessories','price'=>7000,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'Sunglasses','category'=>'Accessories','price'=>2500,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
        ['name'=>'Wallet','category'=>'Accessories','price'=>1500,'status'=>'active','created_at'=>now(),'updated_at'=>now()],
    ]);

    //  Deleted products (safe way using create)
    Product::create([
        'name' => 'Old Laptop',
        'category' => 'Electronics',
        'price' => 10000,
        'status' => 'deleted',
        'deleted_at' => now(),
    ]);

    Product::create([
        'name' => 'Old Shirt',
        'category' => 'Clothing',
        'price' => 800,
        'status' => 'deleted',
        'deleted_at' => now(),
    ]);
}
}