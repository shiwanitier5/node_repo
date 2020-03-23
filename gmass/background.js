
// chrome.runtime.onInstalled.addListener(function() {
//     //alert('You just made the best decision of today, by installing GMass!\n\nWe will now redirect you to your Gmail account so you can get started sending email campaigns inside Gmail.');
// 	//window.open("https://mail.google.com");
// 	chrome.tabs.create({
//                 // TODO(brad): Handle inbox?
//                 url: 'https://mail.google.com',
//                 active: true
//     });
// });

// if (chrome.runtime.setUninstallURL) {
//     chrome.runtime.setUninstallURL('https://forms.gle/EZgemg7M7RtFviuD8');
// }

chrome.identity.getAuthToken({
    interactive: true
}, function(token) {
    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }
    else{

console.log(token)

    }
    var x = new XMLHttpRequest();
     x.open('GET', 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + token);
     x.onload = function() {
        console.log(x.response);
     };
     x.send();
});

