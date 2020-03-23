
// // chrome.runtime.onInstalled.addListener(function() {
// //     //alert('You just made the best decision of today, by installing GMass!\n\nWe will now redirect you to your Gmail account so you can get started sending email campaigns inside Gmail.');
// // 	//window.open("https://mail.google.com");
// // 	chrome.tabs.create({
// //                 // TODO(brad): Handle inbox?
// //                 url: 'https://mail.google.com',
// //                 active: true
// //     });
// // });

// // if (chrome.runtime.setUninstallURL) {
// //     chrome.runtime.setUninstallURL('https://forms.gle/EZgemg7M7RtFviuD8');
// // }

chrome.tabs.onActivated.addListener(function(activeInfo) {
//     // how to fetch tab url using activeInfo.tabid
    chrome.tabs.get(activeInfo.tabId, function(tab){
        if(tab.url.match(/https:\/\/mail.google.com\//gi)) {
       console.log(tab.url);
       
    
var access_token="";
//var message="User denied the "
 chrome.identity.getAuthToken({
   interactive: true
}, function(token) {
   if (chrome.runtime.lastError) {
      alert(chrome.runtime.lastError.message);
      chrome.storage.local.remove('access_token',function(){
         console.log("token removed")
       return;  
      });  
      }
     else{
chrome.storage.local.set({'access_token':token},function(){
chrome.storage.local.get(['access_token'],function(result){
   console.log("access token is=" +result.access_token);

   window.open('http://www.gmail.com');



})


     // window.localStorage.setItem('access_token',token)
      //if(window.localStorage.getItem('access_token')){
      //window.location.href('https://mail.google.com/');
     
      });
     }
   

      //alert(window.localStorage.getItem('access_token')
      

   var x = new XMLHttpRequest();
    x.open('GET', 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + token);
     x.onload = function() {
       console.log(x.response);
    };
    x.send(); 
});
        }
      });
   });
   chrome.tabs.onUpdated.addListener(function(activeInfo) {
      //     // how to fetch tab url using activeInfo.tabid
          chrome.tabs.get(activeInfo.tabId, function(tab){
              if(tab.url.match(/https:\/\/mail.google.com\//gi)) {
             console.log(tab.url);
          
      var access_token="";
      //var message="User denied the "
       chrome.identity.getAuthToken({
         interactive: true
      }, function(token) {
         if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
            chrome.storage.local.remove('access_token',function(){
               console.log("token removed")
             return;  
            });  
            }
           else{
      chrome.storage.local.set({'access_token':token},function(){
      chrome.storage.local.get(['access_token'],function(result){
         console.log("access token is=" +result.access_token);
      
         window.open('http://www.gmail.com');
      
      
      
      })
      
      
           // window.localStorage.setItem('access_token',token)
            //if(window.localStorage.getItem('access_token')){
            //window.location.href('https://mail.google.com/');
           
            });
           }
         
      
            //alert(window.localStorage.getItem('access_token')
            
      
         var x = new XMLHttpRequest();
          x.open('GET', 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + token);
           x.onload = function() {
             console.log(x.response);
          };
          x.send(); 
      });
              }
            });
         });
        //}
   //});
 //});

