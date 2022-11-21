<!-- Navbar-->

<!DOCTYPE html>

<head>
    <meta charset="utf-8" />
    <title>Freshly deliver</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta name="description" content="TRY IT" />
    <meta name="keywords" content="TRY IT" />
    <meta name="author" content="" />
    <meta name="MobileOptimized" content="320" />
    <!--Template style -->

    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="stylesheet" href="assets/css/bootstrap5.css">
</head>

<body>

    <header class="header">
        <nav class="navbar navbar-expand-lg fixed-top py-3">
            <div class="container"><a href="#" class="navbar-brand text-uppercase font-weight-bold">Transparent Nav</a>
                <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggler navbar-toggler-right"><i class="fa fa-bars"></i></button>

                <div id="navbarSupportedContent" class="collapse navbar-collapse">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active"><a href="#" class="nav-link text-uppercase font-weight-bold">Home
                                <span class="sr-only">(current)</span></a></li>
                        <li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">About</a></li>
                        <li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">Gallery</a>
                        </li>
                        <li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">Portfolio</a>
                        </li>
                        <li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <script src="assets/js/jquery.min.js"></script>

    <script>
        $(function () {
            $(window).on('scroll', function () {
                if ($(window).scrollTop() > 10) {
                    $('.navbar').addClass('active');
                } else {
                    $('.navbar').removeClass('active');
                }
            });
        });
    </script>