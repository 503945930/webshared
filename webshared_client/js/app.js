/**
 * Created by Administrator on 2015/9/25 0025.
 */
var ulr = "";
angular.module("app", [])
/*    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])*/
    .controller("PictureCtrl", ['$scope', "$http", "$location", function ($scope, $http, $location) {
        //获取当前主题
        $scope.getTheme=function(){
            var ac=$location.$$path.substr(1,$location.$$path.length-1);
            var promise = $http({
                method: "get",
                url: "http://gobiiig.com/v1/activities(" +ac+")"

            });
            promise.then(function (data) {
                console.log($scope.theme = data.data.info.theme);
                $scope.theme = data.data.info.theme;
            }, function (resp) {

            })
        };



        //通过
        $scope.exam = function (id) {
            var promise = $http({
                method: "put",
                url: "http://gobiiig.com/v1/pictrues(" + id + ")",
                data: {"states": true}

            });
            promise.then(function (data) {
                return $scope.getData();
            }, function (resp) {

            })
        };
        //不通过
        $scope.delete = function (id) {
            var promise = $http({
                method: "delete",
                url: "http://gobiiig.com/v1/pictrues(" + id + ")"

            });
            promise.then(function (data) {
                return $scope.getData();
            }, function (resp) {

            })
        };
        //刷新列表
        $scope.fresh=function(){
            console.log("11");
            return $scope.getData();
        };


        //当前图片列表
        $scope.getData = function () {

            var ac=$location.$$path.substr(1,$location.$$path.length-1);
            var promise = $http({
                method: "get",
                url: "http://gobiiig.com/v1/pictrues?" + "$filter=states eq false and activity eq '"+ac+"'"

            });
            promise.then(function (data) {
                console.log(data.data.value.length);
                if(data.data.value.length>0){

                    $scope.visible=false;

                }else{
                    $scope.visible=true;
                }
                $scope.data = data.data;
                console.log(data.data.value);
            }, function (resp) {

            });


            $scope.getTheme();
        };

        return $scope.getData();
    }]);