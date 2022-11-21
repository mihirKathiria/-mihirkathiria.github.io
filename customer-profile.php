<!doctype html>
<html lang="en">

<head>
    <title>Freshly Deliver - Profile</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/bootstrap4.min.css">
    <link rel="stylesheet" href="assets/css/customer-profile.css">

    <style>
        .panels {
            color: white !important;
            background: #7F54E9 !important;
        }

        .panels:hover,
        .panels:focus {
            color: white !important;
            background: #f8b739 !important;
        }

        .btn.btn-primary:hover,
        .btn.btn-primary:focus {
            background: #f8b739 !important;
            border-color: #f8b739 !important;
        }
    </style>
</head>

<body>

    <div class="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
            <div class="p-4 pt-5">
                <a href="#" class="img logo rounded-circle mb-5" style="background-image: url(assets/images/header/logo.png);"></a>
                <ul class="list-unstyled components mb-5">
                    <li>
                        <a href="#" class="panels" id="addressPanel" onclick="showAddressPanel()">Address</a>
                    </li>
                    <li>
                        <a href="#" class="panels">Portfolio</a>
                    </li>
                    <li>
                        <a href="#" class="panels">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Page Content  -->
        <div id="content" class="p-4 p-md-5">

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <button type="button" id="sidebarCollapse" class="btn btn-primary">
                        <i class="fa fa-bars"></i>
                        <span class="sr-only">Toggle Menu</span>
                    </button>
                    <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fa fa-bars"></i>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav navbar-nav ml-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <!-- FOR DIFFERENT OPTIONS -->
            <div id="showPanels">

                <!-- FOR SHOWING DIFFERENT PANELs -->

            </div>

        </div>

    </div>

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/popper.js"></script>
    <script src="assets/js/bootstrap4.min.js"></script>
    <script src="assets/js/customer-profile.js"></script>

</body>

</html>