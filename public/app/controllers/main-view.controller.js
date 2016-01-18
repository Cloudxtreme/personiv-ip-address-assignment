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

		$scope.deleteSwitch = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete Network Switch?')
		        .textContent('All records will be deleted permanently.')
	          	.ariaLabel('Delete Network Switch')
		        .ok('Delete')
		        .cancel('Cancel');
		    $mdDialog.show(confirm).then(function() {
		    	NetworkSwitch.delete(id)
		    		.success(function(){
		    			$scope.refresh();	
		    		})
		    		.error(function(){
		    			Preloader.error();
		    		});

		    }, function() {
		    	return;
		    });
		}

		$scope.configSwitch = function(id){
			$state.go('config', { networkSwitchID:id });
		};

		$scope.refresh();
	}]);