<p align="center">
  <a href="https://github.com/Jordilg13/AngularJS_FW_PHP_OOP">
    <img src="frontend/assets/img/logo4.png" alt="Logo">
  </a>

  <h3 align="center">Jordi Llopis García</h3>

  <p align="center">
    My second web project
  </p>
</p>

## About the project
This website is made as a class project. Is an online shop of computers and other tech products,it accomplishes the main functions <br> of an e-commerce page with admin and client functions.

## Built With

### Architecture
* [MVC] - Model View Controller

[MVC]: <https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller>

### Technologies

* [PHP7] - Backend
* [AngularJS v1.4] - Frontend
* [MySQL] - DDBB
* [Apache2] - Web server

[MySQL]: <http://mysql.com>
[Apache2]: <http://afdas.com>
[PHP7]: <http://php.net/>
[AngularJS v1.4]: <http://xxsadfasdvscz.com>
### Libraries
* [JWT] - It's used in auth processes.
* [Bootstrap] - CSS 
* [Toastr] - Notification system.
* [Dropzone] - Used in profile.

[Toastr]: <https://github.com/Foxandxss/angular-toastr>
[Bootstrap]: <https://getbootstrap.com/>
[JWT]: <https://jwt.io/>
[Dropzone]: <https://github.com/thatisuday/ng-dropzone>

### Services
* [Mailgun] - Used in mail system.

[Mailgun]: <http://mailgun.com>
## Modules
| Page | Features |
| -| - |
| Home | Filter Search with redirect to shop, list popular products with pagination, likes, add to cart, autoredirect to details |
| Shop | List with pagination, details, likes, add to cart |
| Products view | Product information, add to cart, likes  |
| Likes | User Likes, middleware to not logged users, working in all application |
| Contact | Contact mails |
| Login | Register, login, logout, JS/PHP validation, JWT, custom img, menu, regenerate tokens, middleware to not logged users |
| Cart | Stored in database, JS/PHP validation, checkout, increase & decrease, quantity controlled, redirect to details, shows last purchase, working in all application |


## Framework PHP
### Summary
- It's a kind of API that controlls the access to the DDBB.
### Consists of
- **FrontController** - Work as a router of the framework and handle all the calls.
- **ControllerCore** - Main class that build the queries.
    - **ApiController** - Controlls the actions depending on the type of the call.
    - **ModelController** - Call the ControllerCore to build the query.
- **DB and it's Config** - They has the functions to get access to DB.


### Features
- Autoload for the classes of the framework.



## TODOs
- [] Improve CSS
- [] Fix the GMaps incompatibility problems.

<!-- ## qwfqf

jwt client - 
- service
locals
logout 
jwt server -
session
logout
update -->


 ## License

Distributed under the GPL 3.0 License. See `LICENSE` for more information.