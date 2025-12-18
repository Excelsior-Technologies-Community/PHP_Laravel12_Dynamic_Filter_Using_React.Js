# PHP_Laravel12_Dynamic_Filter_Using_React.js
Project Example
---
We will build a Product Filter System where users can filter products by:

Category

Price Range

Search Keyword

Filtering happens dynamically without page refresh using React + Axios.

Technologies Used
---
PHP 8+

Laravel 12

MySQL

React.js

Axios

Bootstrap 5


# Project Setup
---
## STEP 1: Create Laravel 12 Project
```
composer create-project laravel/laravel PHP_Laravel12_Dynamic_Filter_Using_React.Js "12.*"
```

Go inside project:
```
cd PHP_Laravel12_Dynamic_Filter_Using_React.Js
```


## Step 2: Setup Database (.env)

Open .env
```
DB_DATABASE=dynamic_filter
DB_USERNAME=root
DB_PASSWORD=
```

Create database manually in phpMyAdmin:
```
dynamic_filter

```

## Step 3: Create Migration (Products Table)

Command:
```
php artisan make:migration create_products_table
```

Open file:

database/migrations/xxxx_xx_xx_create_products_table.php
```
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
```

Run migration:
```
php artisan migrate
```

## Step 4: Create Product Model

Command:
```
php artisan make:model Product
```

Open app/Models/Product.php

```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'category',
        'price',
        'status'
    ];
}
```

## Step 5: Insert Data Manually (NO Seeder)

Use phpMyAdmin → products table
```

INSERT INTO products (name, category, price, status, created_at, updated_at)
VALUES
('Laptop', 'Electronics', 50000, 'active', NOW(), NOW()),
('Mobile', 'Electronics', 20000, 'active', NOW(), NOW()),
('Shirt', 'Clothing', 1500, 'active', NOW(), NOW()),
('Jeans', 'Clothing', 2500, 'active', NOW(), NOW()),
('TV', 'Electronics', 40000, 'active', NOW(), NOW());
```

IMPORTANT NOTES 

NOW() fills Laravel timestamps
status = active → product will show
deleted_at stays NULL (not deleted)
Soft delete works later


If You Want to Insert a Deleted Product (Test)
```
INSERT INTO products (name, category, price, status, deleted_at, created_at, updated_at)
VALUES
('Old TV', 'Electronics', 10000, 'deleted', NOW(), NOW(), NOW());

```
 This product will NOT show in your list.




## Step 6: Create Controller (WEB Controller)

Command:
```
php artisan make:controller ProductController
```

Open app/Http/Controllers/ProductController.php
```
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
```

## Step 7: Web Routes 

Open routes/web.php

```
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/products', [ProductController::class, 'index']);
```

## Step 8: Install React (Laravel + React)

Run:
```

npm install
npm install @vitejs/plugin-react --save-dev
npm install react react-dom

```
Edit vite.config.js:
```
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
        }),
        react(),
    ],
});

```

## Step 9: Setup React Entry File

Open resources/js/app.jsx
```
import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductFilter from './Components/ProductFilter';

const container = document.getElementById('product-filter');
const products = JSON.parse(container.dataset.products);

createRoot(container).render(<ProductFilter products={products} />);
```

## Step 10: Create React Component

Create file:

resources/js/components/ProductFilter.jsx
```

import React, { useState } from 'react';

export default function ProductFilter({ products }) {
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Filter products based on category, status, and max price
    const filteredProducts = products.filter(product => {
        return (
            (category === '' || product.category === category) &&
            (status === '' || product.status === status) &&
            (maxPrice === '' || product.price <= maxPrice)
        );
    });

    // Get unique categories for dropdown
    const categories = [...new Set(products.map(p => p.category))];

    // Define status options manually to always show both
    const statuses = ['active', 'deleted'];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Product Filter</h1>

            <div className="flex gap-4 mb-4">
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="">All Status</option>
                    {statuses.map(st => (
                        <option key={st} value={st}>{st}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                />
            </div>

            <table className="border-collapse border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-2">Name</th>
                        <th className="border border-gray-300 px-2">Category</th>
                        <th className="border border-gray-300 px-2">Price</th>
                        <th className="border border-gray-300 px-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td className="border border-gray-300 px-2">{product.name}</td>
                            <td className="border border-gray-300 px-2">{product.category}</td>
                            <td className="border border-gray-300 px-2">{product.price}</td>
                            <td className="border border-gray-300 px-2">{product.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

```
React only handles UI & filter logic, Laravel handles data



