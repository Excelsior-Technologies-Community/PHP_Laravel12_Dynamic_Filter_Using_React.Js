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
