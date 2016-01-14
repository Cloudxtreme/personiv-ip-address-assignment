adminModule
	.controller('mainViewController', ['$scope', '$state', '$mdDialog', 'Preloader', 'NetworkSwitch', function($scope, $state, $mdDialog, Preloader, NetworkSwitch){
		$scope.refresh = function(){
			Preloader.preload();

			NetworkSwitch.index()
				.success(function(data){
					Preloader.stop();
					$scope.show = true;

					$scope.networkSwitches = data;
				});
		};

		$scope.addNetworkSwitch = function(){
			$mdDialog.show({
			    controller: 'addNetworkSwitchDialogController',
			    templateUrl: '/app/views/templates/dialogs/add-network-switch-dialog.html',
			    parent: angular.element(document.body),
		    })
		    .then(function(){
				$scope.refresh();    	
		    });
		};
		$scope.editNetworkSwitch = function(id){
			Preloader.set(id);
			$mdDialog.show({
			    controller: 'editNetworkSwitchDialogController',
			    templateUrl: '/app/views/templates/dialogs/edit-network-switch-dialog.html',
			    parent: angular.element(document.body),
		    })
		    .then(function(){
				$scope.refresh();    	
		    });
		};

		$scope.configSwitch = function(id){
			$state.go('config', { networkSwitchID:id });
		};

		$scope.refresh();
	}]);