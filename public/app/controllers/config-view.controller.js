adminModule
	.controller('configViewController', ['$scope', '$state', '$stateParams', 'NetworkSwitch', 'Port', 'Preloader', function($scope, $state, $stateParams, NetworkSwitch, Port, Preloader){
		var id = $stateParams.networkSwitchID;

		NetworkSwitch.show(id)
			.success(function(data){
				$scope.switch = data;
			});

		Port.networkSwitch(id)
			.success(function(data){
				$scope.ports = data;
			});

		$scope.submit = function(){
			Preloader.preload();

			Port.multipleUpdate($scope.ports)
				.success(function(){
					Preloader.stop();
					$state.go('main');
				})
				.error(function(){
					Preloader.error();
				});
		};
	}]);