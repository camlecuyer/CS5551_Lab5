
// Declare app level module which depends on views, and components
var login = angular.module('login',[]);

login.controller('View1Ctrl', function ($scope, $http)
{
    $scope.clothList = new Array();
    $scope.getClothes = function ()
    {
        var clothesEntered = document.getElementById("txt_clothes").value;

        if (clothesEntered != "") {

            $http({url:"/api/" + clothesEntered, method: 'POST'}).then(function(data, status){
                $scope.venue = data.data.title;
                //alert(data.data.title);
            });
        }
    }
});

var register = angular.module('register',[]);

register.controller('MongoRestController',function($scope,$http){
    $scope.searchData = function() {

        var mobile = document.getElementById("txt_mobile").value;
        console.log(mobile);

        if (mobile != "") {

            $http({url: "http://localhost:8081/register/" + mobile, method: 'POST'}).then(function (data, status) {
            });
        }
    }
});