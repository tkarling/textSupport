angular.module("myApp")
    .controller("MainController", function($scope, $sce, dataService) {
        $scope.test = "MainController";

        $scope.getAllMessages = function() {
            dataService.getAllMessages().then(function(data) {
                $scope.messages = data;
            });
        };
        $scope.getAllMessages();

        $scope.getFileContent = function(fileName) {
            dataService.getFileContent(fileName).then(function(response) {
                console.log("ctrl response", response);
                // $scope.content = $sce.trustAsResourceUrl(response);
                $scope.content = response;
                console.log("$scope.content", $scope.content);
            });
        };
        // $scope.getFileContent("a");

        $scope.newMsg = {
            toNumber: "+18582436018"
        };
        $scope.postMsg = function() {
            dataService.postMsg($scope.newMsg).then(function(response) {
                // $scope.getAllMessages();
            });
        };


    });
