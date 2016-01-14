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