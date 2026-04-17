<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dynamic Product Filter</title>

  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

  <!-- Vite React Refresh & App -->
  @viteReactRefresh
  @vite('resources/js/app.jsx')

  <style>
    body {
      font-family: 'Roboto', sans-serif;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #74ebd5, #acb6e5);
      margin: 0;
      padding: 20px;
    }

    #product-filter {
      width: 100%;
      max-width: 1000px;
      background: #fff;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
      font-weight: 700;
      font-size: 2rem;
      color: #333;
    }

    @media (max-width: 576px) {
      #product-filter {
        padding: 25px;
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