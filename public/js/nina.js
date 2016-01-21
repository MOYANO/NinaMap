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
 window.template = function (id) {

    return _.template( $('#' + id).html());
  };

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

     App.Views.NavBarView = Backbone.View.extend({
      // Instead of generating a new element, bind to the existing skeleton of
      // the App already present in the HTML.
       el: $("#tf-menu"),
       events: {

        
        "click #btn_Search":"btn_geocodifica",
        "click #btn_pc":"show_pc",
        "keypress #input_geocodifica": "procesa_key"
        
      
      },
      show_pc: function(e) {

        $("#mapa").height("450px");
      },
      btn_geocodifica: function(e) {
       
        var keywords = $("#input_geocodifica").val();

        if(keywords === '') return;

        this.geocodifica();
      

      },
      procesa_key: function(e) {
        if ( e.which === 13 ) { 
        var keywords = $(e.target).val();

        if(keywords === '') return;

        this.geocodifica();
       }

      },
      geocodifica: function(e) {
      
        var address = document.getElementById('input_geocodifica').value;
         var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {

            var latlng = L.latLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            App.map.setView(latlng,15);
            var greenIcon = L.icon({
                iconUrl: '../img/markers/leaf-green.png',
                shadowUrl: '../img/markers/leaf-shadow.png',

                iconSize:     [38, 95], // size of the icon
                shadowSize:   [50, 64], // size of the shadow
                iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            L.marker([results[0].geometry.location.lat(), results[0].geometry.location.lng()],{icon: greenIcon}).addTo(App.map);
           
          } else {
            alert('Resultado: ' + status);
          }
        });
     
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

App.Views.PanelPvView = Backbone.View.extend({
      // Instead of generating a new element, bind to the existing skeleton of
      // the App already present in the HTML.
       el: $("#panel_pv"),
       events: {

        
        "click #closeLeft":"cerrar"
        
      
      },
      cerrar: function(e) {
      
      if(this.el.style.display == 'block'){
          this.el.style.display = 'none';
          $("#btn_pv").find("button").removeClass("nina-transparent-bg");
          $("#btn_pv").removeClass("nina-smokescreen");
       }else{
          this.el.style.display = 'block';
          $("#btn_pv").find("button").addClass("nina-transparent-bg");
          $("#btn_pv").addClass("nina-smokescreen");
       }
      

       // dialog.dialog( "open" );

     },
      initialize: function() {
        this.render();
      },

      render: function() {
         //this.$el.html(_.template($("#panel_pv_template").html()));
      }
  });

   App.Views.MapTool = Backbone.View.extend({
      // Instead of generating a new element, bind to the existing skeleton of
      // the App already present in the HTML.
       el: $("#MapTool"),
       events: {

        
        "click #btn_pv":"muestra_pv"
        
      
      },
      muestra_pv: function(e) {
        var a = $("#panel_pv")
        if($("#panel_pv").css("display") == 'block'){
          $("#panel_pv").css("display","none");
          $("#btn_pv").find("button").removeClass("nina-transparent-bg");
          $("#btn_pv").removeClass("nina-smokescreen");
       }else{
         $("#panel_pv").css("display", 'block');
         $("#btn_pv").find("button").addClass("nina-transparent-bg");
          $("#btn_pv").addClass("nina-smokescreen");
       }

       // dialog.dialog( "open" );

      
      // if ( Parse.User.current() ) {
      //       Parse.User.logOut();

      //       // check if really logged out
      //       if (Parse.User.current())
      //           console.log("Failed to log out!");
      //   }

      //   // do redirect
      //   //window.location.replace("Sign_In.html");
      //   // or
      //   window.location.href = "/";

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

   el: $('#mapa'),

    events: {

       "click #a_salir": "salir",
       "click #btn_graficos": "mostrar_panel",
       "click #btn_pv": "mostrar_panel",
       "click #map": "click_map"
      
    },
    
    initialize: function() {

      
      this.render();
    },

    salir: function(){

     alert("ssdss")

    },
    mostrar_panel: function(event){

         //$('#panel_graficos').animate({width: 'toggle'});
         
          //$('#mapa').width($('#mapa').width()/2+"%");
         // $('#panel_graficos').width(100-$('#mapa').width()+"%");
         //App.map.invalidateSize();

          $("#panel_pv").toggleClass("nina-visible")

    },

    render: function() {
      
       this.main();
      

      
    },
    click_map(){
        
    },
    main:function(){
       var map = L.map('mapa', { 
          zoomControl: false,
          center: [40.432703, -3.700872],
          zoom: 15
        });
  //google map
      //  var map = new google.maps.Map(document.getElementById('mapa'), {
      //   zoom: 15,
      //   center: {lat:  40.432703, lng: -3.700872},
      //   mapTypeControl: true,
      //   mapTypeControlOptions: {
      //       style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      //       position: google.maps.ControlPosition.LEFT_BOTTOM
      //   }
     
      // });

      App.map = map;
      var gj =  new L.GeoJSON();
      //create empty geojson object and add it to the map
      App.map.addLayer(gj);
     
      L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
          attribution: 'Stamen'
      }).addTo(App.map);

      // App.map.on('click', function(e) {        
          
<<<<<<< HEAD

        //   Parse.Cloud.run('prueba', {x:e.latlng.lat,y:e.latlng.lng}, {
        //     success: function(result,context) {
        //       // result is 'Hello world!'
        //        alert(result);
            
        //   },
        //   error: function(error) {
        //       alert(error.message);
        //   }
        // });
      App.map.on('click', function(e) {        
          
          Parse.Cloud.run('isocrona', {x:e.latlng.lat,y:e.latlng.lng}, {
=======
      //     if(Parse.User.current() ){
      //        Parse.Cloud.run('prueba', {x:e.latlng.lat,y:e.latlng.lng}, {
      //           success: function(result,context) {
      //           // result is 'Hello world!'
      //            alert(result);
              
      //           },
      //           error: function(error) {
      //               alert(error.message);
      //               document.location.href="/";
      //           }
      //         });
      //     }
          
      // });   
        
      App.map.on('click', function(e) {        
           Parse.Cloud.run('isocrona', {x:e.latlng.lat,y:e.latlng.lng}, {
>>>>>>> origin/master
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
<<<<<<< HEAD
              alert(error);
          }
        });
=======
               alert(error.message);
               document.location.href="/";
          }
         
       });
>>>>>>> origin/master

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
  new App.Views.MapView({});
  new App.Views.PanelPvView({});
  new App.Views.MapTool({});
  new App.Views.NavBarView({});
  
 
  Backbone.history.start();

})();