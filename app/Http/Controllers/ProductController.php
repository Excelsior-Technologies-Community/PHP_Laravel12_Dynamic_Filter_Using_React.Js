<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::withTrashed()->orderBy('id', 'desc')->get();
        return view('products.index', compact('products'));
    }

    public function search(Request $request)
    {
        $query = $request->get('query');
        $results = Product::where('name', 'LIKE', "%{$query}%")
            ->limit(5)
            ->get();

        return response()->json($results);
    }

    public function restore($id)
    {
        $product = Product::withTrashed()->findOrFail($id);
        $product->restore();
        $product->update(['status' => 'active']);

        return response()->json(['success' => true]);
    }

    public function forceDelete($id)
    {
        $product = Product::withTrashed()->findOrFail($id);
        $product->forceDelete();

        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->update(['status' => 'deleted']);
        $product->delete();

        return response()->json(['success' => true]);
    }
}