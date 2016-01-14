adminModule
	.controller('addNetworkSwitchDialogController', ['$scope', '$mdDialog', 'NetworkSwitch', 'Preloader', function($scope, $mdDialog, NetworkSwitch, Preloader){
	  	$scope.networkSwitch = {};

		$scope.cancel = function() {
			$mdDialog.cancel();
	  	};

	  	$scope.submit = function(){
	  		if($scope.addNetworkSwitchForm.$invalid){
				angular.forEach($scope.addNetworkSwitchForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				/* Starts the preloader */
				Preloader.preload();

				/* Stores the Networkswitch */
				NetworkSwitch.store($scope.networkSwitch)
					.success(function(){
						Preloader.stop();
					})
					.error(function(){
						Preloader.error();
					});
			}
	  	}

	}]);