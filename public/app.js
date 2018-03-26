
// Declare app level module which depends on views, and components
var login = angular.module('login',[]);

login.controller('loginCtrl', function ($scope, $http)
{
    $scope.login = function ()
    {
        var userid = document.getElementById("txt_userid").value;
        var userpass = document.getElementById("txt_userpass").value;

        if (userid != "" && userpass != "")
        {

            $http({url:"/login/u=" + userid + "&p=" + userpass , method: 'POST'}).then(function(data, status){

                //alert(data.data.title);
            });
        }
        else
        {
            alert("Please enter a Username and Password");
        }
    }
});

var register = angular.module('register',[]);

register.controller('registerController',function($scope,$http){
    $scope.searchData = function() {

        var mobile = document.getElementById("txt_mobile").value;
        console.log(mobile);

        if (mobile != "") {

            $http({url: "http://localhost:8081/register/" + mobile, method: 'POST'}).then(function (data, status) {
            });
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