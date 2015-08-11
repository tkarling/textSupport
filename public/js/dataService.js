angular.module("myApp")
    .service("dataService", function($http, $sce) {

        var url = "http://localhost:3033/api";

        this.getAllMessages = function() {
            var sendUrl = url + "/messages/all";
            return $http.get(sendUrl).then(function(response) {
                console.log("this.getAllMessages", response);
                return response.data;
            });
        };
        // this.getAllMessages();

        this.postMsg = function(message) {
            var sendUrl = url + "/send_message";
            return $http.post(sendUrl, message).then(function(response) {
            	console.log("this.postMsg response:", response);
                return response.data;
            });
        };

        this.getFileContent = function(filename) {
            return $http.post(url + '/support/resources', {
                    filename: filename
                }, {
                    responseType: 'arraybuffer'
                })
                .success(function(response) {
                    console.log("response", response);
                    var file = new Blob([response], {
                        type: 'application/pdf'
                    });
                    var fileURL = URL.createObjectURL(file);
                    console.log("fileURL", fileURL);
                    return $sce.trustAsResourceUrl(fileURL);
                    // return fileURL;
                });

        }

    });
