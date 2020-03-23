chrome.tabs.onActivated.addListener(function(activeInfo) {
    // how to fetch tab url using activeInfo.tabid
    chrome.tabs.get(activeInfo.tabId, function(tab){
        if(tab.url.match(/https:\/\/mail.google.com\//gi)) {
       console.log(tab.url);
    

chrome.identity.getAuthToken({
    interactive: true
}, function(token) {
    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }
    else{

        chrome.storage.local.set({'access_token': token});

    }
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