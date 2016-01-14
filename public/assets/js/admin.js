var adminModule = angular.module('adminModule', [
	/* Vendor Dependencies */
	'ui.router',
	'ngMaterial',
	'ngMessages',
	'infinite-scroll',
]);
adminModule
	.config(['$urlRouterProvider', '$stateProvider', '$mdThemingProvider', function($urlRouterProvider, $stateProvider, $mdThemingProvider) {
		/* Defaul Theme Blue - Light Blue */
		$mdThemingProvider.theme('default')
			.primaryPalette('green', {
				'default':'A700'
			})
			.accentPalette('green', {
				'default':'A700'
			});

		$urlRouterProvider
			.otherwise('/page-not-found')
			.when('', '/');

		$stateProvider
			.state('page-not-found',{
				url: '/page-not-found',
				templateUrl: '/app/views/page-not-found.view.html',
			})

			.state('main', {
				url: '/',
				views: {
					'':{
						templateUrl:'/app/views/main.view.html',
						controller:'mainViewController'
					},
				},
			})
			.state('config', {
				url:'/config/{networkSwitchID}',
				params: {networkSwitchID:null},
				views: {
					'':{
						templateUrl:'/app/views/config.view.html',
						controller:'configViewController'
					},
				},
			})
	}]);
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
adminModule
	.factory('NetworkSwitch', ['$http', function($http){
		var urlBase = '/network-switch'
		return {
			index: function(){
				return $http.get(urlBase);
			},
			show: function(id){
				return $http.get(urlBase + '/' + id);
			},
			store: function(data){
				return $http.post(urlBase, data);
			},
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},
			delete: function(id){
				return $http.delete(urlBase + '/' + id);
			},
		};
	}])
adminModule
	.factory('Port', ['$http', function($http){
		var urlBase = '/port'
		return {
			index: function(){
				return $http.get(urlBase);
			},
			show: function(id){
				return $http.get(urlBase + '/' + id);
			},
			store: function(data){
				return $http.post(urlBase, data);
			},
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},
			delete: function(id){
				return $http.delete(urlBase + '/' + id);
			},
			networkSwitch: function(id){
				return $http.get(urlBase + '-network-switch/' + id);
			},
			multipleUpdate: function(data){
				return $http.put(urlBase + '-multiple-update', data);
			},
		};
	}])
adminModule
	.service('Preloader', ['$mdDialog', function($mdDialog){
		var dataHolder = null;
		return {
			/* Starts the preloader */
			preload: function(){
				return $mdDialog.show({
					templateUrl: '/app/views/templates/preloader.html',
				    parent: angular.element(document.body),
				});
			},
			/* Stops the preloader */
			stop: function(data){
				$mdDialog.hide(data);
			},
			/* Shows error message if AJAX failed */
			error: function(){
				return $mdDialog.show(
			    	$mdDialog.alert()
				        .parent(angular.element($('body')))
				        .clickOutsideToClose(true)
				        .title('Oops! Something went wrong!')
				        .content('An error occured. Please contact administrator for assistance.')
				        .ariaLabel('Error Message')
				        .ok('Got it!')
				);
			},
			/* Send temporary data for retrival */
			set: function(data){
				dataHolder = data;
			},
			/* Retrieves data */
			get: function(){
				return dataHolder;
			}
		};
	}]);
//# sourceMappingURL=admin.js.map
