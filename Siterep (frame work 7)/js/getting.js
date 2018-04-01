function GettingBaseCommunity(){
    myApp.showPreloader("Loading");
    $$.ajax({
        url: "http://sitrep2.azurewebsites.net/api/GetAllCommunities?lastindex=0&pagesize=10&userId="+localStorage.getItem("id"),
        method: "GET",
        success: function (data) {
            var dataResult = JSON.parse(data);
            var result = dataResult.result;
            var html='';
            var getStatus = function(dataResult) {
                if(dataResult.isjoin){
                    return 3;
                } else if(dataResult.isfollow) {
                    return 2;
                } else {
                    return 1;
                }
            };
            var getStatusText = function(dataResult) {
                var status = getStatus(dataResult);
                if(status == 1) {
                    return "Join";
                } else if(status == 2) {
                    return "Requested";
                } else {
                    return "Joined";
                }
            };
            for(var i=0;i<result.length;i++){
                html+='<li class="item-content"><div class="item-inner"><div class="item-title">'+result[i].name+'</div><div style="padding-bottom:34px"class="item-after"><p><a data-id="'+result[i].id+'" data-status="'+getStatus(result[i])+'" data-ucid="'+result[i].ucid+'" href="#" class="button '+(getStatus(result[i]) == 1 ? 'join' : 'joined')+'">'+getStatusText(result[i])+'</a></p></div></div></li>';
            }
            $$("#communitylist").append(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            myApp.alert("Error please contact the admin");
        },
        complete: function() {
            myApp.hidePreloader("Loading");
        }
    });   
    
}

function GettingBaseInterest(){
    myApp.showPreloader("Loading");
    $$.ajax({
        url: "http://sitrep2.azurewebsites.net/api/GetAllInterests?lastindex=0&pagesize=10&userId="+localStorage.getItem("id"),
        method: "GET",
        success: function (data) {
            var dataResult = JSON.parse(data);
            var result = dataResult.result;
            var html='';
            for(var i=0;i<result.length;i++){
                html+='<li class="item-content"><div class="item-inner"><div class="item-title">'+result[i].name+'</div><div style="padding-bottom:34px"class="item-after"><p><a data-id="'+result[i].id+'" data-status="'+(result[i].isfollow ? 2 : 1)+'" data-uiid="'+result[i].uiid+'" href="#" class="button '+(result[i].isfollow ? 'joined' : 'join')+'">'+(result[i].isfollow ? 'UnFollow' : 'Follow')+'</a></p></div></div></li>';
            }
            $$("#interestlist").append(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            myApp.alert("Error please contact the admin");
        },
        complete: function() {
            myApp.hidePreloader("Loading");
        }
    });   
}

function GettingEditCommunity(){
    myApp.showPreloader("Loading");
    $$.ajax({
        url: "http://sitrep2.azurewebsites.net/api/GetMyCommunities?lastindex=0&pagesize=10&userId="+localStorage.getItem("id"),
        method: "GET",
        success: function (data) {
            var dataResult = JSON.parse(data);
            var result = dataResult.result;
            var html='';
            var getStatus = function(dataResult) {
                if(dataResult.isjoin){
                    return 3;
                } else if(dataResult.isfollow) {
                    return 2;
                } else {
                    return 1;
                }
            };
            var getStatusText = function(dataResult) {
                var status = getStatus(dataResult);
                if(status == 1) {
                    return "Join";
                } else if(status == 2) {
                    return "Requested";
                } else {
                    return "Joined";
                }
            };
            for(var i=0;i<result.length;i++){
                html+='<li class="item-content"><div class="item-inner"><div class="item-title">'+result[i].name+'</div><div style="padding-bottom:34px"class="item-after"><p><a data-id="'+result[i].id+'" data-status="'+getStatus(result[i])+'" data-ucid="'+result[i].ucid+'" href="#" class="button '+(getStatus(result[i]) == 1 ? 'join' : 'joined')+'">'+getStatusText(result[i])+'</a></p></div></div></li>';
            }
            $$("#mycommunitylist").append(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            myApp.alert("Error please contact the admin");
        },
        complete: function() {
            myApp.hidePreloader("Loading");
        }
    });   
    
}

function GettingEditInterest(){
    myApp.showPreloader("Loading");
    $$.ajax({
        url: "http://sitrep2.azurewebsites.net/api/GetMyInterests?lastindex=0&pagesize=10&userId="+localStorage.getItem("id"),
        method: "GET",
        success: function (data) {
            var dataResult = JSON.parse(data);
            var result = dataResult.result;
            var html='';
            for(var i=0;i<result.length;i++){
                html+='<li class="item-content"><div class="item-inner"><div class="item-title">'+result[i].name+'</div><div style="padding-bottom:34px"class="item-after"><p><a data-id="'+result[i].id+'" data-status="'+(result[i].isfollow ? 2 : 1)+'" data-uiid="'+result[i].uiid+'" href="#" class="button '+(result[i].isfollow ? 'joined' : 'join')+'">'+(result[i].isfollow ? 'UnFollow' : 'Follow')+'</a></p></div></div></li>';
            }
            $$("#myinterestlist").append(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            myApp.alert("Error please contact the admin");
        },
        complete: function() {
            myApp.hidePreloader("Loading");
        }
    });   
}

function GettingHomepage() {
    myApp.showPreloader("Loading");
    $$.ajax({
        url: "http://sitrep2.azurewebsites.net/api/GetAllSitreps?lastindex=0&pagesize=10&userId="+localStorage.getItem("id"),
        method: "GET",
        success: function (data) {
            var dataResult = JSON.parse(data);
            var result = dataResult.result;
            var html='';
            for(var i=0;i<result.length;i++){
                html+='<div class="card facebook-card"><div class="card-header"><div class="facebook-avatar"><img  src="http://sitrep2.azurewebsites.net/Image/GetUserPhoto/'+result[i].createdby+'" width="34" height="34"></div><div class="facebook-name">'+result[i].createdbyname+'</div><div class="facebook-date">Monday at 2:15 PM</div></div><div class="card-content"><div class="card-content-inner"><p>'+result[i].description+'</p><img src="http://sitrep2.azurewebsites.net/Image/GetSitrepPhoto/'+result[i].id+'" width="100%"><p class="color-gray">Likes: 112    Comments: 43</p></div></div><div class="card-footer"><a href="#" class="link">Like</a><a href="#" class="link">Comment</a><a href="#" class="link">Share</a></div></div>';
            }
            $$("#sitreplist").append(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            myApp.alert("Error please contact the admin");
        },
        complete: function() {
            myApp.hidePreloader("Loading");
        }
    });
}

function GettingPublicPrivateCommunities(){
    myApp.showPreloader("Loading");
    $$.ajax({
        url:" http://sitrep2.azurewebsites.net/api/GetPublicCommunities?lastindex=0&pagesize=10&userid="+localStorage.getItem('id'),
        method: "GET",
        success: function (data) {
            var dataResult = JSON.parse(data);
            var result = dataResult.result;
            var html='';  
            for(var i=0;i<result.length;i++){
                html+='<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner"><div class="item-title">"'+result[i].name+'"</div><div class="item-after"><input type="checkbox" name="public-checkbox" value="'+result[i].id+'"><div class="item-media"><i class="icon icon-form-checkbox"></i></div></div></div></li>';
            }
            $$("#publiccommunities").append(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            myApp.alert("Error please contact the admin");
        },
        complete: function() {
            myApp.hidePreloader("Loading");
        }
    });
    $$.ajax({
        url:" http://sitrep2.azurewebsites.net/api/GetPrivateCommunities?lastindex=0&pagesize=10&userid="+localStorage.getItem('id'),
        method: "GET",
        success: function (data) {
            var dataResult = JSON.parse(data);
            var result = dataResult.result;
            var html='';  
            for(var i=0;i<result.length;i++){
                html+='<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner"><div class="item-title">"'+result[i].name+'"</div><div class="item-after"><input type="checkbox" name="private-checkbox" value="'+result[i].id+'"><div class="item-media"><i class="icon icon-form-checkbox"></i></div></div></div></li>';
            }
            $$("#privatecommunities").append(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            myApp.alert("Error please contact the admin");
        },
        complete: function() {
            myApp.hidePreloader("Loading");
        }
    });
}

function GettingPRPU(){
    
    var id=localStorage.getItem('id');
     myApp.showPreloader("Loading");
    $$.ajax(
    {
        url:"http://sitrep.azurewebsites.net/api/GetPublicAndPrivateCommunities?userid="+id,
        method: "Get",
       
        success: function (data, xhr)
        {
            debugger;
            debugger;
            localStorage.setItem("PRPU",data);
          console.log(JSON.parse(localStorage.getItem("storeditem")));
           // GetPromotions();
        //  GetBundless();
            myApp.hidePreloader("Loading")
        //  Summation(data);
          var x= localStorage.getItem(0);
          var z=JSON.parse(x);
            
            
        },
        error: function (jqXhr, textStatus, errorThrown)
        {
                debugger;
          myApp.alert('error');
             myApp.hidePreloader();
        }
    });   
     
    
}

function appnedPRPU(){    
}

function appendloc(){
    debugger;
    var string=localStorage.getItem('JSon');
    var json=JSON.parse(string);
    html='<li> <label class="label-radio item-content"><input type="radio" name="my-radio" value="Books" checked="checked"><div class="item-media"><i class="icon icon-form-radio"></i></div><div class="item-inner"><div class="item-title">"'+json.country+'"</div></div></label></li><li> <label class="label-radio item-content"><input type="radio" name="my-radio" value="Books" checked="checked"><div class="item-media"><i class="icon icon-form-radio"></i></div><div class="item-inner"><div class="item-title">"'+json.locationadress1+'"</div></div></label></li><li> <label class="label-radio item-content"><input type="radio" name="my-radio" value="Books" checked="checked"><div class="item-media"><i class="icon icon-form-radio"></i></div><div class="item-inner"><div class="item-title">"'+json.city+'"</div></div></label></li>><li> <label class="label-radio item-content"><input type="radio" name="my-radio" value="Books" checked="checked"><div class="item-media"><i class="icon icon-form-radio"></i></div><div class="item-inner"><div class="item-title">"'+json.neighborhood+'"</div></div></label></li>';
    $$("#ul").append(html); 
    
   /* html=''
    for(var i=1;i<json.length;i++){
    html+='<li> <label id="'+loc0[i].long_name+'"  class="label-radio item-content"><input type="radio" name="my-radio" value="Books" checked="checked"><div class="item-media"><i class="icon icon-form-radio"></i></div><div class="item-inner"><div class="item-title">"'+loc0[i].long_name+'"</div></div></label></li>';}*/
}

function appendintrest(){
    debugger;
    html='';
    if(inetrest.length){
        
    }else{
for(var i=0;i<inetrest.length;i++){
html='<div><div style="margin-left:10%;margin-top:5%" class="row"><div class="col-33 item-title">Intrest 01</div><div class="col-15"><span class="badge">x</span></div><div class="col-33 item-title">Location 01</div><div class="col-15"><i class="icon loc"></i></div></div></div>';
}
    }
    $$('#addintrest').append(html);
    
}

function gettinglocation(lat,lng){
    var locations="r";
    debugger;
    $$.ajax({
        url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true",
        method: "GET",
        success: function (data){
            //console.log(data);
            debugger;
            
            var json=JSON.parse(data);
            var jsonL1=json.results;
            var jsonL2=jsonL1[2];
            console.log(jsonL2);
             localStorage.setItem('data',JSON.stringify(jsonL2));
            }
            });
   
}


/*function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
         //formatted address
         alert(results[0].formatted_address)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                    break;
                }
            }
        }
        //city data
        alert(city.short_name + " " + city.long_name)


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });}*/