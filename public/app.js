
// Declare app level module which depends on views, and components
var login = angular.module('login',[]);

login.controller('loginCtrl', function ($scope, $http, $window)
{
    $scope.login = function ()
    {
        var userid = document.getElementById("txt_userid").value;
        var userpass = document.getElementById("txt_userpass").value;

        if (userid != "" && userpass != "")
        {

            $http({url:"/login/u=" + userid + "&p=" + userpass , method: 'POST'}).then(function(data, status){

                if(data.data == "fail") {
                    alert("User not found");
                }
                else if(data.data == "noMatch")
                {
                    alert("User and/or Password do not match");
                }
                else
                {
                    //alert(data.data);
                    $window.location.href = "/home.html";
                }
            });
        }
        else
        {
            alert("Please enter a Username and Password");
        }
    }
});

var register = angular.module('register',[]);

register.controller('registerController',function($scope,$http,$window){
    $scope.register = function() {

        var userid = document.getElementById("txt_userid").value;
        var userpass = document.getElementById("txt_userpass").value;

        if (userid != "" && userpass != "")
        {

            $http({url:"/register/u=" + userid + "&p=" + userpass , method: 'POST'}).then(function(data, status){

                if(data.data == "fail") {
                    alert("Insertion Failed");
                }
                else
                {
                    //alert(data.data);
                    $window.location.href = "/index.html";
                }
            });
        }
        else
        {
            alert("Please enter a Username and Password");
        }
    }
});

var home = angular.module('home',[]);

/*register.controller('homeCtrl',function($scope,$http){
    $scope.searchData = function() {

        var mobile = document.getElementById("txt_mobile").value;
        console.log(mobile);

        if (mobile != "") {

            $http({url: "http://localhost:8081/register/" + mobile, method: 'POST'}).then(function (data, status) {
            });
        }
    }
});*/