<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Show all products
   public function index()
{
    $products = Product::withTrashed()->get(); // Fetch all products, including soft-deleted
    return view('products.index', compact('products'));
}

}