## Step 11: Blade View

Create file:

resources/views/products/index.blade.php

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Product Filter</title>

    <!-- Vite React Refresh for HMR -->
    @viteReactRefresh
    @vite('resources/js/app.jsx')

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

    <style>
        body {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(to right, #74ebd5, #acb6e5);
            font-family: 'Roboto', sans-serif;
            margin: 0;
        }

        #product-filter {
            width: 100%;
            max-width: 950px;
            background: #fff;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 12px 30px rgba(0,0,0,0.2);
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 2rem;
            font-weight: 700;
        }

        .filter-section {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 30px;
            justify-content: center;
        }

        .filter-section select,
        .filter-section input {
            padding: 8px 12px;
            border-radius: 8px;
            border: 1px solid #ccc;
            font-size: 0.95rem;
        }

        /* Product Table */
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.95rem;
        }

        table th, table td {
            padding: 12px 15px;
            text-align: center;
        }

        table thead {
            background: linear-gradient(90deg, #6a11cb, #2575fc);
            color: #fff;
            font-weight: 600;
        }

        table tbody tr {
            background: #f7f7f7;
            transition: transform 0.2s, box-shadow 0.2s;
            border-radius: 8px;
        }

        table tbody tr:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(0,0,0,0.15);
        }

        table tbody tr td {
            border-bottom: 1px solid #e0e0e0;
        }

        @media (max-width: 576px) {
            #product-filter {
                padding: 25px;
            }

            .filter-section {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>

    <!-- React Mount Point -->
    <div id="product-filter" data-products='@json($products)'></div>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
```

## Step 12: Compile Assets

Run:
```
npm run dev
```
Run Laravel:
```
php artisan serve
```

Open browser:
```
http://127.0.0.1:8000/products
```

So You can see this type Output:
---
Main Page:

<img width="1919" height="961" alt="Screenshot 2025-12-18 123923" src="https://github.com/user-attachments/assets/29f4228a-3b47-46a3-be84-605fb5a919ab" />

## Select Any Category:

Select Electronics:

<img width="1914" height="961" alt="Screenshot 2025-12-18 122449" src="https://github.com/user-attachments/assets/ca04f04c-1a8f-4f82-8bfb-b9112fd80247" />

Selct Clothing:

<img width="1919" height="964" alt="Screenshot 2025-12-18 122500" src="https://github.com/user-attachments/assets/2acc6411-e724-49c9-a8e0-cca2b0d1ad1f" />

Select Active:

<img width="1914" height="971" alt="Screenshot 2025-12-18 122525" src="https://github.com/user-attachments/assets/14a46bcb-2637-4c3d-8549-1ba129376f00" />

Select Deleted:

<img width="1912" height="954" alt="Screenshot 2025-12-18 122534" src="https://github.com/user-attachments/assets/3e581dcb-c072-46e9-b89e-648a6d91fea1" />

Search Price:

<img width="1911" height="959" alt="Screenshot 2025-12-18 122623" src="https://github.com/user-attachments/assets/98559f5e-eff7-474d-a6c1-7d24494dd193" />



## Project Folder Structure:

```
PHP_Laravel12_Dynamic_Filter_Using_React.js/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── ProductController.php        # Your main controller
│   └── Models/
│       └── Product.php                      # Eloquent model
├── bootstrap/
├── config/
├── database/
│   ├── migrations/
│   │   └── xxxx_xx_xx_create_products_table.php
│   └── seeders/                             # Not used in your project
├── node_modules/
├── public/
│   └── index.php
├── resources/
│   ├── js/
│   │   ├── app.jsx                          # React entry point
│   │   └── components/
│   │       └── ProductFilter.jsx            # React component
│   └── views/
│       └── products/
│           └── index.blade.php              # Blade view with React mount point
├── routes/
│   └── web.php                              # Routes
├── storage/
├── tests/
├── vite.config.js                            # Vite config for React
├── package.json
├── composer.json
├── .env                                      # Database config
└── README.md                                 # Your documentation

