angular.module("myApp")
    .controller("MainController", function($scope, $sce, dataService) {
        $scope.test = "MainController";

        dataService.getAllMessages().then(function(data) {
            $scope.messages = data;
        });

        $scope.getFileContent = function(fileName) {
            dataService.getFileContent(fileName).then(function(response) {
                console.log("ctrl response", response);
                // $scope.content = $sce.trustAsResourceUrl(response);
                $scope.content = response;
                console.log("$scope.content", $scope.content);
            })
        }
        $scope.getFileContent("a");


    });
