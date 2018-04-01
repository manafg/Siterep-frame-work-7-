// Initialize your app
var myApp = new Framework7({
     pushState: true,
   // swipePanel: 'left',
    material:true,
    materialPageLoadDelay:20
});

// Export selectors engine
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

var shareto=[];

var inetrest=[];

$$("#signup").on('click', function(){
  mainView.router.load({ url: "form.html" }, { force: true });
});

$$("#login").on('click',function(){
    var email = $$("#email").val();
    var password = $$("#password").val();
    
    var jsonObject = {
        "email": email,
        "password": password
    }
    
    var valid = ValidateLogin(JSON.stringify(jsonObject));
     if(valid == true){
        myApp.showPreloader("Loading");
        $$.ajax({
          type: "POST",
          url: "http://sitrep2.azurewebsites.net/api/Login",
          data: jsonObject,
          success: function(data) {
            var result = JSON.parse(data);
            if(result.success) {
                localStorage.setItem("id", result.id);
                if(!result.hasInterest)
                    mainView.router.load({ url: "inet1.html" }, { force: true });
                else if(!result.hasCommunities)
                    mainView.router.load({ url: "com1.html"}, { force: true });
                else
                    mainView.router.load({ url: "Sitereps.html"}, { force: true });
            } else {
                myApp.alert(result.error);
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              myApp.alert("Error please contact the admin");
          },
          complete: function(){
            myApp.hidePreloader("Loading");
          }
        });
     } else {
         myApp.alert(valid);
     }
});

$$("#siterep").on("click",function(){
 //capturePhotoWithData();
});

$$("#intrest").on('click',function(){
    mainView.router.load({ url: "com1.html"},{force:true});
});

myApp.onPageInit('signupform', function (page) {
    $$("#signupuser").on('click',function(){         
    var firstname = $$("#firstname").val();
    var lastname = $$("#lastname").val();
    var gender = $$("#gender").val();
    var dateofbirth = $$("#birth").val();
    var email = $$("#signupemail").val();
    var phone = $$("#phone").val();
    var lat=0;
    var long=0;
    var password=$$("#pssword").val();
        
    var jsonObject = {
        "firstname": firstname,
        "lastname": lastname,
        "password": password,
        "dateofbirth": dateofbirth,
        "email": email,
        "phonenumber": phone,
        "gender": gender,
        "country": "jordan",
        "longitude": "0.123456",
        "laiitude": "0.123456"
    }
    var valid = ValidateSignup(JSON.stringify(jsonObject));
     if(valid == true){
        myApp.showPreloader("Loading");
        $$.ajax({
          type: "POST",
          url: "http://sitrep2.azurewebsites.net/api/Register",
          data: jsonObject,
          success: function(data) {
            var result = JSON.parse(data);
            if(result.success) {
                localStorage.setItem("id", result.id);
                mainView.router.load({ url: "inet1.html" }, { force: true });
            } else {
                myApp.alert(result.error);
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              myApp.alert("Error please contact the admin");
          },
          complete: function(){
            myApp.hidePreloader("Loading");
          }
        });
     } else {
         myApp.alert(valid);
     }
    });
});

myApp.onPageInit('baseinterest', function (page) {
    GettingBaseInterest();
  
    var ptrContent = $$('.pull-to-refresh-content');
    ptrContent.on('refresh', function (e) {
        mainView.router.reloadPage('inet1.html');
    });
    
    $$("#nextToCommuntiy").on('click',function() {
        if($$('#interestlist a[data-status="2"]').length > 0) {
            mainView.router.load({ url: "com1.html"}, { force: true });
        } else {
            myApp.alert("Error follow at least one interest");
        }
    });
    
    $$('#interestlist').on('click','a',function(){
        var ele = $$(this);
        
        var jsonData = {
            "userId": localStorage.getItem('id'),
            "interestId": ele.data('id'),
            "userInterestId" : ele.data('uiid')
        }
        
        myApp.showPreloader("Loading");
        $.ajax({
            type: "POST",
            url: ele.data('status') == 1 ? "http://sitrep2.azurewebsites.net/api/AddUserInterest"
            : "http://sitrep2.azurewebsites.net/api/RemoveUserInterest",
            data: jsonData,
            success: function(data) {
                if(ele.data('status') == 1) {
                    ele.removeClass('join');
                    ele.addClass('joined');
                    ele.html("UnFollow");
                    ele.attr('data-status', 2);
                    ele.attr('data-uiid', data.id);
                } else {
                    ele.removeClass('joined');
                    ele.addClass('join');
                    ele.html("Follow");
                    ele.attr('data-status', 1);
                    ele.attr('data-uiid', 0);
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                myApp.alert("Error please contact the admin");
            },
            complete: function() {
                myApp.hidePreloader("Loading");
            }
        });
    });
});

myApp.onPageInit('basecommunity', function (page) {
   GettingBaseCommunity();
    
     var ptrContent = $$('.pull-to-refresh-layer');
    ptrContent.on('refresh', function (e) {
        mainView.router.reloadPage('com1.html');
    });
  
    $$("#nextToHomePage").on('click',function(){
        if($$('#communitylist a[data-status="2"], #communitylist a[data-status="3"]').length > 0) {
            mainView.router.load({ url: "Sitereps.html" }, { force: true });
        } else {
            myApp.alert("Error join at least one community");
        }
    });
    
    $$('#communitylist').on('click','a',function(){
        var ele = $$(this);
        
        var jsonData = {
            "userId": localStorage.getItem('id'),
            "communityId": ele.data('id'),
            "userCommunityId" : ele.data('ucid')
        }
        
        myApp.showPreloader("Loading");
        $.ajax({
            type: "POST",
            url: ele.data('status') == 1 ? "http://sitrep2.azurewebsites.net/api/AddUserCommunity"
            : "http://sitrep2.azurewebsites.net/api/RemoveUserCommunity",
            data: jsonData,
            success: function(data) {
                if(ele.data('status') == 1) {
                    ele.removeClass('join');
                    ele.addClass('joined');
                    if(data.usertype == 1) {
                        ele.html("Requested");
                        ele.attr('data-status', 2);
                    } else {
                        ele.html("Joined");
                        ele.attr('data-status', 3);
                    }
                    ele.attr('data-ucid', data.id);
                } else {
                    ele.removeClass('joined');
                    ele.addClass('join');
                    ele.html("Join");
                    ele.attr('data-status', 1);
                    ele.attr('data-ucid', 0);
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                myApp.alert("Error please contact the admin");
            },
            complete: function() {
                myApp.hidePreloader("Loading");
            }
        });
    });
});

myApp.onPageInit('editinterest', function (page) {
   GettingEditInterest();
    var ptrContent = $$('.pull-to-refresh-content');
    ptrContent.on('refresh', function (e) {
        mainView.router.reloadPage('editinterests.html');
    });
    
    $$('#myinterestlist').on('click','a',function(){
        var ele = $$(this);
        
        var jsonData = {
            "userId": localStorage.getItem('id'),
            "interestId": ele.data('id'),
            "userInterestId" : ele.data('uiid')
        }
        
        myApp.showPreloader("Loading");
        $.ajax({
            type: "POST",
            url: ele.data('status') == 1 ? "http://sitrep2.azurewebsites.net/api/AddUserInterest"
            : "http://sitrep2.azurewebsites.net/api/RemoveUserInterest",
            data: jsonData,
            success: function(data) {
                if(ele.data('status') == 1) {
                    ele.removeClass('join');
                    ele.addClass('joined');
                    ele.html("UnFollow");
                    ele.attr('data-status', 2);
                    ele.attr('data-uiid', data.id);
                } else {
                    ele.removeClass('joined');
                    ele.addClass('join');
                    ele.html("Follow");
                    ele.attr('data-status', 1);
                    ele.attr('data-uiid', 0);
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                myApp.alert("Error please contact the admin");
            },
            complete: function() {
                myApp.hidePreloader("Loading");
            }
        });
    });
});

myApp.onPageInit('editcommunity', function (page) {
   GettingEditCommunity();
    
     var ptrContent = $$('.pull-to-refresh-layer');
    ptrContent.on('refresh', function (e) {
        mainView.router.reloadPage('com1.html');
    });

    $$('#mycommunitylist').on('click','a',function(){
        var ele = $$(this);
        
        var jsonData = {
            "userId": localStorage.getItem('id'),
            "communityId": ele.data('id'),
            "userCommunityId" : ele.data('ucid')
        }
        
        myApp.showPreloader("Loading");
        $.ajax({
            type: "POST",
            url: ele.data('status') == 1 ? "http://sitrep2.azurewebsites.net/api/AddUserCommunity"
            : "http://sitrep2.azurewebsites.net/api/RemoveUserCommunity",
            data: jsonData,
            success: function(data) {
                if(ele.data('status') == 1) {
                    ele.removeClass('join');
                    ele.addClass('joined');
                    if(data.usertype == 1) {
                        ele.html("Requested");
                        ele.attr('data-status', 2);
                    } else {
                        ele.html("Joined");
                        ele.attr('data-status', 3);
                    }
                    ele.attr('data-ucid', data.id);
                } else {
                    ele.removeClass('joined');
                    ele.addClass('join');
                    ele.html("Join");
                    ele.attr('data-status', 1);
                    ele.attr('data-ucid', 0);
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                myApp.alert("Error please contact the admin");
            },
            complete: function() {
                myApp.hidePreloader("Loading");
            }
        });
    });
});

myApp.onPageInit('createcommunity', function (page){
    
    appendintrest();

    $$("#goint").on("click",function(){
        mainView.router.load({ url: "about.html"},{force:true});
    });
    
    $$("#createcom").on('click',function(){
    var comname=$$("#comname").val();
    var comtype=$$("#comtype").val();    
    var id=localStorage.getItem('id');
    if(comname==null){
        
    }else if(id==null){
        
        
        
    }else{
        
        
    }
    
var Param=
{
	"name": comname,
	"userid": id,
	"communitytype": comtype,
	"categoryinterestid": 1,
	"interests": []
}

Param.interests=JSON.parse(localStorage.getItem('intrest'));
psotcoms(Param);

 mainView.router.load({ url: "com1.html"},{force:true});
    });
    
});

myApp.onPageInit('homepage', function (page){
    GettingHomepage();
    
    var ptrContent = $$('.pull-to-refresh-content');
    ptrContent.on('refresh', function (e) {
        mainView.router.reloadPage('Sitereps.html');
    });
    
    $$("#addSitrep").on('click', function() {
        mainView.router.load({ url: "CreateSitereps.html" }, { force: true });
    });
    
    $$("#editProfile").on('click', function() {
        mainView.router.load({ url: "profilemenu.html" }, { force: true });
    });
});

myApp.onPageInit('createsitrep', function (page) {
    
    var createdonLongitude;
    var createdonLatitude;
    var actionLongitude;
    var actionLatitude;
    
    $$("#cam").on('click', function(){
      //capturePhotoWithData();  
     // takepicture();
        getPhoto();
    });

    var map = new GMaps({
        div: '#map',
        lat: -12.043333,
        lng: -77.028333
    });

    GMaps.geolocate({
        success: function(position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);
            map.addMarker({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                draggable: true,
                title: 'your location'
            });
            createdonLongitude = position.coords.longitude;
            createdonLatitude = position.coords.latitude;
        },
        error: function(error) {
        },
        not_supported: function() {
        },
        always: function() {
        }
    });

    GMaps.once('click', map.map, function(event) {
        var index = map.markers.length;
        actionLongitude = event.latLng.lng();
        actionLatitude = event.latLng.lat();

        map.addMarker({
          lat: actionLatitude,
          lng: actionLongitude,
          draggable:true,
          title: 'Marker #' + index,
          infoWindow: {},
          dragend: function(e) {
            actionLongitude = e.latLng.lng();
            actionLatitude = e.latLng.lat();
          }
        });
    });

    $$("#shareSitrep").on("click", function() {
        var site = {
            "userId": localStorage.getItem('id'),
            "title": $$("#title").val(), 
            "photo": localStorage.getItem('image'),
            "description": $$("#descrption").val(),
            "witness": $$("#witness")[0].checked,
            "reporter": $$("#reporter")[0].checked,
            "country": "Jordan",
            "city": "amman",
            "datetime": $$("#datetime").val(),
            "longitude": actionLongitude,
            "latitude": actionLatitude,
            "createddatetime": new Date(),
            "createdlongitude": createdonLongitude ,
            "createdlatitude": createdonLatitude,
            "communities": []
        }
        localStorage.setItem('sitrep', JSON.stringify(site));
        mainView.router.load({ url: "sharto.html" }, { force: true }); 
    });
});

myApp.onPageInit('sharetocommunities', function (page) {
    GettingPublicPrivateCommunities();
    
    var ptrContent = $$('.pull-to-refresh-content');
    ptrContent.on('refresh', function (e) {
        mainView.router.reloadPage('sharto.html');
    });
    
    $$("#done").on('click',function() {
        var communities = [];
        $('[name="public-checkbox"]:checked').each(function() {
            communities.push({
                "communityid": $(this).val(),
                "ispublic": true
            });
        });
        $('[name="private-checkbox"]:checked').each(function() {
            communities.push({
                "communityid": $(this).val(),
                "ispublic": false
            });
        });
        
        var jsonData = JSON.parse(localStorage.getItem('sitrep'));
        jsonData.communities = communities;
        
        myApp.showPreloader("Loading");
        $$.ajax({
            type: "POST",
            url: "http://sitrep2.azurewebsites.net/api/CreateSitrep",
            data: jsonData,
            success: function(data) {
                mainView.router.load({ url: "Sitereps.html" }, { force: true });
            },
            error: function (jqXhr, textStatus, errorThrown) {
                myApp.alert("Error please contact the admin");
            },
            complete: function() {
                myApp.hidePreloader("Loading");
            }
        });
    });
});

myApp.onPageInit('about', function (page){
     var map=new GMaps({
  div: '#map2',
  lat: -12.043333,
  lng: -77.028333
});
    
    debugger;
       GMaps.geolocate({
  success: function(position) {
      debugger;
     console.log(position);
    map.setCenter(position.coords.latitude, position.coords.longitude);
      map.addMarker({
  lat: position.coords.latitude,
  lng: position.coords.longitude,
  title: '',
  click: function(e) {
  }
});
      debugger;
     
      
   gettinglocation(position.coords.latitude,position.coords.longitude);
      var c=localStorage.getItem('data')
      var locations=JSON.parse(c);
      var locat=locations.address_components;
      debugger;
      var d=locat.pop();
      var m=locat[locat.length-2];
      localStorage.setItem("country",JSON.stringify(d.long_name));
      localStorage.setItem("locationadress1",JSON.stringify(m.long_name));
      localStorage.setItem("nig",JSON.stringify(locat[0].long_name));
      localStorage.setItem("city",JSON.stringify(locat[1].long_name));
      console.log(localStorage.getItem('country'));
      console.log(localStorage.getItem('locationadress1'));
      console.log(localStorage.getItem('nig'));
      console.log(localStorage.getItem('city'));
      $$("#1").html("country: "+localStorage.getItem('country'));
      $$("#2").html("Minublicty: "+localStorage.getItem('locationadress1'));
      $$("#3").html("City: "+localStorage.getItem('city'));
      $$("#4").html("Area: "+localStorage.getItem('nig'));
      var JSon={
          "country":localStorage.getItem('country'),
          "locationadress1":localStorage.getItem('nig'),
          "neighborhood":localStorage.getItem('nig'),
          "city":localStorage.getItem('city')
      }
      var string1=JSON.stringify(JSon);
localStorage.setItem('JSon',JSON.stringify(JSon));
       localStorage.setItem("latitude",position.coords.latitude);
       localStorage.setItem("longitudes",position.coords.longitude);
      
      //codeLatLng(position.coords.latitude,position.coords.longitude);
     
      var sli=$$("#slider").val();
      var sl=parseInt(sli);
      
      polygon = map.drawCircle({
 lat: position.coords.latitude,
  lng: position.coords.longitude,
radius:sl,
  strokeColor: '#BBD8E9',
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: '#BBD8E9',
  fillOpacity: 0.6
});
      
      
  },
  error: function(error) {
    alert('Geolocation failed: '+error.message);
  },
  not_supported: function() {
    alert("Your browser does not support geolocation");
  },
  always: function() {
    alert("Done!");
  }
}); 
    
    
    
     $$("#slider").touchend(function(){
        debugger;
        var sli=$$("#slider").val();
      var sl=parseInt(sli);
        var lat=parseFloat(localStorage.getItem("latitude"));
        var long=parseFloat(localStorage.getItem("longitudes"))
         polygon = map.drawCircle({
 lat: lat,
  lng: long,
radius:sl,
  strokeColor: '#BBD8E9',
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: '#BBD8E9',
  fillOpacity: 0.6
});
      
        
        
    });
    
    
    
    
    

    
   /* $$("#Ser").on('click',function(page){
        debugger;
    GMaps.geocode({
  address: $$('#Sea').val(),
  callback: function(results, status) {
    if (status == 'OK') {
        debugger;
        console.log(results);
      var latlng = results[0].geometry.location;
      map.setCenter(latlng.lat(), latlng.lng());
      map.addMarker({
        lat: latlng.lat(),
        lng: latlng.lng()
      });
      gettinglocation(latlng.lat(),latlng.lng());
      var c=localStorage.getItem('data')
      var locations=JSON.parse(c);
      var locat=locations.address_components;
      debugger;
      var d=locat.pop();
      var m=locat[locat.length-2];
      localStorage.setItem("country",JSON.stringify(d.long_name));
      localStorage.setItem("locationadress1",JSON.stringify(m.long_name));
      localStorage.setItem("nig",JSON.stringify(locat[0].long_name));
      localStorage.setItem("city",JSON.stringify(locat[1].long_name));
      console.log(localStorage.getItem('country'));
      console.log(localStorage.getItem('locationadress1'));
      console.log(localStorage.getItem('nig'));
      console.log(localStorage.getItem('city'));
      var JSon={
          "country":localStorage.getItem('country'),
          "locationadress1":localStorage.getItem('nig'),
          "neighborhood":localStorage.getItem('nig'),
          "city":localStorage.getItem('city')
      }
       localStorage.setItem('JSon',JSon);
       localStorage.setItem("latitude",latlng.lat());
       localStorage.setItem("longitudes",latlng.lng());
       appendloc();
    }
  }
});
   
    });*/
    
//  /*  $$("#curr").on('click',function(){
//        
////         GMaps.geolocate({
////  success: function(position) {
////      debugger;
////     console.log(position);
////    map.setCenter(position.coords.latitude, position.coords.longitude);
////      map.addMarker({
////  lat: position.coords.latitude,
////  lng: position.coords.longitude,
////  title: '',
////  click: function(e) {
////  }
////});
////      debugger;
////     
////      
////   gettinglocation(position.coords.latitude,position.coords.longitude);
////      var c=localStorage.getItem('data')
////      var locations=JSON.parse(c);
////      var locat=locations.address_components;
////      debugger;
////      var d=locat.pop();
////      var m=locat[locat.length-2];
////      localStorage.setItem("country",JSON.stringify(d.long_name));
////      localStorage.setItem("locationadress1",JSON.stringify(m.long_name));
////      localStorage.setItem("nig",JSON.stringify(locat[0].long_name));
////      localStorage.setItem("city",JSON.stringify(locat[1].long_name));
////      console.log(localStorage.getItem('country'));
////      console.log(localStorage.getItem('locationadress1'));
////      console.log(localStorage.getItem('nig'));
////      console.log(localStorage.getItem('city'));
////      var JSon={
////          "country":localStorage.getItem('country'),
////          "locationadress1":localStorage.getItem('nig'),
//          "neighborhood":localStorage.getItem('nig'),
//          "city":localStorage.getItem('city')
//      }
//      var string1=JSON.stringify(JSon);
//localStorage.setItem('JSon',JSON.stringify(JSon));
//       localStorage.setItem("latitude",position.coords.latitude);
//       localStorage.setItem("longitudes",position.coords.longitude);
//      
//      //codeLatLng(position.coords.latitude,position.coords.longitude);
//     
//      var sli=$$("#slider").val();
//      var sl=parseInt(sli);
//      
//      polygon = map.drawCircle({
// lat: position.coords.latitude,
//  lng: position.coords.longitude,
//radius:sl,
//  strokeColor: '#BBD8E9',
//  strokeOpacity: 1,
//  strokeWeight: 3,
//  fillColor: '#BBD8E9',
//  fillOpacity: 0.6
//});
//      
//      
//  },
//  error: function(error) {
//    alert('Geolocation failed: '+error.message);
//  },
//  not_supported: function() {
//    alert("Your browser does not support geolocation");
//  },
//  always: function() {
//    alert("Done!");
//  }
//}); 
//});
//    
//   
//    
//     $$('#ul').on('click','label',function(){
//         lav=this.id;
//     });
//    
//    */
   
    $$("#Add").on('click',function(){
        var intin=$$("#intin").val();
        debugger;
        if( parseFloat(localStorage.getItem("longitudes"))==null || parseFloat(localStorage.getItem("latitude")==null  )){
           myApp.alert('please insert location');
           }
        else if(intin==null){
            myApp.alert('please insert intrest name');
        }
        else
        {
            debugger;
         
   var inet={
			"name": intin,
			"country": localStorage.getItem('country'),
			"city": localStorage.getItem('city'),
			"longitude":parseFloat(localStorage.getItem("longitudes")),
			"latitude": parseFloat(localStorage.getItem("latitude"))
		}
   
   inetrest.push(inet);
        console.log(inetrest);
    localStorage.setItem('intrest',JSON.stringify(inetrest));
    mainView.router.back({ url: "createcouminty.html"},{force:true});
        }
        
    });
    
});

myApp.onPageInit('Inrest', function (page) {
html='';
    $$("#IN").on('click',function(){
        debugger;
     myApp.prompt('Type your Intrest?', function (value) {
        //myApp.alert('Your name is "' + value + '". You clicked Ok button');
        html='<li class="item-content"><div class="item-media"><i class="icon checked"></i></div><div class="item-inner"><div class="item-title">'+value+'</div></div></li>';
         $$("#u").append(html);
    });    
        
    });
    
    
});

var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}