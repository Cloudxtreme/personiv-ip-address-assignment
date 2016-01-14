adminModule
	.controller('editNetworkSwitchDialogController', ['$scope', '$mdDialog', 'NetworkSwitch', 'Preloader', function($scope, $mdDialog, NetworkSwitch, Preloader){
	  	var id = Preloader.get();

	  	NetworkSwitch.show(id)
	  		.success(function(data){
			  	$scope.networkSwitch = data;
	  		});

		$scope.cancel = function() {
			$mdDialog.cancel();
	  	};

	  	$scope.submit = function(){
	  		if($scope.editNetworkSwitchForm.$invalid){
				angular.forEach($scope.editNetworkSwitchForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				/* Starts the preloader */
				Preloader.preload();

				/* Stores the Networkswitch */
				NetworkSwitch.update(id, $scope.networkSwitch)
					.success(function(){
						Preloader.stop();
					})
					.error(function(){
						Preloader.error();
					});
			}
	  	}

	}]);