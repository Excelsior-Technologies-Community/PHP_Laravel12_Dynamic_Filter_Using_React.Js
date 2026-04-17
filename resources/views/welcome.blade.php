<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Laravel</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            height: 100vh;
            background: #0b0b0b;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #e5e7eb;
        }

        .wrapper {
            width: 900px;
            height: 360px;
            background: #141414;
            border-radius: 14px;
            display: flex;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.6);
        }

        /* LEFT SIDE */
        .left {
            flex: 1;
            padding: 40px;
        }

        .left h2 {
            margin: 0 0 10px;
            font-size: 20px;
            font-weight: 600;
        }

        .left p {
            font-size: 14px;
            color: #9ca3af;
            line-height: 1.6;
        }

        .links {
            margin-top: 20px;
        }

        .links a {
            display: block;
            margin-bottom: 12px;
            color: #f97316;
            font-size: 14px;
            text-decoration: none;
        }

        .links a span {
            margin-left: 6px;
        }

        .btn {
            margin-top: 20px;
            display: inline-block;
            padding: 8px 16px;
            background: #f3f4f6;
            color: #000;
            border-radius: 6px;
            font-size: 14px;
            text-decoration: none;
        }

        /* RIGHT SIDE */
        .right {
            flex: 1;
            background: linear-gradient(135deg, #7c0000, #ff2d20);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .right h1 {
            font-size: 120px;
            font-weight: 800;
            color: rgba(255,255,255,0.15);
            letter-spacing: -6px;
        }

        /* abstract lines */
        .right::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
                repeating-linear-gradient(
                    45deg,
                    rgba(255,255,255,0.15) 0,
                    rgba(255,255,255,0.15) 1px,
                    transparent 1px,
                    transparent 24px
                );
            opacity: 0.3;
        }
    </style>
</head>
<body>

    <div class="wrapper">
        <div class="left">
            <h2>Let’s get started</h2>

            <p>
                Laravel has an incredibly rich ecosystem.
                We suggest starting with the following.
            </p>

            <div class="links">
                <a href="https://laravel.com/docs" target="_blank">
                    Read the Documentation <span>↗</span>
                </a>

                <a href="https://laracasts.com" target="_blank">
                    Watch video tutorials at Laracasts <span>↗</span>
                </a>
            </div>

            <a href="https://laravel.com" class="btn" target="_blank">
                Deploy now
            </a>
        </div>

        <div class="right">
            <h1>Laravel</h1>
        </div>
    </div>

</body>
</html>
