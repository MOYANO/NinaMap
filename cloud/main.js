require('cloud/app.js');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("isocrona",function(request, response) {
	var token;
		//Parse.Cloud.useMasterKey();
	

	Parse.Cloud.httpRequest({
	 // url: 'https://logistics.arcgis.com/arcgis/rest/services/World/ServiceAreas/GPServer/GenerateServiceAreas/submitJob?token=WMAPuq597y_f0CkjUUOSLTm2aONZmpX4ps4VwtXKcMgxDq02USOI7m0qGbx6T3i9NOdPtCZL9iNF8VLmWVEOEu_BQa4FXDsa4NlcUqNSr1MSvfZAQKSIcmV0n_vfaeLWHMpzNVr1_EK4sdWN83CUwQ..&facilities={"features":[{"geometry":{"x":'+request.params.x+',"y":'+request.params.y+'},"attributes":{"Name":"Store5689"}}]}&env:outSr=102100&f=json'
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
	

	//token=getToken();
	
	function dame_token(token){

		Parse.Cloud.httpRequest({
		 // url: 'https://logistics.arcgis.com/arcgis/rest/services/World/ServiceAreas/GPServer/GenerateServiceAreas/submitJob?token=WMAPuq597y_f0CkjUUOSLTm2aONZmpX4ps4VwtXKcMgxDq02USOI7m0qGbx6T3i9NOdPtCZL9iNF8VLmWVEOEu_BQa4FXDsa4NlcUqNSr1MSvfZAQKSIcmV0n_vfaeLWHMpzNVr1_EK4sdWN83CUwQ..&facilities={"features":[{"geometry":{"x":'+request.params.x+',"y":'+request.params.y+'},"attributes":{"Name":"Store5689"}}]}&env:outSr=102100&f=json'
		 url: 'http://route.arcgis.com/arcgis/rest/services/World/ServiceAreas/NAServer/ServiceArea_World/solveServiceArea?token=' + token + '&facilities=' + request.params.y +','+ request.params.x +'&outSR=4326&defaultBreaks=5&f=pjson',
		 // url: 'http://route.arcgis.com/arcgis/rest/services/World/ServiceAreas/NAServer/ServiceArea_World/solveServiceArea?',
		 // paramas:{token:  url: 'gUHlfdtQyjtQrHSRWR-0BOTgk78qmzpwqhmfCVYeVCVXLjX9pQSa4_2bZCTQn_iWTUKWTofrfpH0-Tm83B69MHO_4YaAT07G1d-3J4Ns6V0KQKhCWWqGKQs3S_h03hqBYhxQI3sRlTtXohaVyDhUDw..',}
		}).then(function(httpResponse) {
		  // success

		  response.success(httpResponse.text);
		},function(httpResponse) {
		  // error
		  console.error('Request failed with response code ' + httpResponse.status);
		});
	}
	
 // response.success("You clicked the map at " + request.params.x);
 

});
