<!DOCTYPE HTML>
<html>
<head>
    <title>Booking - SD Detail Pro</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="assets/css/main.css" />
</head>
<body class="right-sidebar is-preload">
    <div id="page-wrapper">

        <!-- Header -->
        <section id="header">
            <h1><a href="index.html">SD Detail Pro</a></h1>
            <nav id="nav">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                    <li class="current"><a href="booking.html">Booking</a></li>
                </ul>
            </nav>
        </section>

        <!-- Main -->
        <section id="main">
            <div class="container">
                <div class="row">
                    <div class="col-8 col-12-medium">
                        <section class="box post">
                            <header>
                                <h2>Book an Appointment</h2>
                            </header>
                            <p>Select your desired service, date, and time. Alec will receive an email and text notification of your booking.</p>

                            <form id="booking-form">
                                <div class="row gtr-50 gtr-uniform">
                                    <div class="col-6 col-12-small">
                                        <label for="service">Select Service:</label>
                                        <select name="service" id="service">
                                            <option value="basic">Basic Car Wash</option>
                                            <option value="full">Full Car Detailing</option>
                                        </select>
                                    </div>
                                    <div class="col-6 col-12-small">
                                        <label for="date">Select Date:</label>
                                        <input type="date" name="date" id="date" />
                                    </div>
                                    <div class="col-6 col-12-small">
                                        <label for="time">Select Time:</label>
                                        <input type="time" name="time" id="time" />
                                    </div>
                                    <div class="col-12">
                                        <ul class="actions">
                                            <li><input type="submit" value="Book Appointment" class="primary" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </form>

                        </section>
                    </div>
                    <div class="col-4 col-12-medium">

                        <!-- Sidebar -->
                        <section class="box">
                            <header>
                                <h3>Contact Us</h3>
                            </header>
                            <p>If you have any questions or need to reschedule, please contact us.</p>
                            <footer>
                                <a href="contact.html" class="button alt">Contact Us</a>
                            </footer>
                        </section>

                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <section id="footer">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <section>
                            <p>&copy; 2024 SD Detail Pro. All rights reserved.</p>
                        </section>
                    </div>
                </div>
            </div>
        </section>

    </div>

    <!-- Scripts -->
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/jquery.dropotron.min.js"></script>
    <script src="assets/js/browser.min.js"></script>
    <script src="assets/js/breakpoints.min.js"></script>
    <script src="assets/js/util.js"></script>
    <script src="assets/js/main.js"></script>

</body>
</html>
