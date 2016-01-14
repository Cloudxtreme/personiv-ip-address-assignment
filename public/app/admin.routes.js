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