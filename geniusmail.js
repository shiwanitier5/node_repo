

   
    window.onload = function () {

        chrome.storage.local.get(['access_token'],function(result){
            console.log("access token is=" + result.access_token);
            if(result.access_token==undefined||result.access_token==null){
                console.log("Access Token not found");
            }
      
else{
    if(result.access_token){
        console.log("Access Token Found")
        //var GMassDebug = false;
        InboxSDK.loadScript('geniusmail.css')
    InboxSDK.load(2, 'sdk_30275566_68262f84cc').then(function (sdk) {


        sdk.Compose.registerComposeViewHandler(function(composeView){
            var settingsID = makeid();
            composeView.setSubject("Greetings");
            composeView.setToRecipients(["cshiwani92@gmail.com","susmita.biswas@tier5.in"]);




          
                ///iconUrl:'https://www.pikpng.com/pngl/b/52-526875_gmail-logo-gmail-clipart.png',
                
               // iconClass: (App.includes("Gmail") ? "GmailClassSettings" : "InboxClassSettings"),
               composeView.addButton({
                title: "Click this GMass button instead of Send, and individual emails will be sent to each address in the To field.",
                type: "SEND_ACTION",
                orderHint: 0,
                iconClass: (App.includes("Gmail") ? "GmailClass" : "InboxClass"),
                hasDropdown: false,
                onClick: function (event) {

                   // ClickGMassButton(event);


                } //add button onclick closing

            }); //add button closing
              
            composeView.addButton({
                title: "GMass Settings",
                type: "SEND_ACTION",
                orderHint: 1,
                iconClass: (App.includes("Gmail") ? "GmailClassSettings" : "InboxClassSettings"),
                
               iconUrl:"https://www.gmass.co/images/gmass_button_options-ver3.png",
                hasDropdown: true,
                onClick: function (event2) {

                   
                var GMassPersonalization="";
               // var SettingsFormed = false;
var GMassPersonalization = "";
                    //var AccountStatusRetrieved = false;
                   // var TestButton;
                    var SettingsBox = document.createElement("div");

                    SettingsBox.id = settingsID;
                    document.body.appendChild(SettingsBox);
                
                var OptionsBox = '<div class="g_settings" id="' + settingsID + 'bigdiv" style="background: #FFFFFF; overflow-y: auto; max-height: 740px;">'
                            if (GMassPersonalization.length>0) {

                                OptionsBox = OptionsBox + '<div class="g_personalize"><div>Personalize:</div> <select id="' + settingsID + 'Personalize"><option></option>';

                                //var arrayFields = GMassPersonalization.split(',');
                                var arrayFields = GMassPersonalization;
                                if (arrayFields.length > 0) {
                                    for (i = 0; i < (arrayFields.length) ; i++) {
                                        OptionsBox = OptionsBox + '<option value="{' + arrayFields[i] + '}" class="GMassField">' + arrayFields[i] + '</option>';
                                    }
                                }
                                OptionsBox = OptionsBox + '</select></div>';
                            }
                                //non sheets
                            else {

                                OptionsBox = OptionsBox + '<div class="g_personalize"><div>Personalize:</div>  \
                                    <select id="' + settingsID + 'Personalize">\
                                    <option></option><option value="{FirstName|Friend}" class="GMassField">First Name</option> \
                                    <option value="{LastName}" class="GMassField">Last Name</option> \
                                    <option value="{EmailAddress}" class="GMassField">Email Address</option></select></div>';


                            }
                            
                            

                            //unsubscribe button and open/click tracking
                            OptionsBox = OptionsBox + '<div class="g_unsubscribe"><a class="GMassFieldUnsub">Unsubscribe Link</a> <a id="unsubcopy"><img style="vertical-align: middle;" src="https://www.gmass.co/images/page_white_copy.png" alt="Copy to clipboard"></a></div>'

                            //opens and clicks
                            OptionsBox += '<div class="g_track"><div>Track:</div><div><label class="g_checkbox"><input type=checkbox name="OpenTracking" id="' + settingsID + 'OpenTracking" [OPENON]> <span>Opens</span></label> &nbsp;&nbsp;&nbsp;<label class="g_checkbox"><input type=checkbox name="ClickTracking" id="' + settingsID + 'ClickTracking" [CLICKON]> <span>Clicks</span></label></div></div>'

                            //Send as field
                            //if (!composeView.isInlineReplyForm()) { OptionsBox = OptionsBox + '<div style="padding: 7px; overflow: auto; background: #FFFFFF"><div style="float: left; width: 120px; font-weight: bold">Send as:</div><div style="float: left; font-size:8pt"></div></div>'; }

                            //action field
                            if (!composeView.isInlineReplyForm()) { OptionsBox = OptionsBox + '<div class="g_action"><div>Action:</div><div><label class="g_radio"><input type=radio [SEND] id="' + settingsID + 'SendRadio" name="' + settingsID + 'SendSave" value=1> <span>Send emails</span></label>&nbsp;&nbsp;&nbsp;&nbsp;<label class="g_radio"><input type=radio [SAVE] id="' + settingsID + 'SaveRadio" name="' + settingsID + 'SendSave" value=2> <span>Create Drafts</span></label> </div></div>'; }

                            

                        SettingsBox.innerHTML = OptionsBox;
                        event2.dropdown.el.appendChild(SettingsBox);

                            //need to pull test addresses from database, add them to the regular select box as options
                            //then below, setting its value to myTestAddresses should work as long as DB contains those values, which it won't the first time user uses
                            //DB should always include user account address in results, so when user uses first time, default email is filled out
                            //will have to test with brand new account and cleared out localstorage


                            // $('#' + settingsID + 'Personalize').select2({
                            //     dropdownParent: $('#' + settingsID + 'bigdiv'),
                            //     width: "resolve",
                            //     placeholder: ((GMassPersonalization.length > 0) ? "Select Spreadsheet Field" : "Select Field")
                            // });

                            $('#' + settingsID + 'Personalize').on('change', function (e) {
                                console.log("changing");
                                //InsertFieldDD(document.getElementById(settingsID + "Personalize").value, composeView);
                                var PersonalizationToken = document.getElementById(settingsID + "Personalize").value;
                                CopyClipboard(PersonalizationToken);
                                sdk.ButterBar.showMessage({ html: "The  personalization variable, <span style='color: #BFFFC5'>" + PersonalizationToken + "</span>, has been copied to your clipboard. Now you can PASTE it in your <span style='color: #BFFFC5'>Subject</span> or <span style='color: #BFFFC5'>Message</span>.", time: 10000 });

                            });


                        
                            // if (LoadedCampaigns==false){
                            //     LoadedCampaigns = true;
                            //     LoadCampaigns();
                            // }
                            

                    //     }
                        
                    // }, 100);
                       
                },
                
                
                
                // closing onclick handler
            }); //add button closing

          
                
            var boolForceShowSend = false;
            var SendButtonAll = ((App.includes("Gmail")) ? document.querySelectorAll('[data-tooltip*="Enter"][data-tooltip-delay="800"][role="button"]') : document.querySelectorAll('div.sY.dy.Go.qj[aria-disabled="false"]'));
                    if (SendButtonAll.length == 1) {
                        
                        var SendButton = ((App.includes("Gmail")) ? document.querySelector('[data-tooltip*="Enter"][data-tooltip-delay="800"][role="button"]') : document.querySelector('div.sY.dy.Go.qj'));
                        var SendSettings = SendButton.nextSibling;
                        if (SendButton != null) {
                            var SendDisplay = SendButton.style.display;
                            
                            //alert(SendDisplay);
                            //SendButton.style.display = "none";
                            var SendButtonHide = setInterval(function () {
                                if ((composeView.getToRecipients().length)>0 && (!boolForceShowSend)) {
                                    
                                  if (SendButton.style.display == "") {
                                //         if (!IsScheduled) {
                                //             if (composeView.getToRecipients()[0].emailAddress == "cancel@gmass.co"){
                                //                 sdk.ButterBar.showMessage({ html: "Oh no! Looks like you're about to cancel your subscription. If there's anything I can do to save you, email our founder at ajay@wordzen.com. Also, just FYI, you can <a style=\"color: #99FFFF\" href=\"https://www.gmass.co/g/transfer\" target=\"_blog\">transfer</a> your subscription to another Gmail account. Lastly, we've hidden the Send button to make sure you don't press it by mistake. Want it back? Add ShowSend@gmass.co to the To field.", time: 20000 });
                                //             }
                                //             else if (composeView.getToRecipients()[0].emailAddress.includes("@gmass.co") && !ComposeFirstAddressAlias(composeView)){
                                //                 sdk.ButterBar.showMessage({ text: "Looks like you're about to issue a GMass command, so we've hidden the Send button to make sure you don't press it by mistake. Want it back? Add ShowSend@gmass.co to the To field.", time: 10000 });
                                //             }
                                //             else
                                //             {
                                                sdk.ButterBar.showMessage({ text: "We've hidden the Send button to prevent you from making a dastardly mistake! Want it back? Add ShowSend@gmail.com to the To field.", time:1000 });
                                           }
                                       // }
                                        SendButton.style.display = "none";
                                        SendSettings.style.display = "none";
                                }
                                
                                        
                                            if (composeView.getToRecipients().length > 0 && composeView.getToRecipients()[composeView.getToRecipients().length - 1].emailAddress.toLowerCase() == "showsend@gmail.com") {
                                              boolForceShowSend = true;
                                               clearInterval(SendButtonHide);
                                           
                                            
                                           SendButton.style.display = "";
                                            SendSettings.style.display = "";
                                            sdk.ButterBar.showMessage({ text: "Congratulations you got your Send Button back", time:1000 });
                                            }

                                           
                                           
                                
                            
                        
                           
                    
                
                                

                            


                              
                                    
                                    
                                 

                                     
                                
                                    }, 3000);
                                }
                                
                            
                        }
                        
                     
                });
        //             


       // try {

        var ComposeTagger = "x";
        var QuerySelector = "";

        //aleraklsjd("dsf");

        var GMassSearch;
        var SearchInput;

        //determine old gmail vs new gmail vs inbox
        if (document.location.href.indexOf("mail.google.com") >= 0) {

            if (sdk.User.isUsingGmailMaterialUI()) {
                App = "newGmail";

            }
            else {
                App = "oldGmail";

            }
        }
        else {
            App = "Inbox"

        }
        //*********************


        //begin interval

            var SearchInputCounter = 0;
            var SearchInputExists = setInterval(function() {

                if (SearchInputCounter >= 100){

                    clearInterval(SearchInputExists);

                }
                if (document.querySelector("input[spellcheck='false'][name='q']") != null){

                    clearInterval(SearchInputExists);
                    SearchInput = document.querySelector("input[spellcheck='false'][name='q']");

                }

                SearchInputCounter++;

            }, 500);

            //********

            var TopAreaCounter = 0;
            var TopAreaExists = setInterval(function() {

                if (TopAreaCounter >= 100){

                    clearInterval(TopAreaExists);
                    //NotifyMissingElementNotify("after 100 tries, top area div didn't reveal");

                }

                if (document.querySelector("[role='search']") != null){

                    clearInterval(TopAreaExists);

                    var searchForm = document.querySelector("[role='search']");

                    var SearchWidth = searchForm.parentElement;
                    
                    var varTestElement = SearchWidth.parentElement;
                    var varElements = SearchWidth.parentElement;
                    var varElements2 = SearchWidth.parentElement;
                    var varElements3 = SearchWidth.parentElement;


                    if (App == "newGmail") {
                        var divButtons = document.createElement("div");
                        divButtons.style.width = "100%";
                        divButtons.style.display = "flex";
                    }

                    //made this a DIV instead of a button for improved stability. as a button, sometimes onClick wouldn't fire right, and gmail would just refresh itself and re-load.
                    // GMassSearch = document.createElement("div");
                    // GMassSearch.setAttribute("id", "gmassbutton");
                    // //GMassSearch.innerHTML="COMPOSE FROM SEARCH&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                    // GMassSearch.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";

                    // //have to add onClick event handler this way, because if I added it via setAttribute, certain commands wouldn't fire. an "alert" would fire, but a document.location.href assignment wouldn't. also couldn't call a function on this very page
                    // GMassSearch.addEventListener("click", function () {

                    //     //CheckAuth(true);

                    //     //did this need to call a separate function? not sure -- sometimes the HTTP call would get suddenly cancelled, and GMassSearch wouldn't exist as an object at that time. was hoping that by transferring to a different function, GMassSearch's state wouldn't matter
                    //    // GenerateDraft();

                    // });

                    // //varElements is looking for the search area
                    // //varElements = document.querySelector(QuerySelector);

                    // if (App == "newGmail") {
                    //     GMassSearch.style.width = "20px";
                    // }
                    // GMassSearch.style.display = 'none';
                    // GMassSearch.style.marginLeft = '2px';
                    // GMassSearch.style.backgroundColor = "gray";
                    // GMassSearch.style.color = "white";
                    // GMassSearch.style.padding = "9px 5px 0px 12px";
                    // GMassSearch.style.fontWeight = "bold";
                    // GMassSearch.style.fontSize = "11px";
                    // GMassSearch.style.backgroundPosition = "center center";
                    // GMassSearch.style.backgroundRepeat = "no-repeat";
                    // GMassSearch.style.backgroundImage = "url('https://www.gmass.co/images/MagnifyingGlassGrayFlipped-small.png')";
                    // GMassSearch.style.cursor = "pointer";
                    // GMassSearch.title = "Build an email list from Gmail search results.";
                    // //so that stand along compose window doesn't result in error
                    // if (App == "newGmail") {
                    //     //here we are appending to our own element, so this will always work
                    //     divButtons.appendChild(GMassSearch);
                    // }
                    // else {
                    //     //old gmail
                    //     //varElements is the whole search area, so we are appending the search button here
                    //     if (varElements != null) {
                    //         varElements.appendChild(GMassSearch);
                    //     }
                    //     else {
                    //        // NotifyMissingElement(App + " varElements search area" + " NOT FOUND queryselector ");
                    //     }
                    // }

                    
                    //GMassImport is the spreadsheets button
                    var GMassImport = document.createElement("div");
                    GMassImport.setAttribute("id", "gmassimport");
                    GMassImport.innerHTML = "&nbsp;&nbsp;&nbsp;";

                    //varElements2 is also looking for the search area
                    //varElements2 = document.querySelector(QuerySelector);
                    
                    if (App == "newGmail") {
                        GMassImport.style.width = "20px";
                    }

                    GMassImport.style.display = 'block';
                    GMassImport.style.marginLeft = '2px';
                    GMassImport.style.color = "white";
                    GMassImport.style.padding = "9px 5px 0px 12px";
                    GMassImport.style.fontWeight = "bold";
                    GMassImport.style.fontSize = "11px";
                    GMassImport.style.backgroundPosition = "center center";
                    GMassImport.style.backgroundRepeat = "no-repeat";
                    GMassImport.style.backgroundColor = "#c42329";
                    GMassImport.style.backgroundImage = "url('https://www.gmass.co/images/GMassSheetsIcon-tiny.png')";
                    GMassImport.style.cursor = "pointer";
                    GMassImport.title = "Connect to an email list in a Google Docs spreadsheet.";
                    GMassImport.addEventListener("click", function () {

                            sdk.ButterBar.showMessage({ text: "Checking Google Sheets permissions...", time: 5000 });
                            
                           
                    
                            //on all checkauths, like this one, can't just see if it returns true/false, then decide what to do. because it won't wait for the xmlhttp asynchronous to run, so return value is never right
                            //CheckAuthSheets(true);
                            LaunchImport() ;

                    });

                    if (App == "newGmail") {
                        //appending to our own element, so this will always work
                        divButtons.appendChild(GMassImport);
                    }
                    else {
                        //old gmail
                        if (varElements2 != null) {
                            varElements2.appendChild(GMassImport);
                        }
                        else {
                            //don't need this. if varElements2 is null so is 1
                            //NotifyMissingElement(App + " varElements2 search area");
                        }
                    }

                    //campaign followup button
                    var GMassCampaigns = document.createElement("div");
                    GMassCampaigns.setAttribute("id", "gmasscampaigns");
                    GMassCampaigns.innerHTML = "&nbsp;&nbsp;&nbsp;";

                    //same thing, varElements3 is the search area
                    //varElements3 = document.querySelector(QuerySelector);

                    if (App == "newGmail") {
                        GMassCampaigns.style.width = "20px";
                    }

                    GMassCampaigns.style.display = 'block';
                    GMassCampaigns.style.marginLeft = '2px';
                    GMassCampaigns.style.color = "white";
                    GMassCampaigns.style.padding = "9px 5px 0px 12px";
                    GMassCampaigns.style.fontWeight = "bold";
                    GMassCampaigns.style.fontSize = "11px";
                    GMassCampaigns.style.backgroundPosition = "center center";
                    GMassCampaigns.style.backgroundRepeat = "no-repeat";
                    GMassCampaigns.style.backgroundColor = "#c42329";
                    GMassCampaigns.style.backgroundImage = "url('https://www.gmass.co/images/GMassFollowupIcon.png')";
                    GMassCampaigns.style.cursor = "pointer";
                    GMassCampaigns.title = "Send a follow-up campaign based on opens and clicks.";
                    GMassCampaigns.addEventListener("click", function () {

                        //LaunchFollowup();


                    });


                    if (App == "newGmail") {
                        //appending to our own element, so this will always work
                        divButtons.appendChild(GMassCampaigns);
                    }
                    else {
                        if (varElements3 != null) {
                            varElements3.appendChild(GMassCampaigns);
                        }
                        else {
                            //don't need this. if varElements3 is null so is 1
                            //NotifyMissingElement(App + " varElements3 search area");
                        }
                    }


                    if (App == "newGmail") {
                        if (varElements != null) {
                            
                            varElements.insertBefore(divButtons, varElements.lastChild);
                        
                            if (SearchWidth != null) {
                                //this doesn't keep the search bar wide anymore - 4/24/19
                                //SearchWidth.style.maxWidth = "720px";
                                SearchWidth.style.paddingRight = "5px";
                                SearchWidth.style.maxWidth = "722px";
                            }
                            else {
                                //NotifyMissingElement("search width issue couldnt be set to 720x because querySelector NOT FOUND ");
                            }

                        }
                        else {
                            //butterbar alert
                            window.onload = function(e){ 
                                sdk.ButterBar.showMessage({ html: "<span style='color: red'>WARNING:</span><span style='color: yellow'>" + Date() + ":</span> The GMass buttons at the top didn't load. This includes the Build List button, the Google Sheet Connector button, and the Manual Followup button. This happens when Google changes Gmail's code, and GMass hasn't adapted yet. Usually our engineers react right away, and this should be fixed shortly. Feel free to also <a style='color: #99FFFF' target='_blog' href='https://www.gmass.co/g/support'>submit a support request</a> to make sure we're aware.", time: 20000 });

                            }
                            //NotifyMissingElement(App + " varElements search area NOT FOUND QuerySelector ");
                        }
                    }

                    //whether to display the Gmass Search button in gray or red
                    //var MainBB = setInterval(BBFunc, 1000);


            }
            else{
                console.log("waiting for top area: " + TopAreaCounter);
            }

            TopAreaCounter++;

        //end interval
        }, 500);
       

   // }
       // catch(e){
           // console.log("Error");





       // }
        // function LaunchImport1() {


        //     var spreadsheetPop=document.createElement("div");
        //     spreadsheetPop .style.color = "black";
        //     spreadsheetPop.style.width = "300px";
        //     spreadsheetPop.style.height = "300px";
        //     spreadsheetPop.style.borderColor = "black";
        //     spreadsheetPop.style.borderStyle = "solid";
        //     spreadsheetPop.style.backgroundColor = "white";
        //     spreadsheetPop.style.display = "none";
        //     spreadsheetPop .setAttribute("id", "spreadsheet");
           
        //     document.body.appendChild(spreadsheetPop);
        //     var TestBPopup = $('#spreadsheet').bPopup({ opacity: 0.6, });
            


        // }
        // function CheckAuthSheets(buttonClicked) {

        //     var xmlhttpUser = new XMLHttpRequest();
        //     xmlhttpUser.open("GET", varBaseURL + "data/userhassheetspermission?emailaddress=" + sdk.User.getEmailAddress());
        //     xmlhttpUser.send();

        //     xmlhttpUser.onreadystatechange = function () {
        //         if (xmlhttpUser.readyState == 4) {
        //             UserResult = JSON.parse(xmlhttpUser.responseText);

        //             if (UserResult.hasSheetsPermission) {
        //                 //localStorage.setItem("SheetsPermission", "false");
        //             //     if (buttonClicked) { 
        //             //         if (UserResult.userExists){
        //             //             LaunchAuth(false, true, sdk.User.getEmailAddress(), 3); 
        //             //         }
        //             //         else{
        //             //             LaunchAuth(false, true, sdk.User.getEmailAddress(), 1); 
        //             //         }
        //             //     }
        //             // }
                   
                    
        //                 //localStorage.setItem("SheetsPermission", "true");
        //                 if (buttonClicked) {
        //                     LaunchImport();
        //                 }
    
        //             }

        //         }
        //     }

        // }
       
        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        
            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
        
            return text;
        }
        function CopyClipboard(itemCopy){

            var textArea = document.createElement("textarea");
           textArea.value = itemCopy;
      document.body.appendChild(textArea);
           textArea.select();
            document.execCommand("Copy");
            textArea.remove();
           
      }

        
        
function LaunchImport(){

    var MainSheetsDiv = document.createElement("div");
    MainSheetsDiv.style.color = "black";
    MainSheetsDiv.style.width = "600px";
    MainSheetsDiv.style.borderColor = "black";
    MainSheetsDiv.style.padding = "8px";
    MainSheetsDiv.style.borderStyle = "solid";
    MainSheetsDiv.style.backgroundColor = "white";
    MainSheetsDiv.style.display = "none";
    MainSheetsDiv.style.marginTop = "20px";
    MainSheetsDiv.setAttribute("id", "mainsheetsdiv");
    MainSheetsDiv.innerHTML = "<div><div style=\"text-align: center\"><img width=\"80px\" src=\"https://www.gmass.co/Extension2019Images/google_sheet_1.png\"></div><div style=\"margin-bottom: 20px; text-align: center\">Choose a Google Sheet below.</div><form id=\"SheetsForm\"></form></div>";
    document.body.appendChild(MainSheetsDiv);
    var SheetsFormDiv = document.getElementById("SheetsForm");

                        //get rid of the sheets dropdown
                        // if (document.getElementById('divsheets') != null) {
                        //     document.getElementById('divsheets').remove();
                        // }
                        // //if worksheets dropdown exists remove it
                        // if (document.getElementById('divworksheets') != null) {
                        //     document.getElementById('divworksheets').remove();
                        // }


                        //create the sheets div
                        var divSheets = document.createElement("div");
                        divSheets.id = "divsheets";
                        divSheets.style.padding = '3px';
                        divSheets.style.marbinBottom = "4px";
                        divSheets.innerHTML = "<span>Google Sheets:</span>"

                        var WaitingStatus = document.createElement("div");
                        WaitingStatus.id = "waitingstatus";
                        WaitingStatus.style.display = "none";
                        WaitingStatus.style.color = "blue";
                        WaitingStatus.style.padding = "3px";
                        WaitingStatus.innerHTML = "Please wait...";

                        var EverythingButSheetsDD = document.createElement("div");
                        EverythingButSheetsDD.id = "everythingbutsheetsdd";
                        EverythingButSheetsDD.style.display = "none";
                        EverythingButSheetsDD.style.padding = "3px";

                        //create the sheets SELECT
                        var elSheets = document.createElement("select");
                        elSheets.id = "selectsheets";
                        elSheets.style.width = "550px";

                        //adding the Sheets div/dropdown to the Sheets form
                        SheetsFormDiv.appendChild(divSheets);
                        SheetsFormDiv.appendChild(WaitingStatus);
                        SheetsFormDiv.appendChild(EverythingButSheetsDD);
                        divSheets.appendChild(elSheets);
                        // var myoption;

                        

                        // //going through the list of sheets and creating option for each of them
                        

                        //     myoption = document.createElement("option");
                        //     myoption.text = "";
                        //     myoption.value = "";
                        //     elSheets.add(myoption);

                        //    // var arraySheetsLength = resultSheets.spreadsheets.length;

                        //    // for (i = 0; i < (resultSheets.spreadsheets.length) ; i++) {

                        //         myoption = document.createElement("option");
                        //         //myoption.text = resultSheets.spreadsheets[i].Title;
                        //        // myoption.value = resultSheets.spreadsheets[i].Id;
                        //         myoption.setAttribute("UpdatedTime");
                        //         elSheets.add(myoption);

                        

                            //creating div for the worksheets
                            // var divWorksheets = document.createElement("div");
                            // divWorksheets.id = "divworksheets";
                            // divWorksheets.innerHTML = "Worksheets: ";
                            // //Worksheets div/dropdown should be hidden to begin with, until a spreadsheet is chosen
                            // //divWorksheets.style.display = 'none';
                            // //divWorksheets.style.padding = '3px';

                            // //adding the div and select for the worksheets to the form
                            // EverythingButSheetsDD.appendChild(divWorksheets);
                            // //divWorksheets.appendChild(SelectWorksheets);

                            // //adding the checkbox for duplicate
                            // var divDupes = document.createElement("label");
                            // divDupes.id = "divdupes";
                            // divDupes.className = 'g_checkbox';
                            // divDupes.innerHTML = "<span>Keep Duplicates:</span> ";
                            // //divDupes.style.visibility = 'hidden';
                            // //divDupes.style.padding = '3px';
                            // divDupes.style.fontSize = '10pt';
                            // var checkboxDupes = document.createElement("input");
                            // checkboxDupes.type = "checkbox";
                            // checkboxDupes.id = "formcheckbox";


    // var divSheets = document.createElement("div");
    // divSheets.id = "divsheets";
    // divSheets.style.padding = '3px';
    // divSheets.style.marbinBottom = "4px";
    // divSheets.innerHTML = "<span>Google Sheets:</span>"

    // var WaitingStatus = document.createElement("div");
    // WaitingStatus.id = "waitingstatus";
    // WaitingStatus.style.display = "none";
    // WaitingStatus.style.color = "blue";
    // WaitingStatus.style.padding = "3px";
    // WaitingStatus.innerHTML = "Please wait...";

    // var EverythingButSheetsDD = document.createElement("div");
    // EverythingButSheetsDD.id = "everythingbutsheetsdd";
    // EverythingButSheetsDD.style.display = "none";
    // EverythingButSheetsDD.style.padding = "3px";

    // //create the sheets SELECT
    // var elSheets = document.createElement("select");
    // elSheets.id = "selectsheets";
    // elSheets.style.width = "550px";

    // //adding the Sheets div/dropdown to the Sheets form
    // SheetsFormDiv.appendChild(divSheets);
    // SheetsFormDiv.appendChild(WaitingStatus);
    // SheetsFormDiv.appendChild(EverythingButSheetsDD);
    // divSheets.appendChild(elSheets);
    // var SheetsConnectButton = document.createElement("div");
    // SheetsConnectButton.style.width = "300px";
    // SheetsConnectButton.style.textAlign = "center";
    // SheetsConnectButton.style.color = "white";
    // SheetsConnectButton.style.padding = "9px 5px 9px 12px";
    // SheetsConnectButton.style.fontWeight = "bold";
    // SheetsConnectButton.style.fontSize = "11px";
    // SheetsConnectButton.style.borderRadius = "8px";
    // SheetsConnectButton.style.margin = "auto";
    // SheetsConnectButton.style.backgroundColor = "gray";
    // SheetsConnectButton.style.marginTop = "20px";
    // SheetsConnectButton.style.cursor = "pointer";
    // SheetsConnectButton.innerHTML = "CONNECT TO SPREADSHEET";
    // SheetsConnectButton.id = "ConnectButton";
   var myBPopup = $('#mainsheetsdiv').bPopup({
        opacity: 0.6,
    });






}
        

        // function BBFunc() {

        //     if (GMassSearch != null){
        //         if (((App == "Inbox") && ((document.location.href.search("cluster") >= 0) || (document.location.href.search("search") >= 0))) ||
        //             ((App.includes("Gmail")) && (((document.location.href.search("#search") >= 0) || (document.location.href.search("#advanced-search") >= 0) ||
        //                 (document.location.href.search("#label") >= 0))))) {

        //             GMassSearch.style.display = "block";
        //             GMassSearch.style.backgroundColor = "#c42329";
        //             GMassSearch.style.backgroundImage = "url('https://www.gmass.co/images/MagnifyingGlassRedFlipped-small.png')";

        //         }
        //         else {

        //             GMassSearch.style.display = "none";
        //             GMassSearch.style.backgroundColor = "gray";
        //             GMassSearch.style.backgroundImage = "url('https://www.gmass.co/images/MagnifyingGlassGrayFlipped-small.png')";

        //         }
        //     }
        // }
    });

}
}
        });


        
    }
