require('cloud/app.js');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("isocrona",function(request, response) {
	var token;
		//Parse.Cloud.useMasterKey();
	
   
	Parse.Cloud.httpRequest({

		method: 'POST',
		url: 'https://www.arcgis.com/sharing/rest/oauth2/token/',
		headers: {
        'Content-Type': 'application/json'
       },
		params: {
	              'f': 'json',
			      'client_id': 'Gn2mxMD0q03TaLkl',
			      'client_secret': '7f6a225e2c164b1aa7e2e29c55b70bcb',
			      'grant_type': 'client_credentials',
			      'expiration': '1440'
        }
	}).then(function(httpResponse) {
	  // success
	  var a=JSON.parse(httpResponse.text);
	  token= a.access_token;
	  dame_token(token);
	  //response.success(token);
	},function(httpResponse) {
	  // error
	  console.error('Request failed with response code ' + httpResponse.status);
	});
	

	
	
	function dame_token(token){

		Parse.Cloud.httpRequest({
		 
		 url: 'http://route.arcgis.com/arcgis/rest/services/World/ServiceAreas/NAServer/ServiceArea_World/solveServiceArea?token=' + token + '&facilities=' + request.params.y +','+ request.params.x +'&outSR=4326&defaultBreaks=5&f=pjson',
		 
		}).then(function(httpResponse) {
		

		  response.success(httpResponse.text);
		},function(httpResponse) {
		
		  console.error('Request failed with response code ' + httpResponse.status);
		});
	}
	
 
 

});

Parse.Cloud.define("prueba",function(request, response) {

	
   
	if(request.user.authenticated){
		 response.success(request.user.get('username'));
	}
	else{
		  response.success('Usuario no autenticado');
	}
		 
		
	
 
 

});