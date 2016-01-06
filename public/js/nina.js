(function(){
	 Parse.$ = jQuery;
	window.App ={

		Models: {},
		Collections:{},
		Views: {},
		Router:{},
    Functions:{},
    map:{}

	};
  var map;
 

	 Parse.initialize("yNxZHA2tRlRYdH7yKqh7dYdayslV0OCa8BJMdIY2",
                   "aIu5Xf9dmVWNN3cjNH0WvSry8TErHbTFSUA3o2L9");

	   App.Views.AppView = Backbone.View.extend({
	    // Instead of generating a new element, bind to the existing skeleton of
	    // the App already present in the HTML.
	     el: $("#app"),
       events: {

        
        "click #btn_show_log_in":"logIn"
        
      
      },
      logIn: function(e) {
      

       // dialog.dialog( "open" );

     },
     logOut: function(e) {
      
        
        
       
        
      

     },
	    initialize: function() {
	      this.render();
	    },

	    render: function() {
	       
	    }
	});

	App.Router = Backbone.Router.extend({

		routes: {
			
			// 'Home': 'home',
       'login': 'login',
   //    'register':'register'
		},

		index: function(){
			
       //new App.Views.AppView(this);
       //new App.Views.AppView;
		},

		home: function(){
			
		},

    login: function(){
      //new App.Views.LoginView;
    },
    register: function(){
      //new App.Views.signUpView;
    }


	});





  App.Views.MapView= Backbone.View.extend({

   el: $("body"),

    events: {

       "click #a_salir": "salir",
       "click #btn_graficos": "mostrar_panel"
      
    },
    
    initialize: function() {

      
      this.render();
    },

    salir: function(){

     alert("ssdss")

    },
    mostrar_panel: function(){

         //$('#panel_graficos').animate({width: 'toggle'});
         
          //$('#mapa').width($('#mapa').width()/2+"%");
         // $('#panel_graficos').width(100-$('#mapa').width()+"%");
         App.map.invalidateSize();
      


    },

    render: function() {
      
       this.main();
      

      
    },
    main:function(){
       var map = L.map('mapa', { 
          zoomControl: false,
          center: [40.432703, -3.700872],
          zoom: 15
        });

      App.map = map;
      var gj =  new L.GeoJSON();
      //create empty geojson object and add it to the map
      App.map.addLayer(gj);
      L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
          attribution: 'Stamen'
      }).addTo(map);

      App.map.on('click', function(e) {        
          
          Parse.Cloud.run('isocrona', {x:e.latlng.lat,y:e.latlng.lng}, {
            success: function(result,context) {
              // result is 'Hello world!'
              var json=JSON.parse(result);
                    toGeoJSON(json.saPolygons,
                                function(d){
                                   // gj.addGeoJSON(d)
                                    var fl = d.features[0].geometry.coordinates[0].length;
                                    var i = 0;
                                    var sql="";
                                    var sql_defi="";
                                    while(fl>i){

                                        sql = sql + d.features[0].geometry.coordinates[0][i][0]+ " " + d.features[0].geometry.coordinates[0][i][1] + ",";

                                        i++;
                                    }
                                    sql =sql.substring(0, sql.length-1);
                                    sql_defi= "'POLYGON((" + sql + "))'";
                                    sql_defi= "SELECT cartodb_id, the_geom, the_geom_webmercator FROM madrid WHERE ST_Intersects( the_geom, ST_SetSRID(ST_GeomFromText(" + sql_defi + ",4326) , 4326))";

                                    //this.App.Functions.select(sql_defi);
                                    gj.addData(d);

                                     cartodb.createLayer(App.map, {
                                        user_name: 'ninayom',
                                        type: 'cartodb',
                                        sublayers: [{
                                          sql: sql_defi,
                                          cartocss:  '#madrid{polygon-fill: #A53ED5;polygon-opacity: 0.7;line-color: #FFF;line-width: 1;line-opacity: 1;}'
                                          //,
                                          //cartocss: '#madrid_1 {marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 10;marker-fill: #229A00;marker-allow-overlap: true;}'
                                        }]
                                      }, {
                                          https: true
                                        })
                                      .addTo(App.map) // add the layer to our map which already contains 1 sublayer
                                      .done(function(layer) {

                                            var sql = new cartodb.SQL({ user: 'ninayom' });
                                              sql.getBounds(sql_defi).done(function(bounds) {
                                                App.map.fitBounds(bounds)
                                              });
                                            
                                      });
              });
              //alert(result);
          },
          error: function(error) {
              alert(error);
          }
        });

    });



     
      
        
        

    
  } 

  },this);
  // function select (){

         
  // }
  // App.Functions.select= select;

  //new App.Functions.select;

  new App.Router;
  new App.Views.AppView;
  Backbone.history.start();

})();