window.onload = function () {



    InboxSDK.load(2, 'sdk_30275566_68262f84cc').then(function (sdk) {
        sdk.Compose.registerComposeViewHandler(function(composeView){
            composeView.addButton({
                title: "GMass Settings",
                type: "SEND_ACTION",
                orderHint: 1,
               // iconClass: (App.includes("Gmail") ? "GmailClassSettings" : "InboxClassSettings"),
                hasDropdown: true,
                onClick: function (event2) {
                },
                })






        });
    });
}