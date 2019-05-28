<!-- <a href="index.php" data-tr="Homepage">Homepage</a>&nbsp;&nbsp;|&nbsp;&nbsp;  
<a href="index.php?page=products_crud&op=list" data-tr="Products">Products</a>&nbsp;&nbsp;|&nbsp;&nbsp;
<a href="index.php?page=services" data-tr="Services">Services</a>&nbsp;&nbsp;|&nbsp;&nbsp;
<a href="index.php?page=controller_likes&op=list" data-tr="Likes">Likes</a>&nbsp;&nbsp;|&nbsp;&nbsp;
<a href="index.php?page=aboutus" data-tr="AboutUs">About Us</a>&nbsp;&nbsp;|&nbsp;&nbsp;
<a href="index.php?page=contactus" data-tr="ContactUs">Contact Us</a> -->

<!-- header -->
<header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a class="navbar-brand" href="index.html">
            <img src="frontend/assets/images/logo4.png" class="logo img-fluid" alt="">Components
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-toggle" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse navbar-toggle " id="navbarNavAltMarkup">
            <ul class="navbar-nav mx-xl-auto">
                <li>
                    <a class="nav-link text-uppercase" id="home_button" href="#/" data-tr="Homepage">Homepage</a>
                </li>
                <li>
                    <a class="nav-link text-uppercase" id="products_crud" href="products_crud" data-tr="Products">Products</a>
                </li>
                <li>
                    <a class="nav-link text-uppercase" id="contactus" href="#/contactus" data-tr="Contact Us">Contact Us</a>
                <li>
                    <a class="nav-link text-uppercase" id="likes_controller" href="#/likes" data-tr="Likes">Likes</a>
                </li>
                <li>
                    <a class="nav-link text-uppercase" id="shop_controller" href="#/shop" data-tr="Shop">Shop</a>
                </li>
            </ul>
            <div class="top-info text-lg-right text-center mt-lg-0 mt-3">
                <ul class="navbar-nav mx-xl-auto">
                    
                    <li class="text-white mr-xl-4 mr-2 ml-xl-0 ml-lg-5" ng-show="loggeduser">
                        <div class="logged">
                            <a ng-href="#/logout" id="logout" class="nav-link text-uppercase" data-tr="Logout">Logout</a>
                            <a id="cart_btn" class="nav-link text-uppercase">
                                <label class="lbl_num_cart">0</label>
                            </a>
                            <p class="nav-link text-uppercase" ng-model="login_card.username">{{login_card.username}}</p>
                            <img ng-src="frontend/assets/media/{{login_card.img}}" ng-model="login_card.img" class="img_login">
                        </div>
                    </li>
                    <li class="text-white mr-xl-4 mr-2 ml-xl-0 ml-lg-5" ng-show="!loggeduser">
                        <div class="logged">
                            <a ng-href="#/login" id="login" class="nav-link text-uppercase" data-tr="Login">Login</a>
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
    </nav>
</header>
<!-- //header -->



