function joincom(OrderJsonObject){
    var id=localStorage.getItem('id');
    myApp.showPreloader("Loading");
    /*$$.post("http://sitrep.azurewebsites.net/api/JoinCommunity",
      OrderJsonObject,
        function(data,status){
        if(status==200){
            myApp.hidePreloader("Loading");
            myApp.alert("Try again");
        }
        myApp.alert(data);
        myApp.hidePreloader("Loading");
    });*/
    
$$.ajax({
  type: "POST",
  url: "http://sitrep.azurewebsites.net/api/JoinCommunity",
  data: OrderJsonObject,
  success: function(data){
       myApp.hidePreloader("Loading");
      myApp.alert(data);
  },
  error: function(XMLHttpRequest, textStatus, errorThrown) {
     myApp.hidePreloader("Loading");
      //myApp.alert(data);
  }
});
    
    
}

function joinUserInterest(OrderJsonObject){
    myApp.showPreloader("Loading");
    $.ajax({
        type: "POST",
        url: "http://sitrep.azurewebsites.net/api/AddUserInterest",
        data: OrderJsonObject,
        success: function(data){
          myApp.alert(data);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            myApp.alert("Error please contact the admin");
        },
        complete: function() {
            myApp.hidePreloader("Loading");
        }
    });   
}

function psotcoms(OrderJsonObject){
    debugger;
    /*myApp.showPreloader("Loading")
    $$.post("http://sitrep.azurewebsites.net/api/CreateCommunity",
      OrderJsonObject,
        function(data,status){
         if(status==200){
            myApp.hidePreloader("Loading");
            myApp.alert("Try again");
        }
        debugger;
        myApp.alert(data);
        myApp.hidePreloader("Loading");
    });*/
    
    
    $$.ajax({
  type: "POST",
  url: "http://sitrep2.azurewebsites.net/api/CreateCommunity",
  data: OrderJsonObject,
  success: function(data){
       myApp.hidePreloader("Loading");
      myApp.alert(data);
  },
  error: function(XMLHttpRequest, textStatus, errorThrown) {
     myApp.hidePreloader("Loading");
      myApp.alert(data);
  }
});
    
    
}

function psotsite(OrderJsonObject){
    debugger;
    myApp.showPreloader("Loading");
   /* $$.post("http://sitrep.azurewebsites.net/api/CreateSitrep",
      OrderJsonObject,
        function(data,status){
         if(status==200){
            myApp.hidePreloader("Loading");
            myApp.alert("Try again");
        }
       
        
        debugger;
        myApp.alert(data);
        myApp.hidePreloader("Loading");
    });*/
    
     $$.ajax({
  type: "POST",
  url: "http://sitrep.azurewebsites.net/api/CreateSitrep",
  data: OrderJsonObject,
  success: function(data){
       myApp.hidePreloader("Loading");
      myApp.alert(data);
  },
  error: function(XMLHttpRequest, data, errorThrown) {
     myApp.hidePreloader("Loading");
     // myApp.alert(data);
  }
});
    
    
}