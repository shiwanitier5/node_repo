//This is a remotely loaded script for the GMass Chrome extension.
//This extension is made by Wordzen, Inc., out of Chicago, IL. The GMass website is www.gmass.co and the company website is www.wordzen.com.
//This file is remotely loaded so that we can make changes to the functionality and features on the fly without requiring a full extension update.
//Questions, contact: contact@wordzen.com
//This code is Copyright 2019, Wordzen, Inc.
//minify first: http://jscompress.com/
//obfuscate: https://javascriptobfuscator.com/Javascript-Obfuscator.aspx

//varBaseURL = "https://www.gmass.co/"
var GMassDebug = false;
var ShouldLaunchSample = true;
varBaseURL = "https://extension.gmass.co/";
varBaseURLWZ = "https://www.wordzen.com/";
varAlertDisabledMessage = "You've disabled JavaScript alerts, which disables most GMass functionality. Please close your Chrome browser entirely and re-launch to fix this. <a href=\"http://www.gmass.co/blog/beware-of-the-checkbox-in-the-alert-box-when-sending-email-campaigns-with-gmail/\">See this blog post for more information.</a>";
var JSVersion = "199";


    //5/24/19 adding window onloack back because it fixes issue reported by mopton@terrascapeslandscapedesign.com
    window.onload = function () {



        InboxSDK.load(2, 'sdk_wordzen_7bc143d54d').then(function (sdk) {

            try {

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
                        NotifyMissingElementNotify("after 100 tries, top area div didn't reveal");

                    }

                    if (document.querySelector("[role='search']") != null){

                        clearInterval(TopAreaExists);

                        var searchForm = document.querySelector("[role='search']");

                        var SearchWidth = searchForm.parentElement;
                        
                        var varTestElement = SearchWidth.parentElement;
                        var varElements = SearchWidth.parentElement;
                        var varElements2 = SearchWidth.parentElement;
                        var varElements3 = SearchWidth.parentElement;

                        //have to have this here because the input box doesn't appear until after this other stuff also exists
                        

                        



                        //https://www.dropbox.com/s/3ohg2e4a0xrt85u/Screenshot%202019-05-08%2002.44.02.png?dl=0
                        //var QuerySelectorSearchDivNewGmail = ".gb_be";
                        //gb_9d gb_be
                        

                        //var QuerySelectorSearchInput = "";
                        //var QuerySelectorSearchInputNonEnglish = "input[placeholder='Cerca nella posta']";






                        if (App == "newGmail") {
                            var divButtons = document.createElement("div");
                            divButtons.style.width = "100%";
                            divButtons.style.display = "flex";
                        }

                        //made this a DIV instead of a button for improved stability. as a button, sometimes onClick wouldn't fire right, and gmail would just refresh itself and re-load.
                        GMassSearch = document.createElement("div");
                        GMassSearch.setAttribute("id", "gmassbutton");
                        //GMassSearch.innerHTML="COMPOSE FROM SEARCH&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                        GMassSearch.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";

                        //have to add onClick event handler this way, because if I added it via setAttribute, certain commands wouldn't fire. an "alert" would fire, but a document.location.href assignment wouldn't. also couldn't call a function on this very page
                        GMassSearch.addEventListener("click", function () {

                            CheckAuth(true);

                            //did this need to call a separate function? not sure -- sometimes the HTTP call would get suddenly cancelled, and GMassSearch wouldn't exist as an object at that time. was hoping that by transferring to a different function, GMassSearch's state wouldn't matter
                            GenerateDraft();

                        });

                        //varElements is looking for the search area
                        //varElements = document.querySelector(QuerySelector);

                        if (App == "newGmail") {
                            GMassSearch.style.width = "20px";
                        }
                        GMassSearch.style.display = 'none';
                        GMassSearch.style.marginLeft = '2px';
                        GMassSearch.style.backgroundColor = "gray";
                        GMassSearch.style.color = "white";
                        GMassSearch.style.padding = "9px 5px 0px 12px";
                        GMassSearch.style.fontWeight = "bold";
                        GMassSearch.style.fontSize = "11px";
                        GMassSearch.style.backgroundPosition = "center center";
                        GMassSearch.style.backgroundRepeat = "no-repeat";
                        GMassSearch.style.backgroundImage = "url('https://www.gmass.co/images/MagnifyingGlassGrayFlipped-small.png')";
                        GMassSearch.style.cursor = "pointer";
                        GMassSearch.title = "Build an email list from Gmail search results.";
                        //so that stand along compose window doesn't result in error
                        if (App == "newGmail") {
                            //here we are appending to our own element, so this will always work
                            divButtons.appendChild(GMassSearch);
                        }
                        else {
                            //old gmail
                            //varElements is the whole search area, so we are appending the search button here
                            if (varElements != null) {
                                varElements.appendChild(GMassSearch);
                            }
                            else {
                                NotifyMissingElement(App + " varElements search area" + " NOT FOUND queryselector ");
                            }
                        }

                        //<div id="gmassbutton" style="background-image: url(https://www.gmass.co/images/MagnifyingGlassGray-small.png); display: block; margin-left: 2px; color: white; padding: 9px 5px 0px; font-weight: bold; font-size: 11px; background-color: gray; background-position: 100% 50%; background-repeat: no-repeat;">BUILD EMAIL LIST&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>	

                        //<div id="gmassimport" style="display: block; margin-left: 2px; color: #FFFFFF; padding: 9px 5px 0px 12px; font-weight: bold; font-size: 11px; background-color: rgb(196, 35, 41); background-position: center center; background-repeat: no-repeat; background-image: url(https://www.gmass.co/images/GMassSheetsIcon-tiny.png); ">&nbsp;&nbsp;&nbsp;	

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
                                CheckAuthSheets(true);


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

                            LaunchFollowup();


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
                                //4/24/19 -- changing this because gmail added new ? mark for help. buttons were too far to right and question mark was moved to left of them.
                                //https://www.dropbox.com/s/prdz6gngsh7je53/Screenshot%202019-04-24%2022.06.55.png?dl=0
                                // contractor helped with this. see slack for explanation. contractor also suggested way to use ? mark to my advantage so that even if class names change i'll be good
                                // but right now i'm not sure that ? mark is present for all users, need to vet this approach later
                                //varElements.appendChild(divButtons);
                                varElements.insertBefore(divButtons, varElements.lastChild);
                                //https://www.dropbox.com/s/05cqs63apia1i9y/Screenshot%202018-08-07%2013.14.08.png?dl=0
                                //look at upper-right in styles section

                                //document.querySelector(".gb_Td.gb_4d .gb_Qd").style.maxWidth = "720px";
                                //document.querySelector(".gb_Vd.gb_6d .gb_Sd").style.maxWidth = "720px";
                                //document.querySelector(".gb_Rd.gb_2d .gb_Od").style.maxWidth = "720px";
                                //document.querySelector(".gb_Ud.gb_5d .gb_Rd").style.maxWidth = "720px";
                                //var SearchWidth = document.querySelector(QuerySelectorSearchDivNewGmail);
                                if (SearchWidth != null) {
                                    //this doesn't keep the search bar wide anymore - 4/24/19
                                    //SearchWidth.style.maxWidth = "720px";
                                    SearchWidth.style.paddingRight = "5px";
                                    SearchWidth.style.maxWidth = "722px";
                                }
                                else {
                                    NotifyMissingElement("search width issue couldnt be set to 720x because querySelector NOT FOUND ");
                                }

                            }
                            else {
                                //butterbar alert
                                window.onload = function(e){ 
                                    sdk.ButterBar.showMessage({ html: "<span style='color: red'>WARNING:</span><span style='color: yellow'>" + Date() + ":</span> The GMass buttons at the top didn't load. This includes the Build List button, the Google Sheet Connector button, and the Manual Followup button. This happens when Google changes Gmail's code, and GMass hasn't adapted yet. Usually our engineers react right away, and this should be fixed shortly. Feel free to also <a style='color: #99FFFF' target='_blog' href='https://www.gmass.co/g/support'>submit a support request</a> to make sure we're aware.", time: 20000 });

                                }
                                NotifyMissingElement(App + " varElements search area NOT FOUND QuerySelector ");
                            }
                        }

                        //whether to display the Gmass Search button in gray or red
                        var MainBB = setInterval(BBFunc, 1000);


                }
                else{
                    console.log("waiting for top area: " + TopAreaCounter);
                }

                TopAreaCounter++;

            //end interval
            }, 500);

            
            var SmallButton = false;

            var xmlBS = new XMLHttpRequest();
            xmlBS.open("GET", varBaseURL + "gmass/GetButtonSize?emailaddress=" + sdk.User.getEmailAddress(), true);
            xmlBS.send();

            xmlBS.onreadystatechange = function () {
                if (xmlBS.readyState == 4) {

                    if (JSON.parse(xmlBS.responseText).SmallButton) {
                        SmallButton = true;
                    };

                }
            }

            var AuthCounter;
            var EverSent = false;


            //localStorage.setItem("GMassPopup", "0");

            if (localStorage.getItem("GMassPopup") === null) {
                localStorage.setItem("GMassPopup", "0");
            }            
            
            //get user status so we know whether to launch popup to ask them to authenticate	
            CheckAuth(false);
            //CheckAuthContacts(false);
            CheckAuthSheets(false);


            //only use localstorage for settings that we want to remember on next new compose window
            if (localStorage.getItem("mySendSave") != "save" && localStorage.getItem("mySendSave") != "send") {
                localStorage.setItem("mySendSave", "send");
            }

            //if never used before, but user has just set smtp, then default to that so user can easily test
            if (localStorage.getItem("GMassSMTP") != "on" && localStorage.getItem("GMassSMTP") != "off") {
                localStorage.setItem("GMassSMTP", "notset");
            }

            if (localStorage.getItem("myNewReply") != "new" && localStorage.getItem("myNewReply") != "reply") {
                localStorage.setItem("myNewReply", "new");
            }
            /*if (localStorage.getItem("GMassRecur")!="on" && localStorage.getItem("GMassRecur")!="off"){
                localStorage.setItem("GMassRecur", "off");
            }*/
            if (localStorage.getItem("myOpenTracking") != "on" && localStorage.getItem("myOpenTracking") != "off") {
                localStorage.setItem("myOpenTracking", "on");
            }
            if (localStorage.getItem("myClickTracking") != "on" && localStorage.getItem("myClickTracking") != "off") {
                localStorage.setItem("myClickTracking", "on");
            }
            if (localStorage.getItem("SkipWeekends") != "on" && localStorage.getItem("SkipWeekends") != "off") {
                localStorage.setItem("SkipWeekends", "off");
            }
            if (localStorage.getItem("myDelay") != "on" && localStorage.getItem("myDelay") != "off") {
                localStorage.setItem("myDelay", "off");
            }
            if (localStorage.getItem("fastSMTP") != "on" && localStorage.getItem("fastSMTP") != "off") {
                localStorage.setItem("fastSMTP", "off");
            }    
            if (localStorage.getItem("myTestAddresses") === null) {
                localStorage.setItem("myTestAddresses", sdk.User.getEmailAddress());
            }
            if (localStorage.getItem("myReplyTo") === null) {
                localStorage.setItem("myReplyTo", "");
            }

            /*if (localStorage.getItem("myMaxEmails")===null){
                localStorage.setItem("myMaxEmails", "");
            }*/

            sdk.Conversations.registerMessageViewHandler(function (messageView) {

                if (App == "oldGmail") {

                    //sdk.ButterBar.showMessage({text: messageView.getSender().emailAddress, time: 2000});

                    if (messageView.getSender().emailAddress.indexOf("-p-notify@gmass.co") != -1) {
                        //it's a campaign sending status notification, want to give user link to open up campaign draft if still in progress and not complete

                        var xmlCampaign = new XMLHttpRequest();
                        xmlCampaign.open("GET", varBaseURL + "gmass/GetCampaignDraft?emailaddress=" + sdk.User.getEmailAddress() + "&ScheduledID=" + messageView.getSender().emailAddress.replace("-p-notify@gmass.co", "") + "&URL=" + encodeURI(window.location.href.replace("#", "PHASH")), true);
                        xmlCampaign.send();

                        xmlCampaign.onreadystatechange = function () {
                            if (xmlCampaign.readyState == 4) {

                                var ButterBarMessage = "";
                                var resultDraft = JSON.parse(xmlCampaign.responseText);

                                if (resultDraft.success) {
                                    sdk.ButterBar.showMessage({ html: resultDraft.ButterBarMessage, time: 10000 });
                                }
                            }
                        }
                    }
                    else if (messageView.getSender().emailAddress == "notify@gmass.co") {

                        var MessageSubject;
                        var ThreadView = messageView.getThreadView();
                        MessageSubject = ThreadView.getSubject();
                        //alert(MessageSubject);

                        if (MessageSubject.indexOf("GMass Campaign Report") >= 0) {

                            var xmlCampaign = new XMLHttpRequest();
                            xmlCampaign.open("GET", varBaseURL + "gmass/GetCampaignFromReport?emailaddress=" + sdk.User.getEmailAddress() + "&GmailMessageId=" + messageView.getMessageID() + "&URL=" + encodeURI(document.location.href), true);
                            xmlCampaign.send();
                            var resultCampaigns;

                            xmlCampaign.onreadystatechange = function () {
                                if (xmlCampaign.readyState == 4) {

                                    var ButterBarMessage = "";
                                    var resultCampaign = JSON.parse(xmlCampaign.responseText);

                                    if (resultCampaign.success) {

                                        sdk.ButterBar.showMessage({ html: resultCampaign.ButterBarMessage, time: 10000 });
                                    }

                                }
                            }

                        }

                    }
                    else if (messageView.getSender().emailAddress == "GMass_Sent_Copy@gmass.co") {

                        var xmlCampaign = new XMLHttpRequest();
                        xmlCampaign.open("GET", varBaseURL + "gmass/GetReportFromCampaign?emailaddress=" + sdk.User.getEmailAddress() + "&GmailMessageId=" + messageView.getMessageID() + "&URL=" + encodeURI(document.location.href), true);
                        xmlCampaign.send();
                        var resultCampaigns;

                        xmlCampaign.onreadystatechange = function () {
                            if (xmlCampaign.readyState == 4) {

                                var ButterBarMessage = "";
                                var resultCampaign = JSON.parse(xmlCampaign.responseText);

                                if (resultCampaign.success) {

                                    sdk.ButterBar.showMessage({ html: resultCampaign.ButterBarMessage, time: 10000 });

                                }

                            }
                        }

                    }

                    else if (messageView.getSender().emailAddress == "admin@gmass.co") {

                        var xmlFinishedMessage = new XMLHttpRequest();
                        xmlFinishedMessage.open("GET", varBaseURLWZ + "Public/Notify/GetMessageFromReport?IsGMass=true&emailaddress=" + sdk.User.getEmailAddress() + "&GmailNotificationId=" + messageView.getMessageID() + "&URL=" + encodeURI(document.location.href), true);
                        xmlFinishedMessage.send();
                        var resultMessage;

                        xmlFinishedMessage.onreadystatechange = function () {
                            if (xmlFinishedMessage.readyState == 4) {

                                var resultMessage = JSON.parse(xmlFinishedMessage.responseText);

                                if (resultMessage.success) {
                                    sdk.ButterBar.showMessage({ html: resultMessage.ButterBarMessage, time: 20000 });
                                }

                            }
                        }

                    }

                }


            });

            // a compose view has come into existence, do something with it!
            sdk.Compose.registerComposeViewHandler(function (composeView) {

                var GMassLaunchedCompose = false;
                var settingsID = makeid();
                var LoadedCampaigns = false;

                if (!(App == "Inbox" && composeView.isInlineReplyForm())) {

                    var FromHandlerCount = 0;
                    var ComposeLaunchTime = new Date().getTime();

                    composeView.on('fromContactChanged', function (event) {
                        var today = new Date();
                        //when compose is first launched, this event fires, i guess when from address is initially set
                        //adding timer element just IN CASE someday it doesn't fire when compose first launches
                        //after 5 seconds, should be safe that if from is changed, then we want to trigger this routine
                        if (FromHandlerCount >= 1 || (today - ComposeLaunchTime) > 5000) {
                            var CurrentSubject = composeView.getSubject();
                            composeView.setSubject(CurrentSubject + " ");
                            //composeView.setSubject(CurrentSubject);
                            //alert("test");
                        }

                        FromHandlerCount++;
                    });

                    if (GMassDebug) {
                        composeView.on('toContactAdded', function (event) {
                            console.log("to addresse added");
                        });
                    }

                    composeView.on('destroy', function (event) {
                        if (document.getElementById(settingsID) != null) {
                            document.getElementById(settingsID).remove();
                        }
                    });

                    composeView.on('presending', function(event) {
                        if (composeView.getToRecipients().length >= 10 || (composeView.getToRecipients()[0].emailAddress.includes("recipients") && composeView.getToRecipients()[0].emailAddress.includes("@gmass.co"))){
                            if (confirm("Did you really mean to press the blue Gmail Send button instead of the red GMass button?\n\nPress CANCEL to stop this send.\n\nPress OK if you really did mean to press the blue Gmail Send button.")) {

                            }
                            else{
                                event.cancel();
                            }
                        }
                        
                    });

                    var SMTPServer = "";

                    var mySendSave = localStorage.getItem("mySendSave");
                    var SMTP = localStorage.getItem("GMassSMTP");
                    var myNewReply = localStorage.getItem("myNewReply");
                    var myOpenTracking = localStorage.getItem("myOpenTracking");
                    var myClickTracking = localStorage.getItem("myClickTracking");
                    var SkipWeekends = localStorage.getItem("SkipWeekends");
                    var myDelay = localStorage.getItem("myDelay");
                    var fastSMTP = localStorage.getItem("fastSMTP");
                    var myTestAddresses = localStorage.getItem("myTestAddresses");
                    var myReplyTo = localStorage.getItem("myReplyTo");
                    var myFriendlyName = "";

                    var resultHTTPDraft;
                    var resultHTTPApplyLabel;
                    //var draftID = null;
                    var counterMessageIDCheck;
                    var bb;
                    var GetDraftIDCounter = 0;
                    var boolForceShowSend = false;

                    //should be able to get rid of localstorage on these, initialized to new state on new compose
                    var GMassDateDropdown = "Now";
                    var GMassDateTextBox = "";
                    var myListName = "";
                    var GMassPersonalization = "";
                    var myMaxEmails = "max";
                    var myRecurEvery = "1";
                    var mySuppressionDays = "0";
                    var GMassSuppression = "";
                    var GMassRecur = "off";
                    var GMassRecurDH = "d";

                    //var GMassAFDisplay = "hide";
                    //var GMassSuppressDisplay = "hide";
                    //var GMassScheduleDisplay = "hide";
                    var SMTPOptionDisplay = false;

                    var AdvancedStatus = "";
                    var ScheduleStatus = "";
                    var AFStatus = "";


                    if (SkipWeekends == "on") {
                        //GMassScheduleDisplay = "show";
                    }


                    var GMassFirstBumpDays;
                    var GMassFirstBumpAddedText;

                    var GMassSecondBumpDays;
                    var GMassSecondBumpAddedText;

                    var GMassThirdBumpDays;
                    var GMassThirdBumpAddedText;

                    var GMassFourthBumpDays;
                    var GMassFourthBumpAddedText;

                    var GMassFifthBumpDays;
                    var GMassFifthBumpAddedText;

                    var GMassSixthBumpDays;
                    var GMassSixthBumpAddedText;

                    var GMassSeventhBumpDays;
                    var GMassSeventhBumpAddedText;

                    var GMassEighthBumpDays;
                    var GMassEighthBumpAddedText;

                    if (localStorage.getItem("GMassFirstBumpDays") != null) { GMassFirstBumpDays = localStorage.getItem("GMassFirstBumpDays"); } else { GMassFirstBumpDays = "2"; }

                    if (localStorage.getItem("GMassFirstBumpAddedText") != null) { GMassFirstBumpAddedText = localStorage.getItem("GMassFirstBumpAddedText"); } else { GMassFirstBumpAddedText = "Just making sure you saw this."; }

                    var GMassFirstBumpAction = "r";
                    var GMassFirstBumpCustom = "0";
                    var GMassFirstBumpChoice = "t";
                    var GMassFirstBump = "show";

                    if (localStorage.getItem("GMassSecondBumpDays") != null) { GMassSecondBumpDays = localStorage.getItem("GMassSecondBumpDays"); } else { GMassSecondBumpDays = "5"; }
                    if (localStorage.getItem("GMassSecondBumpAddedText") != null) { GMassSecondBumpAddedText = localStorage.getItem("GMassSecondBumpAddedText"); } else { GMassSecondBumpAddedText = "I've reached out a couple times, but I haven't heard back. I'd appreciate a response to my email below."; }
                    var GMassSecondBumpAction = "r";
                    var GMassSecondBumpCustom = "0";
                    var GMassSecondBumpChoice = "t";
                    var GMassSecondBump = "hide";

                    if (localStorage.getItem("GMassThirdBumpDays") != null) { GMassThirdBumpDays = localStorage.getItem("GMassThirdBumpDays"); } else { GMassThirdBumpDays = "8"; }
                    if (localStorage.getItem("GMassThirdBumpAddedText") != null) { GMassThirdBumpAddedText = localStorage.getItem("GMassThirdBumpAddedText"); } else { GMassThirdBumpAddedText = "I'm sure you're busy, but if you could respond to my email below, I can cross this off my list."; }
                    var GMassThirdBumpAction = "r";
                    var GMassThirdBumpCustom = "0";
                    var GMassThirdBumpChoice = "t";
                    var GMassThirdBump = "hide";

                    if (localStorage.getItem("GMassFourthBumpDays") != null) { GMassFourthBumpDays = localStorage.getItem("GMassFourthBumpDays"); } else { GMassFourthBumpDays = "11"; }
                    if (localStorage.getItem("GMassFourthBumpAddedText") != null) { GMassFourthBumpAddedText = localStorage.getItem("GMassFourthBumpAddedText"); } else { GMassFourthBumpAddedText = "Should I stop bothering you?"; }
                    var GMassFourthBumpAction = "r";
                    var GMassFourthBumpCustom = "0";
                    var GMassFourthBumpChoice = "t";
                    var GMassFourthBump = "hide";

                    if (localStorage.getItem("GMassFifthBumpDays") != null) { GMassFifthBumpDays = localStorage.getItem("GMassFifthBumpDays"); } else { GMassFifthBumpDays = "14"; }
                    if (localStorage.getItem("GMassFifthBumpAddedText") != null) { GMassFifthBumpAddedText = localStorage.getItem("GMassFifthBumpAddedText"); } else { GMassFifthBumpAddedText = "I have not heard from you. Let me know please."; }
                    var GMassFifthBumpAction = "r";
                    var GMassFifthBumpCustom = "0";
                    var GMassFifthBumpChoice = "t";
                    var GMassFifthBump = "hide";

                    if (localStorage.getItem("GMassSixthBumpDays") != null) { GMassSixthBumpDays = localStorage.getItem("GMassSixthBumpDays"); } else { GMassSixthBumpDays = "17"; }
                    if (localStorage.getItem("GMassSixthBumpAddedText") != null) { GMassSixthBumpAddedText = localStorage.getItem("GMassSixthBumpAddedText"); } else { GMassSixthBumpAddedText = "Can I please get a response?"; }
                    var GMassSixthBumpAction = "r";
                    var GMassSixthBumpCustom = "0";
                    var GMassSixthBumpChoice = "t";
                    var GMassSixthBump = "hide";

                    if (localStorage.getItem("GMassSeventhBumpDays") != null) { GMassSeventhBumpDays = localStorage.getItem("GMassSeventhBumpDays"); } else { GMassSeventhBumpDays = "20"; }
                    if (localStorage.getItem("GMassSeventhBumpAddedText") != null) { GMassSeventhBumpAddedText = localStorage.getItem("GMassSeventhBumpAddedText"); } else { GMassSeventhBumpAddedText = "Hello?"; }
                    var GMassSeventhBumpAction = "r";
                    var GMassSeventhBumpCustom = "0";
                    var GMassSeventhBumpChoice = "t";
                    var GMassSeventhBump = "hide";

                    if (localStorage.getItem("GMassEighthBumpDays") != null) { GMassEighthBumpDays = localStorage.getItem("GMassEighthBumpDays"); } else { GMassEighthBumpDays = "23"; }
                    if (localStorage.getItem("GMassEighthBumpAddedText") != null) { GMassEighthBumpAddedText = localStorage.getItem("GMassEighthBumpAddedText"); } else { GMassEighthBumpAddedText = "I'm marking you down as being not interested."; }
                    var GMassEighthBumpAction = "r";
                    var GMassEighthBumpCustom = "0";
                    var GMassEighthBumpChoice = "t";
                    var GMassEighthBump = "hide";

                    var GMassFirstBumpBox = "n";
                    var GMassSecondBumpBox = "n";
                    var GMassThirdBumpBox = "n";
                    var GMassFourthBumpBox = "n";
                    var GMassFifthBumpBox = "n";
                    var GMassSixthBumpBox = "n";
                    var GMassSeventhBumpBox = "n";
                    var GMassEighthBumpBox = "n";

                    var GMassBumpSuppression = "";

                    if (!isEmpty(myFriendlyName)){
                        AdvancedStatus += "|friendly name set|";
                    }
                    if (!isEmpty(myReplyTo)){
                        AdvancedStatus += "|reply-to set|";
                    }
                    if (myNewReply == "reply"){
                        AdvancedStatus += "|send as replies|";
                    }

                    if (SkipWeekends == "on"){
                        ScheduleStatus += "|skip weekends|";
                    }

                    if (myDelay == "on"){
                        ScheduleStatus += "|pause between emails|";
                    }



                    var resultCampaigns;



                    //preload test addresses
                    var xmlTestAddresses = new XMLHttpRequest();
                    //if bad extension key will still work, will just return own address
                    xmlTestAddresses.open("GET", varBaseURL + "gmass/GetTestAddresses?emailaddress=" + sdk.User.getEmailAddress() + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())), true);
                    if (GMassDebug) { console.log("about to fetch test addresses"); }
                    xmlTestAddresses.send();
                    var resultTestAddresses;

                    xmlTestAddresses.onreadystatechange = function () {
                        if (xmlTestAddresses.readyState == 4) {
                            if (GMassDebug) { console.log("DONE fetching test addresses"); }
                            resultTestAddresses = JSON.parse(xmlTestAddresses.responseText);


                        }
                    }
                    //****DONE

                    //preload test addresses
                    if (!composeView.isInlineReplyForm())
                    {
                        var xmlReplyToAddresses = new XMLHttpRequest();
                        //if bad extension key will still work, will just return own address
                        xmlReplyToAddresses.open("GET", varBaseURL + "gmass/GetReplyToAddresses?emailaddress=" + sdk.User.getEmailAddress() + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())), true);
                        if (GMassDebug) { console.log("about to fetch replyto addresses"); }
                        xmlReplyToAddresses.send();
                        var resultReplyToAddresses;

                        xmlReplyToAddresses.onreadystatechange = function () {
                            if (xmlReplyToAddresses.readyState == 4) {
                                if (GMassDebug) { console.log("DONE fetching replyto addresses"); }
                                resultReplyToAddresses = JSON.parse(xmlReplyToAddresses.responseText);


                            }
                        }
                    }
                    //****DONE                      	


                    if (!composeView.isInlineReplyForm() && composeView.getToRecipients().length > 0) {
                    //8/14/19 -- this block is only run when a DRAFT is opened. so if DRAFT is opened and alias address present, then stuff happens
                    //this is NOT run when gmass launches the compose window, because when this runs, the TO address isn't quite set yet. fine timing issue.

                        var HelperMessage = "";

                        if ((composeView.getToRecipients()[0].emailAddress.substr(composeView.getToRecipients()[0].emailAddress.length - 8) == "gmass.co") && (composeView.getToRecipients()[0].emailAddress.indexOf("-big-") == -1)) {
                            //hide Send button
                            GMassLaunchedCompose = true;
                            var BBWaiting = sdk.ButterBar.showMessage({ text: "Please wait for the email addresses to populate...", time: 5000 });
                            var xmlhttpSearch = new XMLHttpRequest();
                            if (GMassDebug) {
                                console.log("***about to call fetchemailaddresses: " + "gmass/fetchemailaddresses?alias=" + composeView.getToRecipients()[0].emailAddress);
                            }
                            xmlhttpSearch.open("GET", varBaseURL + "gmass/fetchemailaddresses?alias=" + composeView.getToRecipients()[0].emailAddress + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())), true);
                            xmlhttpSearch.send();
                            xmlhttpSearch.onreadystatechange = function () {
                                if (xmlhttpSearch.readyState == 4) {
                                    var SearchResults = JSON.parse(xmlhttpSearch.responseText);
                                    if (SearchResults.success) {

                                        composeView.setToRecipients(SearchResults.addresses);
                                        BBWaiting.destroy();

                                        if (sdk.User.getEmailAddress().indexOf("gmail.com") > 0) {
                                            if (Number(composeView.getToRecipients().length) > 500) {
                                                HelperMessage = " Since you're using a regular Gmail account, your sending limit is 500 emails/day, so GMass will send these emails over multiple days until they're all sent."
                                            }
                                        }
                                        else {
                                            if (Number(composeView.getToRecipients().length) > 2000) {
                                                HelperMessage = " Since you're using a Google Apps account, your sending limit is 2000 emails/day, so GMass will send these emails over multiple days until they're all sent."
                                            }
                                        }
                                        if (HelperMessage != "") {
                                            var BBDocsInfo = sdk.ButterBar.showMessage({ text: HelperMessage, time: 25000 });
                                        }

                                    }
                                    else{
                                        if (SearchResults.reason = "BadKey"){
                                        //likely bad extension key. only consequence here will be to tell them we couldn't expand the alias. if they're about to send anyway, that will set extension key and correct it for next time
                                            sdk.ButterBar.showMessage({ text: "We couldn't expand your alias address into the actual recipient addresses in the Compose box, but that's okay -- it will still work. You just can't see the actual addresses for now.", time: 25000 });
                                        }
                                    }
                                }
                            }
                        }
                        else if ((composeView.getToRecipients()[0].emailAddress.substr(composeView.getToRecipients()[0].emailAddress.length - 8) == "gmass.co") && (composeView.getToRecipients()[0].emailAddress.indexOf("-big-") > 0)) {
                            //hide Send button
                            //var SendButton = document.querySelector('[data-tooltip~=Send]');
                            //SendButton.style.display = "none";

                            if (sdk.User.getEmailAddress().indexOf("gmail.com") > 0) {
                                if (Number(AliasSize(composeView.getToRecipients()[0].emailAddress)) > 500) {
                                    HelperMessage = " Since you're using a regular Gmail account, your sending limit is 500 emails/day, so GMass will send these emails over multiple days until they're all sent."
                                }
                            }
                            else {
                                if (Number(AliasSize(composeView.getToRecipients()[0].emailAddress)) > 2000) {
                                    HelperMessage = " Since you're using a Google Apps account, your sending limit is 2000 emails/day, so GMass will send these emails over multiple days until they're all sent."
                                }
                            }

                            var BBDocsInfo = sdk.ButterBar.showMessage({ text: "The alias address in the To field represents all of the recipients. Do not alter that address. Hit the GMass button to send to all " + AliasSize(composeView.getToRecipients()[0].emailAddress) + " addresses." + HelperMessage, time: 25000 });

                        }
                        else {
                            if (GMassDebug) {
                                console.log("***fetchemailaddresses NOT BEING CALLED");
                            }
                        }

                    }
                    else {
                        if (GMassDebug) {
                            console.log("***fetchemailaddresses NOT BEING CALLED because to field length is " + composeView.getToRecipients().length);
                        }
                    }

                    var GotState = false;
                    var IsScheduled = false;
                    var HasCampaign = false;
                    var IsProcessing = false;
                    var IsPaused = false;
                    var IsEdited = false;
                    var AllDone = false;
                    var ComposeDraftID = "";
                    var NuclearBB;

                    //7/31/17 - maybe just do this way for both gmail and inbox, since it seems to work. this will never resolve to null in inbox because draftid gets created right away on new compose, but who knows, maybe this will change someday
                    //and in gmail, will resolve to null
                    composeView.getCurrentDraftID().then(function (draftID) {

                        //OLD GMAIL AND OPENING NEW COMPOSE WINDOW FROM SCRATCH
                        if (ComposeTagger == "x" && (draftID == null || draftID == undefined)) {
                            console.log("block 1");
                            //only old gmail, blank compose or launched compose, but not an opened DRAFT. old gmail/opened draft, go to next block

                            //brand new compose, not gmass launched

                            console.log("GM: getCurrentDraftID resolved to NULL, meaning blank compose. gotstate=true");
                            GotState = true;

                            composeView.getDraftID().then(function (draftID) {
                                //this happens after user types stuff, or after Gmass sets to address

                                ComposeDraftID = draftID;
                                console.log("GM: Draft ID retrieved after user typed stuff =" + ComposeDraftID);

                            });
                        }

                            //EVERYTHING ELSE. OLD GMAIL AND GMASS-LAUNCHED-COMPOSE / OLD GMAIL AND OPENING UP A DRAFT / NEW GMAIL AND EVERY SITUATION
                        else {
                            console.log("block 2");
                            //WE WILL ALREADY HAVE THE DRAFT ID IN EVERY CASE EXCEPT FOR OLD GMAIL WHERE GMASS LAUNCHES THE COMPOSE, SO THAT'S WHY THIS IS HERE

                            if (draftID == null || draftID == undefined) {
                                composeView.getDraftID().then(function (draftID) {


                                    ComposeDraftID = draftID;
                                    console.log("GM: Draft ID retrieved after promise met =" + ComposeDraftID);
                                });
                            }
                            else {
                                ComposeDraftID = draftID;
                                console.log("GM: Draft ID retrieved just cause it's new gmail/inbox" + ComposeDraftID);
                            }

                            var WaitForDraftIDCounter = 0;
                            var WaitForDraftID = setInterval(function () {

                                console.log("running once");
                                WaitForDraftIDCounter++;
                                

                                if (WaitForDraftIDCounter % 20 == 0){
                                    console.log("going nuclear, putting text in Subject to trigger draft id");
                                    NuclearBB = sdk.ButterBar.showMessage({ text: "Wait a few more seconds please. The GMass button won't work yet on this Compose window. Fixing it...", time: 10000 });
                                    if (composeView.getSubject().includes("Replace this Subject with your own!"))
                                    {
                                        composeView.setSubject(composeView.getSubject() + " :)");
                                    }
                                    else{
                                        composeView.setSubject("Replace this Subject with your own!");
                                    }
                                }

                                if (WaitForDraftIDCounter == 20){
                                    ErrorHandler(sdk.User.getEmailAddress() + " 20x no draft id");
                                }  

                                if (ComposeDraftID != "") {

                                    if (typeof NuclearBB != "undefined") {
                                        NuclearBB.destroy();
                                        sdk.ButterBar.showMessage({ text: "Fixed! You may proceed...", time: 10000 });
                                        ErrorHandler(sdk.User.getEmailAddress() + " " + WaitForDraftIDCounter + "x no draft id FIXED");
                                    }

                                    clearInterval(WaitForDraftID);




                                    var xmlstate = new XMLHttpRequest();
                                    //for new gmail and inbox, FirstTo param is passed in, which results in ToAddresses being returned. old gmail, ToAddresses will be null
                                    xmlstate.open("GET", varBaseURL + "gmass/getdraftstate?draftId=" + ComposeDraftID + ((!composeView.isInlineReplyForm() && (1 == 1)) ? "&FirstTo=" + ComposeTagger : ""), true);
                                    ComposeTagger = "x";

                                    if (GMassDebug) {
                                        console.log("***getdraftstate just called");
                                    }
                                    xmlstate.send();

                                    xmlstate.onreadystatechange = function () {
                                        if (xmlstate.readyState == 4) {

                                            if (xmlstate.responseText != "") {

                                                varDraftState = JSON.parse(xmlstate.responseText);
                                                console.log("GM: Draft ID state retrieved from GM =" + ComposeDraftID);

                                                //for google sheets/inbox, turning alias address into actual addresses. alias address is used to get state, meaning personalization fields, so after that is done, can convert to its source addresses
                                                if (varDraftState.ToAddresses != null && varDraftState.ToAddresses.length > 0) {
                                                    GMassLaunchedCompose = true;
                                                    if (GMassDebug) {
                                                        console.log("***getdraftstate is about to set To line");
                                                    }

                                                    sdk.ButterBar.showMessage({ text: "Converting the alias address into the real email addresses. Don't be alarmed if Gmail seems stuck for a few seconds.", time: 10000 });
                                                    setTimeout(function () {  
                                                        composeView.setToRecipients(varDraftState.ToAddresses);
                                                        sdk.ButterBar.showMessage({ text: "Done!", time: 10000 });
                                                    }, 250);

                                                }
                                                else if (ComposeFirstAddressAlias(composeView)){

                                                    //want to make sure this doesn't get interrupted by "we have hidden send button dastardly..." message

                                                    if (GMassDebug) {
                                                        console.log("***getdraftstate will NOT SET To line");
                                                    }
                                                }

                                                if (!varDraftState.NoScheduledFound) {

                                                    //might have retrieved draft settings, but it still might not exist in scheduled row yet (with live editor changes)
                                                    //IsScheduled = true;
                                                    IsScheduled = varDraftState.IsScheduled;
                                                    HasCampaign = varDraftState.HasCampaign;

                                                    if (IsScheduled) {
                                                        //get stats on how many emails have been sent SO FAR and when next batch will be sent
                                                        DisplayCampaignSentStatus(ComposeDraftID, composeView);

                                                    }


                                                    //localStorage.setItem("GMassDateTextBox", varDraftState.FutureSendDateTime);
                                                    //localStorage.setItem("GMassDateDropdown", "Custom");

                                                    if (varDraftState.FutureSendDateTime == null) {
                                                        GMassDateTextBox = "";
                                                        GMassDateDropdown = "Now";
                                                    }
                                                    else {
                                                        GMassDateTextBox = varDraftState.FutureSendDateTime;
                                                        GMassDateDropdown = "Custom";
                                                        ScheduleStatus = (ScheduleStatus.includes("|send later|") ? ScheduleStatus : ScheduleStatus + "|send later|");
                                                    }

                                                    if (varDraftState.OpenTracking) {
                                                        myOpenTracking = "on";
                                                    }
                                                    else {
                                                        myOpenTracking = "off";
                                                    }

                                                    if (varDraftState.ClickTracking) {
                                                        myClickTracking = "on";
                                                    }
                                                    else {
                                                        myClickTracking = "off";
                                                    }

                                                    if (varDraftState.SkipWeekends) {
                                                        SkipWeekends = "on";
                                                        //need to check because from default blank compose, sticky value could be, skip weekends, then it would display twice if we didn't check properly
                                                        ScheduleStatus = (ScheduleStatus.includes("|skip weekends|") ? ScheduleStatus : ScheduleStatus + "|skip weekends|");
                                                        //ScheduleStatus += "|skip weekends|";
                                                        //GMassScheduleDisplay = "show";
                                                    }
                                                    else {
                                                        SkipWeekends = "off";
                                                        ScheduleStatus = ScheduleStatus.replace("|skip weekends|", "");
                                                    }

                                                    if (varDraftState.Suppression.length > 3) {
                                                        GMassSuppression = varDraftState.Suppression;
                                                        GMassSuppression = GMassSuppression.replace(/,\s*$/, "");
                                                        //GMassSuppressDisplay = "show";
                                                        //AdvancedStatus += "|suppression campaigns set|";
                                                        AdvancedStatus = (AdvancedStatus.includes("|suppression campaigns set|") ? AdvancedStatus : AdvancedStatus + "|suppression campaigns set|");
                                                    }
                                                    else {
                                                        GMassSuppression = "";
                                                    }

                                                    //if either delay is set or spread out value is set, then show it
                                                    if (varDraftState.Delay) {
                                                        myDelay = "on";
                                                        //GMassSpreadDisplay = "show";
                                                        //GMassScheduleDisplay = "show";
                                                        //ScheduleStatus += "|pause between emails|";
                                                        ScheduleStatus = (ScheduleStatus.includes("|pause between emails|") ? ScheduleStatus : ScheduleStatus + "|pause between emails|");
                                                    }
                                                    else {
                                                        myDelay = "off";
                                                        ScheduleStatus = ScheduleStatus.replace("|pause between emails|", "");
                                                    }

                                                    if (varDraftState.FastSMTP){
                                                        fastSMTP = "on";
                                                    }
                                                    else{
                                                        fastSMTP = "off";
                                                    }

                                                    if (varDraftState.Recur == "d" || varDraftState.Recur == "h" || varDraftState.Recur == "w" || varDraftState.Recur == "m" || varDraftState.Recur == "1" || varDraftState.Recur == "2" || varDraftState.Recur == "3" || varDraftState.Recur == "4") {
                                                        GMassRecur = "on";
                                                        GMassRecurDH = varDraftState.Recur;
                                                        ScheduleStatus += "|repeat|";
                                                        myRecurEvery = varDraftState.RecurEvery;
                                                        
                                                    }
                                                    else
                                                    {

                                                        GMassRecur = "off";

                                                    }

                                                    if (varDraftState.SaveAsDraft) {

                                                        mySendSave = "save";

                                                    }
                                                    else {

                                                        mySendSave = "send";
                                                    }

                                                    if (varDraftState.UseSMTP == "true") {

                                                        SMTP = "on";
                                                    }
                                                    else {

                                                        SMTP = "off";
                                                    }

                                                    if (varDraftState.AppendToThread) {

                                                        myNewReply = "reply";
                                                        //AdvancedStatus += "|send as replies|";
                                                        AdvancedStatus = (AdvancedStatus.includes("|send as replies|") ? AdvancedStatus : AdvancedStatus + "|send as replies|");
                                                    }
                                                    else {

                                                        myNewReply = "new";
                                                        //need to override settings on new compose, and this is a sticky setting so new compose may have diff value based on last campaign
                                                        AdvancedStatus = AdvancedStatus.replace("|send as replies|", "");
                                                    }

                                                    if ((varDraftState.SplitFactor != "0") && (varDraftState.SplitFactor != null)) {

                                                        myMaxEmails = varDraftState.SplitFactor;
                                                        //ScheduleStatus += "|max set|";
                                                        ScheduleStatus = (ScheduleStatus.includes("|daily limit|") ? ScheduleStatus : ScheduleStatus + "|daily limit|");
                                                        //GMassSpreadDisplay = "show";
                                                        //GMassScheduleDisplay = "show";

                                                    }

                                                    if (varDraftState.SuppressionDays != "0" && varDraftState.SuppressionDays != null) {
                                                        mySuppressionDays = varDraftState.SuppressionDays;
                                                        //GMassSuppressDisplay = "show";
                                                        //AdvancedStatus += "|suppression days set|";
                                                        AdvancedStatus = (AdvancedStatus.includes("|suppression days set|") ? AdvancedStatus : AdvancedStatus + "|suppression days set|");
                                                    }
                                                    /*else
                                                    {
                                                        localStorage.setItem("myMaxEmails", "");
                                                    }*/

                                                    //set auto-followup stuff
                                                    if (varDraftState.FirstBumpDays > 0) {

                                                        GMassFirstBumpDays = varDraftState.FirstBumpDays;
                                                        GMassFirstBumpAction = varDraftState.FirstBumpAction;
                                                        GMassFirstBumpCustom = varDraftState.FirstBumpCampaignID;
                                                        GMassFirstBumpAddedText = varDraftState.FirstBumpAddedText;
                                                        GMassFirstBumpChoice = varDraftState.FirstBumpChoice;

                                                        /*if (varDraftState.FirstBumpAddedText != "") {
                                                            localStorage.setItem("GMassFirstBumpChoice = "t";
                                                        }
                                                        else if (varDraftState.FirstBumpCampaignID != 0) {
                                                            localStorage.setItem("GMassFirstBumpChoice = "c";
                                                        }*/

                                                        GMassFirstBump = "show";
                                                        GMassFirstBumpBox = "y";

                                                        //GMassAFDisplay = "show";
                                                        AFStatus += "|stage 1|";

                                                    }

                                                    if (varDraftState.SecondBumpDays > 0) {

                                                        GMassSecondBumpDays = varDraftState.SecondBumpDays;
                                                        GMassSecondBumpAction = varDraftState.SecondBumpAction;
                                                        GMassSecondBumpCustom = varDraftState.SecondBumpCampaignID;
                                                        GMassSecondBumpAddedText = varDraftState.SecondBumpAddedText;
                                                        GMassSecondBumpChoice = varDraftState.SecondBumpChoice;

                                                        /*if (varDraftState.SecondBumpAddedText != "") {
                                                            GMassSecondBumpChoice = "t";
                                                        }
                                                        else if (varDraftState.SecondBumpCampaignID != 0) {
                                                            GMassSecondBumpChoice = "c";
                                                        }*/

                                                        GMassSecondBump = "show";
                                                        GMassSecondBumpBox = "y";

                                                        //GMassAFDisplay = "show";
                                                        AFStatus += "|stage 2|";

                                                    }

                                                    if (varDraftState.ThirdBumpDays > 0) {

                                                        GMassThirdBumpDays = varDraftState.ThirdBumpDays;
                                                        GMassThirdBumpAction = varDraftState.ThirdBumpAction;
                                                        GMassThirdBumpCustom = varDraftState.ThirdBumpCampaignID;
                                                        GMassThirdBumpAddedText = varDraftState.ThirdBumpAddedText;
                                                        GMassThirdBumpChoice = varDraftState.ThirdBumpChoice;

                                                        /*if (varDraftState.ThirdBumpAddedText != "") {
                                                            GMassThirdBumpChoice = "t";
                                                        }
                                                        else if (varDraftState.ThirdBumpCampaignID != 0) {
                                                            GMassThirdBumpChoice = "c";
                                                        }*/

                                                        GMassThirdBump = "show";
                                                        GMassThirdBumpBox = "y";

                                                        //GMassAFDisplay = "show";
                                                        AFStatus += "|stage 3|";

                                                    }

                                                    if (varDraftState.FourthBumpDays > 0) {

                                                        GMassFourthBumpDays = varDraftState.FourthBumpDays;
                                                        GMassFourthBumpAction = varDraftState.FourthBumpAction;
                                                        GMassFourthBumpCustom = varDraftState.FourthBumpCampaignID;
                                                        GMassFourthBumpAddedText = varDraftState.FourthBumpAddedText;
                                                        GMassFourthBumpChoice = varDraftState.FourthBumpChoice;

                                                        GMassFourthBump = "show";
                                                        GMassFourthBumpBox = "y";

                                                        //GMassAFDisplay = "show";
                                                        AFStatus += "|stage 4|";

                                                    }

                                                    if (varDraftState.FifthBumpDays > 0) {

                                                        GMassFifthBumpDays = varDraftState.FifthBumpDays;
                                                        GMassFifthBumpAction = varDraftState.FifthBumpAction;
                                                        GMassFifthBumpCustom = varDraftState.FifthBumpCampaignID;
                                                        GMassFifthBumpAddedText = varDraftState.FifthBumpAddedText;
                                                        GMassFifthBumpChoice = varDraftState.FifthBumpChoice;

                                                        GMassFifthBump = "show";
                                                        GMassFifthBumpBox = "y";

                                                        //GMassAFDisplay = "show";
                                                        AFStatus += "|stage 5|";

                                                    }

                                                    if (varDraftState.SixthBumpDays > 0) {

                                                        GMassSixthBumpDays = varDraftState.SixthBumpDays;
                                                        GMassSixthBumpAction = varDraftState.SixthBumpAction;
                                                        GMassSixthBumpCustom = varDraftState.SixthBumpCampaignID;
                                                        GMassSixthBumpAddedText = varDraftState.SixthBumpAddedText;
                                                        GMassSixthBumpChoice = varDraftState.SixthBumpChoice;

                                                        GMassSixthBump = "show";
                                                        GMassSixthBumpBox = "y";

                                                        //GMassAFDisplay = "show";
                                                        AFStatus += "|stage 6|";

                                                    }

                                                    if (varDraftState.SeventhBumpDays > 0) {

                                                        GMassSeventhBumpDays = varDraftState.SeventhBumpDays;
                                                        GMassSeventhBumpAction = varDraftState.SeventhBumpAction;
                                                        GMassSeventhBumpCustom = varDraftState.SeventhBumpCampaignID;
                                                        GMassSeventhBumpAddedText = varDraftState.SeventhBumpAddedText;
                                                        GMassSeventhBumpChoice = varDraftState.SeventhBumpChoice;

                                                        GMassSeventhBump = "show";
                                                        GMassSeventhBumpBox = "y";

                                                        //GMassAFDisplay = "show";
                                                        AFStatus += "|stage 7|";

                                                    }

                                                    if (varDraftState.EighthBumpDays > 0) {

                                                        GMassEighthBumpDays = varDraftState.EighthBumpDays;
                                                        GMassEighthBumpAction = varDraftState.EighthBumpAction;
                                                        GMassEighthBumpCustom = varDraftState.EighthBumpCampaignID;
                                                        GMassEighthBumpAddedText = varDraftState.EighthBumpAddedText;
                                                        GMassEighthBumpChoice = varDraftState.EighthBumpChoice;

                                                        GMassEighthBump = "show";
                                                        GMassEighthBumpBox = "y";

                                                        //GMassAFDisplay = "show";
                                                        AFStatus += "|stage 8|";

                                                    }

                                                    if (varDraftState.BumpSuppression != "") {
                                                        GMassBumpSuppression = varDraftState.BumpSuppression;
                                                        AFStatus += "|Follow-up Do Not Send|";
                                                    }

                                                    if (!isEmpty(varDraftState.ReplyTo)){

                                                        myReplyTo = varDraftState.ReplyTo;
                                                        //AdvancedStatus += "|reply-to set|";
                                                        AdvancedStatus = (AdvancedStatus.includes("|reply-to set|") ? AdvancedStatus : AdvancedStatus + "|reply-to set|");

                                                    }
                                                    else{
                                                        myReplyTo = "";
                                                        AdvancedStatus = AdvancedStatus.replace("|reply-to set|", "");
                                                        
                                                    }

                                                    if (!isEmpty(varDraftState.FriendlyName)){

                                                        myFriendlyName = varDraftState.FriendlyName;
                                                        //AdvancedStatus += "|reply-to set|";
                                                        AdvancedStatus = (AdvancedStatus.includes("|friendly name set|") ? AdvancedStatus : AdvancedStatus + "|friendly name set|");

                                                    }
                                                    else{
                                                        myFriendlyName = "";
                                                        AdvancedStatus = AdvancedStatus.replace("|friendly name set|", "");
                                                        
                                                    }                                            

                                                } //noscheduled found block

                                                //sheets extra personalization fields
                                                if (varDraftState.WorksheetColumns.length > 0) {
                                                    GMassPersonalization = varDraftState.WorksheetColumns;
                                                    console.log("personalization set from getdraftstate");
                                                }

                                                IsEdited = varDraftState.IsEdited;
                                                IsPaused = varDraftState.IsPaused;
                                                IsProcessing = varDraftState.IsProcessing;
                                                AllDone = varDraftState.AllDone;
                                            }

                                            //done retrieving draft state from server, so whether it's present in Scheduled or not, we're good
                                            GotState = true;
                                            console.log("GM: GotState=true because Draft ID state retrieved");

                                        }
                                    }
                                }


                            }, 500);

                        }
                    });



                    //only hiding Send button if there's ONE compose window open. if multiple, not hiding, cause know way to identify the right Send button
                    var SendButtonAll = ((App.includes("Gmail")) ? document.querySelectorAll('[data-tooltip*="Enter"][data-tooltip-delay="800"][role="button"]') : document.querySelectorAll('div.sY.dy.Go.qj[aria-disabled="false"]'));
                    if (SendButtonAll.length == 1) {
                        var SendButton = ((App.includes("Gmail")) ? document.querySelector('[data-tooltip*="Enter"][data-tooltip-delay="800"][role="button"]') : document.querySelector('div.sY.dy.Go.qj'));
                        var SendSettings = SendButton.nextSibling;
                        if (SendButton != null) {
                            var SendDisplay = SendButton.style.display;
                            //alert(SendDisplay);
                            //SendButton.style.display = "none";
                            var SendButtonHide = setInterval(function () {
                                if (((composeView.getToRecipients().length == 1 && composeView.getToRecipients()[0].emailAddress.includes("@gmass.co")) || composeView.getToRecipients().length > 20 || GMassLaunchedCompose || ((composeView.getToRecipients().length > 0) && (composeView.getToRecipients()[0].emailAddress.indexOf("-big-") != -1))) && (!boolForceShowSend) && (composeView.getToRecipients()[composeView.getToRecipients().length - 1].emailAddress.toLowerCase() != "showsend@gmass.co")) {

                                    if (SendButton.style.display == "") {
                                        if (!IsScheduled) {
                                            if (composeView.getToRecipients()[0].emailAddress == "cancel@gmass.co"){
                                                sdk.ButterBar.showMessage({ html: "Oh no! Looks like you're about to cancel your subscription. If there's anything I can do to save you, email our founder at ajay@wordzen.com. Also, just FYI, you can <a style=\"color: #99FFFF\" href=\"https://www.gmass.co/g/transfer\" target=\"_blog\">transfer</a> your subscription to another Gmail account. Lastly, we've hidden the Send button to make sure you don't press it by mistake. Want it back? Add ShowSend@gmass.co to the To field.", time: 20000 });
                                            }
                                            else if (composeView.getToRecipients()[0].emailAddress.includes("@gmass.co") && !ComposeFirstAddressAlias(composeView)){
                                                sdk.ButterBar.showMessage({ text: "Looks like you're about to issue a GMass command, so we've hidden the Send button to make sure you don't press it by mistake. Want it back? Add ShowSend@gmass.co to the To field.", time: 10000 });
                                            }
                                            else
                                            {
                                                sdk.ButterBar.showMessage({ text: "We've hidden the Send button to prevent you from making a dastardly mistake! Want it back? Add ShowSend@gmass.co to the To field.", time: 10000, priority: 1 });
                                            }
                                        }
                                        SendButton.style.display = "none";
                                        SendSettings.style.display = "none";
                                    }

                                }


                                else 
                                {
                                    if (composeView.getToRecipients().length > 0 && composeView.getToRecipients()[composeView.getToRecipients().length - 1].emailAddress.toLowerCase() == "showsend@gmass.co") {
                                        boolForceShowSend = true;
                                        clearInterval(SendButtonHide);
                                    }
                                    SendButton.style.display = "";
                                    SendSettings.style.display = "";
                                }

                                if (ComposeFirstAddressAlias(composeView) && composeView.getToRecipients()[composeView.getToRecipients().length - 1].emailAddress.toLowerCase() == "expand@gmass.co") 
                                {
                                    ExpandToAddress(composeView);
                                }

                                if (ComposeFirstAddressAlias(composeView) && composeView.getToRecipients()[composeView.getToRecipients().length - 1].emailAddress.toLowerCase() == "download@gmass.co") 
                                {
                                    DownloadToAddress(composeView);
                                }

                                
                            }, 3000);
                        }
                    }
                    var SMTPSettings = setInterval(function () {

                        if (composeView.getToRecipients().length == 1 && composeView.getToRecipients()[0].emailAddress.toLowerCase() == "smtp@gmass.co" && composeView.getSubject().substring(0, 3) == "set") {
                            composeView.setBodyHTML("SMTP Server: <br>Port: 25<br>Username: <br>Password: <br>");
                            clearInterval(SMTPSettings);
                        }

                    }, 3000);

                    //****************settings box
                    //var SettingsShow = "off";

                    //NEW SETTINGS BOX CODE
                    //box is put together after compose comes into existence, instead of after clicking settings arrow (old way)
                    var SettingsFormed = false;
                    var AccountStatusRetrieved = false;
                    var TestButton;
                    var SettingsBox = document.createElement("div");

                    SettingsBox.id = settingsID;
                    document.body.appendChild(SettingsBox);
                    if (GMassDebug) { console.log("settings box created with id " + settingsID); }

                    //new way: still want to get state of Draft/Compose so we can set the right HTML off initially
                    //SETTINGS DIV WON'T EVEN START TO BE CREATED UNTIL GOTSTATE==TRUE
                    var SettingsInterval = setInterval(function () {

                        if (GotState == true) {
                            if (GMassDebug) { console.log("about to clear interval and start forming settings box"); }
                            clearInterval(SettingsInterval);


                            //**********CREATE HTML FOR SETTINGS BOX DIV
                            //**********CREATE HTML FOR SETTINGS BOX DIV
                            //**********CREATE HTML FOR SETTINGS BOX DIV


                            var OptionsBox = '<div class="g_settings" id="' + settingsID + 'bigdiv" style="background: #FFFFFF; overflow-y: auto; max-height: 740px;">'

                            OptionsBox += '<div class="g_guide"><a style="text-decoration: none" href="http://www.gmass.co/blog/users-guide-to-the-gmass-settings-box/" target="_gmass">?</a></div> \
                            <div class="g_status" id="' + settingsID + 'AccountStatusDiv" style="display: inline-block; padding-top: 2px; padding-bottom: 2px; padding-left: 6px; padding-right: 6px; border-radius: 8px; float: right; margin-right: 4px; font-size: 8pt;">'
                            OptionsBox += 'Please wait...' + '</div>';

                            if (!composeView.isInlineReplyForm()) {
                                /*if (IsEdited) {
                                    OptionsBox += '<div style="display: block; padding: 7px; background-color: #ecaafb"><div style="float: left; width: 120px; font-weight: bold">Improve:</div> See <button type="button" class="GMassFieldWordzen" id="' + settingsID + 'WordzenBefore">Before</button><button type="button" class="GMassFieldWordzen" id="' + settingsID + 'WordzenDiff">Differences</button><button type="button" class="GMassFieldWordzen" id="' + settingsID + 'WordzenAfter">After</button>'

                                }
                                else {
                                    OptionsBox += '<div style="display: block; padding: 7px; background-color: #ecaafb"><div style="float: left; width: 120px; font-weight: bold">Improve:</div> <button type="button" data-field="{Wordzen}" class="GMassFieldWordzen" id="' + settingsID + 'GMassWordzen">Live p<span style="color:green;">r</span>oof<span style="color:red;text-decoration:line-through">e</span>re<span style="color:green;">a</span>d<span style="color:red;text-decoration:line-through">d</span>ing</button>'

                                }*/

                                OptionsBox += '<div class="g_tools">';
                                OptionsBox += '<button type="button" class="GMassFieldWordzen" id="' + settingsID + 'SeedListButton"><span>Spam Solver</span></button><button type="button" class="" id="' + settingsID + 'LinkChecker"><span>Link Checker</button><button type="button" class="" id="' + settingsID + 'Analyzer"><span>Email Analyzer</button></div>';
                                }
                                if (!composeView.isInlineReplyForm()) {
                                    OptionsBox = OptionsBox + '<div class="g_send_test"><span>Send Test Email:</span> \
                                    <div style="overflow: hidden"><select style="width: 100%" multiple="multiple" id="' + settingsID + 'TestEmailValue"></select><button type="button" id="' + settingsID + 'TestEmailButton">Send Test Email</button></div> \
                                    </div>';

                            }
                            
                            if (composeView.isInlineReplyForm()) {
                                OptionsBox = OptionsBox + '<div class="g_tools_reply"><p>You can use the "GMass" button, instead of "Send", on individual emails and replies, to take advantage of scheduling/tracking.</p></div>'
                            }

                            //load content
                            
                            OptionsBox = OptionsBox + '<div class="g_prior_content"><div>Prior Content:</div> <div style="overflow: hidden"><select id="' + settingsID + 'ContentDD"><option></option></select></div></div>'

                            //personalization buttons, sheets
                            //if (GMassPersonalization != ""){
                            if (GMassPersonalization.length > 0) {

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

                            //smtp field
                            if (!composeView.isInlineReplyForm()) {
                                OptionsBox = OptionsBox + '<div class="g_smtp" id="' + settingsID + 'smtp" style="display: none; overflow: auto"> \
                                <div style="float: left; width: 128px; font-weight: bold">&nbsp;</div> \
                                <div> \
                                \
                                <div style="float: left" id="' + settingsID + 'sendwith">Send with:</div> \
                                <div style="float: left"><label class="g_radio"><input type=radio [GMAIL] id="' + settingsID + 'GmailRadio" name="' + settingsID + 'SendWith" value=1> <span id="' + settingsID + 'sendwith2">Gmail</span></label></div> \
                                \
                                <div style="margin-left: 8px; float: left"> \
                                <div><label class="g_radio"><input type=radio [SMTP] id="' + settingsID + 'SMTPRadio" name="' + settingsID + 'SendWith" value=2> <span id="' + settingsID + 'smtpserver"></span></label>' + '</div>';
                                OptionsBox += '<div style="display: none;" id="' + settingsID + 'fastsmtpdiv"><label class="g_checkbox"><input [FASTSMTPOFF] type="checkbox" id="' + settingsID + 'fastsmtp"> <span>Fast sending</span></label></div>';

                                OptionsBox += '</div> </div> </div>';
                            }
                            else {
                                OptionsBox += '<div class="g_smtp_reply" id="' + settingsID + 'smtp" style="display: none; overflow: auto;"><div style="float: left; width: 90px; font-weight: bold;">Send using:</div><div style="float: left;font-size:8pt"><label class="g_radio"><input type=radio [GMAIL] id="' + settingsID + 'GmailRadio" name="' + settingsID + 'SendWith" value=1> <span>Gmail</span></label>&nbsp;&nbsp;&nbsp;&nbsp;<label class="g_radio"><input type=radio [SMTP] id="' + settingsID + 'SMTPRadio" name="' + settingsID + 'SendWith" value=2> <span id="' + settingsID + 'smtpserver"></span></label></div></div>'
                            }



                            //auto follow-up fields						
                            //if (!composeView.isInlineReplyForm()){
                            OptionsBox = OptionsBox +
                            '<div class="g_settings_accordions">Settings:</div><div class="g_auto_follow_up"><div id="' + settingsID + 'oa"><div><span>Auto Follow-up:</span> <span id="' + settingsID + 'mainauto"><a>+</a></span></div>';
                            OptionsBox += '<div id="' + settingsID + 'afstatus" style="display: block; overflow:hidden; font-size:8pt"></div>';
                            OptionsBox += '<div id="' + settingsID + 'GMassAFDisplay" style="display: none; overflow: hidden;">';

                            if (IsScheduled && (GMassFirstBumpBox == "y")) {
                                OptionsBox += '<div id="' + settingsID + 'autoclear"><div id="' + settingsID + 'ac" style="overflow: auto"><div style="float:left; margin-right:3px; padding-top:2px"><button class="autoclear_btn" type="button" id="' + settingsID + 'ClearBumps">Clear all auto follow-ups</button></div></div></div>';
                            }

                            OptionsBox += ' \
                                <div id="' + settingsID + 'firstbump"><div id="' + settingsID + 'fc" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'FirstBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'FirstBumpDays" name="FirstBumpDays" value=""> <span>days if</span> <select name="FirstBumpAction" id="' + settingsID + 'FirstBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'FirstBumpChoicet" name="FirstBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'FirstBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'FirstBumpChoicec" name="FirstBumpChoice" value="c"> <span id="' + settingsID + 'CM1" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'FirstBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'FirstBumpCustom" name="FirstBumpCustom"><option></option></select></div></div></div></div></div> \
                                <div id="' + settingsID + 'addsecondbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 2nd Stage</a></div> \
                                <div id="' + settingsID + 'secondbump"><div id="' + settingsID + 'sc" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'SecondBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'SecondBumpDays" name="SecondBumpDays" value=""> <span>days if</span> <select name="SecondBumpAction" id="' + settingsID + 'SecondBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'SecondBumpChoicet" name="SecondBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'SecondBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'SecondBumpChoicec" name="SecondBumpChoice" value="c"> <span id="' + settingsID + 'CM2" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'SecondBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'SecondBumpCustom" name="SecondBumpCustom"><option></option></select></div></div></div></div></div> \
                                <div id="' + settingsID + 'addthirdbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 3rd Stage</a></div> \
                                <div id="' + settingsID + 'thirdbump"><div id="' + settingsID + 'tc" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'ThirdBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'ThirdBumpDays" name="ThirdBumpDays" value=""> <span>days if</span> <select name="ThirdBumpAction" id="' + settingsID + 'ThirdBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'ThirdBumpChoicet" name="ThirdBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'ThirdBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'ThirdBumpChoicec" name="ThirdBumpChoice" value="c"> <span id="' + settingsID + 'CM3" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'ThirdBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'ThirdBumpCustom" name="ThirdBumpCustom"><option></option></select></div></div></div></div></div> \
                                <div id="' + settingsID + 'addfourthbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 4th Stage</a></div> \
                                <div id="' + settingsID + 'fourthbump"><div id="' + settingsID + '4c" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'FourthBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'FourthBumpDays" name="FourthBumpDays" value=""> <span>days if</span> <select name="FourthBumpAction" id="' + settingsID + 'FourthBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'FourthBumpChoicet" name="FourthBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'FourthBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'FourthBumpChoicec" name="FourthBumpChoice" value="c"> <span id="' + settingsID + 'CM4" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'FourthBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'FourthBumpCustom" name="FourthBumpCustom"><option></option></select></div></div></div></div></div> \
                                <div id="' + settingsID + 'addfifthbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 5th Stage</a></div> \
                                <div id="' + settingsID + 'fifthbump"><div id="' + settingsID + '5c" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'FifthBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'FifthBumpDays" name="FifthBumpDays" value=""> <span>days if</span> <select name="FifthBumpAction" id="' + settingsID + 'FifthBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'FifthBumpChoicet" name="FifthBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'FifthBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'FifthBumpChoicec" name="FifthBumpChoice" value="c"> <span id="' + settingsID + 'CM5" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'FifthBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'FifthBumpCustom" name="FifthBumpCustom"><option></option></select></div></div></div></div></div> \
                                <div id="' + settingsID + 'addsixthbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 6th Stage</a></div> \
                                <div id="' + settingsID + 'sixthbump"><div id="' + settingsID + '6c" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'SixthBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'SixthBumpDays" name="SixthBumpDays" value=""> <span>days if</span> <select name="SixthBumpAction" id="' + settingsID + 'SixthBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'SixthBumpChoicet" name="SixthBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'SixthBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'SixthBumpChoicec" name="SixthBumpChoice" value="c"> <span id="' + settingsID + 'CM6" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'SixthBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'SixthBumpCustom" name="SixthBumpCustom"><option></option></select></div></div></div></div></div> \
                                <div id="' + settingsID + 'addseventhbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 7th Stage</a></div> \
                                <div id="' + settingsID + 'seventhbump"><div id="' + settingsID + '7c" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'SeventhBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'SeventhBumpDays" name="SeventhBumpDays" value=""> <span>days if</span> <select name="SeventhBumpAction" id="' + settingsID + 'SeventhBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'SeventhBumpChoicet" name="SeventhBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'SeventhBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'SeventhBumpChoicec" name="SeventhBumpChoice" value="c"> <span id="' + settingsID + 'CM7" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'SeventhBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'SeventhBumpCustom" name="SeventhBumpCustom"><option></option></select></div></div></div></div></div> \
                                <div id="' + settingsID + 'addeighthbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 8th Stage</a></div> \
                                <div id="' + settingsID + 'eighthbump"><div id="' + settingsID + '8c" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'EighthBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'EighthBumpDays" name="EighthBumpDays" value=""> <span>days if</span> <select name="EighthBumpAction" id="' + settingsID + 'EighthBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'EighthBumpChoicet" name="EighthBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'EighthBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'EighthBumpChoicec" name="EighthBumpChoice" value="c"> <span id="' + settingsID + 'CM8" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'EighthBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'EighthBumpCustom" name="EighthBumpCustom"><option></option></select></div></div></div></div></div>'
                            if (IsScheduled && HasCampaign) {
                                OptionsBox = OptionsBox + '<div id="' + settingsID + 'autosuppress" class="g_autosuppress"><div id="' + settingsID + 'as" style="overflow: auto"><div><span>Do not send auto follow-ups to:</span><input type="text" size="30" placeholder="Comma-separated emails or domains" name="AutoSuppress" id="' + settingsID + 'AutoSuppress"></div></div></div>'
                            }
                            OptionsBox = OptionsBox + '</div></div></div>'

                            //}

                            //scheduling
                            //if (!composeView.isInlineReplyForm()){
                                OptionsBox = OptionsBox + '<div class="g_schedule"><div><span>Schedule: </span><span id="' + settingsID + 'mainspread" style="font-weight: normal"><a style="cursor:pointer;color:blue;text-decoration:none;">+</a></span></div><div id="' + settingsID + 'schedulestatus" style="display: block; overflow:hidden; font-size:8pt"></div><div id="' + settingsID + 'spreadfloater" style="display: none; float:left; font-size:8pt"><div style="float: left; font-size:8pt"><div style="overflow: auto" id="timecontainer"><div style="width: 40px; float: left; margin-bottom: 5px;margin-right: 5px; font-weight: normal;color: #08639c;">Time:</div><div style="float: left;"><select id="' + settingsID + 'GMassDateDropdown"> \
                                <option selected disabled hidden value=""></option> \
                                <option value="Now" [NOW]>Now</option> \
                                <option value="OneHour" [ONEHOUR]>In 1 Hour</option> \
                                <option value="ThreeHours" [THREEHOURS]>In 3 hours</option> \
                                <option value="TomorrowMor" [TOMRROWMOR]>Tomorrow morning at 8am</option> \
                                <option value="TomorrowAft" [TOMORROWAFT]>Tomorrow afternoon at 1pm</option> \
                                <option value="TomorrowEve" [TOMORROWEVE]>Tomorrow evening at 7pm</option> \
                                <option value="Custom" [CUSTOM]>Custom date/time</option> \
                                </select>';
                            //}

                            OptionsBox = OptionsBox + '<BR><input style="[STYLEBOX]" size="30" type="text" id="' + settingsID + 'GMassDateTime" value="[CUSTOMTIME]" />';



                            //skip weekends
                            if (!composeView.isInlineReplyForm()) {
                                OptionsBox = OptionsBox + '<div style="margin-top: 5px" id="' + settingsID + 'SkipWeekendsDiv"><label class="g_checkbox"><input type="checkbox" name="SkipWeekends" id="' + settingsID + 'SkipWeekends" [SKIPWEEKENDSON]> <span>Skip weekends</span></label></div>';
                                OptionsBox += "</div></div>";
                                OptionsBox = OptionsBox + '<div style="overflow: auto; margin-top: 8px;" id="speedcontainer"><div style="width: 40px; float: left; margin-bottom: 5px; margin-top:  5px; margin-right: 5px; margin-top: 3px; font-weight: normal; color: #08639c">Speed:</div><div style="float: left;"><div style="padding-top:0px;"><span>Send</span> <input type=text size=4 id="' + settingsID + 'MaxEmails" name=MaxEmails value="[MAXEMAILS]"> <span>emails/day</span> <button type="button" id="' + settingsID + 'checkusage">Show usage</button></div><div style="margin-top:4px;"><label class="g_checkbox"><input type="checkbox" id="' + settingsID + 'DelayCheckbox" [DELAYOFF]> <span>Pause a few seconds between emails</span></label></div>';
                                OptionsBox += "</div></div>";

                                //no longer just for sheets, but repeat option doesn't make sense for reply
                                OptionsBox = OptionsBox + '<div style="overflow: auto; margin-top: 8px;" id="repeatcontainer"><div style="margin-top: 5px" id="' + settingsID + 'RecurDiv"><div style="width: 40px; float: left; margin-bottom: 5px; margin-top: 2px; margin-right: 5px; font-weight: normal; color: #08639c">Repeat:</div><div style="float: left; align-items: center;"><label class="g_checkbox"><input type="checkbox" style="position: relative;" name="Recur" id="' + settingsID + 'Recur" [RECURON]><span></span></label><span id="' + settingsID + 'RecurEveryLabel" style="font-size: 13px; margin-right: 3px;">Every</span> <input style="margin-right: 2px;" type=text size=2 id="' + settingsID + 'RecurEvery" name=RecurEvery value="[RECUREVERY]"> <select name="repeatdh" id="' + settingsID + 'repeatdh"><option value="d">Day</option><option value="h">Hour</option><option value="w">Week</option><option value="m">Month</option></select><div id="' + settingsID + 'repeatmode" style="display: inline; visibility: hidden;"> <span id="' + settingsID + 'RecurToLabel">to</span> <select name="repeatneworall" id="' + settingsID + 'repeatneworall"><option value="n">new</option><option value="a">all</option></select> <span id="' + settingsID + 'RecurSheetLabel">Sheet emails</span></div></div>';
                                OptionsBox += "</div></div>";
                            }
                            else{
                                OptionsBox += "</div></div>";
                            }








                            OptionsBox = OptionsBox + '</div></div></div>'

                            //suppression box
                            if (!composeView.isInlineReplyForm()) { 

                                OptionsBox = OptionsBox + '<div class="g_advanced"><div><span>Advanced: </span><span id="' + settingsID + 'mainadvanced" style="font-weight: normal"><a style="cursor:pointer;color:blue;text-decoration:none;">+</a></span></div>';
                                OptionsBox = OptionsBox + '<div style="overflow: hidden">'; //container div on the right
                                OptionsBox = OptionsBox + '<div id="' + settingsID + 'advancedstatus" style="display: block; font-size:8pt"></div>';
                                OptionsBox = OptionsBox + '<div class="advanced-box" style="display: none; font-size:8pt" id="' + settingsID + 'advanceddiv">';
                                
                                OptionsBox = OptionsBox + '<div id="advanced0" style="margin-bottom: 10px;">';

                                OptionsBox = OptionsBox + '<span>Send as:</span> <label class="g_radio"><input type=radio [NEW] id="' + settingsID + 'NewRadio" name="' + settingsID + 'NewReplyRadio" value=x> <span>New messages</span></label>&nbsp;&nbsp;&nbsp;&nbsp;<label class="g_radio"><input type=radio [REPLY] id="' + settingsID + 'ReplyRadio" name="' + settingsID + 'NewReplyRadio" value=y> <span>Replies</span></label>';

                                OptionsBox = OptionsBox + '</div><hr style="margin-top: 0px; margin-bottom: 10px;">';

                                OptionsBox = OptionsBox + '<div id="advanced2" style="margin-bottom: 10px;">';
                                //OptionsBox = OptionsBox + 'Reply-To: <input size="36" placeholder="' + (IsScheduled ? "none" : "Uses Gmail Settings, unless overridden") + '" value="' + myReplyTo + '" type="search" id="' + settingsID + 'replyto">';
                                OptionsBox = OptionsBox + '<span>Reply-To:</span> <select style="width: 200px;" id="' + settingsID + 'replyto"><option></option></select>';
                                OptionsBox = OptionsBox + '</div><hr style="margin-top: 0px; margin-bottom: 10px;">'; 

                                OptionsBox = OptionsBox + '<div id="advanced1" style="margin-bottom: 10px;">';

                                OptionsBox = OptionsBox + '<span>Suppress anyone who received these campaigns:</span><select style="margin-bottom: 3px; width: 280px" multiple name="suppression" id="' + settingsID + 'suppression" size="5"></select><span class="receive receive-past">Or received anything in the past</span> <input class="receive-input" type="text" placeholder="0" size="3" id="' + settingsID + 'SuppressionDays" value="[SUPPRESSIONDAYS]"> <span class="receive">days</span>';

                                OptionsBox = OptionsBox + '</div><hr style="margin-top: 0px; margin-bottom: 10px;">';

                                OptionsBox = OptionsBox + '<div id="advanced3">';

                                OptionsBox = OptionsBox + '<span>Friendly Name:</span> <input size="32" placeholder="' + (IsScheduled ? "none" : "Choose a friendly campaign name") + '" value="' + myFriendlyName + '" type="search" id="' + settingsID + 'friendlyname">';

                                OptionsBox = OptionsBox + '</div>';                         

                                OptionsBox = OptionsBox + '</div>';



                                OptionsBox = OptionsBox + '</div>'; 
                                OptionsBox = OptionsBox + '</div>';
                            }  

                            if (IsScheduled) {

                                OptionsBox += '<div class="g_campaigns" overflow: hidden;><div style="overflow: hidden;">';

                                if (1==1){
                                    OptionsBox += '<button type="button" id="' + settingsID + 'savecampaign">SAVE Changes</button><button type="button" id="' + settingsID + 'pauseresumecampaign">';
            						if (IsPaused) {
                                        OptionsBox += 'Resume Campaign';
                                    }
                                    else {
                                        OptionsBox += 'Pause Campaign';
                                    }
            						OptionsBox += '</button><button type="button" id="' + settingsID + 'cancelcampaign">Cancel Campaign</button><br> ';

                                }
                                //has a scheduled but maybe errored out, because errored out = AllDone true
                                OptionsBox += '<a href="javascript:void(0)"><span id="' + settingsID + 'getcampaignstatus">Get campaign status</span></a></div></div>'; 

                            }
                            


                            // OptionsBox += '<div class="g_guide"><a style="text-decoration: none" href="http://www.gmass.co/blog/users-guide-to-the-gmass-settings-box/" target="_gmass">?</a></div> \
                            // <div class="g_status" id="' + settingsID + 'AccountStatusDiv" style="display: inline-block; padding-top: 2px; padding-bottom: 2px; padding-left: 6px; padding-right: 6px; border-radius: 8px; float: right; margin-right: 4px; font-size: 8pt;">'
                            // OptionsBox += 'Please wait...' + '</div>';



                            /*if (sdk.User.getEmailAddress() == "ryan@e1even.com"){
                                OptionsBox += '<span id="testlink">[test]</span>';
                            }*/

                            //break draft free feature
                            if (composeView.isInlineReplyForm()) {
                                OptionsBox += '<div class="g_draft_free" id="' + settingsID + 'BreakDraftFreeLink"><a id="' + settingsID + 'BDFText">Break Draft Free</a></div>';
                            }
                            //href="http://www.gmass.co/gmass/breakdraftfree?emailaddress=' + sdk.User.getEmailAddress() + '&draftid=' + ComposeDraftID +  '" target="_gmass"

                            if (GMassDebug) {
                                OptionsBox += '<div id="' + settingsID + 'Debug" style="display: inline-block; padding-top: 2px; padding-bottom: 2px; padding-left: 6px; padding-right: 6px; border-radius: 8px; float: right; margin-right: 4px; font-size: 8pt;">Debug</div>'
                            }

                            OptionsBox += '</div>';

                            //should also clear out other brackets for each matching if condition, it's a pain i know
                            if (GMassDateDropdown == "Now") {
                                OptionsBox = OptionsBox.replace("[NOW]", "selected");
                            }
                            if (GMassDateDropdown == "OneHour") {
                                OptionsBox = OptionsBox.replace("[ONEHOUR]", "selected");
                            }

                            if (GMassDateDropdown == "ThreeHours") {
                                OptionsBox = OptionsBox.replace("[THREEHOURS]", "selected");
                            }
                            if (GMassDateDropdown == "TomorrowMor") {
                                OptionsBox = OptionsBox.replace("[TOMRROWMOR]", "selected");
                            }
                            if (GMassDateDropdown == "TomorrowAft") {
                                OptionsBox = OptionsBox.replace("[TOMORROWAFT]", "selected");
                            }
                            if (GMassDateDropdown == "TomorrowEve") {
                                OptionsBox = OptionsBox.replace("[TOMORROWEVE]", "selected");
                            }
                            if (GMassDateDropdown == "Custom") {
                                OptionsBox = OptionsBox.replace("[CUSTOM]", "selected");
                            }


                            if (GMassDateTextBox !== null) {

                                OptionsBox = OptionsBox.replace("[CUSTOMTIME]", GMassDateTextBox);

                            }

                            if (GMassDateTextBox == "") {

                                OptionsBox = OptionsBox.replace("[STYLEBOX]", "display: none;");
                            }


                            if (myMaxEmails !== null) {

                                OptionsBox = OptionsBox.replace("[MAXEMAILS]", myMaxEmails);

                            }
                            else {
                                //OptionsBox = OptionsBox.replace("[LISTNAME]", "");
                                OptionsBox = OptionsBox.replace("[MAXEMAILS]", "max");
                            }

                            if (myRecurEvery !== null) {

                                OptionsBox = OptionsBox.replace("[RECUREVERY]", myRecurEvery);

                            }
                            else {
                                //OptionsBox = OptionsBox.replace("[LISTNAME]", "");
                                OptionsBox = OptionsBox.replace("[RECUREVERY]", "1");
                            }

                            if (mySuppressionDays !== null) {

                                OptionsBox = OptionsBox.replace("[SUPPRESSIONDAYS]", mySuppressionDays);

                            }
                            else {
                                //OptionsBox = OptionsBox.replace("[LISTNAME]", "");
                                OptionsBox = OptionsBox.replace("[SUPPRESSIONDAYS]", "0");
                            }


                            if (mySendSave == "send" || mySendSave == "default") {

                                OptionsBox = OptionsBox.replace("[SEND]", "checked")

                            }
                            else if (mySendSave == "save") {

                                OptionsBox = OptionsBox.replace("[SAVE]", "checked")


                            }

                            if (SMTP == "on") {
                                OptionsBox = OptionsBox.replace("[SMTP]", "checked")
                            }
                            else if (SMTP == "off") {
                                OptionsBox = OptionsBox.replace("[GMAIL]", "checked")
                            }


                            if (myNewReply == "new" || myNewReply == "default") {

                                OptionsBox = OptionsBox.replace("[NEW]", "checked")

                            }
                            else if (myNewReply == "reply") {

                                OptionsBox = OptionsBox.replace("[REPLY]", "checked")

                            }

                            if (myDelay == "on") {

                                OptionsBox = OptionsBox.replace("[DELAYOFF]", "checked")
                                //GMassSpreadDisplay = "show";

                            }

                            if (fastSMTP == "on") {

                                OptionsBox = OptionsBox.replace("[FASTSMTPOFF]", "checked")
                                //GMassSpreadDisplay = "show";

                            }                    

                            if (myOpenTracking == "on" || myOpenTracking == "default") {

                                OptionsBox = OptionsBox.replace("[OPENON]", "checked")

                            }
                            else if (myOpenTracking == "off") {

                                OptionsBox = OptionsBox.replace("[OPENOFF]", "checked")

                            }
                            //if (myClickTracking=="on" || myClickTracking=="default"){
                            if (myClickTracking == "on" || myClickTracking == "default") {

                                OptionsBox = OptionsBox.replace("[CLICKON]", "checked")

                            }


                            if (SkipWeekends == "on") {

                                OptionsBox = OptionsBox.replace("[SKIPWEEKENDSON]", "checked")

                            }

                            //OptionsBox = OptionsBox.replace("[TESTADDRESSES]", myTestAddresses)

                            //clean up
                            OptionsBox = OptionsBox.replace("[SEND]", "");
                            OptionsBox = OptionsBox.replace("[SAVE]", "");
                            OptionsBox = OptionsBox.replace("[SMTP]", "");
                            OptionsBox = OptionsBox.replace("[GMAIL]", "");
                            OptionsBox = OptionsBox.replace("[NEW]", "");
                            OptionsBox = OptionsBox.replace("[REPLY]", "");
                            OptionsBox = OptionsBox.replace("[OPENON]", "");
                            OptionsBox = OptionsBox.replace("[OPENOFF]", "");
                            OptionsBox = OptionsBox.replace("[CLICKON]", "");
                            OptionsBox = OptionsBox.replace("[CLICKOFF]", "");
                            OptionsBox = OptionsBox.replace("[SKIPWEEKENDSON]", "");
                            OptionsBox = OptionsBox.replace("[DELAYOFF]", "");

                            //**********DONE CREATING HTML FOR SETTINGS BOX DIV
                            //*********************************
                            //*********************************
                            //*********************************
                            //*********************************
                            if (GMassDebug) { console.log("about to set HTML for options box"); }
                            SettingsBox.innerHTML = OptionsBox;
                            if (GMassDebug) { console.log("DONE to set HTML for options box"); }

                            //document.getElementById(settingsID + "sendwith").innerHTML = "blahblah";
                            //if (GMassDebug) { console.log("***sendwidth div retrieved"); }
                            //*********************************
                            //*********************************

                            //SettingsBox.innerHTML = OptionsBox
                            //SettingsBox.style.display = "block";
                            /*SettingsBox.style.zIndex = "8";
                            SettingsBox.style.fontSize = "10pt";
                            SettingsBox.style.overflow = "auto";
                            SettingsBox.style.background = "white";
                            SettingsBox.style.width = "500px";*/
                            //SettingsBox.style.height = "500px";
                            /*SettingsBox.style.position = "fixed";
                            SettingsBox.style.visibility = "hidden";*/

                            //************EVENT HANDLERS FOR SETTINGS ELEMENTS**********************
                            //**********************************
                            //**********************************
                            //**********************************
                            //**********************************

                            $(document).ready(function () {

                                //need to pull test addresses from database, add them to the regular select box as options
                                //then below, setting its value to myTestAddresses should work as long as DB contains those values, which it won't the first time user uses
                                //DB should always include user account address in results, so when user uses first time, default email is filled out
                                //will have to test with brand new account and cleared out localstorage


                                $('#' + settingsID + 'Personalize').select2({
                                    dropdownParent: $('#' + settingsID + 'bigdiv'),
                                    width: "resolve",
                                    placeholder: ((GMassPersonalization.length > 0) ? "Select Spreadsheet Field" : "Select Field")
                                });

                                $('#' + settingsID + 'Personalize').on('change', function (e) {
                                    //InsertFieldDD(document.getElementById(settingsID + "Personalize").value, composeView);
                                    var PersonalizationToken = document.getElementById(settingsID + "Personalize").value;
                                    CopyClipboard(PersonalizationToken);
                                    sdk.ButterBar.showMessage({ html: "The  personalization variable, <span style='color: #BFFFC5'>" + PersonalizationToken + "</span>, has been copied to your clipboard. Now you can PASTE it in your <span style='color: #BFFFC5'>Subject</span> or <span style='color: #BFFFC5'>Message</span>.", time: 10000 });

                                });

                                //********************

                                //FirstBumpCustomDiv

                                //7/29/19 -- how is all this working??? we are calling select2 before we even add the items to the dropdown. and it works??
                                $('#' + settingsID + 'FirstBumpCustom').select2({
                                    dropdownParent: $('#' + settingsID + 'FirstBumpCustomDiv'),
                                    width: "style",
                                    templateResult: formatCampaignText,
                                    placeholder: ("Select message")
                                });                        

                                $('#' + settingsID + 'SecondBumpCustom').select2({
                                    dropdownParent: $('#' + settingsID + 'SecondBumpCustomDiv'),
                                    width: "style",
                                    templateResult: formatCampaignText,
                                    placeholder: ("Select message")
                                });     

                                $('#' + settingsID + 'ThirdBumpCustom').select2({
                                    dropdownParent: $('#' + settingsID + 'ThirdBumpCustomDiv'),
                                    width: "style",
                                    templateResult: formatCampaignText,
                                    placeholder: ("Select message")
                                });

                                $('#' + settingsID + 'FourthBumpCustom').select2({
                                    dropdownParent: $('#' + settingsID + 'FourthBumpCustomDiv'),
                                    width: "style",
                                    templateResult: formatCampaignText,
                                    placeholder: ("Select message")
                                });     

                                $('#' + settingsID + 'FifthBumpCustom').select2({
                                    dropdownParent: $('#' + settingsID + 'FifthBumpCustomDiv'),
                                    width: "style",
                                    templateResult: formatCampaignText,
                                    placeholder: ("Select message")
                                });     

                                $('#' + settingsID + 'SixthBumpCustom').select2({
                                    dropdownParent: $('#' + settingsID + 'SixthBumpCustomDiv'),
                                    width: "style",
                                    templateResult: formatCampaignText,
                                    placeholder: ("Select message")
                                });     

                                $('#' + settingsID + 'SeventhBumpCustom').select2({
                                    dropdownParent: $('#' + settingsID + 'SeventhBumpCustomDiv'),
                                    width: "style",
                                    templateResult: formatCampaignText,
                                    placeholder: ("Select message")
                                });     

                                $('#' + settingsID + 'EighthBumpCustom').select2({
                                    dropdownParent: $('#' + settingsID + 'EighthBumpCustomDiv'),
                                    width: "style",
                                    templateResult: formatCampaignText,
                                    placeholder: ("Select message")
                                });     

                            });

                            //********Wordzen integration
                            if (IsEdited) {
                                var BeforeButton = document.getElementById(settingsID + "WordzenBefore");
                                BeforeButton.addEventListener('click', function () {
                                    //set subject and message
                                    var xmlhttpHTML = new XMLHttpRequest();
                                    xmlhttpHTML.open("GET", varBaseURLWZ + "public/notify/GetHTML?emailAddress=" + sdk.User.getEmailAddress() + "&draftID=" + ComposeDraftID + "&state=1", true);
                                    xmlhttpHTML.send();
                                    xmlhttpHTML.onreadystatechange = function () {

                                        if (xmlhttpHTML.readyState == 4) {

                                            var ContentStuff = JSON.parse(xmlhttpHTML.responseText);

                                            //var htmlstring = ContentStuff.HTML;
                                            composeView.setBodyHTML(ContentStuff.HTML);
                                            composeView.setSubject(ContentStuff.Subject);

                                            //ContentDD[1].text = OldSelectedText.substring(0,20);
                                            //ContentDD[1].value = OldSelectedValue;

                                        }
                                    }
                                });

                                var DiffButton = document.getElementById(settingsID + "WordzenDiff");
                                DiffButton.addEventListener('click', function () {
                                    //set subject and message
                                    var xmlhttpHTML = new XMLHttpRequest();
                                    xmlhttpHTML.open("GET", varBaseURLWZ + "public/notify/GetHTML?emailAddress=" + sdk.User.getEmailAddress() + "&draftID=" + ComposeDraftID + "&state=2", true);
                                    xmlhttpHTML.send();
                                    xmlhttpHTML.onreadystatechange = function () {

                                        if (xmlhttpHTML.readyState == 4) {

                                            var ContentStuff = JSON.parse(xmlhttpHTML.responseText);

                                            //var htmlstring = ContentStuff.HTML;
                                            composeView.setBodyHTML(ContentStuff.HTML);
                                            composeView.setSubject(ContentStuff.Subject);

                                            sdk.ButterBar.showMessage({ text: "Be careful not to send this version that shows the edits!", time: 7000, className: "redbb" });

                                            //ContentDD[1].text = OldSelectedText.substring(0,20);
                                            //ContentDD[1].value = OldSelectedValue;

                                        }
                                    }
                                });

                                var AfterButton = document.getElementById(settingsID + "WordzenAfter");
                                AfterButton.addEventListener('click', function () {
                                    //set subject and message
                                    var xmlhttpHTML = new XMLHttpRequest();
                                    xmlhttpHTML.open("GET", varBaseURLWZ + "public/notify/GetHTML?emailAddress=" + sdk.User.getEmailAddress() + "&draftID=" + ComposeDraftID + "&state=3", true);
                                    xmlhttpHTML.send();
                                    xmlhttpHTML.onreadystatechange = function () {

                                        if (xmlhttpHTML.readyState == 4) {

                                            var ContentStuff = JSON.parse(xmlhttpHTML.responseText);

                                            //var htmlstring = ContentStuff.HTML;
                                            composeView.setBodyHTML(ContentStuff.HTML);
                                            composeView.setSubject(ContentStuff.Subject);

                                            //ContentDD[1].text = OldSelectedText.substring(0,20);
                                            //ContentDD[1].value = OldSelectedValue;

                                        }
                                    }
                                });
                            }

                            //************just adjust this one thing
                            if (composeView.isInlineReplyForm()) {
                                mySendSave = "send";
                            }

                            var Debug = document.getElementById(settingsID + "Debug");
                            var BreakDraftFree = document.getElementById(settingsID + "BreakDraftFreeLink");
                            var BDFText = document.getElementById(settingsID + "BDFText");
                            var RepeatDH = document.getElementById(settingsID + "repeatdh");
                            var RepeatNewOrAll = document.getElementById(settingsID + "repeatneworall");
                            var RepeatMode = document.getElementById(settingsID + "repeatmode");
                            var RecurEvery = document.getElementById(settingsID + "RecurEvery");
                            var RecurEveryLabel = document.getElementById(settingsID + "RecurEveryLabel");
                            var RecurToLabel = document.getElementById(settingsID + "RecurToLabel");
                            var RecurSheetLabel = document.getElementById(settingsID + "RecurSheetLabel");
                            //***************************
                            var mainadvanced = document.getElementById(settingsID + "mainadvanced");
                            var mainspread = document.getElementById(settingsID + "mainspread");
                            var spreadfloater = document.getElementById(settingsID + "spreadfloater");
                            var advanceddiv = document.getElementById(settingsID + "advanceddiv");

                            var mainauto = document.getElementById(settingsID + "mainauto");
                            var floater = document.getElementById(settingsID + "GMassAFDisplay");
                            var overflow = document.getElementById(settingsID + "oa");
                            //***************************
                            var divsmtp = document.getElementById(settingsID + "smtp");
                            var fastsmtpdiv = document.getElementById(settingsID + "fastsmtpdiv");

                            //**********************set account status
                            var AccountStatusDiv = document.getElementById(settingsID + "AccountStatusDiv");

                            

                            var xmlAS = new XMLHttpRequest();
                            xmlAS.open("GET", varBaseURL + "gmass/GetAccountStatusByEmail?emailAddress=" + sdk.User.getEmailAddress(), true);
                            xmlAS.send();
                            xmlAS.onreadystatechange = function () {

                                if (xmlAS.readyState == 4) {

                                    var AccountStatus = JSON.parse(xmlAS.responseText);
                                    AccountStatusDiv.innerHTML = AccountStatus.AccountStatus;
                                    //<div id="AccountStatusDiv" style="padding: 2px; border-radius: 8px; text-align: left; font-size: 8pt; background-color: gold; width: 80px;">Premium</div>
                                    if (sdk.User.getEmailAddress() == "ajaygoel999@gmail.com" || sdk.User.getEmailAddress() == "meredithlawler@gmail.com") {
                                        AccountStatusDiv.innerHTML = "<a style=\"color: #e4e4e4\" href=\"http://www.ilovesmyhoney.com\">I love my wife</a>";
                                        AccountStatusDiv.style.backgroundColor = "red";
                                        AccountStatusDiv.style.color = "#f9ecec";
                                    }
                                    else if (AccountStatus.AccountStatus == "Premium") {
                                        AccountStatusDiv.style.backgroundColor = "gold";
                                        AccountStatusDiv.style.color = "black";
                                    }
                                    else if (AccountStatus.AccountStatus == "Standard") {
                                        AccountStatusDiv.style.backgroundColor = "green";
                                        AccountStatusDiv.style.color = "#f0fbf0";
                                    }
                                    else if (AccountStatus.AccountStatus == "Minimal") {
                                        AccountStatusDiv.style.backgroundColor = "blue";
                                        AccountStatusDiv.style.color = "#f8f8ff";
                                    }
                                    else if (AccountStatus.AccountStatus == "Comp") {
                                        AccountStatusDiv.style.backgroundColor = "purple";
                                        AccountStatusDiv.style.color = "#ffedff";
                                    }
                                    else if (AccountStatus.AccountStatus == "Free") {
                                        AccountStatusDiv.innerHTML = "<a style=\"color: #e4e4e4\" href=\"https://www.gmass.co/pricing?email=" + sdk.User.getEmailAddress() + "\">Free</a>";
                                        AccountStatusDiv.style.backgroundColor = "gray";
                                        AccountStatusDiv.style.color = "#e4e4e4";

                                    }
                                    else if (AccountStatus.AccountStatus == "Disconnected") {
                                        AccountStatusDiv.style.backgroundColor = "red";
                                        AccountStatusDiv.style.color = "#f9ecec";
                                    }

                                    if (AccountStatus.SMTPSendOption) {
                                        SMTPOptionDisplay = true;
                                        //add a div for choosing between gmail and smtp server
                                        //if (mySendSave=="send"){
                                        if (divsmtp != null) {
                                            divsmtp.style.display = "block";
                                            if (!composeView.isInlineReplyForm()) {
                                                if (mySendSave == "save") {
                                                    document.getElementById(settingsID + "sendwith").innerHTML = "Create Drafts";
                                                    document.getElementById(settingsID + "sendwith2").innerHTML = "per sending limits";
                                                    document.getElementById(settingsID + "smtpserver").innerHTML = "all at once";
                                                    fastsmtpdiv.style.display = "none";
                                                }
                                                else if (mySendSave == "send") {
                                                    //12/30/18, this line often errors out with object is null so can't set innerHTML. why?
                                                    document.getElementById(settingsID + "sendwith").innerHTML = "Send with";
                                                    document.getElementById(settingsID + "sendwith2").innerHTML = "Gmail";
                                                    //document.getElementById(settingsID + "smtpserver").innerHTML = "all at once";

                                                }
                                            }
                                        }
                                        //}
                                        if (SMTP == "notset") {
                                            SMTP = "on";
                                            document.getElementById(settingsID + "SMTPRadio").checked = true;
                                            if (mySendSave == "send" && !composeView.isInlineReplyForm()){fastsmtpdiv.style.display = "block";}
                                        }
                                    }
                                    //set innerhtml to the smtp server regardless of whether option is being shown or not, because you might toggle from drafts to send without relaunching settings box
                                    if (document.getElementById(settingsID + "smtpserver") != null) {
                                        SMTPServer = AccountStatus.SMTPServer;
                                        if (mySendSave == "send") {
                                            document.getElementById(settingsID + "smtpserver").innerHTML = AccountStatus.SMTPServer;
                                        }
                                    }

                                    AccountStatusRetrieved = true;

                                }
                            }


                            //*********for auto follow-ups, just get all the form elements into variables

                            var firstbump = document.getElementById(settingsID + "firstbump");
                            var firstbumpaction = document.getElementById(settingsID + "FirstBumpAction");
                            var firstbumpbox = document.getElementById(settingsID + "FirstBumpBox");
                            var firstbumpcustom = document.getElementById(settingsID + "FirstBumpCustom");
                            var firstbumpcustomdiv = document.getElementById(settingsID + "FirstBumpCustomDiv");
                            var firstbumpdays = document.getElementById(settingsID + "FirstBumpDays");
                            var firstbumpaddedtext = document.getElementById(settingsID + "FirstBumpAddedText");
                            var firstbumpradiot = document.getElementById(settingsID + "FirstBumpChoicet");
                            var firstbumpradioc = document.getElementById(settingsID + "FirstBumpChoicec");
                            var ContentDDAUTOFirst = document.getElementById(settingsID + "FirstBumpCustom");

                            var secondbump = document.getElementById(settingsID + "secondbump");
                            var secondbumpaction = document.getElementById(settingsID + "SecondBumpAction");
                            var secondbumpbox = document.getElementById(settingsID + "SecondBumpBox");
                            var secondbumpcustom = document.getElementById(settingsID + "SecondBumpCustom");
                            var secondbumpcustomdiv = document.getElementById(settingsID + "SecondBumpCustomDiv");
                            var secondbumpdays = document.getElementById(settingsID + "SecondBumpDays");
                            var addsecondbump = document.getElementById(settingsID + "addsecondbump");
                            var secondbumpaddedtext = document.getElementById(settingsID + "SecondBumpAddedText");
                            var secondbumpradiot = document.getElementById(settingsID + "SecondBumpChoicet");
                            var secondbumpradioc = document.getElementById(settingsID + "SecondBumpChoicec");

                            var thirdbump = document.getElementById(settingsID + "thirdbump");
                            var thirdbumpaction = document.getElementById(settingsID + "ThirdBumpAction");
                            var thirdbumpbox = document.getElementById(settingsID + "ThirdBumpBox");
                            var thirdbumpcustom = document.getElementById(settingsID + "ThirdBumpCustom");
                            var thirdbumpcustomdiv = document.getElementById(settingsID + "ThirdBumpCustomDiv");
                            var thirdbumpdays = document.getElementById(settingsID + "ThirdBumpDays");
                            var addthirdbump = document.getElementById(settingsID + "addthirdbump");
                            var thirdbumpaddedtext = document.getElementById(settingsID + "ThirdBumpAddedText");
                            var thirdbumpradiot = document.getElementById(settingsID + "ThirdBumpChoicet");
                            var thirdbumpradioc = document.getElementById(settingsID + "ThirdBumpChoicec");

                            var fourthbump = document.getElementById(settingsID + "fourthbump");
                            var fourthbumpaction = document.getElementById(settingsID + "FourthBumpAction");
                            var fourthbumpbox = document.getElementById(settingsID + "FourthBumpBox");
                            var fourthbumpcustom = document.getElementById(settingsID + "FourthBumpCustom");
                            var fourthbumpcustomdiv = document.getElementById(settingsID + "FourthBumpCustomDiv");
                            var fourthbumpdays = document.getElementById(settingsID + "FourthBumpDays");
                            var addfourthbump = document.getElementById(settingsID + "addfourthbump");
                            var fourthbumpaddedtext = document.getElementById(settingsID + "FourthBumpAddedText");
                            var fourthbumpradiot = document.getElementById(settingsID + "FourthBumpChoicet");
                            var fourthbumpradioc = document.getElementById(settingsID + "FourthBumpChoicec");

                            var fifthbump = document.getElementById(settingsID + "fifthbump");
                            var fifthbumpaction = document.getElementById(settingsID + "FifthBumpAction");
                            var fifthbumpbox = document.getElementById(settingsID + "FifthBumpBox");
                            var fifthbumpcustom = document.getElementById(settingsID + "FifthBumpCustom");
                            var fifthbumpcustomdiv = document.getElementById(settingsID + "FifthBumpCustomDiv");
                            var fifthbumpdays = document.getElementById(settingsID + "FifthBumpDays");
                            var addfifthbump = document.getElementById(settingsID + "addfifthbump");
                            var fifthbumpaddedtext = document.getElementById(settingsID + "FifthBumpAddedText");
                            var fifthbumpradiot = document.getElementById(settingsID + "FifthBumpChoicet");
                            var fifthbumpradioc = document.getElementById(settingsID + "FifthBumpChoicec");

                            var sixthbump = document.getElementById(settingsID + "sixthbump");
                            var sixthbumpaction = document.getElementById(settingsID + "SixthBumpAction");
                            var sixthbumpbox = document.getElementById(settingsID + "SixthBumpBox");
                            var sixthbumpcustom = document.getElementById(settingsID + "SixthBumpCustom");
                            var sixthbumpcustomdiv = document.getElementById(settingsID + "SixthBumpCustomDiv");
                            var sixthbumpdays = document.getElementById(settingsID + "SixthBumpDays");
                            var addsixthbump = document.getElementById(settingsID + "addsixthbump");
                            var sixthbumpaddedtext = document.getElementById(settingsID + "SixthBumpAddedText");
                            var sixthbumpradiot = document.getElementById(settingsID + "SixthBumpChoicet");
                            var sixthbumpradioc = document.getElementById(settingsID + "SixthBumpChoicec");

                            var seventhbump = document.getElementById(settingsID + "seventhbump");
                            var seventhbumpaction = document.getElementById(settingsID + "SeventhBumpAction");
                            var seventhbumpbox = document.getElementById(settingsID + "SeventhBumpBox");
                            var seventhbumpcustom = document.getElementById(settingsID + "SeventhBumpCustom");
                            var seventhbumpcustomdiv = document.getElementById(settingsID + "SeventhBumpCustomDiv");
                            var seventhbumpdays = document.getElementById(settingsID + "SeventhBumpDays");
                            var addseventhbump = document.getElementById(settingsID + "addseventhbump");
                            var seventhbumpaddedtext = document.getElementById(settingsID + "SeventhBumpAddedText");
                            var seventhbumpradiot = document.getElementById(settingsID + "SeventhBumpChoicet");
                            var seventhbumpradioc = document.getElementById(settingsID + "SeventhBumpChoicec");

                            var eighthbump = document.getElementById(settingsID + "eighthbump");
                            var eighthbumpaction = document.getElementById(settingsID + "EighthBumpAction");
                            var eighthbumpbox = document.getElementById(settingsID + "EighthBumpBox");
                            var eighthbumpcustom = document.getElementById(settingsID + "EighthBumpCustom");
                            var eighthbumpcustomdiv = document.getElementById(settingsID + "EighthBumpCustomDiv");
                            var eighthbumpdays = document.getElementById(settingsID + "EighthBumpDays");
                            var addeighthbump = document.getElementById(settingsID + "addeighthbump");
                            var eighthbumpaddedtext = document.getElementById(settingsID + "EighthBumpAddedText");
                            var eighthbumpradiot = document.getElementById(settingsID + "EighthBumpChoicet");
                            var eighthbumpradioc = document.getElementById(settingsID + "EighthBumpChoicec");

                            var AutoSuppress = document.getElementById(settingsID + "AutoSuppress");
                            var ClearBumps = document.getElementById(settingsID + "ClearBumps");

                            var ContentDDAUTOSecond = document.getElementById(settingsID + "SecondBumpCustom");
                            var ContentDDAUTOThird = document.getElementById(settingsID + "ThirdBumpCustom");
                            var ContentDDAUTOFourth = document.getElementById(settingsID + "FourthBumpCustom");
                            var ContentDDAUTOFifth = document.getElementById(settingsID + "FifthBumpCustom");
                            var ContentDDAUTOSixth = document.getElementById(settingsID + "SixthBumpCustom");
                            var ContentDDAUTOSeventh = document.getElementById(settingsID + "SeventhBumpCustom");
                            var ContentDDAUTOEighth = document.getElementById(settingsID + "EighthBumpCustom");
                            //********************		

                            if (!composeView.isInlineReplyForm()) {
                                var ContentDDSuppression = document.getElementById(settingsID + "suppression");
                            }

                            //******FILL OUT SELECT BOXES OF AUTO FOLLOW UP CUSTOM MESSAGES

                            var myoptionAuto;
                            var myOption2Auto;
                            var myOption3Auto;
                            var myOption4Auto;
                            var myOption5Auto;
                            var myOption6Auto;
                            var myOption7Auto;
                            var myOption8Auto;
                            var myOptionSuppression;

                            //creating an array of chosen suppression jobs, so that we remember what user has selected
                            if (!composeView.isInlineReplyForm()) {
                                var arraySuppression = GMassSuppression.split(',');
                            }


                            var ContentDD = document.getElementById(settingsID + "ContentDD");

                            var myoption;

                            if (!composeView.isInlineReplyForm()){
                                var ReplyToInterval = setInterval(function () {
                                    //GotState=true is necessary in case the scheduled campaign has a replyto that isn't naturally in the the dropdown, like from before we added them to DB
                                    if (typeof resultReplyToAddresses != 'undefined' && GotState) {
                                        
                                        if (1==1) {
                                            if (GMassDebug) { console.log("about to start populating replyto addresses dropdown"); }
                                            clearInterval(ReplyToInterval);

                                            var arrayReplyToAddressesLength = resultReplyToAddresses.addresses.length;

                                            var FoundCurrentReplyToInDB = false;

                                                //adding NONE option because on single select, you can't clear the selection back to the placeholder, but you can clear it back to first option
                                                myreplytoaddressoption = document.createElement("option");
                                                myreplytoaddressoption.text = "None";
                                                //ideally this value should be "", but turns out, when select2 run on it, option doesn't get put in. doesn't really matter, cause this value will never be used, cause onchange looks for valid email
                                                myreplytoaddressoption.value = "0";
                                                ReplyToInput.add(myreplytoaddressoption);                            

                                            for (i = 0; i < (resultReplyToAddresses.addresses.length) ; i++) {

                                                myreplytoaddressoption = document.createElement("option");

                                                myreplytoaddressoption.text = resultReplyToAddresses.addresses[i].EmailAddress;
                                                myreplytoaddressoption.value = resultReplyToAddresses.addresses[i].EmailAddress;

                                                if (ValidateEmail(myReplyTo) && resultReplyToAddresses.addresses[i].EmailAddress == myReplyTo){
                                                    FoundCurrentReplyToInDB = true;
                                                }

                                                if (ReplyToInput != null) {
                                                    ReplyToInput.add(myreplytoaddressoption);
                                                }

                                            }

                                            //add it as option if not in DB
                                            if (ValidateEmail(myReplyTo) && !FoundCurrentReplyToInDB){
                                                myreplytoaddressoption = document.createElement("option");

                                                myreplytoaddressoption.text = myReplyTo;
                                                myreplytoaddressoption.value = myReplyTo;

                                                if (ReplyToInput != null) {
                                                    ReplyToInput.add(myreplytoaddressoption);
                                                }                                    
                                            }

                                            if (GMassDebug) { console.log("done populating replyto addresses dropdowns"); }

                                            //leave placeholder in place if no replyto set
                                            if (ValidateEmail(myReplyTo)){
                                                $('#' + settingsID + 'replyto').val(myReplyTo);
                                            }

                                            $('#' + settingsID + 'replyto').select2({
                                                dropdownParent: $('#' + settingsID + 'bigdiv'),
                                                width: "style",
                                                //selectOnClose makes it so you can TAB to select what you've typed, because it's actually closing the selection, https://github.com/select2/select2/pull/4325
                                                selectOnClose: true,
                                                tags: true,
                                                allowClear: true,
                                                placeholder: "Enter a reply-to address",
                                                  createTag: function (params) {
                                                    // Don't offset to create a tag if there is no @ symbol
                                                    if (params.term.indexOf('@') === -1) {
                                                      // Return null to disable tag creation
                                                      return null;
                                                    }

                                                    return {
                                                      id: params.term,
                                                      text: params.term
                                                    }
                                                  }                            
                                            });                                

                                        }
                                    }
                                }, 100);
                            }

                            var RT1 = setInterval(function () {
                                if (typeof resultTestAddresses != 'undefined') {
                                    
                                    //even if resulttestaddresses fails because of bad key still want this to run, so user can populate his own test address
                                    if (1==1) {
                                        if (GMassDebug) { console.log("about to start populating test addresses dropdowns"); }
                                        clearInterval(RT1);

                                        var arrayTestAddressesLength = resultTestAddresses.testaddresses.length;

                                        for (i = 0; i < (resultTestAddresses.testaddresses.length) ; i++) {

                                            mytestaddressoption = document.createElement("option");

                                            mytestaddressoption.text = resultTestAddresses.testaddresses[i].EmailAddress;
                                            mytestaddressoption.value = resultTestAddresses.testaddresses[i].EmailAddress;


                                            if (TestAddressesField != null) {
                                                TestAddressesField.add(mytestaddressoption);
                                            }


                                        }
                                        if (GMassDebug) { console.log("done populating test addresses dropdowns"); }

                                        $('#' + settingsID + 'TestEmailValue').val(myTestAddresses.split(','));

                                        $('#' + settingsID + 'TestEmailValue').select2({
                                            dropdownParent: $('#' + settingsID + 'bigdiv'),
                                            width: "style",
                                            //selectOnClose makes it so you can TAB to select what you've typed, because it's actually closing the selection, https://github.com/select2/select2/pull/4325
                                            selectOnClose: true,
                                            tags: true,
                                            tokenSeparators: [',',' ',';'],
                                            placeholder: "Enter a test address",
                                              createTag: function (params) {
                                                // Don't offset to create a tag if there is no @ symbol
                                                if (params.term.indexOf('@') === -1) {
                                                  // Return null to disable tag creation
                                                  return null;
                                                }

                                                return {
                                                  id: params.term,
                                                  text: params.term
                                                }
                                              }                            
                                        });                                

                                    }
                                }
                            }, 100);
                            //*******DONE FILLING OUT AUTO FOLLOW-UP AND SUPPRESSION SELECT BOXES

                            var RC1 = setInterval(function () {
                                //7/29/19 -- reason we need condition of document.getElementById(settingsID) is because we need to ensure the main settings div exists
                                //it might not if user clicked, destroyed settings arrow a bunch of times before settings was ready, possible for settings to be added to doc, resultcampaigns is ready, then suddenly settings removed by a delayed "destroy" event, so this is a good check
                                //the whole fix here is for rare issue where load content and suppression dropdowns didn't get select2'd and therefore wouldn't work. now should work 100% of the time
                                //i *think* it's because selct2 binds itself to a DIV, and so if that DIV doesn't exist in the document then select2 can't work. for rest of select2 dropdowns other than load content and suppression, it happens outside of the condition of resultCampaigns being ready, so it happens instantly when compose launched
                                //because when compose is launched settings div is instantly formed and added to document
                                //select2 does not throw an error when it doesn't do anything
                                //further evidence, when stepping through code, in cases where the 2 dropdowns didn't get selectized, doing a document.getelementbyid in console on the load content dropdown yielded null, but when it does work, it yields the object
                                if (typeof resultCampaigns != 'undefined' && document.getElementById(settingsID)) {
                                    //if (resultCampaigns !== null) {
                                    if (resultCampaigns.success) {
                                        if (GMassDebug) { console.log("about to start populating campaign dropdowns"); }
                                        clearInterval(RC1);

                                        var arrayCampaignsLength = resultCampaigns.campaigns.length;

                                        for (i = 0; i < (resultCampaigns.campaigns.length) ; i++) {

                                            myoption = document.createElement("option");
                                            myoptionAuto = document.createElement("option");
                                            myoption2Auto = document.createElement("option");
                                            myoption3Auto = document.createElement("option");
                                            myoption4Auto = document.createElement("option");
                                            myoption5Auto = document.createElement("option");
                                            myoption6Auto = document.createElement("option");
                                            myoption7Auto = document.createElement("option");
                                            myoption8Auto = document.createElement("option");
                                            myoptionSuppression = document.createElement("option");

                                            var CampaignNameSubject = resultCampaigns.campaigns[i].campaignName;
                                            var CampaignNameFriendly = resultCampaigns.campaigns[i].friendlyName;

                                            /*if (resultCampaigns.campaigns[i].campaignName == null && resultCampaigns.campaigns[i].friendlyName == null) {
                                                myoption.text = resultCampaigns.campaigns[i].TheDate + ": " + "NO NAME AVAILABLE" + "--" + resultCampaigns.campaigns[i].Count;
                                                myoptionAuto.text = resultCampaigns.campaigns[i].TheDate + ": " + "NO NAME AVAILABLE" + "--" + resultCampaigns.campaigns[i].Count;
                                                myoption2Auto.text = resultCampaigns.campaigns[i].TheDate + ": " + "NO NAME AVAILABLE" + "--" + resultCampaigns.campaigns[i].Count;
                                                myoption3Auto.text = resultCampaigns.campaigns[i].TheDate + ": " + "NO NAME AVAILABLE" + "--" + resultCampaigns.campaigns[i].Count;
                                                myoption4Auto.text = resultCampaigns.campaigns[i].TheDate + ": " + "NO NAME AVAILABLE" + "--" + resultCampaigns.campaigns[i].Count;
                                                myoption5Auto.text = resultCampaigns.campaigns[i].TheDate + ": " + "NO NAME AVAILABLE" + "--" + resultCampaigns.campaigns[i].Count;
                                                myoption6Auto.text = resultCampaigns.campaigns[i].TheDate + ": " + "NO NAME AVAILABLE" + "--" + resultCampaigns.campaigns[i].Count;
                                                myoption7Auto.text = resultCampaigns.campaigns[i].TheDate + ": " + "NO NAME AVAILABLE" + "--" + resultCampaigns.campaigns[i].Count;
                                                myoption8Auto.text = resultCampaigns.campaigns[i].TheDate + ": " + "NO NAME AVAILABLE" + "--" + resultCampaigns.campaigns[i].Count;
                                                myoptionSuppression.text = resultCampaigns.campaigns[i].TheDate + ": " + "NO NAME AVAILABLE" + "--" + resultCampaigns.campaigns[i].Count;
                                            }
                                            else {*/
                                                myoption.text = (CampaignNameFriendly == null ? "" : "[" + CampaignNameFriendly + "] ") + (CampaignNameSubject || "NO SUBJECT AVAILABLE");
                                                myoption.setAttribute("subjectName", (CampaignNameSubject || "NO SUBJECT AVAILABLE"));
                                                myoption.setAttribute("friendlyName", (CampaignNameFriendly || ""));
                                                myoption.setAttribute("theCount", resultCampaigns.campaigns[i].Count);

                                                myoptionAuto.text = (CampaignNameFriendly == null ? "" : "[" + CampaignNameFriendly + "] ") + (CampaignNameSubject || "NO SUBJECT AVAILABLE");
                                                myoptionAuto.setAttribute("subjectName", (CampaignNameSubject || "NO SUBJECT AVAILABLE"));
                                                myoptionAuto.setAttribute("friendlyName", (CampaignNameFriendly || ""));
                                                myoptionAuto.setAttribute("theCount", resultCampaigns.campaigns[i].Count);

                                                myoption2Auto.text = (CampaignNameFriendly == null ? "" : "[" + CampaignNameFriendly + "] ") + (CampaignNameSubject || "NO SUBJECT AVAILABLE");
                                                myoption2Auto.setAttribute("subjectName", (CampaignNameSubject || "NO SUBJECT AVAILABLE"));
                                                myoption2Auto.setAttribute("friendlyName", (CampaignNameFriendly || ""));
                                                myoption2Auto.setAttribute("theCount", resultCampaigns.campaigns[i].Count);

                                                myoption3Auto.text = (CampaignNameFriendly == null ? "" : "[" + CampaignNameFriendly + "] ") + (CampaignNameSubject || "NO SUBJECT AVAILABLE");
                                                myoption3Auto.setAttribute("subjectName", (CampaignNameSubject || "NO SUBJECT AVAILABLE"));
                                                myoption3Auto.setAttribute("friendlyName", (CampaignNameFriendly || ""));
                                                myoption3Auto.setAttribute("theCount", resultCampaigns.campaigns[i].Count);

                                                myoption4Auto.text = (CampaignNameFriendly == null ? "" : "[" + CampaignNameFriendly + "] ") + (CampaignNameSubject || "NO SUBJECT AVAILABLE");
                                                myoption4Auto.setAttribute("subjectName", (CampaignNameSubject || "NO SUBJECT AVAILABLE"));
                                                myoption4Auto.setAttribute("friendlyName", (CampaignNameFriendly || ""));
                                                myoption4Auto.setAttribute("theCount", resultCampaigns.campaigns[i].Count);

                                                myoption5Auto.text = (CampaignNameFriendly == null ? "" : "[" + CampaignNameFriendly + "] ") + (CampaignNameSubject || "NO SUBJECT AVAILABLE");
                                                myoption5Auto.setAttribute("subjectName", (CampaignNameSubject || "NO SUBJECT AVAILABLE"));
                                                myoption5Auto.setAttribute("friendlyName", (CampaignNameFriendly || ""));
                                                myoption5Auto.setAttribute("theCount", resultCampaigns.campaigns[i].Count);

                                                myoption6Auto.text = (CampaignNameFriendly == null ? "" : "[" + CampaignNameFriendly + "] ") + (CampaignNameSubject || "NO SUBJECT AVAILABLE");
                                                myoption6Auto.setAttribute("subjectName", (CampaignNameSubject || "NO SUBJECT AVAILABLE"));
                                                myoption6Auto.setAttribute("friendlyName", (CampaignNameFriendly || ""));
                                                myoption6Auto.setAttribute("theCount", resultCampaigns.campaigns[i].Count);

                                                myoption7Auto.text = (CampaignNameFriendly == null ? "" : "[" + CampaignNameFriendly + "] ") + (CampaignNameSubject || "NO SUBJECT AVAILABLE");
                                                myoption7Auto.setAttribute("subjectName", (CampaignNameSubject || "NO SUBJECT AVAILABLE"));
                                                myoption7Auto.setAttribute("friendlyName", (CampaignNameFriendly || ""));
                                                myoption7Auto.setAttribute("theCount", resultCampaigns.campaigns[i].Count);

                                                myoption8Auto.text = (CampaignNameFriendly == null ? "" : "[" + CampaignNameFriendly + "] ") + (CampaignNameSubject || "NO SUBJECT AVAILABLE");
                                                myoption8Auto.setAttribute("subjectName", (CampaignNameSubject || "NO SUBJECT AVAILABLE"));
                                                myoption8Auto.setAttribute("friendlyName", (CampaignNameFriendly || ""));
                                                myoption8Auto.setAttribute("theCount", resultCampaigns.campaigns[i].Count);                                       

                                                //myoption2Auto.text = CampaignNameSubject.substring(0, 25) + " (" + resultCampaigns.campaigns[i].Count + ")";
                                                //myoption3Auto.text = CampaignNameSubject.substring(0, 25) + " (" + resultCampaigns.campaigns[i].Count + ")";
                                                //myoption4Auto.text = CampaignNameSubject.substring(0, 25) + " (" + resultCampaigns.campaigns[i].Count + ")";
                                                //myoption5Auto.text = CampaignNameSubject.substring(0, 25) + " (" + resultCampaigns.campaigns[i].Count + ")";
                                                //myoption6Auto.text = CampaignNameSubject.substring(0, 25) + " (" + resultCampaigns.campaigns[i].Count + ")";
                                                //myoption7Auto.text = CampaignNameSubject.substring(0, 25) + " (" + resultCampaigns.campaigns[i].Count + ")";
                                                //myoption8Auto.text = CampaignNameSubject.substring(0, 25) + " (" + resultCampaigns.campaigns[i].Count + ")";
                                                //myoptionSuppression.text = CampaignNameSubject + " (" + resultCampaigns.campaigns[i].Count + " emails)";
                                                myoptionSuppression.text = (CampaignNameFriendly == null ? "" : "[" + CampaignNameFriendly + "] ") + CampaignNameSubject;
                                                myoptionSuppression.setAttribute("subjectName", (CampaignNameSubject == null ? "" : CampaignNameSubject));
                                                myoptionSuppression.setAttribute("friendlyName", (CampaignNameFriendly == null ? "" : CampaignNameFriendly));
                                                myoptionSuppression.setAttribute("theCount", resultCampaigns.campaigns[i].Count);
                                            //}
                                            myoption.value = resultCampaigns.campaigns[i].campaignID;

                                            myoptionAuto.value = resultCampaigns.campaigns[i].campaignID;
                                            myoption2Auto.value = resultCampaigns.campaigns[i].campaignID;
                                            myoption3Auto.value = resultCampaigns.campaigns[i].campaignID;
                                            myoption4Auto.value = resultCampaigns.campaigns[i].campaignID;
                                            myoption5Auto.value = resultCampaigns.campaigns[i].campaignID;
                                            myoption6Auto.value = resultCampaigns.campaigns[i].campaignID;
                                            myoption7Auto.value = resultCampaigns.campaigns[i].campaignID;
                                            myoption8Auto.value = resultCampaigns.campaigns[i].campaignID;
                                            myoptionSuppression.value = resultCampaigns.campaigns[i].campaignID;

                                            if (ContentDD != null) {
                                                ContentDD.add(myoption);
                                            }

                                            if (ContentDDAUTOFirst != null) {
                                                ContentDDAUTOFirst.add(myoptionAuto);
                                            }

                                            if (ContentDDAUTOSecond != null) {
                                                ContentDDAUTOSecond.add(myoption2Auto);
                                            }

                                            if (ContentDDAUTOThird != null) {
                                                ContentDDAUTOThird.add(myoption3Auto);
                                            }

                                            if (ContentDDAUTOFourth != null) {
                                                ContentDDAUTOFourth.add(myoption4Auto);
                                            }

                                            if (ContentDDAUTOFifth != null) {
                                                ContentDDAUTOFifth.add(myoption5Auto);
                                            }

                                            if (ContentDDAUTOSixth != null) {
                                                ContentDDAUTOSixth.add(myoption6Auto);
                                            }

                                            if (ContentDDAUTOSeventh != null) {
                                                ContentDDAUTOSeventh.add(myoption7Auto);
                                            }

                                            if (ContentDDAUTOEighth != null) {
                                                ContentDDAUTOEighth.add(myoption8Auto);
                                            }

                                            if (!composeView.isInlineReplyForm()) {
                                                if (ContentDDSuppression != null) {
                                                    ContentDDSuppression.add(myoptionSuppression);
                                                }
                                            }

                                        }
                                        if (GMassDebug) { console.log("done populating campaign dropdowns"); }

                                        //******if existing campaign with AFs set using custom content, set those dropdowns, but only here, now that dropdowns have been populated with campaigns
                                        if (GMassFirstBumpCustom !== null) {
                                            firstbumpcustom.value = GMassFirstBumpCustom;
                                        }

                                        if (GMassSecondBumpCustom !== null) {
                                            secondbumpcustom.value = GMassSecondBumpCustom;
                                        }

                                        if (GMassThirdBumpCustom !== null) {
                                            thirdbumpcustom.value = GMassThirdBumpCustom;
                                        }

                                        if (GMassFourthBumpCustom !== null) {
                                            fourthbumpcustom.value = GMassFourthBumpCustom;
                                        }
                                        if (GMassFifthBumpCustom !== null) {
                                            fifthbumpcustom.value = GMassFifthBumpCustom;
                                        }

                                        if (GMassSixthBumpCustom !== null) {
                                            sixthbumpcustom.value = GMassSixthBumpCustom;
                                        }
                                        if (GMassSeventhBumpCustom !== null) {
                                            seventhbumpcustom.value = GMassSeventhBumpCustom;
                                        }

                                        if (GMassEighthBumpCustom !== null) {
                                            eighthbumpcustom.value = GMassEighthBumpCustom;
                                        }


                                        $('#' + settingsID + 'ContentDD').select2({
                                            dropdownParent: $('#' + settingsID + 'bigdiv'),
                                            width: "style",
                                            templateResult: formatCampaignText,
                                            templateSelection: formatCampaignTextResult,
                                            placeholder: "Select Past Email"
                                        });

                                        $('#' + settingsID + 'ContentDD').on('change', function (e) {
                                            if (ContentDD.value != "0") {

                                                var OldSelectedText = ContentDD[ContentDD.selectedIndex].text;
                                                var OldSelectedValue = ContentDD[ContentDD.selectedIndex].value;

                                                ContentDD[ContentDD.selectedIndex].text = "Loading..."
                                                var xmlhttpHTML = new XMLHttpRequest();
                                                xmlhttpHTML.open("GET", varBaseURL + "gmass/GetHTML?emailAddress=" + sdk.User.getEmailAddress() + "&campaignId=" + ContentDD.value + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())), true);
                                                xmlhttpHTML.send();
                                                xmlhttpHTML.onreadystatechange = function () {

                                                    if (xmlhttpHTML.readyState == 4) {

                                                        var ContentStuff = JSON.parse(xmlhttpHTML.responseText);

                                                        if (ContentStuff.success==false && ContentStuff.reason == "BadKey"){
                                                            
                                                            sdk.ButterBar.showMessage({ text: "This computer needs to re-connect to your Gmail account.", time: 60000 });
                                                            LaunchAuth(false, false, sdk.User.getEmailAddress(), 2); 
                                                        }

                                                        //var htmlstring = ContentStuff.HTML;
                                                        composeView.setBodyHTML(ContentStuff.HTML);
                                                        composeView.setSubject(ContentStuff.Subject);

                                                        if (ContentStuff.attachments != ""){
                                                            sdk.ButterBar.showMessage({ messageKey: "attachmentsnotice", html: "<span style='color: #BFFFC5'>REMEMBER:</span> This campaign had <span style='color: #BFFFC5'>attachments</span> last time, and GMass can't automatically re-attach those files, but you can do it manually. Remember to attach: <span style='color: #BFFFC5'>" + ContentStuff.attachments + "</span>", time: 10000 });
                                                        }
                                                        else{
                                                            sdk.ButterBar.hideMessage('attachmentsnotice');
                                                        }

                                                    }
                                                }
                                            }
                                        });

                                        if (!composeView.isInlineReplyForm()) {
                                            //var selections = GMassSuppression;
                                            //var selectedValues = new Array();
                                            /*var your_sb = ContentDDSuppression;
                                            //if selections has a length then there is more than one category that was selected.
                                            //there is a difference in how you have to handle multiple vs. sigle values selected.
                                            if (selections.length) {
                                                selectedValues = selections.split(',');
                                                for (i = 0; i < your_sb.options.length; i++) {
                                                    if ((include(selectedValues, your_sb.options[i].value)) && (your_sb.options[i].value != "0")) {
                                                        your_sb.options[i].selected = true;
                                                    }
                                                    else {
                                                        your_sb.options[i].selected = false;
                                                    }
                                                }
                                            }
                                            else {
                                                //this would be a single value                
                                                your_sb.value = ["0"];
                                            }*/
                                            //selectedValues = GMassSuppression.split(',');
                                            $('#' + settingsID + 'suppression').val(GMassSuppression.split(','));

                                            //select2 the suppression box
                                            $('#' + settingsID + 'suppression').select2({
                                                dropdownParent: $('#' + settingsID + 'bigdiv'),
                                                width: "style",
                                                templateResult: formatCampaignText,
                                                templateSelection: formatCampaignTextResultSuppress,
                                                placeholder: "Anyone who received this..."
                                            });

                                            //are these next two blocks necessary?
                                            $('#' + settingsID + 'suppression').on('change', function (e) {
                                                /*var suppressionlist;
                                                suppressionlist = "";
                                                for (var i = 0, iLen = ContentDDSuppression.length; i < iLen; i++) {
                                                    opt = ContentDDSuppression[i];
                
                                                    if (opt.selected) {
                                                        //alert(opt.value);
                                                        suppressionlist += opt.value + ",";
                                                    }
                                                }
                                                if (suppressionlist == "0,") { suppressionlist = ""; }
                                                suppressionlist = suppressionlist.replace(/,\s*$/, "");
                                                GMassSuppression = suppressionlist;*/
                                                //GMassSuppression = ContentDDSuppression.value.replace(/,\s*$/, "");
                                                GMassSuppression = $('#' + settingsID + 'suppression').val();
                                                if (GMassSuppression == null) { GMassSuppression = ""; }

                                                if (isEmpty(GMassSuppression)){
                                                    AdvancedStatus = AdvancedStatus.replace("|suppression campaigns set|", "");
                                                }
                                                else{
                                                    AdvancedStatus = (AdvancedStatus.includes("suppression campaigns set") ? AdvancedStatus : AdvancedStatus + "|suppression campaigns set|");
                                                }
                                            });
                                        }

                                    }
                                    else
                                    {

                            
                                    }
                                }
                            }, 100);
                            //*******DONE FILLING OUT AUTO FOLLOW-UP AND SUPPRESSION SELECT BOXES

                            //since we are never going to preload advanced section expanded, can just set it to display
                            
                            //document.getElementById(settingsID + "advancedstatus").style.display = "block";

                            document.getElementById(settingsID + "schedulestatus").innerHTML = StylizeOvals(ScheduleStatus);
                            //document.getElementById(settingsID + "schedulestatus").style.display = "block";  

                            document.getElementById(settingsID + "afstatus").innerHTML = StylizeOvals(AFStatus);                  

                            /*if (GMassScheduleDisplay == "show") {
                                mainspread.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">-</a>";
                                spreadfloater.style.display = "block";
                                document.getElementById(settingsID + "schedulestatus").style.display = "none";
                            }
                            else {
                                mainspread.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+</a>";
                                spreadfloater.style.display = "none";
                                document.getElementById(settingsID + "schedulestatus").style.display = "block";
                            }*/

                            if (Debug != null) {

                                Debug.addEventListener('click', function () {

                                    sdk.ButterBar.showMessage({ html: '<a href="' + GenerateSendURL() + '">here</a>' });

                                });

                            }

                            if (BreakDraftFree != null) {

                                BreakDraftFree.addEventListener('click', function () {

                                    if (ComposeDraftID != "") {
                                        BDFText.innerHTML = "Breaking...";

                                        var xmlBF = new XMLHttpRequest();
                                        xmlBF.open("GET", varBaseURL + "gmass/breakdraftfree?emailaddress=" + sdk.User.getEmailAddress() + "&draftid=" + ComposeDraftID);
                                        xmlBF.send();

                                        xmlBF.onreadystatechange = function () {
                                            if (xmlBF.readyState == 4){

                                                if (xmlBF.status == 200 && JSON.parse(xmlBF.responseText).success) {

                                                    BDFText.innerHTML = "Done!";
                                                    sdk.ButterBar.showMessage({ html: 'Success! Your DRAFT has been broken free of this thread. Please click your DRAFTS folder to reload everything.' });

                                                }
                                                else if (xmlBF.responseText.includes("Not Found")){
                                                    //the DRAFT hasn't been saved, so it's likely the user just wanting to start a new blank conversation, so just launch a compose
                                                    var DraftToRecips = composeView.getToRecipients();
                                                    var DraftCcRecips = composeView.getCcRecipients();
                                                    var emailToRecips = DraftToRecips.map(function(item) {
                                                      return item['emailAddress'];
                                                    });
                                                    var emailCcRecips = DraftCcRecips.map(function(item) {
                                                      return item['emailAddress'];
                                                    });                                            
                                                    LaunchCompose(emailToRecips.concat(emailCcRecips));

                                                    sdk.ButterBar.showMessage({ html: "Success! We've launched a new Compose for you with everyone in the To line." });
                                                    BDFText.innerHTML = "Done!";                                            

                                                }
                                                else {
                                                    sdk.ButterBar.showMessage({ html: 'Sorry! For some reason we could not break your DRAFT free from this thread.' });
                                                    BDFText.innerHTML = "Break Draft Free";
                                                } 
                                            }                                   
                                        }
                                    }
                                    else {
                                        sdk.ButterBar.showMessage({ html: 'Oops! Please type a few characters in the Message area, wait about 3 seconds, and then try again.' });
                                    }


                                });

                            }

                            /*if (sdk.User.getEmailAddress() == "ryan@e1even.com"){

                                var testlink = document.getElementById("testlink");

                                testlink.addEventListener('click', function () {
                                    composeView.setToRecipients(["test@test.com"]);
                                    composeView.setSubject(["test@test.com"]);
                                });


                            }*/

                            mainspread.addEventListener('click', function () {

                                if (mainspread.innerHTML.includes(">+<")) {
                                    mainspread.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">-</a>";
                                    //overflow.style.overflow = "auto";
                                    spreadfloater.style.display = "block";
                                    //GMassScheduleDisplay = "show";
                                    document.getElementById(settingsID + "schedulestatus").style.display = "none";
                                    //document.getElementById(settingsID + "schedulestatus").innerHTML = ScheduleStatus;

                                }
                                else {
                                    spreadfloater.style.display = "none";
                                    mainspread.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+</a>";
                                    //overflow.style.overflow = "auto";
                                    //GMassScheduleDisplay = "hide";
                                    document.getElementById(settingsID + "schedulestatus").style.display = "block";
                                    document.getElementById(settingsID + "schedulestatus").innerHTML = StylizeOvals(ScheduleStatus);
                                }

                                $('.g_settings').animate({
                                    scrollTop: 1000
                                }, 0)

                            });

                            if (!composeView.isInlineReplyForm()) {

                                document.getElementById(settingsID + "advancedstatus").innerHTML = StylizeOvals(AdvancedStatus);

                                //when suppression box is changed, values are stored in localstorage
                                /*ContentDDSuppression.addEventListener('change', function () {
                                    //localStorage.setItem("GMassSuppression", ContentDDSuppression.value);
                                    //alert(ContentDDSuppression.value);
                                    var suppressionlist;
                                    suppressionlist = "";
                                    for (var i = 0, iLen = ContentDDSuppression.length; i < iLen; i++) {
                                        opt = ContentDDSuppression[i];
                
                                        if (opt.selected) {
                                            //alert(opt.value);
                                            suppressionlist += opt.value + ",";
                                        }
                                    }
                                    if (suppressionlist == "0,") { suppressionlist = ""; }
                                    GMassSuppression = suppressionlist;
                                });*/

                                if (AdvancedStatus != "") {
                                    //mainadvanced.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">-</a>";
                                    //advanceddiv.style.display = "block";
                                    document.getElementById(settingsID + "advancedstatus").style.display = "block";
                                }
                                else {
                                    //mainadvanced.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+</a>";
                                    //advanceddiv.style.display = "none";
                                    document.getElementById(settingsID + "advancedstatus").style.display = "none";
                                }



                                mainadvanced.addEventListener('click', function () {

                                    if (mainadvanced.innerHTML.includes(">+<")) {
                                        mainadvanced.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">-</a>";
                                        //overflow.style.overflow = "auto";
                                        advanceddiv.style.display = "block";
                                        //GMassSuppressDisplay = "show";
                                        document.getElementById(settingsID + "advancedstatus").style.display = "none";

                                    }
                                    else {
                                        advanceddiv.style.display = "none";
                                        mainadvanced.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+</a>";
                                        //overflow.style.overflow = "auto";
                                        //GMassSuppressDisplay = "hide";
                                        document.getElementById(settingsID + "advancedstatus").innerHTML = StylizeOvals(AdvancedStatus);
                                        document.getElementById(settingsID + "advancedstatus").style.display = "block";

                                    }

                                    $('.g_settings').animate({
                                        scrollTop: 1000
                                    }, 0)

                                });

                                if (SMTP == "on" && mySendSave == "send"){
                                    fastsmtpdiv.style.display = "block";
                                }   


                            }

                                //new compose or reply
                                if (ScheduleStatus != "") {
                                    //mainadvanced.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">-</a>";
                                    //advanceddiv.style.display = "block";
                                    document.getElementById(settingsID + "schedulestatus").style.display = "block";
                                }
                                else {
                                    //mainadvanced.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+</a>";
                                    //advanceddiv.style.display = "none";
                                    document.getElementById(settingsID + "schedulestatus").style.display = "none";
                                }   

                                if (AFStatus != "") {
                                    //mainadvanced.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">-</a>";
                                    //advanceddiv.style.display = "block";
                                    document.getElementById(settingsID + "afstatus").style.display = "block";
                                }
                                else {
                                    //mainadvanced.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+</a>";
                                    //advanceddiv.style.display = "none";
                                    document.getElementById(settingsID + "afstatus").style.display = "none";
                                }    

                                           

                            /*if (GMassAFDisplay == "show") {
                                mainauto.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">-</a>";
                                floater.style.display = "block";
                                overflow.style.overflow = "auto";
                            }
                            else {
                                mainauto.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+</a>";
                                floater.style.display = "none";
                                overflow.style.overflow = "auto";
                            }*/

                            mainauto.addEventListener('click', function () {

                                if (mainauto.innerHTML.includes(">+<")) {
                                    mainauto.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">-</a>";
                                    //overflow.style.overflow = "auto";
                                    floater.style.display = "block";
                                    //GMassAFDisplay = "show";
                                    document.getElementById(settingsID + "afstatus").style.display = "none";

                                }
                                else {
                                    floater.style.display = "none";
                                    mainauto.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+</a>";
                                    //overflow.style.overflow = "auto";
                                    //GMassAFDisplay = "hide";
                                    document.getElementById(settingsID + "afstatus").style.display = "block";
                                    document.getElementById(settingsID + "afstatus").innerHTML = StylizeOvals(AFStatus);
                                }

                                $('.g_settings').animate({
                                    scrollTop: 1000
                                }, 0)

                            });

                            //*********auto follow-up stage based on clicking/unclicking checkboxes next to each stage

                            if (IsScheduled && (GMassFirstBumpBox == "y")) {
                                ClearBumps.addEventListener('click', function () {
                                    firstbumpbox.checked = false;
                                    secondbumpbox.checked = false;
                                    thirdbumpbox.checked = false;
                                    fourthbumpbox.checked = false;
                                    fifthbumpbox.checked = false;
                                    sixthbumpbox.checked = false;
                                    seventhbumpbox.checked = false;
                                    eighthbumpbox.checked = false;
                                    GMassFirstBumpBox = "n";
                                    GMassSecondBumpBox = "n";
                                    GMassThirdBumpBox = "n";
                                    GMassFourthBumpBox = "n";
                                    GMassFifthBumpBox = "n";
                                    GMassSixthBumpBox = "n";
                                    GMassSeventhBumpBox = "n";
                                    GMassEighthBumpBox = "n";

                                    //clear out the status field
                                    AFStatus = "";
                                    sdk.ButterBar.showMessage({ html: "Your auto follow-up settings have been cleared. You still need to hit the GMass button to save these settings.", time: 10000 });
                                });
                            }

                            firstbumpbox.addEventListener('click', function () {
                                if (firstbumpbox.checked) {
                                    firstbumpdays.disabled = false;
                                    firstbumpaction.disabled = false;
                                    firstbumpradiot.disabled = false;
                                    firstbumpradioc.disabled = false;
                                    firstbumpaddedtext.disabled = false;
                                    firstbumpcustom.disabled = false;
                                    GMassFirstBumpBox = "y";
                                    AFStatus = (AFStatus.includes("|stage 1|") ? AFStatus : AFStatus + "|stage 1|");
                                }
                                else {
                                    firstbumpdays.disabled = true;
                                    firstbumpaction.disabled = true;
                                    firstbumpradiot.disabled = true;
                                    firstbumpradioc.disabled = true;
                                    firstbumpaddedtext.disabled = true;
                                    firstbumpcustom.disabled = true;
                                    GMassFirstBumpBox = "n";
                                    AFStatus = AFStatus.replace("|stage 1|", "");
                                }

                            });

                            secondbumpbox.addEventListener('click', function () {
                                if (secondbumpbox.checked) {
                                    secondbumpdays.disabled = false;
                                    secondbumpaction.disabled = false;
                                    secondbumpradiot.disabled = false;
                                    secondbumpradioc.disabled = false;
                                    secondbumpaddedtext.disabled = false;
                                    secondbumpcustom.disabled = false;
                                    GMassSecondBumpBox = "y";
                                    AFStatus = (AFStatus.includes("|stage 2|") ? AFStatus : AFStatus + "|stage 2|");
                                }
                                else {
                                    secondbumpdays.disabled = true;
                                    secondbumpaction.disabled = true;
                                    secondbumpradiot.disabled = true;
                                    secondbumpradioc.disabled = true;
                                    secondbumpaddedtext.disabled = true;
                                    secondbumpcustom.disabled = true;
                                    GMassSecondBumpBox = "n";
                                    AFStatus = AFStatus.replace("|stage 2|", "");
                                }

                            });

                            thirdbumpbox.addEventListener('click', function () {
                                if (thirdbumpbox.checked) {
                                    thirdbumpdays.disabled = false;
                                    thirdbumpaction.disabled = false;
                                    thirdbumpradiot.disabled = false;
                                    thirdbumpradioc.disabled = false;
                                    thirdbumpaddedtext.disabled = false;
                                    thirdbumpcustom.disabled = false;
                                    GMassThirdBumpBox = "y";
                                    AFStatus = (AFStatus.includes("|stage 3|") ? AFStatus : AFStatus + "|stage 3|");
                                }
                                else {
                                    thirdbumpdays.disabled = true;
                                    thirdbumpaction.disabled = true;
                                    thirdbumpradiot.disabled = true;
                                    thirdbumpradioc.disabled = true;
                                    thirdbumpaddedtext.disabled = true;
                                    thirdbumpcustom.disabled = true;
                                    GMassThirdBumpBox = "n";
                                    AFStatus = AFStatus.replace("|stage 3|", "");
                                }

                            });

                            fourthbumpbox.addEventListener('click', function () {
                                if (fourthbumpbox.checked) {
                                    fourthbumpdays.disabled = false;
                                    fourthbumpaction.disabled = false;
                                    fourthbumpradiot.disabled = false;
                                    fourthbumpradioc.disabled = false;
                                    fourthbumpaddedtext.disabled = false;
                                    fourthbumpcustom.disabled = false;
                                    GMassFourthBumpBox = "y";
                                    AFStatus = (AFStatus.includes("|stage 4|") ? AFStatus : AFStatus + "|stage 4|");
                                }
                                else {
                                    fourthbumpdays.disabled = true;
                                    fourthbumpaction.disabled = true;
                                    fourthbumpradiot.disabled = true;
                                    fourthbumpradioc.disabled = true;
                                    fourthbumpaddedtext.disabled = true;
                                    fourthbumpcustom.disabled = true;
                                    GMassFourthBumpBox = "n";
                                    AFStatus = AFStatus.replace("|stage 4|", "");
                                }

                            });

                            fifthbumpbox.addEventListener('click', function () {
                                if (fifthbumpbox.checked) {
                                    fifthbumpdays.disabled = false;
                                    fifthbumpaction.disabled = false;
                                    fifthbumpradiot.disabled = false;
                                    fifthbumpradioc.disabled = false;
                                    fifthbumpaddedtext.disabled = false;
                                    fifthbumpcustom.disabled = false;
                                    GMassFifthBumpBox = "y";
                                    AFStatus = (AFStatus.includes("|stage 5|") ? AFStatus : AFStatus + "|stage 5|");
                                }
                                else {
                                    fifthbumpdays.disabled = true;
                                    fifthbumpaction.disabled = true;
                                    fifthbumpradiot.disabled = true;
                                    fifthbumpradioc.disabled = true;
                                    fifthbumpaddedtext.disabled = true;
                                    fifthbumpcustom.disabled = true;
                                    GMassFifthBumpBox = "n";
                                    AFStatus = AFStatus.replace("|stage 5|", "");
                                }

                            });

                            sixthbumpbox.addEventListener('click', function () {
                                if (sixthbumpbox.checked) {
                                    sixthbumpdays.disabled = false;
                                    sixthbumpaction.disabled = false;
                                    sixthbumpradiot.disabled = false;
                                    sixthbumpradioc.disabled = false;
                                    sixthbumpaddedtext.disabled = false;
                                    sixthbumpcustom.disabled = false;
                                    GMassSixthBumpBox = "y";
                                    AFStatus = (AFStatus.includes("|stage 6|") ? AFStatus : AFStatus + "|stage 6|");
                                }
                                else {
                                    sixthbumpdays.disabled = true;
                                    sixthbumpaction.disabled = true;
                                    sixthbumpradiot.disabled = true;
                                    sixthbumpradioc.disabled = true;
                                    sixthbumpaddedtext.disabled = true;
                                    sixthbumpcustom.disabled = true;
                                    GMassSixthBumpBox = "n";
                                    AFStatus = AFStatus.replace("|stage 6|", "");
                                }

                            });

                            seventhbumpbox.addEventListener('click', function () {
                                if (seventhbumpbox.checked) {
                                    seventhbumpdays.disabled = false;
                                    seventhbumpaction.disabled = false;
                                    seventhbumpradiot.disabled = false;
                                    seventhbumpradioc.disabled = false;
                                    seventhbumpaddedtext.disabled = false;
                                    seventhbumpcustom.disabled = false;
                                    GMassSeventhBumpBox = "y";
                                    AFStatus = (AFStatus.includes("|stage 7|") ? AFStatus : AFStatus + "|stage 7|");
                                }
                                else {
                                    seventhbumpdays.disabled = true;
                                    seventhbumpaction.disabled = true;
                                    seventhbumpradiot.disabled = true;
                                    seventhbumpradioc.disabled = true;
                                    seventhbumpaddedtext.disabled = true;
                                    seventhbumpcustom.disabled = true;
                                    GMassSeventhBumpBox = "n";
                                    AFStatus = AFStatus.replace("|stage 7|", "");
                                }

                            });

                            eighthbumpbox.addEventListener('click', function () {
                                if (eighthbumpbox.checked) {
                                    eighthbumpdays.disabled = false;
                                    eighthbumpaction.disabled = false;
                                    eighthbumpradiot.disabled = false;
                                    eighthbumpradioc.disabled = false;
                                    eighthbumpaddedtext.disabled = false;
                                    eighthbumpcustom.disabled = false;
                                    GMassEighthBumpBox = "y";
                                    AFStatus = (AFStatus.includes("|stage 8|") ? AFStatus : AFStatus + "|stage 8|");
                                }
                                else {
                                    eighthbumpdays.disabled = true;
                                    eighthbumpaction.disabled = true;
                                    eighthbumpradiot.disabled = true;
                                    eighthbumpradioc.disabled = true;
                                    eighthbumpaddedtext.disabled = true;
                                    eighthbumpcustom.disabled = true;
                                    GMassEighthBumpBox = "n";
                                    AFStatus = AFStatus.replace("|stage 8|", "");
                                }

                            });

                            //*********auto follow-up stage based on what user has already selected (localstorage), so when user hides/shows settings box
                            if (GMassBumpSuppression != "" && AutoSuppress != null) {
                                AutoSuppress.value = GMassBumpSuppression;
                            }

                            if (GMassFirstBumpBox == "y") {
                                firstbumpbox.checked = true;
                                firstbumpdays.disabled = false;
                                firstbumpaction.disabled = false;
                                firstbumpradiot.disabled = false;
                                firstbumpradioc.disabled = false;
                                firstbumpaddedtext.disabled = false;
                                firstbumpcustom.disabled = false;
                            }
                            else {
                                firstbumpdays.disabled = true;
                                firstbumpaction.disabled = true;
                                firstbumpradiot.disabled = true;
                                firstbumpradioc.disabled = true;
                                firstbumpaddedtext.disabled = true;
                                firstbumpcustom.disabled = true;
                            }

                            if (GMassSecondBumpBox == "y") {
                                secondbumpbox.checked = true;
                                secondbumpdays.disabled = false;
                                secondbumpaction.disabled = false;
                                secondbumpradiot.disabled = false;
                                secondbumpradioc.disabled = false;
                                secondbumpaddedtext.disabled = false;
                                secondbumpcustom.disabled = false;
                            }
                            else {
                                secondbumpdays.disabled = true;
                                secondbumpaction.disabled = true;
                                secondbumpradiot.disabled = true;
                                secondbumpradioc.disabled = true;
                                secondbumpaddedtext.disabled = true;
                                secondbumpcustom.disabled = true;
                            }

                            if (GMassThirdBumpBox == "y") {
                                thirdbumpbox.checked = true;
                                thirdbumpdays.disabled = false;
                                thirdbumpaction.disabled = false;
                                thirdbumpradiot.disabled = false;
                                thirdbumpradioc.disabled = false;
                                thirdbumpaddedtext.disabled = false;
                                thirdbumpcustom.disabled = false;
                            }
                            else {
                                thirdbumpdays.disabled = true;
                                thirdbumpaction.disabled = true;
                                thirdbumpradiot.disabled = true;
                                thirdbumpradioc.disabled = true;
                                thirdbumpaddedtext.disabled = true;
                                thirdbumpcustom.disabled = true;
                            }

                            if (GMassFourthBumpBox == "y") {
                                fourthbumpbox.checked = true;
                                fourthbumpdays.disabled = false;
                                fourthbumpaction.disabled = false;
                                fourthbumpradiot.disabled = false;
                                fourthbumpradioc.disabled = false;
                                fourthbumpaddedtext.disabled = false;
                                fourthbumpcustom.disabled = false;
                            }
                            else {
                                fourthbumpdays.disabled = true;
                                fourthbumpaction.disabled = true;
                                fourthbumpradiot.disabled = true;
                                fourthbumpradioc.disabled = true;
                                fourthbumpaddedtext.disabled = true;
                                fourthbumpcustom.disabled = true;
                            }

                            if (GMassFifthBumpBox == "y") {
                                fifthbumpbox.checked = true;
                                fifthbumpdays.disabled = false;
                                fifthbumpaction.disabled = false;
                                fifthbumpradiot.disabled = false;
                                fifthbumpradioc.disabled = false;
                                fifthbumpaddedtext.disabled = false;
                                fifthbumpcustom.disabled = false;
                            }
                            else {
                                fifthbumpdays.disabled = true;
                                fifthbumpaction.disabled = true;
                                fifthbumpradiot.disabled = true;
                                fifthbumpradioc.disabled = true;
                                fifthbumpaddedtext.disabled = true;
                                fifthbumpcustom.disabled = true;
                            }

                            if (GMassSixthBumpBox == "y") {
                                sixthbumpbox.checked = true;
                                sixthbumpdays.disabled = false;
                                sixthbumpaction.disabled = false;
                                sixthbumpradiot.disabled = false;
                                sixthbumpradioc.disabled = false;
                                sixthbumpaddedtext.disabled = false;
                                sixthbumpcustom.disabled = false;
                            }
                            else {
                                sixthbumpdays.disabled = true;
                                sixthbumpaction.disabled = true;
                                sixthbumpradiot.disabled = true;
                                sixthbumpradioc.disabled = true;
                                sixthbumpaddedtext.disabled = true;
                                sixthbumpcustom.disabled = true;
                            }

                            if (GMassSeventhBumpBox == "y") {
                                seventhbumpbox.checked = true;
                                seventhbumpdays.disabled = false;
                                seventhbumpaction.disabled = false;
                                seventhbumpradiot.disabled = false;
                                seventhbumpradioc.disabled = false;
                                seventhbumpaddedtext.disabled = false;
                                seventhbumpcustom.disabled = false;
                            }
                            else {
                                seventhbumpdays.disabled = true;
                                seventhbumpaction.disabled = true;
                                seventhbumpradiot.disabled = true;
                                seventhbumpradioc.disabled = true;
                                seventhbumpaddedtext.disabled = true;
                                seventhbumpcustom.disabled = true;
                            }

                            if (GMassEighthBumpBox == "y") {
                                eighthbumpbox.checked = true;
                                eighthbumpdays.disabled = false;
                                eighthbumpaction.disabled = false;
                                eighthbumpradiot.disabled = false;
                                eighthbumpradioc.disabled = false;
                                eighthbumpaddedtext.disabled = false;
                                eighthbumpcustom.disabled = false;
                            }
                            else {
                                eighthbumpdays.disabled = true;
                                eighthbumpaction.disabled = true;
                                eighthbumpradiot.disabled = true;
                                eighthbumpradioc.disabled = true;
                                eighthbumpaddedtext.disabled = true;
                                eighthbumpcustom.disabled = true;
                            }

                            //**********letting user toggle between added text vs custom message

                            firstbumpradiot.addEventListener('click', function () {
                                firstbumpcustomdiv.style.display = 'none';
                                //firstbumpcustom.style.display = 'none';
                                firstbumpaddedtext.style.display = 'block';
                                GMassFirstBumpChoice = "t";
                            });
                            firstbumpradioc.addEventListener('click', function () {
                                firstbumpaddedtext.style.display = 'none';
                                //firstbumpcustom.style.display = 'block';
                                firstbumpcustomdiv.style.display = 'block';
                                GMassFirstBumpChoice = "c";
                            });

                            secondbumpradiot.addEventListener('click', function () {
                                secondbumpcustomdiv.style.display = 'none';
                                secondbumpaddedtext.style.display = 'block';
                                GMassSecondBumpChoice = "t";
                            });
                            secondbumpradioc.addEventListener('click', function () {
                                secondbumpaddedtext.style.display = 'none';
                                secondbumpcustomdiv.style.display = 'block';
                                GMassSecondBumpChoice = "c";
                            });

                            thirdbumpradiot.addEventListener('click', function () {
                                thirdbumpcustomdiv.style.display = 'none';
                                thirdbumpaddedtext.style.display = 'block';
                                GMassThirdBumpChoice = "t";
                            });
                            thirdbumpradioc.addEventListener('click', function () {
                                thirdbumpaddedtext.style.display = 'none';
                                thirdbumpcustomdiv.style.display = 'block';
                                GMassThirdBumpChoice = "c";
                            });

                            fourthbumpradiot.addEventListener('click', function () {
                                fourthbumpcustomdiv.style.display = 'none';
                                fourthbumpaddedtext.style.display = 'block';
                                GMassFourthBumpChoice = "t";
                            });
                            fourthbumpradioc.addEventListener('click', function () {
                                fourthbumpaddedtext.style.display = 'none';
                                fourthbumpcustomdiv.style.display = 'block';
                                GMassFourthBumpChoice = "c";
                            });

                            fifthbumpradiot.addEventListener('click', function () {
                                fifthbumpcustomdiv.style.display = 'none';
                                fifthbumpaddedtext.style.display = 'block';
                                GMassFifthBumpChoice = "t";
                            });
                            fifthbumpradioc.addEventListener('click', function () {
                                fifthbumpaddedtext.style.display = 'none';
                                fifthbumpcustomdiv.style.display = 'block';
                                GMassFifthBumpChoice = "c";
                            });

                            sixthbumpradiot.addEventListener('click', function () {
                                sixthbumpcustomdiv.style.display = 'none';
                                sixthbumpaddedtext.style.display = 'block';
                                GMassSixthBumpChoice = "t";
                            });
                            sixthbumpradioc.addEventListener('click', function () {
                                sixthbumpaddedtext.style.display = 'none';
                                sixthbumpcustomdiv.style.display = 'block';
                                GMassSixthBumpChoice = "c";
                            });

                            seventhbumpradiot.addEventListener('click', function () {
                                seventhbumpcustomdiv.style.display = 'none';
                                seventhbumpaddedtext.style.display = 'block';
                                GMassSeventhBumpChoice = "t";
                            });
                            seventhbumpradioc.addEventListener('click', function () {
                                seventhbumpaddedtext.style.display = 'none';
                                seventhbumpcustomdiv.style.display = 'block';
                                GMassSeventhBumpChoice = "c";
                            });

                            eighthbumpradiot.addEventListener('click', function () {
                                eighthbumpcustomdiv.style.display = 'none';
                                eighthbumpaddedtext.style.display = 'block';
                                GMassEighthBumpChoice = "t";
                            });
                            eighthbumpradioc.addEventListener('click', function () {
                                eighthbumpaddedtext.style.display = 'none';
                                eighthbumpcustomdiv.style.display = 'block';
                                GMassEighthBumpChoice = "c";
                            });


                            //***********showing added text vs custom message based on what user has already chosen (if user shows/hides settings box)

                            if (GMassFirstBumpChoice == "c") {
                                firstbumpaddedtext.style.display = 'none';
                                firstbumpcustomdiv.style.display = 'block';
                                firstbumpradioc.checked = true;

                            }
                            else {
                                firstbumpcustomdiv.style.display = 'none';
                                firstbumpaddedtext.style.display = 'block';
                                firstbumpradiot.checked = true;

                            }

                            if (GMassSecondBumpChoice == "c") {
                                secondbumpaddedtext.style.display = 'none';
                                secondbumpcustomdiv.style.display = 'block';
                                secondbumpradioc.checked = true;

                            }
                            else {
                                secondbumpcustomdiv.style.display = 'none';
                                secondbumpaddedtext.style.display = 'block';
                                secondbumpradiot.checked = true;

                            }

                            if (GMassThirdBumpChoice == "c") {
                                thirdbumpaddedtext.style.display = 'none';
                                thirdbumpcustomdiv.style.display = 'block';
                                thirdbumpradioc.checked = true;

                            }
                            else {
                                thirdbumpcustomdiv.style.display = 'none';
                                thirdbumpaddedtext.style.display = 'block';
                                thirdbumpradiot.checked = true;

                            }

                            if (GMassFourthBumpChoice == "c") {
                                fourthbumpaddedtext.style.display = 'none';
                                fourthbumpcustomdiv.style.display = 'block';
                                fourthbumpradioc.checked = true;

                            }
                            else {
                                fourthbumpcustomdiv.style.display = 'none';
                                fourthbumpaddedtext.style.display = 'block';
                                fourthbumpradiot.checked = true;

                            }

                            if (GMassFifthBumpChoice == "c") {
                                fifthbumpaddedtext.style.display = 'none';
                                fifthbumpcustomdiv.style.display = 'block';
                                fifthbumpradioc.checked = true;

                            }
                            else {
                                fifthbumpcustomdiv.style.display = 'none';
                                fifthbumpaddedtext.style.display = 'block';
                                fifthbumpradiot.checked = true;

                            }

                            if (GMassSixthBumpChoice == "c") {
                                sixthbumpaddedtext.style.display = 'none';
                                sixthbumpcustomdiv.style.display = 'block';
                                sixthbumpradioc.checked = true;

                            }
                            else {
                                sixthbumpcustomdiv.style.display = 'none';
                                sixthbumpaddedtext.style.display = 'block';
                                sixthbumpradiot.checked = true;

                            }

                            if (GMassSeventhBumpChoice == "c") {
                                seventhbumpaddedtext.style.display = 'none';
                                seventhbumpcustomdiv.style.display = 'block';
                                seventhbumpradioc.checked = true;

                            }
                            else {
                                seventhbumpcustomdiv.style.display = 'none';
                                seventhbumpaddedtext.style.display = 'block';
                                seventhbumpradiot.checked = true;

                            }

                            if (GMassEighthBumpChoice == "c") {
                                eighthbumpaddedtext.style.display = 'none';
                                eighthbumpcustomdiv.style.display = 'block';
                                eighthbumpradioc.checked = true;

                            }
                            else {
                                eighthbumpcustomdiv.style.display = 'none';
                                eighthbumpaddedtext.style.display = 'block';
                                eighthbumpradiot.checked = true;

                            }

                            //*****

                            //*********setting reply/open/all for each stage when user selects

                            firstbumpaction.addEventListener('change', function () {
                                GMassFirstBumpAction = firstbumpaction.value;
                                if (firstbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM1").innerHTML = "Send custom message alone:";
                                    sdk.ButterBar.showMessage({ html: "Keep in mind that choosing ALL will send the follow-up to everyone in the original campaign.", time: 10000 });
                                }
                                else {
                                    document.getElementById(settingsID + "CM1").innerHTML = "Send custom message above original:";
                                }
                                if (firstbumpaction.value == 'c') {
                                    if (!ClickTrackingCheckbox.checked) {
                                        ClickTrackingCheckbox.checked = true;
                                        myClickTracking = "on";
                                        var ForceClickTrack = true;
                                    }
                                    var BBClick = "Before using this option, make sure you have at least one trackable link in your email. <a style='color: #99FFFF' href='http://www.gmass.co/blog/weve-changed-how-click-tracking-works-to-avoid-false-phishing-detection/' target='_gmassblog'>Not all links are trackable.</a>";
                                    if (ForceClickTrack) { BBClick = "We have turned on the 'Track Clicks' setting for you because it was off. " + BBClick; }
                                    sdk.ButterBar.showMessage({ html: BBClick, time: 10000 });
                                }
                            });
                            if (GMassFirstBumpAction !== null) {
                                firstbumpaction.value = GMassFirstBumpAction;
                                if (firstbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM1").innerHTML = "Send custom message alone:";
                                }
                                else {
                                    document.getElementById(settingsID + "CM1").innerHTML = "Send custom message above original:";
                                }
                            }

                            /*firstbumpcustom.addEventListener('change', function () {
                                GMassFirstBumpCustom = firstbumpcustom.value;
                            });*/

                            $('#' + settingsID + 'FirstBumpCustom').on('change', function (e) {
                                GMassFirstBumpCustom = $('#' + settingsID + 'FirstBumpCustom').val();
                            });

                            firstbumpaddedtext.addEventListener('blur', function () {
                                GMassFirstBumpAddedText = firstbumpaddedtext.value;
                            });
                            firstbumpdays.addEventListener('blur', function () {
                                GMassFirstBumpDays = firstbumpdays.value;
                            });
                            if (GMassFirstBumpDays !== null) {
                                firstbumpdays.value = GMassFirstBumpDays;
                            }
                            if (GMassFirstBumpAddedText !== null) {
                                firstbumpaddedtext.value = GMassFirstBumpAddedText;
                            }




                            secondbumpaction.addEventListener('change', function () {
                                GMassSecondBumpAction = secondbumpaction.value;
                                if (secondbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM2").innerHTML = "Send custom message alone:";
                                    sdk.ButterBar.showMessage({ html: "Keep in mind that choosing ALL will send the follow-up to everyone in the original campaign.", time: 10000 });
                                }
                                else {
                                    document.getElementById(settingsID + "CM2").innerHTML = "Send custom message above original:";
                                }
                                if (secondbumpaction.value == 'c') {
                                    if (!ClickTrackingCheckbox.checked) {
                                        ClickTrackingCheckbox.checked = true;
                                        myClickTracking = "on";
                                        var ForceClickTrack = true;
                                    }
                                    var BBClick = "Before using this option, make sure you have at least one trackable link in your email. <a style='color: #99FFFF' href='http://www.gmass.co/blog/weve-changed-how-click-tracking-works-to-avoid-false-phishing-detection/' target='_gmassblog'>Not all links are trackable.</a>";
                                    if (ForceClickTrack) { BBClick = "We have turned on the 'Track Clicks' setting for you because it was off. " + BBClick; }
                                    sdk.ButterBar.showMessage({ html: BBClick, time: 10000 });
                                }
                            });
                            if (GMassSecondBumpAction !== null) {
                                secondbumpaction.value = GMassSecondBumpAction;
                                if (secondbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM2").innerHTML = "Send custom message alone:";
                                }
                                else {
                                    document.getElementById(settingsID + "CM2").innerHTML = "Send custom message above original:";
                                }
                            }
                            /*secondbumpcustom.addEventListener('change', function () {
                                GMassSecondBumpCustom = secondbumpcustom.value;
                            });*/
                            $('#' + settingsID + 'SecondBumpCustom').on('change', function (e) {
                                GMassSecondBumpCustom = $('#' + settingsID + 'SecondBumpCustom').val();
                            });

                            secondbumpaddedtext.addEventListener('blur', function () {
                                GMassSecondBumpAddedText = secondbumpaddedtext.value;
                            });
                            secondbumpdays.addEventListener('blur', function () {
                                GMassSecondBumpDays = secondbumpdays.value;
                            });
                            if (GMassSecondBumpDays !== null) {
                                secondbumpdays.value = GMassSecondBumpDays;
                            }
                            if (GMassSecondBumpAddedText !== null) {
                                secondbumpaddedtext.value = GMassSecondBumpAddedText;
                            }
                            if (GMassSecondBump == "show") {
                                secondbump.style.display = 'block';
                                addsecondbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 2nd Stage</a>";
                                addthirdbump.style.display = 'block';

                            }
                            else {
                                secondbump.style.display = 'none';
                                addsecondbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 2nd Stage</a>";
                                //addthirdbump.style.display = 'none';

                            }


                            thirdbumpaction.addEventListener('change', function () {
                                GMassThirdBumpAction = thirdbumpaction.value;
                                if (thirdbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM3").innerHTML = "Send custom message alone:";
                                    sdk.ButterBar.showMessage({ html: "Keep in mind that choosing ALL will send the follow-up to everyone in the original campaign.", time: 10000 });
                                }
                                else {
                                    document.getElementById(settingsID + "CM3").innerHTML = "Send custom message above original:";
                                }
                                if (thirdbumpaction.value == 'c') {
                                    if (!ClickTrackingCheckbox.checked) {
                                        ClickTrackingCheckbox.checked = true;
                                        myClickTracking = "on";
                                        var ForceClickTrack = true;
                                    }
                                    var BBClick = "Before using this option, make sure you have at least one trackable link in your email. <a style='color: #99FFFF' href='http://www.gmass.co/blog/weve-changed-how-click-tracking-works-to-avoid-false-phishing-detection/' target='_gmassblog'>Not all links are trackable.</a>";
                                    if (ForceClickTrack) { BBClick = "We have turned on the 'Track Clicks' setting for you because it was off. " + BBClick; }
                                    sdk.ButterBar.showMessage({ html: BBClick, time: 10000 });
                                }
                            });
                            if (GMassThirdBumpAction !== null) {
                                thirdbumpaction.value = GMassThirdBumpAction;
                                if (thirdbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM3").innerHTML = "Send custom message alone:";
                                }
                                else {
                                    document.getElementById(settingsID + "CM3").innerHTML = "Send custom message above original:";
                                }
                            }
                            /*thirdbumpcustom.addEventListener('change', function () {
                                GMassThirdBumpCustom = thirdbumpcustom.value;
                            });*/
                            $('#' + settingsID + 'ThirdBumpCustom').on('change', function (e) {
                                GMassThirdBumpCustom = $('#' + settingsID + 'ThirdBumpCustom').val();
                            });

                            thirdbumpaddedtext.addEventListener('blur', function () {
                                GMassThirdBumpAddedText = thirdbumpaddedtext.value;
                            });
                            thirdbumpdays.addEventListener('blur', function () {
                                GMassThirdBumpDays = thirdbumpdays.value;
                            });
                            if (GMassThirdBumpDays !== null) {
                                thirdbumpdays.value = GMassThirdBumpDays;
                            }
                            if (GMassThirdBumpAddedText !== null) {
                                thirdbumpaddedtext.value = GMassThirdBumpAddedText;
                            }
                            if (GMassThirdBump == "show") {
                                thirdbump.style.display = 'block';
                                addthirdbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 3rd Stage</a>";
                            }
                            else {
                                thirdbump.style.display = 'none';
                                addthirdbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 3rd Stage</a>";
                            }

                            //**************

                            fourthbumpaction.addEventListener('change', function () {
                                GMassFourthBumpAction = fourthbumpaction.value;
                                if (fourthbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM4").innerHTML = "Send custom message alone:";
                                    sdk.ButterBar.showMessage({ html: "Keep in mind that choosing ALL will send the follow-up to everyone in the original campaign.", time: 10000 });
                                }
                                else {
                                    document.getElementById(settingsID + "CM4").innerHTML = "Send custom message above original:";
                                }
                                if (fourthbumpaction.value == 'c') {
                                    if (!ClickTrackingCheckbox.checked) {
                                        ClickTrackingCheckbox.checked = true;
                                        myClickTracking = "on";
                                        var ForceClickTrack = true;
                                    }
                                    var BBClick = "Before using this option, make sure you have at least one trackable link in your email. <a style='color: #99FFFF' href='http://www.gmass.co/blog/weve-changed-how-click-tracking-works-to-avoid-false-phishing-detection/' target='_gmassblog'>Not all links are trackable.</a>";
                                    if (ForceClickTrack) { BBClick = "We have turned on the 'Track Clicks' setting for you because it was off. " + BBClick; }
                                    sdk.ButterBar.showMessage({ html: BBClick, time: 10000 });
                                }
                            });
                            if (GMassFourthBumpAction !== null) {
                                fourthbumpaction.value = GMassFourthBumpAction;
                                if (fourthbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM4").innerHTML = "Send custom message alone:";
                                }
                                else {
                                    document.getElementById(settingsID + "CM4").innerHTML = "Send custom message above original:";
                                }
                            }
                            /*fourthbumpcustom.addEventListener('change', function () {
                                GMassFourthBumpCustom = fourthbumpcustom.value;
                            });*/
                            $('#' + settingsID + 'FourthBumpCustom').on('change', function (e) {
                                GMassFourthBumpCustom = $('#' + settingsID + 'FourthBumpCustom').val();
                            });

                            fourthbumpaddedtext.addEventListener('blur', function () {
                                GMassFourthBumpAddedText = fourthbumpaddedtext.value;
                            });
                            fourthbumpdays.addEventListener('blur', function () {
                                GMassFourthBumpDays = fourthbumpdays.value;
                            });
                            if (GMassFourthBumpDays !== null) {
                                fourthbumpdays.value = GMassFourthBumpDays;
                            }
                            if (GMassFourthBumpAddedText !== null) {
                                fourthbumpaddedtext.value = GMassFourthBumpAddedText;
                            }
                            if (GMassFourthBump == "show") {
                                fourthbump.style.display = 'block';
                                addfourthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 4th Stage</a>";
                            }
                            else {
                                fourthbump.style.display = 'none';
                                addfourthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 4th Stage</a>";
                            }

                            //*************

                            fifthbumpaction.addEventListener('change', function () {
                                GMassFifthBumpAction = fifthbumpaction.value;
                                if (fifthbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM5").innerHTML = "Send custom message alone:";
                                    sdk.ButterBar.showMessage({ html: "Keep in mind that choosing ALL will send the follow-up to everyone in the original campaign.", time: 10000 });
                                }
                                else {
                                    document.getElementById(settingsID + "CM5").innerHTML = "Send custom message above original:";
                                }
                                if (fifthbumpaction.value == 'c') {
                                    if (!ClickTrackingCheckbox.checked) {
                                        ClickTrackingCheckbox.checked = true;
                                        myClickTracking = "on";
                                        var ForceClickTrack = true;
                                    }
                                    var BBClick = "Before using this option, make sure you have at least one trackable link in your email. <a style='color: #99FFFF' href='http://www.gmass.co/blog/weve-changed-how-click-tracking-works-to-avoid-false-phishing-detection/' target='_gmassblog'>Not all links are trackable.</a>";
                                    if (ForceClickTrack) { BBClick = "We have turned on the 'Track Clicks' setting for you because it was off. " + BBClick; }
                                    sdk.ButterBar.showMessage({ html: BBClick, time: 10000 });
                                }
                            });
                            if (GMassFifthBumpAction !== null) {
                                fifthbumpaction.value = GMassFifthBumpAction;
                                if (fifthbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM5").innerHTML = "Send custom message alone:";
                                }
                                else {
                                    document.getElementById(settingsID + "CM5").innerHTML = "Send custom message above original:";
                                }
                            }
                            /*fifthbumpcustom.addEventListener('change', function () {
                                GMassFifthBumpCustom = fifthbumpcustom.value;
                            });*/
                            $('#' + settingsID + 'FifthBumpCustom').on('change', function (e) {
                                GMassFifthBumpCustom = $('#' + settingsID + 'FifthBumpCustom').val();
                            });

                            fifthbumpaddedtext.addEventListener('blur', function () {
                                GMassFifthBumpAddedText = fifthbumpaddedtext.value;
                            });
                            fifthbumpdays.addEventListener('blur', function () {
                                GMassFifthBumpDays = fifthbumpdays.value;
                            });
                            if (GMassFifthBumpDays !== null) {
                                fifthbumpdays.value = GMassFifthBumpDays;
                            }
                            if (GMassFifthBumpAddedText !== null) {
                                fifthbumpaddedtext.value = GMassFifthBumpAddedText;
                            }
                            if (GMassFifthBump == "show") {
                                fifthbump.style.display = 'block';
                                addfifthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 5th Stage</a>";
                            }
                            else {
                                fifthbump.style.display = 'none';
                                addfifthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 5th Stage</a>";
                            }

                            //*************

                            sixthbumpaction.addEventListener('change', function () {
                                GMassSixthBumpAction = sixthbumpaction.value;
                                if (sixthbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM6").innerHTML = "Send custom message alone:";
                                    sdk.ButterBar.showMessage({ html: "Keep in mind that choosing ALL will send the follow-up to everyone in the original campaign.", time: 10000 });
                                }
                                else {
                                    document.getElementById(settingsID + "CM6").innerHTML = "Send custom message above original:";
                                }
                                if (sixthbumpaction.value == 'c') {
                                    if (!ClickTrackingCheckbox.checked) {
                                        ClickTrackingCheckbox.checked = true;
                                        myClickTracking = "on";
                                        var ForceClickTrack = true;
                                    }
                                    var BBClick = "Before using this option, make sure you have at least one trackable link in your email. <a style='color: #99FFFF' href='http://www.gmass.co/blog/weve-changed-how-click-tracking-works-to-avoid-false-phishing-detection/' target='_gmassblog'>Not all links are trackable.</a>";
                                    if (ForceClickTrack) { BBClick = "We have turned on the 'Track Clicks' setting for you because it was off. " + BBClick; }
                                    sdk.ButterBar.showMessage({ html: BBClick, time: 10000 });
                                }
                            });
                            if (GMassSixthBumpAction !== null) {
                                sixthbumpaction.value = GMassSixthBumpAction;
                                if (sixthbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM6").innerHTML = "Send custom message alone:";
                                }
                                else {
                                    document.getElementById(settingsID + "CM6").innerHTML = "Send custom message above original:";
                                }
                            }
                            /*sixthbumpcustom.addEventListener('change', function () {
                                GMassSixthBumpCustom = sixthbumpcustom.value;
                            });*/
                            $('#' + settingsID + 'SixthBumpCustom').on('change', function (e) {
                                GMassSixthBumpCustom = $('#' + settingsID + 'SixthBumpCustom').val();
                            });

                            sixthbumpaddedtext.addEventListener('blur', function () {
                                GMassSixthBumpAddedText = sixthbumpaddedtext.value;
                            });
                            sixthbumpdays.addEventListener('blur', function () {
                                GMassSixthBumpDays = sixthbumpdays.value;
                            });
                            if (GMassSixthBumpDays !== null) {
                                sixthbumpdays.value = GMassSixthBumpDays;
                            }
                            if (GMassSixthBumpAddedText !== null) {
                                sixthbumpaddedtext.value = GMassSixthBumpAddedText;
                            }
                            if (GMassSixthBump == "show") {
                                sixthbump.style.display = 'block';
                                addsixthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 6th Stage</a>";
                            }
                            else {
                                sixthbump.style.display = 'none';
                                addsixthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 6th Stage</a>";
                            }

                            //*************

                            seventhbumpaction.addEventListener('change', function () {
                                GMassSeventhBumpAction = seventhbumpaction.value;
                                if (seventhbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM7").innerHTML = "Send custom message alone:";
                                    sdk.ButterBar.showMessage({ html: "Keep in mind that choosing ALL will send the follow-up to everyone in the original campaign.", time: 10000 });
                                }
                                else {
                                    document.getElementById(settingsID + "CM7").innerHTML = "Send custom message above original:";
                                }
                                if (seventhbumpaction.value == 'c') {
                                    if (!ClickTrackingCheckbox.checked) {
                                        ClickTrackingCheckbox.checked = true;
                                        myClickTracking = "on";
                                        var ForceClickTrack = true;
                                    }
                                    var BBClick = "Before using this option, make sure you have at least one trackable link in your email. <a style='color: #99FFFF' href='http://www.gmass.co/blog/weve-changed-how-click-tracking-works-to-avoid-false-phishing-detection/' target='_gmassblog'>Not all links are trackable.</a>";
                                    if (ForceClickTrack) { BBClick = "We have turned on the 'Track Clicks' setting for you because it was off. " + BBClick; }
                                    sdk.ButterBar.showMessage({ html: BBClick, time: 10000 });
                                }
                            });
                            if (GMassSeventhBumpAction !== null) {
                                seventhbumpaction.value = GMassSeventhBumpAction;
                                if (seventhbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM7").innerHTML = "Send custom message alone:";
                                }
                                else {
                                    document.getElementById(settingsID + "CM7").innerHTML = "Send custom message above original:";
                                }
                            }
                            /*seventhbumpcustom.addEventListener('change', function () {
                                GMassSeventhBumpCustom = seventhbumpcustom.value;
                            });*/
                            $('#' + settingsID + 'SeventhBumpCustom').on('change', function (e) {
                                GMassSeventhBumpCustom = $('#' + settingsID + 'SeventhBumpCustom').val();
                            });

                            seventhbumpaddedtext.addEventListener('blur', function () {
                                GMassSeventhBumpAddedText = seventhbumpaddedtext.value;
                            });
                            seventhbumpdays.addEventListener('blur', function () {
                                GMassSeventhBumpDays = seventhbumpdays.value;
                            });
                            if (GMassSeventhBumpDays !== null) {
                                seventhbumpdays.value = GMassSeventhBumpDays;
                            }
                            if (GMassSeventhBumpAddedText !== null) {
                                seventhbumpaddedtext.value = GMassSeventhBumpAddedText;
                            }
                            if (GMassSeventhBump == "show") {
                                seventhbump.style.display = 'block';
                                addseventhbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 7th Stage</a>";
                            }
                            else {
                                seventhbump.style.display = 'none';
                                addseventhbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 7th Stage</a>";
                            }

                            //*************

                            eighthbumpaction.addEventListener('change', function () {
                                GMassEighthBumpAction = eighthbumpaction.value;
                                if (eighthbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM8").innerHTML = "Send custom message alone:";
                                    sdk.ButterBar.showMessage({ html: "Keep in mind that choosing ALL will send the follow-up to everyone in the original campaign.", time: 10000 });
                                }
                                else {
                                    document.getElementById(settingsID + "CM8").innerHTML = "Send custom message above original:";
                                }
                                if (eighthbumpaction.value == 'c') {
                                    if (!ClickTrackingCheckbox.checked) {
                                        ClickTrackingCheckbox.checked = true;
                                        myClickTracking = "on";
                                        var ForceClickTrack = true;
                                    }
                                    var BBClick = "Before using this option, make sure you have at least one trackable link in your email. <a style='color: #99FFFF' href='http://www.gmass.co/blog/weve-changed-how-click-tracking-works-to-avoid-false-phishing-detection/' target='_gmassblog'>Not all links are trackable.</a>";
                                    if (ForceClickTrack) { BBClick = "We have turned on the 'Track Clicks' setting for you because it was off. " + BBClick; }
                                    sdk.ButterBar.showMessage({ html: BBClick, time: 10000 });
                                }
                            });
                            if (GMassEighthBumpAction !== null) {
                                eighthbumpaction.value = GMassEighthBumpAction;
                                if (eighthbumpaction.value == 'a') {
                                    //change text for custom message
                                    document.getElementById(settingsID + "CM8").innerHTML = "Send custom message alone:";
                                }
                                else {
                                    document.getElementById(settingsID + "CM8").innerHTML = "Send custom message above original:";
                                }
                            }
                            /*eighthbumpcustom.addEventListener('change', function () {
                                GMassEighthBumpCustom = eighthbumpcustom.value;
                            });*/
                            $('#' + settingsID + 'EighthBumpCustom').on('change', function (e) {
                                GMassEighthBumpCustom = $('#' + settingsID + 'EighthBumpCustom').val();
                            });

                            eighthbumpaddedtext.addEventListener('blur', function () {
                                GMassEighthBumpAddedText = eighthbumpaddedtext.value;
                            });
                            eighthbumpdays.addEventListener('blur', function () {
                                GMassEighthBumpDays = eighthbumpdays.value;
                            });
                            if (GMassEighthBumpDays !== null) {
                                eighthbumpdays.value = GMassEighthBumpDays;
                            }
                            if (GMassEighthBumpAddedText !== null) {
                                eighthbumpaddedtext.value = GMassEighthBumpAddedText;
                            }
                            if (GMassEighthBump == "show") {
                                eighthbump.style.display = 'block';
                                addeighthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 8th Stage</a>";
                            }
                            else {
                                eighthbump.style.display = 'none';
                                addeighthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 8th Stage</a>";
                            }

                            //if (GMassFirstBump == "show"){
                            firstbump.style.display = 'block';
                            //addfirstbump.innerHTML = "- Remove First Stage";
                            addsecondbump.style.display = 'block';


                            //*********deciding whether to show 2nd/3rd stages when user shows settings box					

                            //**************hiding/showing Stage 2 based on user clicking show/hide

                            addsecondbump.addEventListener('click', function () {
                                //var secondbump = document.getElementById(settingsID + "secondbump;
                                if (secondbump.style.display == 'none') {
                                    secondbump.style.display = 'block';
                                    addsecondbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 2nd Stage</a>";
                                    addthirdbump.style.display = 'block';
                                    GMassSecondBump = "show";
                                }
                                else if (secondbump.style.display == 'block') {
                                    secondbump.style.display = 'none';
                                    addsecondbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 2nd Stage</a>";
                                    //addthirdbump.style.display = 'none';
                                    GMassSecondBump = "hide";
                                }

                            });

                            //**************hiding/showing Stage 3 based on user clicking show/hide

                            addthirdbump.addEventListener('click', function () {
                                //var thirdbump = document.getElementById(settingsID + "thirdbump;
                                if (thirdbump.style.display == 'none') {
                                    thirdbump.style.display = 'block';
                                    addthirdbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 3rd Stage</a>";
                                    GMassThirdBump = "show";
                                }
                                else if (thirdbump.style.display == 'block') {
                                    thirdbump.style.display = 'none';
                                    addthirdbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 3rd Stage</a>";
                                    GMassThirdBump = "hide";
                                }

                            });

                            addfourthbump.addEventListener('click', function () {
                                //var fourthbump = document.getElementById(settingsID + "fourthbump;
                                if (fourthbump.style.display == 'none') {
                                    fourthbump.style.display = 'block';
                                    addfourthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 4th Stage</a>";
                                    GMassFourthBump = "show";
                                }
                                else if (fourthbump.style.display == 'block') {
                                    fourthbump.style.display = 'none';
                                    addfourthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 4th Stage</a>";
                                    GMassFourthBump = "hide";
                                }

                            });

                            addfifthbump.addEventListener('click', function () {
                                //var fifthbump = document.getElementById(settingsID + "fifthbump;
                                if (fifthbump.style.display == 'none') {
                                    fifthbump.style.display = 'block';
                                    addfifthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 5th Stage</a>";
                                    GMassFifthBump = "show";
                                }
                                else if (fifthbump.style.display == 'block') {
                                    fifthbump.style.display = 'none';
                                    addfifthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 5th Stage</a>";
                                    GMassFifthBump = "hide";
                                }

                            });

                            addsixthbump.addEventListener('click', function () {
                                //var sixthbump = document.getElementById(settingsID + "sixthbump;
                                if (sixthbump.style.display == 'none') {
                                    sixthbump.style.display = 'block';
                                    addsixthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 6th Stage</a>";
                                    GMassSixthBump = "show";
                                }
                                else if (sixthbump.style.display == 'block') {
                                    sixthbump.style.display = 'none';
                                    addsixthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 6th Stage</a>";
                                    GMassSixthBump = "hide";
                                }

                            });

                            addseventhbump.addEventListener('click', function () {
                                //var seventhbump = document.getElementById(settingsID + "seventhbump;
                                if (seventhbump.style.display == 'none') {
                                    seventhbump.style.display = 'block';
                                    addseventhbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 7th Stage</a>";
                                    GMassSeventhBump = "show";
                                }
                                else if (seventhbump.style.display == 'block') {
                                    seventhbump.style.display = 'none';
                                    addseventhbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 7th Stage</a>";
                                    GMassSeventhBump = "hide";
                                }

                            });

                            addeighthbump.addEventListener('click', function () {
                                //var eighthbump = document.getElementById(settingsID + "eighthbump;
                                if (eighthbump.style.display == 'none') {
                                    eighthbump.style.display = 'block';
                                    addeighthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">- Hide 8th Stage</a>";
                                    GMassEighthBump = "show";
                                }
                                else if (eighthbump.style.display == 'block') {
                                    eighthbump.style.display = 'none';
                                    addeighthbump.innerHTML = "<a style=\"cursor:pointer;color:blue;text-decoration:none;\">+ Show 8th Stage</a>";
                                    GMassEighthBump = "hide";
                                }

                            });


                            addsecondbump.style.display = 'block';


                            if (AutoSuppress != null) {
                                AutoSuppress.addEventListener('blur', function () {
                                    AutoSuppress.value = AutoSuppress.value.replace(/ /g, "");
                                    GMassBumpSuppression = AutoSuppress.value;
                                });
                            }

                            //*********************************************************							





                            var RecurCheckbox = document.getElementById(settingsID + "Recur");

                            if (RepeatDH != null) {

                            	RepeatDH.value = RepeatTranslateToFrequency(GMassRecurDH);

                                RepeatDH.addEventListener('change', function () {

                                	//now this is based on mode too
                                	//GMassRecurDH is the variable with 8 options that's passed into /send
                                    GMassRecurDH = RepeatTranslateToCharacter(RepeatDH.value, RepeatNewOrAll.value);

                                });
                            }

                            if (RepeatNewOrAll != null) {

                                RepeatNewOrAll.value = RepeatTranslateToNewOrAll(GMassRecurDH);
                                
                                RepeatNewOrAll.addEventListener('change', function () {
                                    GMassRecurDH = RepeatTranslateToCharacter(RepeatDH.value, RepeatNewOrAll.value);

                                });
                            }

                            if (RecurCheckbox != null) {

                                if (GMassRecur == "on") {
                                    RecurCheckbox.checked = true;
                                    RepeatDH.disabled = false;
                                    RepeatNewOrAll.disabled = false;
                                    RecurEvery.style.color = "black";
                                    RecurEvery.disabled = false;
                                    RecurEveryLabel.style.color = "black";
                                    RecurToLabel.style.color = "black";
                                    RecurSheetLabel.style.color = "black";
                                }
                                else if (GMassRecur == "off" || GMassRecur == "default") {
                                    RecurCheckbox.checked = false;
                                    RepeatDH.disabled = true;
                                    RepeatNewOrAll.disabled = true;
                                    RecurEvery.style.color = "gray";
                                    RecurEvery.disabled = true;
                                    RecurEveryLabel.style.color = "gray";
                                    RecurToLabel.style.color = "gray";
                                    RecurSheetLabel.style.color = "gray";
                                }

                                RecurCheckbox.addEventListener('click', function () {

                                    if (RecurCheckbox.checked) {
                                        //butterbar html
                                        if (RepeatNewOrAll.value == "a"){
                                            sdk.ButterBar.showMessage({ html: "Use the 'Repeat' setting to <span style='color: #BFFFC5'>repeat this campaign</span> to the <span style='color: #BFFFC5'>same set of people</span> at your chosen time interval. This is used for 'reminder' emails. <span style='color: #BFFFC5'>Example:</span> an apartment building sending a <span style='color: #BFFFC5'>reminder to all tenants to pay rent</span> on the 1st of every month. <a style='color: #99FFFF' href='https://www.gmass.co/blog/recurring-reminder-emails/' target='_blog'>More information.</a>", time: 10000 });
                                        }
                                        else if (RepeatNewOrAll.value == "n"){
                                            sdk.ButterBar.showMessage({ html: "Use the 'Repeat' setting with <span style='color: #BFFFC5'>'just new'</span> to have GMass <span style='color: #BFFFC5'>check your Sheet for new rows</span>, at your chosen time interval, and <span style='color: #BFFFC5'>send this email to those new addresses</span>. Alternately, choose <span style='color: #BFFFC5'>'all'</span> and this campaign will <span style='color: #BFFFC5'>send to the same set of people</span> at your chosen time interval, for 'reminder' campaigns. <a style='color: #99FFFF' href='https://www.gmass.co/blog/new-feature-recurring-automated-email-campaigns-with-gmail-and-google-sheets/' target='_blog'>More information.</a>", time: 10000 });
                                        }
                                        GMassRecur = "on";
                                        ScheduleStatus = (ScheduleStatus.includes("|repeat|") ? ScheduleStatus : ScheduleStatus + "|repeat|");
                                        RepeatDH.disabled = false;
                                        RepeatNewOrAll.disabled = false;
                                        RecurEvery.style.color = "black";
                                        RecurEvery.disabled = false;
                                        RecurEveryLabel.style.color = "black";
                                        RecurToLabel.style.color = "black";
                                        RecurSheetLabel.style.color = "black";
                                    }
                                    else {
                                        GMassRecur = "off";
                                        ScheduleStatus = ScheduleStatus.replace("|repeat|", "");
                                        RepeatDH.disabled = true;
                                        RepeatNewOrAll.disabled = true;
                                        RecurEvery.style.color = "gray";
                                        RecurEvery.disabled = true;
                                        RecurEveryLabel.style.color = "gray";
                                        RecurToLabel.style.color = "gray";
                                        RecurSheetLabel.style.color = "gray";
                                    }

                                });


                                if (GMassPersonalization != "") {
                                    //show the mode, because this is a Sheets campaign
                                    RepeatMode.style.visibility = "visible";
                                    //if not a sheets based campaign, then repeating can only be to all, not new
                                    

                                }
                                else
                                {
                                    RepeatNewOrAll.value = "a";
                                    GMassRecurDH = RepeatTranslateToCharacter(RepeatDH.value, RepeatNewOrAll.value);
                                }
                            }

                            var OpenTrackingCheckbox = document.getElementById(settingsID + "OpenTracking");
                            OpenTrackingCheckbox.addEventListener('click', function () {

                                if (OpenTrackingCheckbox.checked) {
                                    myOpenTracking = "on";
                                }
                                else {
                                    myOpenTracking = "off";
                                }

                            });

                            var ClickTrackingCheckbox = document.getElementById(settingsID + "ClickTracking");
                            ClickTrackingCheckbox.addEventListener('click', function () {

                                if (ClickTrackingCheckbox.checked) {
                                    myClickTracking = "on";
                                }
                                else {
                                    myClickTracking = "off";
                                }

                            });
                                             

                            var SendGmail = document.getElementById(settingsID + "GmailRadio");
                            SendGmail.addEventListener('click', function () {
                                SMTP = "off";
                                if (!composeView.isInlineReplyForm()) {
                                    fastsmtpdiv.style.display = "none";
                                }

                            });
                            var SendSMTP = document.getElementById(settingsID + "SMTPRadio");
                            SendSMTP.addEventListener('click', function () {
                                SMTP = "on";
                                if (mySendSave == "send"){
                                    if (!composeView.isInlineReplyForm()) {
                                        fastsmtpdiv.style.display = "block";
                                    }
                                }
                            });

                            if (!composeView.isInlineReplyForm()) {


                                var ReplyToInput = document.getElementById(settingsID + "replyto");
                                /*ReplyToInput.addEventListener('blur', function () {

                                    ReplyToInput.value = ReplyToInput.value.trim();

                                    if (!ValidateEmail(ReplyToInput.value) && ReplyToInput.value != ""){
                                        sdk.ButterBar.showMessage({ text: "That's not a valid email!", time: 10000, messageKey: "replytofail" });
                                        ReplyToInput.value = "";
                                        ReplyToInput.focus();
                                    }
                                    else{
                                        sdk.ButterBar.hideMessage('replytofail');
                                    }

                                }); */

                                /*ReplyToInput.addEventListener('change', function () {

                                    ReplyToInput.value = ReplyToInput.value.trim();

                                    if (!ValidateEmail(ReplyToInput.value) && ReplyToInput.value != ""){
                                        sdk.ButterBar.showMessage({ text: "That's not a valid email!", time: 10000, messageKey: "replytofail" });
                                        ReplyToInput.value = "";
                                        AdvancedStatus = AdvancedStatus.replace("|reply-to set|", "");
                                        ReplyToInput.focus();
                                    }
                                    else{
                                        sdk.ButterBar.hideMessage('replytofail');
                                        myReplyTo = ReplyToInput.value;
                                        if (isEmpty(myReplyTo)){
                                            AdvancedStatus = AdvancedStatus.replace("|reply-to set|", "");
                                        }
                                        else{
                                            AdvancedStatus = (AdvancedStatus.includes("reply-to set") ? AdvancedStatus : AdvancedStatus + "|reply-to set|");
                                        }
                                        if (GMassDebug){console.log("myReplyTo=" + myReplyTo);}
                                    }



                                });*/

                                var FriendlyNameInput = document.getElementById(settingsID + "friendlyname");
                                /*ReplyToInput.addEventListener('blur', function () {

                                    ReplyToInput.value = ReplyToInput.value.trim();

                                    if (!ValidateEmail(ReplyToInput.value) && ReplyToInput.value != ""){
                                        sdk.ButterBar.showMessage({ text: "That's not a valid email!", time: 10000, messageKey: "replytofail" });
                                        ReplyToInput.value = "";
                                        ReplyToInput.focus();
                                    }
                                    else{
                                        sdk.ButterBar.hideMessage('replytofail');
                                    }

                                }); */

                                FriendlyNameInput.addEventListener('change', function () {

                                    FriendlyNameInput.value = FriendlyNameInput.value.trim();

                                    myFriendlyName = FriendlyNameInput.value;
                                    if (isEmpty(myFriendlyName)){
                                        AdvancedStatus = AdvancedStatus.replace("|friendly name set|", "");
                                    }
                                    else{
                                        AdvancedStatus = (AdvancedStatus.includes("friendly name set") ? AdvancedStatus : AdvancedStatus + "|friendly name set|");
                                    }
                                    if (GMassDebug){console.log("myFriendlyName=" + myFriendlyName);}
                                    



                                });                         
                                /*if (SkipWeekends == "on"){
                                    document.getElementById(settingsID + "schedulestatus").innerHTML = document.getElementById(settingsID + "schedulestatus").innerHTML + "skip weekends";
                                }
                                else{
                                    document.getElementById(settingsID + "schedulestatus").innerHTML = document.getElementById(settingsID + "schedulestatus").innerHTML.replace("skip weekends", "");
                                }*/

                                var SkipWeekendsCheckbox = document.getElementById(settingsID + "SkipWeekends");
                                if (SkipWeekendsCheckbox != null) {
                                    SkipWeekendsCheckbox.addEventListener('click', function () {

                                        if (SkipWeekendsCheckbox.checked) {
                                            SkipWeekends = "on";
                                            ScheduleStatus = (ScheduleStatus.includes("skip weekends") ? ScheduleStatus : ScheduleStatus + "|skip weekends|");
                                            //document.getElementById(settingsID + "schedulestatus").innerHTML = document.getElementById(settingsID + "schedulestatus").innerHTML + "skip weekends";
                                            //butterbar
                                            sdk.ButterBar.showMessage({ html: "Curious? Read more about how the <a style=\"color: #99FFFF\" href=\"https://www.gmass.co/blog/skip-weekends/\" target=\"_blog\">Skip Weekends</a> setting works.", time: 10000 });
                                        }
                                        else {
                                            SkipWeekends = "off";
                                            ScheduleStatus = ScheduleStatus.replace("|skip weekends|", "");
                                            document.getElementById(settingsID + "schedulestatus").innerHTML = document.getElementById(settingsID + "schedulestatus").innerHTML.replace("skip weekends", "");
                                        }

                                    });
                                }

                                //**********get rid of inline onclick handlers in favor of this approach
                                var NewRadio = document.getElementById(settingsID + "NewRadio");
                                NewRadio.addEventListener('click', function () {
                                    myNewReply = "new";
                                    AdvancedStatus = AdvancedStatus.replace("|send as replies|", "");
                                });
                                var ReplyRadio = document.getElementById(settingsID + "ReplyRadio");
                                ReplyRadio.addEventListener('click', function () {
                                    myNewReply = "reply";
                                    AdvancedStatus = (AdvancedStatus.includes("send as replies") ? AdvancedStatus : AdvancedStatus + "|send as replies|");
                                    sdk.ButterBar.showMessage({ html: "<span style=\"color: red\">WARNING:</span> Are you sure this is what you want? This will cause your email to go out as part of last conversation you had with each recipient. The Subject you have entered will be ignored and the Subject of the most recent conversation will be used instead. <a style=\"color: #99FFFF\" href=\"https://www.gmass.co/blog/send-email-campaign-as-reply-to-recent-conversation/\" target=\"_blog\">More information.</a>", time: 10000 });
                                });

                                var SendRadio = document.getElementById(settingsID + "SendRadio");
                                SendRadio.addEventListener('click', function () {
                                    mySendSave = "send";
                                    if (SMTPOptionDisplay) {
                                        //document.getElementById(settingsID + "smtp").style.display = "block";
                                        document.getElementById(settingsID + "sendwith").innerHTML = "Send with";
                                        document.getElementById(settingsID + "sendwith2").innerHTML = "Gmail";
                                        document.getElementById(settingsID + "smtpserver").innerHTML = SMTPServer;
                                        if (SMTP=="on"){fastsmtpdiv.style.display = "block";}
                                    }

                                });
                                var SaveRadio = document.getElementById(settingsID + "SaveRadio");
                                SaveRadio.addEventListener('click', function () {
                                    mySendSave = "save";
                                    sdk.ButterBar.showMessage({ html: "Just FYI, this will cause no emails to send when you hit the GMass button. Instead DRAFTS will be created which you can then review for accuracy and then send by clicking a link. <a style=\"color: #99FFFF\" href=\"https://www.gmass.co/blog/no-more-fear-preview-your-emails-as-drafts-then-send-them-with-one-click/\" target=\"_blog\">More information.</a>", time: 10000 });

                                    //document.getElementById(settingsID + "smtp").style.display = "none";
                                    //sendwith, sendwith2, smtpserver
                                    document.getElementById(settingsID + "sendwith").innerHTML = "Create Drafts";
                                    document.getElementById(settingsID + "sendwith2").innerHTML = "per sending limits";
                                    document.getElementById(settingsID + "smtpserver").innerHTML = "all at once";
                                    fastsmtpdiv.style.display = "none";

                                });

                                /*if (myDelay == "on"){
                                    document.getElementById(settingsID + "schedulestatus").innerHTML = document.getElementById(settingsID + "schedulestatus").innerHTML + "pause between";
                                }
                                else{
                                    document.getElementById(settingsID + "schedulestatus").innerHTML = document.getElementById(settingsID + "schedulestatus").innerHTML.replace("pause between", "");
                                }*/

                                var DelayCheckbox = document.getElementById(settingsID + "DelayCheckbox");
                                DelayCheckbox.addEventListener('click', function () {

                                    if (DelayCheckbox.checked) {
                                        myDelay = "on";
                                        //document.getElementById(settingsID + "schedulestatus").innerHTML = document.getElementById(settingsID + "schedulestatus").innerHTML + "pause between";
                                        ScheduleStatus = (ScheduleStatus.includes("pause between emails") ? ScheduleStatus : ScheduleStatus + "|pause between emails|");
                                    }
                                    else {
                                        myDelay = "off";
                                        ScheduleStatus = ScheduleStatus.replace("|pause between emails|", "");
                                        //document.getElementById(settingsID + "schedulestatus").innerHTML = document.getElementById(settingsID + "schedulestatus").innerHTML.replace("pause between", "");
                                    }

                                });

                                var FastSMTPCheckbox = document.getElementById(settingsID + "fastsmtp");
                                FastSMTPCheckbox.addEventListener('click', function () {

                                    if (FastSMTPCheckbox.checked) {
                                        fastSMTP = "on";
                                        sdk.ButterBar.showMessage({ html: "The fast sending option sends emails faster by skipping recording them in your Sent Mail folder in Gmail. This also prevents you from using reply-based auto follow-ups.", time: 10000 });
                                        //document.getElementById(settingsID + "schedulestatus").innerHTML = document.getElementById(settingsID + "schedulestatus").innerHTML + "pause between";
                                        //ScheduleStatus = (ScheduleStatus.includes("pause between emails") ? ScheduleStatus : ScheduleStatus + "|pause between emails|");
                                    }
                                    else {
                                        fastSMTP = "off";
                                        //ScheduleStatus = ScheduleStatus.replace("|pause between emails|", "");
                                        //document.getElementById(settingsID + "schedulestatus").innerHTML = document.getElementById(settingsID + "schedulestatus").innerHTML.replace("pause between", "");
                                    }

                                });                        

                                TestButton = document.getElementById(settingsID + "TestEmailButton");
                                TestButton.addEventListener('click', function () {
                                    //if (event2.composeView.getMessageID()!=null){
                                    if (composeView.getSubject() != "") {

                                        if (document.getElementById(settingsID + "TestEmailValue").value != "") {

                                            TestButton.innerHTML = "Sending...";
                                            sdk.ButterBar.showMessage({ text: "Sending test email...", time: 10000 });
                                            TestButton.disabled = true;

                                            if (ComposeDraftID != "") {

                                                SendTestEmail(ComposeDraftID, myTestAddresses);
                                                //LaunchCompose();
                                            }
                                            else {

                                                sdk.ButterBar.showMessage({ text: "You were a bit too fast. Wait a second and hit that button again.", time: 10000 });
                                                TestButton.innerHTML = "Send Test Email";
                                                TestButton.disabled = false;
                                            }

                                        }
                                        else {
                                            sdk.ButterBar.showMessage({ html: "Please specify at least one test email address. You may separate multiple test addresses with a comma.", time: 10000, className: "redbb" });
                                            //sdk.ButterBar.showMessage({html: "Your auto follow-up settings have been cleared. You still need to hit the GMass button to save these settings.", time: 10000});

                                        }
                                    }
                                    else {
                                        sdk.ButterBar.showMessage({ html: "You must specify a Subject before sending a test email.", time: 60000, className: "redbb" });
                                    }
                                });


                                var SeedListButton = document.getElementById(settingsID + "SeedListButton");

                                if (SeedListButton != null) {
                                    SeedListButton.addEventListener('click', function () {
                                        if (composeView.getSubject() != "") {



                                            if (ComposeDraftID != "") {
                                                SpamSolver(ComposeDraftID);
                                            }
                                            else {
                                                sdk.ButterBar.showMessage({ text: "You were a bit too fast. Wait a second and hit that button again.", time: 10000 });
                                            }

                                        }
                                        else {
                                            sdk.ButterBar.showMessage({ html: "You must specify a Subject before sending to the seeds.", time: 60000, className: "redbb" });
                                        }
                                    });
                                }

                                var AnalyzerButton = document.getElementById(settingsID + "Analyzer");

                                if (AnalyzerButton != null) {
                                    AnalyzerButton.addEventListener('click', function () {
                                        if (composeView.getSubject() != "") {



                                            if (ComposeDraftID != "") {
                                                AnalyzeThis(ComposeDraftID);
                                            }
                                            else {
                                                sdk.ButterBar.showMessage({ text: "You were a bit too fast. Wait a second and hit that button again.", time: 10000 });
                                            }

                                        }
                                        else {
                                            sdk.ButterBar.showMessage({ html: "You must specify a Subject before analyzing your email.", time: 60000, className: "redbb" });
                                        }
                                    });
                                }

                                var LinkCheckerButton = document.getElementById(settingsID + "LinkChecker");

                                if (LinkCheckerButton != null) {
                                    LinkCheckerButton.addEventListener('click', function () {

                                        openPopupPage(composeView.getHTMLContent());

                                    });
                                }

                                var WordzenButton = document.getElementById(settingsID + "GMassWordzen");

                                if (WordzenButton != null) {

                                    WordzenButton.addEventListener('click', function () {

                                        //****check if proofreading is allowed for user

                                        var xmlProof = new XMLHttpRequest();
                                        xmlProof.open("GET", varBaseURL + "gmass/getproofreadingstatus?emailaddress=" + sdk.User.getEmailAddress());
                                        xmlProof.send();

                                        //create authentication div and launch if user not authenticated
                                        xmlProof.onreadystatechange = function () {
                                            if (xmlProof.readyState == 4) {
                                                var ProofResult = JSON.parse(xmlProof.responseText);
                                                if (ProofResult.success) {

                                                    var startTime = new Date().getTime();
                                                    if (confirm(ProofResult.ConfirmMessage)) {
                                                        //if (event2.composeView.getMessageID()!=null){
                                                        if (composeView.getSubject() != "") {

                                                            sdk.ButterBar.showMessage({ text: "Sending to the proofreading team...", time: 10000 });
                                                            //WordzenButton.disabled = true;

                                                            if (ComposeDraftID != "") {

                                                                var xmlWZ = new XMLHttpRequest();

                                                                var URLParams = "gmass/SubmitToWordzen?emailAddress=" + sdk.User.getEmailAddress() + "&draftId=" + ComposeDraftID;

                                                                //preserve state**********
                                                                if ((myNewReply == "reply")) {
                                                                    URLParams = URLParams + "&appendToThread=true";
                                                                }
                                                                if ((mySendSave == "save") && (!composeView.isInlineReplyForm())) {
                                                                    //if (mySendSave == "save"){
                                                                    URLParams = URLParams + "&saveAsDraft=true";
                                                                }

                                                                if (SMTP == "on") {
                                                                    URLParams = URLParams + "&UseSMTP=true";
                                                                }
                                                                else if (SMTP == "off") {
                                                                    URLParams = URLParams + "&UseSMTP=false";
                                                                }
                                                                else if (SMTP == "notset") {
                                                                    URLParams = URLParams + "&UseSMTP=notset";
                                                                }

                                                                if (GMassRecur == "on") {
                                                                    URLParams = URLParams + "&Recur=d";
                                                                }
                                                                if (myOpenTracking == "on") {
                                                                    URLParams = URLParams + "&OpenTracking=true";
                                                                }
                                                                if (myClickTracking == "on") {
                                                                    URLParams = URLParams + "&ClickTracking=true";
                                                                }
                                                                if (SkipWeekends == "on") {
                                                                    URLParams = URLParams + "&SkipWeekends=true";
                                                                }
                                                                if (myDelay == "on") {
                                                                    URLParams = URLParams + "&Delay=true";
                                                                }

                                                                if (fastSMTP == "on") {
                                                                    URLParams = URLParams + "&FastSMTP=true";
                                                                }                                                        

                                                                //****auto follow up feature
                                                                if (GMassFirstBumpBox == "y") {
                                                                    //if (GMassFirstBumpCustom != "0") localStorage.setItem("GMassFirstBumpAddedText", "blank");
                                                                    URLParams = URLParams + "&FirstBump=y&FirstBumpDays=" + GMassFirstBumpDays + "&FirstBumpAddedText=" + encodeURIComponent(GMassFirstBumpAddedText) + "&FirstBumpCampaignID=" + GMassFirstBumpCustom + "&FirstBumpAction=" + GMassFirstBumpAction + "&FirstBumpChoice=" + GMassFirstBumpChoice;
                                                                }

                                                                if (GMassSecondBumpBox == "y") {
                                                                    //if (GMassSecondBumpCustom != "0") localStorage.setItem("GMassSecondBumpAddedText", "blank");
                                                                    URLParams = URLParams + "&SecondBump=y&SecondBumpDays=" + GMassSecondBumpDays + "&SecondBumpAddedText=" + encodeURIComponent(GMassSecondBumpAddedText) + "&SecondBumpCampaignID=" + GMassSecondBumpCustom + "&SecondBumpAction=" + GMassSecondBumpAction + "&SecondBumpChoice=" + GMassSecondBumpChoice;
                                                                }

                                                                if (GMassThirdBumpBox == "y") {
                                                                    //if (GMassThirdBumpCustom != "0") localStorage.setItem("GMassThirdBumpAddedText", "blank");
                                                                    URLParams = URLParams + "&ThirdBump=y&ThirdBumpDays=" + GMassThirdBumpDays + "&ThirdBumpAddedText=" + encodeURIComponent(GMassThirdBumpAddedText) + "&ThirdBumpCampaignID=" + GMassThirdBumpCustom + "&ThirdBumpAction=" + GMassThirdBumpAction + "&ThirdBumpChoice=" + GMassThirdBumpChoice;
                                                                }

                                                                if (GMassFourthBumpBox == "y") {
                                                                    //if (GMassFourthBumpCustom != "0") localStorage.setItem("GMassFourthBumpAddedText", "blank");
                                                                    URLParams = URLParams + "&FourthBump=y&FourthBumpDays=" + GMassFourthBumpDays + "&FourthBumpAddedText=" + encodeURIComponent(GMassFourthBumpAddedText) + "&FourthBumpCampaignID=" + GMassFourthBumpCustom + "&FourthBumpAction=" + GMassFourthBumpAction + "&FourthBumpChoice=" + GMassFourthBumpChoice;
                                                                }

                                                                if (GMassFifthBumpBox == "y") {
                                                                    //if (GMassFifthBumpCustom != "0") localStorage.setItem("GMassFifthBumpAddedText", "blank");
                                                                    URLParams = URLParams + "&FifthBump=y&FifthBumpDays=" + GMassFifthBumpDays + "&FifthBumpAddedText=" + encodeURIComponent(GMassFifthBumpAddedText) + "&FifthBumpCampaignID=" + GMassFifthBumpCustom + "&FifthBumpAction=" + GMassFifthBumpAction + "&FifthBumpChoice=" + GMassFifthBumpChoice;
                                                                }

                                                                if (GMassSixthBumpBox == "y") {
                                                                    //if (GMassSixthBumpCustom != "0") localStorage.setItem("GMassSixthBumpAddedText", "blank");
                                                                    URLParams = URLParams + "&SixthBump=y&SixthBumpDays=" + GMassSixthBumpDays + "&SixthBumpAddedText=" + encodeURIComponent(GMassSixthBumpAddedText) + "&SixthBumpCampaignID=" + GMassSixthBumpCustom + "&SixthBumpAction=" + GMassSixthBumpAction + "&SixthBumpChoice=" + GMassSixthBumpChoice;
                                                                }

                                                                if (GMassSeventhBumpBox == "y") {
                                                                    //if (GMassSeventhBumpCustom != "0") localStorage.setItem("GMassSeventhBumpAddedText", "blank");
                                                                    URLParams = URLParams + "&SeventhBump=y&SeventhBumpDays=" + GMassSeventhBumpDays + "&SeventhBumpAddedText=" + encodeURIComponent(GMassSeventhBumpAddedText) + "&SeventhBumpCampaignID=" + GMassSeventhBumpCustom + "&SeventhBumpAction=" + GMassSeventhBumpAction + "&SeventhBumpChoice=" + GMassSeventhBumpChoice;
                                                                }

                                                                if (GMassEighthBumpBox == "y") {
                                                                    //if (GMassEighthBumpCustom != "0") localStorage.setItem("GMassEighthBumpAddedText", "blank");
                                                                    URLParams = URLParams + "&EighthBump=y&EighthBumpDays=" + GMassEighthBumpDays + "&EighthBumpAddedText=" + encodeURIComponent(GMassEighthBumpAddedText) + "&EighthBumpCampaignID=" + GMassEighthBumpCustom + "&EighthBumpAction=" + GMassEighthBumpAction + "&EighthBumpChoice=" + GMassEighthBumpChoice;
                                                                }

                                                                if (GMassBumpSuppression != "") {
                                                                    URLParams = URLParams + "&BumpSuppression=" + encodeURIComponent(GMassBumpSuppression);
                                                                }

                                                                //****done
                                                                if (GMassSuppression != "") {
                                                                    URLParams = URLParams + "&Suppression=" + encodeURIComponent(GMassSuppression);
                                                                }

                                                                if (myMaxEmails != "" && myMaxEmails != "max") {
                                                                    //need to ensure we have oauth permissions for contacts
                                                                    //https://www.gmass.co/gmass/userhascontactspermission?emailaddress=meredithlawler@gmail.com
                                                                    URLParams = URLParams + "&SplitFactor=" + myMaxEmails;
                                                                }
                                                                if (mySuppressionDays != "" && mySuppressionDays != "0") {
                                                                    //need to ensure we have oauth permissions for contacts
                                                                    //https://www.gmass.co/gmass/userhascontactspermission?emailaddress=meredithlawler@gmail.com
                                                                    URLParams = URLParams + "&SuppressionDays=" + mySuppressionDays;
                                                                }
                                                                if (GMassDateDropdown != "Now") {
                                                                    URLParams = URLParams + "&futureSendDateTime=" + encodeURIComponent(GMassDateTextBox);
                                                                }
                                                                URLParams = URLParams + "&deleteDraft=false";


                                                                xmlWZ.open("GET", varBaseURL + URLParams, true);
                                                                xmlWZ.send();
                                                                xmlWZ.onreadystatechange = function () {
                                                                    if (xmlWZ.readyState == 4) {

                                                                        var resultHTTPApplyLabel = JSON.parse(xmlWZ.responseText);

                                                                        if (resultHTTPApplyLabel.success) {
                                                                            sdk.ButterBar.showMessage({ html: resultHTTPApplyLabel.BBMessage, time: 10000 });
                                                                            composeView.close();
                                                                        }
                                                                        else {
                                                                            sdk.ButterBar.showMessage({ text: "There was an error submitting your email to Wordzen.", time: 10000, className: "redbb" });
                                                                        }

                                                                    }

                                                                }

                                                            }
                                                            else {
                                                                sdk.ButterBar.showMessage({ text: "You were a bit too fast. Wait a second and hit that button again.", time: 10000 });
                                                            }

                                                        }
                                                        else {
                                                            sdk.ButterBar.showMessage({ html: "You must specify a Subject before submitting to Wordzen.", time: 10000, className: "redbb" });
                                                        }
                                                    }
                                                    else {

                                                        var endTime = new Date().getTime();

                                                        if ((endTime - startTime) < 50) {
                                                            sdk.ButterBar.showMessage({ html: varAlertDisabledMessage, time: 10000, className: "redbb" });
                                                        }


                                                    }


                                                }
                                                else {
                                                    sdk.ButterBar.showMessage({ html: ProofResult.FailureMessage, time: 10000, className: "redbb" });
                                                }
                                            }

                                        }

                                    });
                                }
                            }

                            var select = document.getElementById(settingsID + "GMassDateDropdown");
                            select.addEventListener('change', DateTimeSelected);

                            var datetimeField = document.getElementById(settingsID + "GMassDateTime");
                            datetimeField.addEventListener('input', UserModifiedDateTime);

                            if (select.value == "Now") {
                                datetimeField.style.display = "none";
                            }

                            if (!composeView.isInlineReplyForm()) {
                                var SuppressionDaysField = document.getElementById(settingsID + "SuppressionDays");

                                SuppressionDaysField.addEventListener('blur', function () {
                                    UserModifiedSuppressionDays();
                                });

                                var MaxEmailsField = document.getElementById(settingsID + "MaxEmails");

                                if (MaxEmailsField.value == "max") {
                                    MaxEmailsField.style.color = "gray";
                                }

                                MaxEmailsField.addEventListener('blur', function () {
                                    if (MaxEmailsField.value == "") {
                                        MaxEmailsField.style.color = "gray";
                                        MaxEmailsField.value = "max";

                                    }
                                    UserModifiedMaxEmails(sdk.User.getEmailAddress());
                                });

                                MaxEmailsField.addEventListener('focus', function () {
                                    if (MaxEmailsField.value == "max") {
                                        MaxEmailsField.style.color = "black";
                                        MaxEmailsField.value = "";
                                    }
                                });

                                //********************
                                if (RecurEvery.value == "1") {
                                    //RecurEvery.style.color = "black";
                                }

                                RecurEvery.addEventListener('blur', function () {
                                    RecurEvery.value = RecurEvery.value.trim();
                                    if (RecurEvery.value == "") {
                                        //RecurEvery.style.color = "black";
                                        RecurEvery.value = "1";

                                    }
                                    UserModifiedRecurEvery(RepeatDH);
                                });

                                RecurEvery.addEventListener('focus', function () {
                                    /*if (RecurEvery.value == "1") {
                                        //RecurEvery.style.color = "black";
                                        RecurEvery.value = "";
                                    }*/
                                });

                                var TestAddressesField = document.getElementById(settingsID + "TestEmailValue");
                                //TestAddressesField.addEventListener('change', UserModifiedTestAddresses);
                                $('#' + settingsID + 'TestEmailValue').on('change', function (e) {

                                    //myTestAddresses = inputbox.value;
                                    
                                    myTestAddresses = $('#' + settingsID + 'TestEmailValue').val();
                                    if (myTestAddresses == null) { myTestAddresses = ""; } else {myTestAddresses = myTestAddresses.join(); localStorage.setItem("myTestAddresses", myTestAddresses);}
                                });                        
                            }

                            $('#' + settingsID + 'replyto').on('change', function (e) {

                                //myTestAddresses = inputbox.value;
                                
                                myReplyTo = $('#' + settingsID + 'replyto').val();
                                if (!ValidateEmail(myReplyTo)) {
                                    myReplyTo = ""; 
                                    AdvancedStatus = AdvancedStatus.replace("|reply-to set|", "");
                                    localStorage.setItem("myReplyTo", "");
                                } 
                                else 
                                {
                                    localStorage.setItem("myReplyTo", myReplyTo);
                                    AdvancedStatus = (AdvancedStatus.includes("reply-to set") ? AdvancedStatus : AdvancedStatus + "|reply-to set|");
                                }

                            });

                            var unsubel = document.getElementById("unsubcopy");
                            if (unsubel != null){
                                unsubel.addEventListener('click', function() {
                                    CopyClipboard("https://www.gmass.co/gmass/u?u=OUTBOUND");
                                    sdk.ButterBar.showMessage({ html: "The GMass unsubscribe URL has been copied to your clipboard. Now you can set any text in your campaign to be your unsubscribe link by highlighting it and clicking the 'Insert link' icon in the Compose toolbar and pasting the URL in.", time: 10000 });

                                });
                            }

                            var buttons2 = Array.from(document.getElementsByClassName('GMassFieldUnsub'));
                            buttons2.forEach(function (button2) {
                                button2.addEventListener('click', function () { InsertFieldUnsub(button2, composeView); });
                            });

                            if (IsScheduled) {

                                //if (IsProcessing || IsPaused){
                                var PauseResumeButton = document.getElementById(settingsID + "pauseresumecampaign");
                                var PauseConfirmMessage = "";

                                PauseResumeButton.addEventListener('click', function () {

                                    if (IsPaused && PauseResumeButton.innerHTML.includes("Resume")) {
                                        PauseConfirmMessage = "Are you sure you want to RESUME this GMass campaign? If you click OK, you campaign will continue sending on the schedule you've set.";
                                    }
                                    else {
                                        PauseConfirmMessage = "Are you sure you want to PAUSE this GMass campaign? If you click OK, you campaign will stop sending until you RESUME it.";
                                    }

                                    //var startTime = new Date().getTime();
                                    if (!confirm(PauseConfirmMessage)) {

                                        /*var endTime = new Date().getTime();

                                        if ((endTime - startTime) < 50) {
                                            sdk.ButterBar.showMessage({ html: varAlertDisabledMessage, time: 10000, className: "redbb" });
                                        }*/

                                        return;
                                    }



                                    if (IsPaused) {
                                        sdk.ButterBar.showMessage({ text: "Resuming GMass campaign...", time: 60000 });

                                        var gmassurlresume = GenerateSendURL(ComposeDraftID) + "&resume=true";
                                        ConnectToGMass(gmassurlresume);

                                    }
                                    else 
                                    {
                                        sdk.ButterBar.showMessage({ text: "Pausing GMass campaign...", time: 60000 });

                                        var xmlPauseResume = new XMLHttpRequest();
                                        xmlPauseResume.open("GET", varBaseURL + "gmass/PauseResumeCampaign?pauseresume=" + (IsPaused && PauseResumeButton.innerHTML.includes("Resume") ? "r" : "p") + "&emailaddress=" + sdk.User.getEmailAddress() + "&DraftID=" + ComposeDraftID);
                                        xmlPauseResume.send();

                                        xmlPauseResume.onreadystatechange = function () {
                                            if (xmlPauseResume.readyState == 4) {
                                                var PauseResumeResult = JSON.parse(xmlPauseResume.responseText);
                                                if (PauseResumeResult.success) {
                                                    //var PauseResumeMessage = "";
                                                    if (!PauseResumeResult.Paused) {
                                                        IsPaused = false;
                                                        //flip the button
                                                        PauseResumeButton.innerHTML = "Pause Campaign";
                                                    }
                                                    else if (PauseResumeResult.Paused) {
                                                        IsPaused = true;
                                                        //flip the button
                                                        PauseResumeButton.innerHTML = "Resume Campaign";
                                                    }
                                                    else {
                                                        //something went wrong
                                                        //PauseResumeMessage = "Something went wrong, sorry.";
                                                        PauseResumeButton.innerHTML = "Error";
                                                    }
                                                    //PauseResumeMessage = PauseResumeResult.PauseResumeMessage;
                                                    /*if (CancelResult.AF) {
                                                        CancelMessage += " Your campaign still has auto follow-up emails that will send to those that already received the campaign. <a target=\"_blog\" href=\"https://www.gmass.co/blog/how-to-cancel-or-edit-auto-follow-ups/\">Learn how to cancel the auto follow-ups.</a>"
                                                    }*/
                                                    sdk.ButterBar.showMessage({ html: PauseResumeResult.PauseResumeMessage, time: 10000 });
                                                    //composeView.close();
                                                }
                                                else {
                                                    PauseResumeButton.innerHTML = "Error";
                                                    sdk.ButterBar.showMessage({ html: PauseResumeResult.PauseResumeMessage + " Error: " + PauseResumeResult.error, time: 10000, className: "redbb" });
                                                }
                                            }

                                        }
                                    }


                                });
                                //}

                                var CancelCampaignButton = document.getElementById(settingsID + "cancelcampaign");
                                CancelCampaignButton.addEventListener('click', function () {

                                    var startTime = new Date().getTime();
                                    if (!confirm("Are you sure you want to cancel this GMass campaign? If you click OK, you campaign will be canceled and no more emails will be sent. Any auto follow-ups that are assigned to this campaign, however, will still continue to send to people that have already received the campaign.")) {

                                        var endTime = new Date().getTime();

                                        if ((endTime - startTime) < 50) {
                                            sdk.ButterBar.showMessage({ html: varAlertDisabledMessage, time: 10000, className: "redbb" });
                                        }

                                        return;
                                    }

                                    sdk.ButterBar.showMessage({ text: "Cancelling GMass campaign...", time: 60000 });
                                    var xmlCancel = new XMLHttpRequest();
                                    xmlCancel.open("GET", varBaseURL + "gmass/CancelCampaign?emailaddress=" + sdk.User.getEmailAddress() + "&DraftID=" + ComposeDraftID);
                                    xmlCancel.send();

                                    //create authentication div and launch if user not authenticated
                                    xmlCancel.onreadystatechange = function () {
                                        if (xmlCancel.readyState == 4) {
                                            var CancelResult = JSON.parse(xmlCancel.responseText);
                                            if (CancelResult.success) {
                                                var CancelMessage = "You've canceled the campaign.";
                                                if (CancelResult.AF) {
                                                    CancelMessage += " Your campaign still has auto follow-up emails that will send to those that already received the campaign. <a style=\"color: #99FFFF\" target=\"_blog\" href=\"https://www.gmass.co/blog/how-to-cancel-or-edit-auto-follow-ups/\">Learn how to cancel the auto follow-ups.</a>"
                                                }
                                                sdk.ButterBar.showMessage({ html: CancelMessage, time: 10000 });
                                                composeView.close();
                                            }
                                            else {
                                                sdk.ButterBar.showMessage({ html: "Something went wrong. Your campaign may not have been canceled. Error: " + CancelResult.error, time: 10000, className: "redbb" });
                                            }
                                        }

                                    }

                                });

                                var SaveCampaignButton = document.getElementById(settingsID + "savecampaign");
                                SaveCampaignButton.addEventListener('click', function () {

                                    ClickGMassButton();

                                });

                  
                            }

                            var GetCampaignStatusLink = document.getElementById(settingsID + "getcampaignstatus");
                            if (GetCampaignStatusLink!=null){
                                GetCampaignStatusLink.addEventListener('click', function () {

                                    DisplayCampaignSentStatus(ComposeDraftID, composeView);

                                });
                            }           

                            if (!composeView.isInlineReplyForm()) {
                                var checkusagelink = document.getElementById(settingsID + "checkusage");
                                checkusagelink.addEventListener('click', function () {

                                    sdk.ButterBar.showMessage({ text: "Counting how many emails you've sent...", time: 60000 });
                                    var xmlUsage = new XMLHttpRequest();
                                    xmlUsage.open("GET", varBaseURL + "gmass/GetUser24HourCount?emailaddress=" + sdk.User.getEmailAddress());
                                    xmlUsage.send();

                                    //create authentication div and launch if user not authenticated
                                    xmlUsage.onreadystatechange = function () {
                                        if (xmlUsage.readyState == 4) {
                                            var UsageResult = JSON.parse(xmlUsage.responseText);
                                            if (sdk.User.getEmailAddress().indexOf("gmail.com") > 0 || sdk.User.getEmailAddress().indexOf("googlemail.com") > 0) {
                                                var StillAllowed = 500 - parseInt(UsageResult.GmailCount);
                                            }
                                            else {
                                                var StillAllowed = 2000 - parseInt(UsageResult.GmailCount);
                                            }
                                            if (StillAllowed < 0) {
                                                StillAllowed == 0;
                                            }
                                            sdk.ButterBar.showMessage({ html: "You've sent " + (parseInt(UsageResult.GmailCount) - 10).toString() + "-" + UsageResult.GmailCount + " total emails over the last 24 hours, and " + UsageResult.GMassCount + " with GMass. This means you can send about " + StillAllowed + " emails right now, if your account has a good reputation with Gmail. See <a style=\"color: #99FFFF\" href=\"http://blog.gmass.co/2016/08/how-many-emails-can-you-really-send-with-gmail-and-gmass.html\" target=\"_limits\">this article about sending limits</a>.", time: 10000 });
                                        }

                                    }

                                });
                            }

                            if (GMassDebug) { console.log("done adding event handling for settings box"); }
                            SettingsFormed = true;
                        }
                        //end of interval for settings box / checking if gotstate=true
                    }, 100);



                    //this is the Gmass Options Button
                    composeView.addButton({
                        title: "GMass Settings",
                        type: "SEND_ACTION",
                        orderHint: 1,
                        iconClass: (App.includes("Gmail") ? "GmailClassSettings" : "InboxClassSettings"),
                        hasDropdown: true,
                        onClick: function (event2) {

                            if (GMassDebug) { console.log("***settings arrow clicked"); }
                            //we only ever want ONE SettingsBox div to exist in the document at any one time, even with multiple compose windows open
                            if (document.getElementById(settingsID) && SettingsFormed == true && AccountStatusRetrieved == true) {
                                //document.removeChild(SettingsBox);
                                document.getElementById(settingsID).remove();
                                if (GMassDebug) { console.log("***settings div REMOVED from doc"); }
                            }

                            //this is the event handler for the dropdown being destroyed, either by clicking arrow again or clicking outside of box
                            //div is being removed from doc, but does it still exist?
                            event2.dropdown.once('destroy', () => {
                                if (GMassDebug) { console.log("***settings DESTROY called"); }
                                //console.log("destroyed!")
                                //event2.dropdown.el.removeChild(SettingsBox);
                                if (document.getElementById(settingsID) && SettingsFormed == true && AccountStatusRetrieved == true) {
                                    //document.removeChild(SettingsBox);
                                    document.getElementById(settingsID).remove();
                                    if (GMassDebug) { console.log("***settings div REMOVED from doc because of destroy"); }
                                }
                                //alert("o");
                            });

                            //don't want this to run until we know that state has been loaded or there is no state, but we need to know.
                            //CheckGotState();
                            var clickedSettings = setInterval(function CheckGotState() {

                                //don't want to display the Settings box until GotState==true, in case the settings need to be loaded if it's already a scheduled draft
                                //console.log(GotState);
                                if (SettingsFormed == true && AccountStatusRetrieved == true) {
                                    console.log("settingsformed is true and AccountStatusRetrieved is true");
                                    console.log("about to clear interval for settings box");
                                    clearInterval(clickedSettings);

                                    //<div style="margin: 5px"><span style="font-weight: bold">Unsubscribe:</span><button type="button" data-field="{Unsubscribe}" class="GMassField">Add Unsubscribe Link</button> \
                                    //<div style="margin: 5px"><span style="font-weight: bold">Click tracking:</span> ON <input type=radio name=ClickTracking value=on onClick=localStorage.setItem(\"myClickTracking\",\"on\") [CLICKON]> OFF <input type=radio name=ClickTracking value=off onClick=localStorage.setItem(\"myClickTracking\",\"off\") [CLICKOFF]></div>'

                                    //var ajaydiv = document.createElement("div");
                                    //ajaydiv.innerHTML = "<p>alkdjfkladsjfklasdjf</p>";
                                    //console.log(SettingsBox.innerHTML);

                                    //FINALLY, ADDING THE SETTINGS DIV TO THE DROPDOWN ELEMENT PROVIDED BY INBOXSDK
                                    event2.dropdown.el.appendChild(SettingsBox);
                                    if (LoadedCampaigns==false){
                                        LoadedCampaigns = true;
                                        LoadCampaigns();
                                    }
                                    






                                    /*SettingsBox.style.top = "294px";
                                    SettingsBox.style.left = "1106px";
                                    if (SettingsShow == "on") {
                                        SettingsBox.style.visibility = "hidden";
                                        SettingsShow = "off";
                                    }
                                    else if (SettingsShow == "off") {
                                        SettingsBox.style.visibility = "visible";
                                        SettingsShow = "on";
                                    }*/

                                }

                            }, 100);
                        } // closing onclick handler
                    }); //add button closing


                    function LoadCampaigns(){
                        var xmlContent = new XMLHttpRequest();
                        xmlContent.open("GET", varBaseURL + "gmass/GetCampaignsWithContent2?emailaddress=" + sdk.User.getEmailAddress() + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())), true);
                        if (GMassDebug) { console.log("about to fetch campaign data"); }
                        xmlContent.send();
                        

                        xmlContent.onreadystatechange = function () {
                            if (xmlContent.readyState == 4) {
                                if (GMassDebug) { console.log("DONE fetching campaign data"); }
                                resultCampaigns = JSON.parse(xmlContent.responseText);

                                if (resultCampaigns.success==false && resultCampaigns.reason == "BadKey"){
                                    LoadedCampaigns = false;
                                    sdk.ButterBar.showMessage({ text: "This computer needs to re-connect to your Gmail account.", time: 60000 });
                                    LaunchAuth(false, false, sdk.User.getEmailAddress(), 2); 
                                }

                            }
                        }
                        //****DONE
                    }


                    function GenerateSendURL(BackupDraftID) {
                        var d = new Date();
                        var gmassurl = "";
                        gmassurl = varBaseURL + "gmass/send?emailaddress=" + sdk.User.getEmailAddress() + "&SMTPOptionPresent=true" + "&tzo=" + d.getTimezoneOffset() + "&gu=" + (App == "oldGmail" ? encodeURIComponent(document.location.href) : "") + "&draftId=" + ComposeDraftID;
                        if (BackupDraftID != undefined) {
                            gmassurl += "&backupdraftId=" + BackupDraftID;
                        }
                        if (composeView.isInlineReplyForm()) {
                            //console.log(event.composeView.getThreadID());
                            //gmassurl = gmassurl + "&appendToThread=false&threadId=" + String(event.composeView.getThreadID());
                            gmassurl = gmassurl + "&appendToThread=false&isReply=true";
                        }
                        else if ((myNewReply == "reply")) {
                            gmassurl = gmassurl + "&appendToThread=true";
                        }

                        if ((mySendSave == "save") && (!composeView.isInlineReplyForm())) {
                            //if (mySendSave == "save"){
                            gmassurl = gmassurl + "&saveAsDraft=true";
                        }

                        if (SMTP == "on") {
                            gmassurl = gmassurl + "&UseSMTP=true";
                        }
                        else if (SMTP == "off") {
                            gmassurl = gmassurl + "&UseSMTP=false";
                        }
                        else if (SMTP == "notset") {
                            gmassurl = gmassurl + "&UseSMTP=notset";
                        }

                        if (GMassRecur == "on") {
                            gmassurl = gmassurl + "&Recur=" + GMassRecurDH;
                            gmassurl = gmassurl + "&RecurEvery=" + myRecurEvery;
                        }
                        if (myOpenTracking == "on") {
                            gmassurl = gmassurl + "&OpenTracking=true";
                        }
                        //if (myClickTracking == "on"){
                        if (myClickTracking == "on") {
                            gmassurl = gmassurl + "&ClickTracking=true";
                        }
                        if (SkipWeekends == "on") {
                            gmassurl = gmassurl + "&SkipWeekends=true";
                        }
                        if (myDelay == "on") {
                            gmassurl = gmassurl + "&Delay=true";
                        }
                        if (fastSMTP == "on") {
                            gmassurl = gmassurl + "&FastSMTP=true";
                        }

                        if (!composeView.isInlineReplyForm()){

                            gmassurl += "&ReplyTo=" + encodeURIComponent(myReplyTo);
                            gmassurl += "&FriendlyName=" + encodeURIComponent(myFriendlyName)
                            if (mySuppressionDays != "" && mySuppressionDays != "0") {
                            //need to ensure we have oauth permissions for contacts
                            //https://www.gmass.co/gmass/userhascontactspermission?emailaddress=meredithlawler@gmail.com
                                gmassurl = gmassurl + "&SuppressionDays=" + mySuppressionDays;
                            }
                            if (GMassSuppression != "") {
                                gmassurl = gmassurl + "&Suppression=" + encodeURIComponent(GMassSuppression);
                            }
                        }

                        //****auto follow up feature
                        if (GMassFirstBumpBox == "y") {
                            //if (GMassFirstBumpCustom != "0") localStorage.setItem("GMassFirstBumpAddedText", "blank");
                            gmassurl = gmassurl + "&FirstBump=y&FirstBumpDays=" + GMassFirstBumpDays + "&FirstBumpAddedText=" + encodeURIComponent(GMassFirstBumpAddedText) + "&FirstBumpCampaignID=" + GMassFirstBumpCustom + "&FirstBumpAction=" + GMassFirstBumpAction + "&FirstBumpChoice=" + GMassFirstBumpChoice;
                        }

                        if (GMassSecondBumpBox == "y") {
                            //if (GMassSecondBumpCustom != "0") localStorage.setItem("GMassSecondBumpAddedText", "blank");
                            gmassurl = gmassurl + "&SecondBump=y&SecondBumpDays=" + GMassSecondBumpDays + "&SecondBumpAddedText=" + encodeURIComponent(GMassSecondBumpAddedText) + "&SecondBumpCampaignID=" + GMassSecondBumpCustom + "&SecondBumpAction=" + GMassSecondBumpAction + "&SecondBumpChoice=" + GMassSecondBumpChoice;
                        }

                        if (GMassThirdBumpBox == "y") {
                            //if (GMassThirdBumpCustom != "0") localStorage.setItem("GMassThirdBumpAddedText", "blank");
                            gmassurl = gmassurl + "&ThirdBump=y&ThirdBumpDays=" + GMassThirdBumpDays + "&ThirdBumpAddedText=" + encodeURIComponent(GMassThirdBumpAddedText) + "&ThirdBumpCampaignID=" + GMassThirdBumpCustom + "&ThirdBumpAction=" + GMassThirdBumpAction + "&ThirdBumpChoice=" + GMassThirdBumpChoice;
                        }

                        if (GMassFourthBumpBox == "y") {
                            //if (GMassFourthBumpCustom != "0") localStorage.setItem("GMassFourthBumpAddedText", "blank");
                            gmassurl = gmassurl + "&FourthBump=y&FourthBumpDays=" + GMassFourthBumpDays + "&FourthBumpAddedText=" + encodeURIComponent(GMassFourthBumpAddedText) + "&FourthBumpCampaignID=" + GMassFourthBumpCustom + "&FourthBumpAction=" + GMassFourthBumpAction + "&FourthBumpChoice=" + GMassFourthBumpChoice;
                        }

                        if (GMassFifthBumpBox == "y") {
                            //if (GMassFifthBumpCustom != "0") localStorage.setItem("GMassFifthBumpAddedText", "blank");
                            gmassurl = gmassurl + "&FifthBump=y&FifthBumpDays=" + GMassFifthBumpDays + "&FifthBumpAddedText=" + encodeURIComponent(GMassFifthBumpAddedText) + "&FifthBumpCampaignID=" + GMassFifthBumpCustom + "&FifthBumpAction=" + GMassFifthBumpAction + "&FifthBumpChoice=" + GMassFifthBumpChoice;
                        }

                        if (GMassSixthBumpBox == "y") {
                            //if (GMassSixthBumpCustom != "0") localStorage.setItem("GMassSixthBumpAddedText", "blank");
                            gmassurl = gmassurl + "&SixthBump=y&SixthBumpDays=" + GMassSixthBumpDays + "&SixthBumpAddedText=" + encodeURIComponent(GMassSixthBumpAddedText) + "&SixthBumpCampaignID=" + GMassSixthBumpCustom + "&SixthBumpAction=" + GMassSixthBumpAction + "&SixthBumpChoice=" + GMassSixthBumpChoice;
                        }

                        if (GMassSeventhBumpBox == "y") {
                            //if (GMassSeventhBumpCustom != "0") localStorage.setItem("GMassSeventhBumpAddedText", "blank");
                            gmassurl = gmassurl + "&SeventhBump=y&SeventhBumpDays=" + GMassSeventhBumpDays + "&SeventhBumpAddedText=" + encodeURIComponent(GMassSeventhBumpAddedText) + "&SeventhBumpCampaignID=" + GMassSeventhBumpCustom + "&SeventhBumpAction=" + GMassSeventhBumpAction + "&SeventhBumpChoice=" + GMassSeventhBumpChoice;
                        }

                        if (GMassEighthBumpBox == "y") {
                            //if (GMassEighthBumpCustom != "0") localStorage.setItem("GMassEighthBumpAddedText", "blank");
                            gmassurl = gmassurl + "&EighthBump=y&EighthBumpDays=" + GMassEighthBumpDays + "&EighthBumpAddedText=" + encodeURIComponent(GMassEighthBumpAddedText) + "&EighthBumpCampaignID=" + GMassEighthBumpCustom + "&EighthBumpAction=" + GMassEighthBumpAction + "&EighthBumpChoice=" + GMassEighthBumpChoice;
                        }

                        if (GMassBumpSuppression != "") {
                            gmassurl = gmassurl + "&BumpSuppression=" + encodeURIComponent(GMassBumpSuppression);
                        }

                        //****done


                        if (myMaxEmails != "" && myMaxEmails != "max") {
                            //need to ensure we have oauth permissions for contacts
                            //https://www.gmass.co/gmass/userhascontactspermission?emailaddress=meredithlawler@gmail.com
                            gmassurl = gmassurl + "&SplitFactor=" + myMaxEmails;
                        }

                        if (GMassDateDropdown != "Now") {
                            gmassurl = gmassurl + "&futureSendDateTime=" + encodeURIComponent(GMassDateTextBox);
                        }

                        var FromContact = composeView.getFromContact();
                        /*if (GMassDebug) {
                            alert("getFromContact called and this is result\n\n" + FromContact.name + " " + FromContact.emailAddress);
                        }*/
                        gmassurl = gmassurl + "&FromName=" + encodeURIComponent(FromContact.name);

                        gmassurl = gmassurl + "&deleteDraft=true";

                        return gmassurl;
                    }
                    //main Gmass button  	
                    composeView.addButton({
                        title: "Click this GMass button instead of Send, and individual emails will be sent to each address in the To field.",
                        type: "SEND_ACTION",
                        orderHint: 0,
                        iconClass: (App.includes("Gmail") ? "GmailClass" : "InboxClass") + (SmallButton ? "Mini" : ""),
                        hasDropdown: false,
                        onClick: function (event) {

                            ClickGMassButton(event);


                        } //add button onclick closing

                    }); //add button closing

                    function ClickGMassButton(event){
                            CheckAuth(true);

                            //check for cc and bcc
                            var startTime = new Date().getTime();

                            if ((!composeView.isInlineReplyForm()) && ((composeView.getCcRecipients().length >= 1) || (composeView.getBccRecipients().length >= 1))) {
                                if (!confirm("You have specified either Cc or Bcc addresses. Are you sure this is what you want? In most cases, your email addresses should all be in the To field, NOT the Cc or Bcc fields. The GMass button sends individual, personalized email messages to each address in the To field, and if you specify a Cc/Bcc address, then that Cc/Bcc address will receive a copy of every single email sent to each address in the To field. For example, if you have 100 addresses in the To field, and 5 addresses in Cc, then each of those 5 Cc addresses will receive all 100 email messages, one for each person in the To field.\n\nIf this is what you want, click OK to send, otherwise click Cancel.")) {

                                    var endTime = new Date().getTime();

                                    if ((endTime - startTime) < 50) {
                                        sdk.ButterBar.showMessage({ html: varAlertDisabledMessage, time: 10000, className: "redbb" });
                                    }

                                    return;
                                }
                            }

                            if (!IsScheduled) {
                                //check for high number of recips
                                if (!composeView.isInlineReplyForm() && (composeView.getToRecipients().length > 25) && (mySendSave == "send")) {
                                    if (GMassDateDropdown != "Now") {
                                        if (!confirm("You are about to schedule a campaign to " + composeView.getToRecipients().length + " addresses" + (mySuppressionDays != 0 || GMassSuppression != "" ? ", minus any suppression addresses." : ".") + " Just confirming...are you sure?")) {

                                            var endTime = new Date().getTime();

                                            if ((endTime - startTime) < 50) {
                                                sdk.ButterBar.showMessage({ html: varAlertDisabledMessage, time: 10000, className: "redbb" });
                                            }
                                            return;
                                        }
                                    }
                                    else {
                                        if (!confirm("You are about to send a campaign to " + composeView.getToRecipients().length + " addresses" + (mySuppressionDays != 0 || GMassSuppression != "" ? ", minus any suppression addresses." : ".") + " Just confirming...are you sure?")) {

                                            var endTime = new Date().getTime();

                                            if ((endTime - startTime) < 50) {
                                                sdk.ButterBar.showMessage({ html: varAlertDisabledMessage, time: 10000, className: "redbb" });
                                            }

                                            return;
                                        }
                                    }
                                }

                                //check for high number of recips with alias address
                                if (!composeView.isInlineReplyForm() && (composeView.getToRecipients().length > 0)) {
                                    if ((composeView.getToRecipients()[0].emailAddress.substr(composeView.getToRecipients()[0].emailAddress.length - 8) == "gmass.co") && (composeView.getToRecipients()[0].emailAddress.indexOf("-big-") > 0)) {
                                        if (GMassDateDropdown != "Now") {
                                            if (!confirm("You are about to schedule a campaign to a large number of addresses" + (mySuppressionDays != 0 || GMassSuppression != "" ? ", minus any suppression addresses." : ".") + " Just confirming...are you sure?")) {

                                                var endTime = new Date().getTime();

                                                if ((endTime - startTime) < 50) {
                                                    sdk.ButterBar.showMessage({ html: varAlertDisabledMessage, time: 10000, className: "redbb" });
                                                }

                                                return;
                                            }

                                        }
                                        else {
                                            if (!confirm("You are about to send a campaign to a large number of addresses" + (mySuppressionDays != 0 || GMassSuppression != "" ? ", minus any suppression addresses." : ".") + " Just confirming...are you sure?")) {

                                                var endTime = new Date().getTime();

                                                if ((endTime - startTime) < 50) {
                                                    sdk.ButterBar.showMessage({ html: varAlertDisabledMessage, time: 10000, className: "redbb" });
                                                }
                                                return;
                                            }
                                        }
                                    }
                                }
                            }

                            //this client side Subject check is important, even though we're also checking for subject server-side
                            //if there's a blank subject, then it means user hasn't typed anything in there (obvi), which means that there is no guarantee that a draftId will ever be returned on gmass button press. creates odd situation where draftId is being searched, and then if you type something, suddenly it attempts to send mid-typing
                            //forcing a subject client side ensures that draftId will eventually come
                            if ((!composeView.isInlineReplyForm() && composeView.getSubject() == "") && !(composeView.getToRecipients().length > 0 && composeView.getToRecipients()[0].emailAddress.substr(composeView.getToRecipients()[0].emailAddress.length - 8) == "gmass.co")) {
                                sdk.ButterBar.showMessage({ html: "You may not leave the Subject blank when using the GMass button.", time: 10000, className: "redbb" });
                                return;
                            }

                            //auto followup validation
                            if (GMassFirstBumpBox == "y") {
                                if (!isNumeric(GMassFirstBumpDays) || Number(GMassFirstBumpDays) > 180 || Number(GMassFirstBumpDays) <= 0) {
                                    sdk.ButterBar.showMessage({ html: "Stage 1 Days must be a number between 1 and 180. Uncheck the box to cancel this Stage.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (GMassFirstBumpAction != "r" && GMassFirstBumpAction != "o" && GMassFirstBumpAction != "c" && GMassFirstBumpAction != "a") {
                                    sdk.ButterBar.showMessage({ html: "The Stage 1 Action has not been set to either Didn't Reply, Didn't Open, Didn't Click, or All", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (isNumeric(GMassFirstBumpDays) && Number(GMassFirstBumpDays) > 0) {
                                    if (GMassFirstBumpChoice == "c" && GMassFirstBumpCustom == "0") {
                                        sdk.ButterBar.showMessage({ html: "You chose to use a custom message for Stage 1, but didn't select an actual message.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                    if (GMassFirstBumpChoice == "t" && GMassFirstBumpAddedText.trim() == "") {
                                        sdk.ButterBar.showMessage({ html: "You chose follow-up text for Stage 1, but didn't specify any text.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                }
                            }

                            if (GMassSecondBumpBox == "y") {
                                if (GMassFirstBumpBox != "y") {
                                    sdk.ButterBar.showMessage({ html: "You've set a Stage 2 follow-up but you don't have a Stage 1 follow-up. You must activate the Stage 1 follow-up in order to also have a Stage 2 follow-up.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (!isNumeric(GMassSecondBumpDays) || Number(GMassSecondBumpDays) > 180 || Number(GMassSecondBumpDays) <= 0 || Number(GMassSecondBumpDays) <= Number(GMassFirstBumpDays)) {

                                    sdk.ButterBar.showMessage({ html: "Stage 2 Days must be a number between 1 and 180 and greater than Stage 1's Days. Uncheck the box to cancel this Stage.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (GMassSecondBumpAction != "r" && GMassSecondBumpAction != "o" && GMassSecondBumpAction != "c" && GMassSecondBumpAction != "a") {
                                    sdk.ButterBar.showMessage({ html: "The Stage 2 Action has not been set to either Didn't Reply, Didn't Open, Didn't Click, or All", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (isNumeric(GMassSecondBumpDays) && Number(GMassSecondBumpDays) > 0) {
                                    if (GMassSecondBumpChoice == "c" && GMassSecondBumpCustom == "0") {
                                        sdk.ButterBar.showMessage({ html: "You chose to use a custom message for Stage 2, but didn't select an actual message.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                    if (GMassSecondBumpChoice == "t" && GMassSecondBumpAddedText.trim() == "") {
                                        sdk.ButterBar.showMessage({ html: "You chose follow-up text for Stage 2, but didn't specify any text.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                }
                            }

                            if (GMassThirdBumpBox == "y") {
                                if (GMassFirstBumpBox != "y" || GMassSecondBumpBox != "y") {
                                    sdk.ButterBar.showMessage({ html: "You've set a Stage 3 follow-up but you don't have a Stage 1 and Stage 2 follow-up. You must activate both the Stage 1 and Stage 2 follow-ups in order to also have a Stage 3 follow-up.", time: 10000, className: "redbb", className: "redbb" });
                                    return;
                                }
                                if (!isNumeric(GMassThirdBumpDays) || Number(GMassThirdBumpDays) > 180 || Number(GMassThirdBumpDays) <= 0 || Number(GMassThirdBumpDays) <= Number(GMassSecondBumpDays)) {

                                    sdk.ButterBar.showMessage({ html: "Stage 3 Days must be a number between 1 and 180 and greater than Stage 2's Days. Uncheck the box to cancel this Stage.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (GMassThirdBumpAction != "r" && GMassThirdBumpAction != "o" && GMassThirdBumpAction != "c" && GMassThirdBumpAction != "a") {
                                    sdk.ButterBar.showMessage({ html: "The Stage 3 Action has not been set to either Didn't Reply, Didn't Open, Didn't Click, or All", time: 10000, className: "redbb" });
                                    return;
                                }


                                if (isNumeric(GMassThirdBumpDays) && Number(GMassThirdBumpDays) > 0) {
                                    if (GMassThirdBumpChoice == "c" && GMassThirdBumpCustom == "0") {
                                        sdk.ButterBar.showMessage({ html: "You chose to use a custom message for Stage 3, but didn't select an actual message.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                    if (GMassThirdBumpChoice == "t" && GMassThirdBumpAddedText.trim() == "") {
                                        sdk.ButterBar.showMessage({ html: "You chose follow-up text for Stage 3, but didn't specify any text.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                }
                            }

                            if (GMassFourthBumpBox == "y") {
                                if (GMassFirstBumpBox != "y" || GMassSecondBumpBox != "y" || GMassThirdBumpBox != "y") {
                                    sdk.ButterBar.showMessage({ html: "You've set a Stage 4 follow-up but you don't have a Stage 1, 2, and 3 follow-up. You must activate each of the Stage 1, 2, and 3 follow-ups in order to also have a Stage 4 follow-up.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (!isNumeric(GMassFourthBumpDays) || Number(GMassFourthBumpDays) > 180 || Number(GMassFourthBumpDays) <= 0 || Number(GMassFourthBumpDays) <= Number(GMassThirdBumpDays)) {

                                    sdk.ButterBar.showMessage({ html: "Stage 4 Days must be a number between 1 and 180 and greater than Stage 3's Days. Uncheck the box to cancel this Stage.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (GMassFourthBumpAction != "r" && GMassFourthBumpAction != "o" && GMassFourthBumpAction != "c" && GMassFourthBumpAction != "a") {
                                    sdk.ButterBar.showMessage({ html: "The Stage 4 Action has not been set to either Didn't Reply, Didn't Open, Didn't Click, or All", time: 10000, className: "redbb" });
                                    return;
                                }


                                if (isNumeric(GMassFourthBumpDays) && Number(GMassFourthBumpDays) > 0) {
                                    if (GMassFourthBumpChoice == "c" && GMassFourthBumpCustom == "0") {
                                        sdk.ButterBar.showMessage({ html: "You chose to use a custom message for Stage 4, but didn't select an actual message.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                    if (GMassFourthBumpChoice == "t" && GMassFourthBumpAddedText.trim() == "") {
                                        sdk.ButterBar.showMessage({ html: "You chose follow-up text for Stage 4, but didn't specify any text.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                }
                            }

                            if (GMassFifthBumpBox == "y") {
                                if (GMassFirstBumpBox != "y" || GMassSecondBumpBox != "y" || GMassThirdBumpBox != "y" || GMassFourthBumpBox != "y") {
                                    sdk.ButterBar.showMessage({ html: "You've set a Stage 5 follow-up but you don't have a Stage 1, 2, 3, and 4 follow-up. You must activate each of the Stage 1, 2, 3, and 4 follow-ups in order to also have a Stage 5 follow-up.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (!isNumeric(GMassFifthBumpDays) || Number(GMassFifthBumpDays) > 180 || Number(GMassFifthBumpDays) <= 0 || Number(GMassFifthBumpDays) <= Number(GMassFourthBumpDays)) {

                                    sdk.ButterBar.showMessage({ html: "Stage 5 Days must be a number between 1 and 180 and greater than Stage 4's Days. Uncheck the box to cancel this Stage.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (GMassFifthBumpAction != "r" && GMassFifthBumpAction != "o" && GMassFifthBumpAction != "c" && GMassFifthBumpAction != "a") {
                                    sdk.ButterBar.showMessage({ html: "The Stage 5 Action has not been set to either Didn't Reply, Didn't Open, Didn't Click, or All", time: 10000, className: "redbb" });
                                    return;
                                }


                                if (isNumeric(GMassFifthBumpDays) && Number(GMassFifthBumpDays) > 0) {
                                    if (GMassFifthBumpChoice == "c" && GMassFifthBumpCustom == "0") {
                                        sdk.ButterBar.showMessage({ html: "You chose to use a custom message for Stage 5, but didn't select an actual message.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                    if (GMassFifthBumpChoice == "t" && GMassFifthBumpAddedText.trim() == "") {
                                        sdk.ButterBar.showMessage({ html: "You chose follow-up text for Stage 5, but didn't specify any text.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                }
                            }

                            if (GMassSixthBumpBox == "y") {
                                if (GMassFirstBumpBox != "y" || GMassSecondBumpBox != "y" || GMassThirdBumpBox != "y" || GMassFourthBumpBox != "y" || GMassFifthBumpBox != "y") {
                                    sdk.ButterBar.showMessage({ html: "You've set a Stage 6 follow-up but you don't have a Stage 1, 2, 3, 4, and 5 follow-up. You must activate each of the Stage 1, 2, 3, 4, and 5 follow-ups in order to also have a Stage 6 follow-up.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (!isNumeric(GMassSixthBumpDays) || Number(GMassSixthBumpDays) > 180 || Number(GMassSixthBumpDays) <= 0 || Number(GMassSixthBumpDays) <= Number(GMassFifthBumpDays)) {

                                    sdk.ButterBar.showMessage({ html: "Stage 6 Days must be a number between 1 and 180 and greater than Stage 5's Days. Uncheck the box to cancel this Stage.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (GMassSixthBumpAction != "r" && GMassSixthBumpAction != "o" && GMassSixthBumpAction != "c" && GMassSixthBumpAction != "a") {
                                    sdk.ButterBar.showMessage({ html: "The Stage 6 Action has not been set to either Didn't Reply, Didn't Open, Didn't Click, or All", time: 10000, className: "redbb" });
                                    return;
                                }


                                if (isNumeric(GMassSixthBumpDays) && Number(GMassSixthBumpDays) > 0) {
                                    if (GMassSixthBumpChoice == "c" && GMassSixthBumpCustom == "0") {
                                        sdk.ButterBar.showMessage({ html: "You chose to use a custom message for Stage 6, but didn't select an actual message.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                    if (GMassSixthBumpChoice == "t" && GMassSixthBumpAddedText.trim() == "") {
                                        sdk.ButterBar.showMessage({ html: "You chose follow-up text for Stage 6, but didn't specify any text.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                }
                            }

                            if (GMassSeventhBumpBox == "y") {
                                if (GMassFirstBumpBox != "y" || GMassSecondBumpBox != "y" || GMassThirdBumpBox != "y" || GMassFourthBumpBox != "y" || GMassFifthBumpBox != "y" || GMassSixthBumpBox != "y") {
                                    sdk.ButterBar.showMessage({ html: "You've set a Stage 7 follow-up but you don't have a Stage 1, 2, 3, 4, 5, and 6 follow-up. You must activate each of the Stage 1, 2, 3, 4, 5, and 6 follow-ups in order to also have a Stage 7 follow-up.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (!isNumeric(GMassSeventhBumpDays) || Number(GMassSeventhBumpDays) > 180 || Number(GMassSeventhBumpDays) <= 0 || Number(GMassSeventhBumpDays) <= Number(GMassSixthBumpDays)) {

                                    sdk.ButterBar.showMessage({ html: "Stage 7 Days must be a number between 1 and 180 and greater than Stage 6's Days. Uncheck the box to cancel this Stage.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (GMassSeventhBumpAction != "r" && GMassSeventhBumpAction != "o" && GMassSeventhBumpAction != "c" && GMassSeventhBumpAction != "a") {
                                    sdk.ButterBar.showMessage({ html: "The Stage 7 Action has not been set to either Didn't Reply, Didn't Open, Didn't Click, or All", time: 10000, className: "redbb" });
                                    return;
                                }


                                if (isNumeric(GMassSeventhBumpDays) && Number(GMassSeventhBumpDays) > 0) {
                                    if (GMassSeventhBumpChoice == "c" && GMassSeventhBumpCustom == "0") {
                                        sdk.ButterBar.showMessage({ html: "You chose to use a custom message for Stage 7, but didn't select an actual message.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                    if (GMassSeventhBumpChoice == "t" && GMassSeventhBumpAddedText.trim() == "") {
                                        sdk.ButterBar.showMessage({ html: "You chose follow-up text for Stage 7, but didn't specify any text.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                }
                            }

                            if (GMassEighthBumpBox == "y") {
                                if (GMassFirstBumpBox != "y" || GMassSecondBumpBox != "y" || GMassThirdBumpBox != "y" || GMassFourthBumpBox != "y" || GMassFifthBumpBox != "y" || GMassSixthBumpBox != "y" || GMassSeventhBumpBox != "y") {
                                    sdk.ButterBar.showMessage({ html: "You've set a Stage 8 follow-up but you don't have a Stage 1, 2, 3, 4, 5, 6, and 7 follow-up. You must activate each of the Stage 1, 2, 3, 4, 5, 6, and 7 follow-ups in order to also have a Stage 8 follow-up.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (!isNumeric(GMassEighthBumpDays) || Number(GMassEighthBumpDays) > 180 || Number(GMassEighthBumpDays) <= 0 || Number(GMassEighthBumpDays) <= Number(GMassSeventhBumpDays)) {

                                    sdk.ButterBar.showMessage({ html: "Stage 8 Days must be a number between 1 and 180 and greater than Stage 7's Days. Uncheck the box to cancel this Stage.", time: 10000, className: "redbb" });
                                    return;
                                }
                                if (GMassEighthBumpAction != "r" && GMassEighthBumpAction != "o" && GMassEighthBumpAction != "c" && GMassEighthBumpAction != "a") {
                                    sdk.ButterBar.showMessage({ html: "The Stage 8 Action has not been set to either Didn't Reply, Didn't Open, Didn't Click, or All", time: 10000, className: "redbb" });
                                    return;
                                }


                                if (isNumeric(GMassEighthBumpDays) && Number(GMassEighthBumpDays) > 0) {
                                    if (GMassEighthBumpChoice == "c" && GMassEighthBumpCustom == "0") {
                                        sdk.ButterBar.showMessage({ html: "You chose to use a custom message for Stage 8, but didn't select an actual message.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                    if (GMassEighthBumpChoice == "t" && GMassEighthBumpAddedText.trim() == "") {
                                        sdk.ButterBar.showMessage({ html: "You chose follow-up text for Stage 8, but didn't specify any text.", time: 10000, className: "redbb" });
                                        return;
                                    }
                                }
                            }

                            //prevent sending to more than 4K
                            if ((composeView.isInlineReplyForm()) || !((composeView.getToRecipients().length > 4000) && (mySendSave == "send"))) {

                                counterMessageIDCheck = 0;

                                var xmlhttp2
                                var gmassurl

                                //var clickedGMButton = setInterval(function checkMessageID(){

                                bb = sdk.ButterBar.showMessage({ text: "Please wait for GMass...", time: 60000 });

                                var clickedGMButton = setInterval(function IsDraftIDReady() {

                                    if (ComposeDraftID != "") {

                                        clearInterval(clickedGMButton);

                                        //make sure draftId exists
                                        if (ComposeDraftID != null) {

                                            gmassurl = GenerateSendURL(ComposeDraftID);

                                            if (composeView.getToRecipients().length > 0 && composeView.getToRecipients()[0].emailAddress.substr(composeView.getToRecipients()[0].emailAddress.length - 8) == "gmass.co") {
                                                setTimeout(function () { ConnectToGMass(gmassurl); }, 3000);
                                            }
                                            else {
                                                ConnectToGMass(gmassurl);
                                            }

                                        }
                                            //the MessageID exists, but we haven't yet found the DraftID for the MessageID via AJAX
                                        else {
                                            sdk.ButterBar.showMessage({ html: "You were too fast for us! Please wait just a second and then hit the button again.\n\nIf this error persists after a few more seconds, try re-loading Gmail in Chrome. That usually fixes it.", time: 10000, className: "redbb" });
                                            bb.destroy();
                                        }

                                    }
                                    else {

                                        console.log("GM: draft id apparently not ready, trying in a sec");
                                        //could count iterations here, and if say, 10x, and still draftid not ready, then show error

                                    }
                                }, 1000);

                            } // closing check for > 2K recips
                            else {
                                sdk.ButterBar.showMessage({ html: "You can't have more than 4,000 email addresses in the To field, but you can send to more than 4,000 email addresses using the Google Sheets integration. Copy/paste your email addresses into a Google Sheets spreadsheet.", time: 10000, className: "redbb" });
                            }
                    }

                    //} //closing if for new message, not inline reply

                    function ConnectToGMass(URL) {

                        if (!URL.includes("OverridePersErrors")){
                            URL += "&OverridePersErrors=false"
                        }

                        var d = new Date();

                        xmlhttp2 = new XMLHttpRequest();

                        xmlhttp2.open("GET", URL, true);
                        xmlhttp2.send();
                        xmlhttp2.onreadystatechange = function () {
                            if (xmlhttp2.readyState == 4) {
                                //alert(xmlhttp.responseText);
                                resultHTTPApplyLabel = JSON.parse(xmlhttp2.responseText);
                                if (resultHTTPApplyLabel.success) {

                                    //a call to /send means draftid was passed, which means it's a legit call by right user
                                    if (resultHTTPApplyLabel.ExtensionKey != "n") { localStorage.setItem("GMassKey-" + sdk.User.getEmailAddress(), resultHTTPApplyLabel.ExtensionKey) }

                                    varSuccessMessage = "";
                                    if (resultHTTPApplyLabel.forcedSchedule) {

                                        if (mySendSave == "save") {
                                            varSuccessMessage = "GMass has processed your mass email, and will begin creating your Drafts in 1 minute.";

                                        }
                                        else {
                                            //BBCheckCounter = 0;
                                            varSuccessMessage = "GMass has processed your mass email, and will begin sending your emails in 1 minute.";

                                        }
                                        if (myListName != "") { varSuccessMessage = varSuccessMessage + " Your Google Contact Group named \"" + myListName + "\" will also be created momentarily. Reload Gmail to use the Contact Group."; }
                                    }
                                    else if (resultHTTPApplyLabel.scheduled) {

                                        if (mySendSave == "save") {
                                            varSuccessMessage = "GMass has scheduled your mass email, and your Drafts will be created on " + resultHTTPApplyLabel.scheduledTime + "."
                                        }
                                        else {
                                            varSuccessMessage = "GMass has scheduled your mass email, and your emails will be sent on " + resultHTTPApplyLabel.scheduledTime + ". You can alter the schedule and other settings by finding the email in your Drafts folder and clicking the GMass Settings arrow."
                                        }
                                        if (myListName != "") { varSuccessMessage = varSuccessMessage + " Your Google Contact Group named \"" + myListName + "\" will also be created at that time. Reload Gmail to use the Contact Group."; }
                                    }
                                    else {

                                        if (mySendSave == "save") {
                                            varSuccessMessage = "GMass has processed your mass email, and " + resultHTTPApplyLabel.sentCount + " Drafts are ready."
                                            //sdk.ButterBar.showMessage({text: "GMass has processed your mass email, and " + resultHTTPApplyLabel.sentCount + " Drafts are ready."});	
                                        }
                                        else {
                                            //BBCheckCounter = 0;
                                            varSuccessMessage = "GMass has processed your mass email, and " + resultHTTPApplyLabel.sentCount + " emails have been sent."
                                            //sdk.ButterBar.showMessage({text: "GMass has processed your mass email, and " + resultHTTPApplyLabel.sentCount + " emails have been sent."});	
                                        }
                                        if (myListName != "") { varSuccessMessage = varSuccessMessage + " Your Google Contact Group named \"" + myListName + "\" has also been created. Reload Gmail to use the Contact Group."; }

                                    }
                                    if (resultHTTPApplyLabel.ForceSplit) {
                                        varSuccessMessage = varSuccessMessage + " Because of it's size, this email will be sent over multiple days to prevent exceeding your account's limits. It will send at " + resultHTTPApplyLabel.SplitFactor + " emails/day.";
                                    }
                                    else if (resultHTTPApplyLabel.Split) {
                                        varSuccessMessage = varSuccessMessage + " This email will be sent over multiple days at " + resultHTTPApplyLabel.SplitFactor + " emails/day.";
                                    }
                                    if (resultHTTPApplyLabel.SetBumps) {
                                        varSuccessMessage = varSuccessMessage + " Your auto follow-up settings have also been applied to this campaign. Click the \"Follow-up Campaigns\" icon (@) next to the search bar to alter these settings.";
                                    }
                                    if (resultHTTPApplyLabel.UIMessage != "") {
                                        if (resultHTTPApplyLabel.UIMessage.includes("SMTP Success")) {
                                            localStorage.setItem("GMassSMTP", "on");
                                        }
                                        else if (resultHTTPApplyLabel.UIMessage.includes("SMTP Cleared")) {
                                            localStorage.setItem("GMassSMTP", "notset");
                                        }
                                        else {
                                            //localStorage.setItem("GMassSMTP", (resultHTTPApplyLabel.UseSMTP ? "on" : "off"));
                                            localStorage.setItem("GMassSMTP", (resultHTTPApplyLabel.UseSMTP ? "on" : (localStorage.getItem("GMassSMTP") == "notset" ? "notset" : "off")));

                                        }
                                        varSuccessMessage = resultHTTPApplyLabel.UIMessage
                                    }

                                    sdk.ButterBar.showMessage({ html: varSuccessMessage });

                                    //since we successfully sent, set localstorage to these values so that they are used on next new compose window
                                    localStorage.setItem("mySendSave", mySendSave);
                                    localStorage.setItem("myNewReply", myNewReply);
                                    localStorage.setItem("myOpenTracking", myOpenTracking);
                                    localStorage.setItem("myClickTracking", myClickTracking);
                                    localStorage.setItem("SkipWeekends", SkipWeekends);

                                    localStorage.setItem("myDelay", myDelay);
                                    localStorage.setItem("fastSMTP", fastSMTP);
                                    localStorage.setItem("myTestAddresses", myTestAddresses);
                                    localStorage.setItem("myReplyTo", myReplyTo);

                                    localStorage.setItem("GMassFirstBumpDays", GMassFirstBumpDays);
                                    localStorage.setItem("GMassFirstBumpAddedText", GMassFirstBumpAddedText);

                                    localStorage.setItem("GMassSecondBumpDays", GMassSecondBumpDays);
                                    localStorage.setItem("GMassSecondBumpAddedText", GMassSecondBumpAddedText);

                                    localStorage.setItem("GMassThirdBumpDays", GMassThirdBumpDays);
                                    localStorage.setItem("GMassThirdBumpAddedText", GMassThirdBumpAddedText);

                                    localStorage.setItem("GMassFourthBumpDays", GMassFourthBumpDays);
                                    localStorage.setItem("GMassFourthBumpAddedText", GMassFourthBumpAddedText);

                                    localStorage.setItem("GMassFifthBumpDays", GMassFifthBumpDays);
                                    localStorage.setItem("GMassFifthBumpAddedText", GMassFifthBumpAddedText);

                                    localStorage.setItem("GMassSixthBumpDays", GMassSixthBumpDays);
                                    localStorage.setItem("GMassSixthBumpAddedText", GMassSixthBumpAddedText);

                                    localStorage.setItem("GMassSeventhBumpDays", GMassSeventhBumpDays);
                                    localStorage.setItem("GMassSeventhBumpAddedText", GMassSeventhBumpAddedText);

                                    localStorage.setItem("GMassEighthBumpDays", GMassEighthBumpDays);
                                    localStorage.setItem("GMassEighthBumpAddedText", GMassEighthBumpAddedText);

                                    EverSent = true;
                                    //alert(gmassurl);
                                }

                                    //not putting in an auth=false condition here, because it will never be that we'll have a draft ID but auth=false. we need auth to get draft ID
                                else {
                                    //make the string find more specific to the issue
                                    if (resultHTTPApplyLabel.error.includes("personalization")){
                                        var r = confirm(resultHTTPApplyLabel.error);

                                        if (r){
                                            //re submit with override
                                            sdk.ButterBar.showMessage({ html: "Sounds good! Please wait for GMass...", time: 60000 });
                                            ConnectToGMass(URL.replace("OverridePersErrors=false", "OverridePersErrors=true"));
                                        }
                                        else{

                                            sdk.ButterBar.showMessage({ html: "Sending has been cancelled. If you need help understanding personalization, see our <a style=\"color: #99FFFF\" target=\"_blog\" href=\"https://www.gmass.co/blog/why-your-gmail-mail-merge-personalization-failed/\">personalization troubleshooter</a>.", time: 10000 });
                                        }
                                    }
                                    else if (resultHTTPApplyLabel.NeedsToPay){
                                        sdk.ButterBar.showMessage({ html: resultHTTPApplyLabel.error, className: "redbb" });
                                        LaunchUpgrade();
                                    }
                                    else{
                                        if (resultHTTPApplyLabel.SpecialCommand){
                                            sdk.ButterBar.showMessage({ html: "Uh oh, something went wrong. Here is the detailed error: " + resultHTTPApplyLabel.error, className: "redbb" });
                                        }
                                        else{
                                        sdk.ButterBar.showMessage({ html: "Uh oh, something went wrong while sending. Don't worry though -- just hit the GMass button again and that usually fixes it. You don't have to worry about duplicates sending. Here is the detailed error: " + resultHTTPApplyLabel.error, className: "redbb" });
                                        }
                                    }
                                }
                                if (resultHTTPApplyLabel.success && resultHTTPApplyLabel.ErrorsByRecipientString == null) {
                                    composeView.close();
                                    if (composeView.isInlineReplyForm()) { sdk.Router.goto(sdk.Router.NativeRouteIDs.INBOX); }
                                    //if (myListName != ""){location.reload(true);}
                                }
                            }
                        }
                    }

                    function UserModifiedTestAddresses() {
                        var inputbox = document.getElementById(settingsID + "TestEmailValue");
                        myTestAddresses = inputbox.value;
                        localStorage.setItem("myTestAddresses", inputbox.value);
                    }



                    function SendTestEmail(intDraftID, strTestEmails) {

                        //protection in worst case scenario
                        if (strTestEmails == "") {
                            strTestEmails = "zzz";
                        }

                        var xmlTest = new XMLHttpRequest();

                        var URLParams = "gmass/send?emailAddress=" + sdk.User.getEmailAddress() + "&draftId=" + intDraftID + "&gu=" + encodeURIComponent(document.location.href) + "&deleteDraft=false" + "&ReplyTo=" + encodeURIComponent(myReplyTo) + "&TestAddresses=" + strTestEmails.replace(" ", "");

                        if (myOpenTracking == "on") {
                            URLParams = URLParams + "&OpenTracking=true";
                        }
                        if (myClickTracking == "on") {
                            //if (ComposeLocalClickTrack == "on"){
                            URLParams = URLParams + "&ClickTracking=true";
                        }
                        if ((myNewReply == "reply")) {
                            URLParams = URLParams + "&appendToThread=true";
                        }

                        if ((SMTP == "on")) {
                            URLParams = URLParams + "&UseSMTP=true";
                        }
                        else if ((SMTP == "off")) {
                            URLParams = URLParams + "&UseSMTP=false";
                        }
                        else if ((SMTP == "notset")) {
                            URLParams = URLParams + "&UseSMTP=notset";
                        }

                        URLParams += "&SMTPOptionPresent=true";

                        var FromContact = composeView.getFromContact();
                        URLParams = URLParams + "&FromName=" + encodeURIComponent(FromContact.name);

                        xmlTest.open("GET", varBaseURL + URLParams, true);
                        //https://www.gmass.co/gmass/send?emailaddress=ajay@wordzen.com&draftId=1517768224988130210&saveAsDraft=true&deleteDraft=true
                        xmlTest.send();
                        xmlTest.onreadystatechange = function () {
                            if (xmlTest.readyState == 4) {

                                var resultHTTPApplyLabel = JSON.parse(xmlTest.responseText);

                                if ((resultHTTPApplyLabel.success) && (resultHTTPApplyLabel.sentCount > 0)) {
                                    sdk.ButterBar.showMessage({ html: resultHTTPApplyLabel.UIMessage, time: 10000 });

                                    localStorage.setItem("mySendSave", mySendSave);
                                    localStorage.setItem("GMassSMTP", (resultHTTPApplyLabel.UseSMTP ? "on" : (localStorage.getItem("GMassSMTP") == "notset" ? "notset" : "off")));
                                    localStorage.setItem("myNewReply", myNewReply);
                                    localStorage.setItem("myOpenTracking", myOpenTracking);
                                    localStorage.setItem("myClickTracking", myClickTracking);
                                    localStorage.setItem("myDelay", myDelay);
                                    localStorage.setItem("fastSMTP", fastSMTP);
                                    localStorage.setItem("myTestAddresses", myTestAddresses);
                                    localStorage.setItem("myReplyTo", myReplyTo);

                                    localStorage.setItem("GMassFirstBumpDays", GMassFirstBumpDays);
                                    localStorage.setItem("GMassFirstBumpAddedText", GMassFirstBumpAddedText);

                                    localStorage.setItem("GMassSecondBumpDays", GMassSecondBumpDays);
                                    localStorage.setItem("GMassSecondBumpAddedText", GMassSecondBumpAddedText);

                                    localStorage.setItem("GMassThirdBumpDays", GMassThirdBumpDays);
                                    localStorage.setItem("GMassThirdBumpAddedText", GMassThirdBumpAddedText);

                                    localStorage.setItem("GMassFourthBumpDays", GMassFourthBumpDays);
                                    localStorage.setItem("GMassFourthBumpAddedText", GMassFourthBumpAddedText);

                                    localStorage.setItem("GMassFifthBumpDays", GMassFifthBumpDays);
                                    localStorage.setItem("GMassFifthBumpAddedText", GMassFifthBumpAddedText);

                                    localStorage.setItem("GMassSixthBumpDays", GMassSixthBumpDays);
                                    localStorage.setItem("GMassSixthBumpAddedText", GMassSixthBumpAddedText);

                                    localStorage.setItem("GMassSeventhBumpDays", GMassSeventhBumpDays);
                                    localStorage.setItem("GMassSeventhBumpAddedText", GMassSeventhBumpAddedText);

                                    localStorage.setItem("GMassEighthBumpDays", GMassEighthBumpDays);
                                    localStorage.setItem("GMassEighthBumpAddedText", GMassEighthBumpAddedText);
                                }
                                else {
                                    if ((resultHTTPApplyLabel.sentCount == 0) && (resultHTTPApplyLabel.success)) {
                                        var SendError = resultHTTPApplyLabel.SendError;
                                        var BBMessage = "Error: Your test email to " + strTestEmails + " was NOT sent. It might be on your account's Unsubscribe or Bounce list."
                                        if (SendError != null) {
                                            BBMessage += " There was an error: " + SendError;
                                        }
                                        sdk.ButterBar.showMessage({ text: BBMessage, time: 15000, className: "redbb" });
                                    }
                                    else {
                                        sdk.ButterBar.showMessage({ text: "There was a PROBLEM sending your test email to " + strTestEmails + ": " + resultHTTPApplyLabel.error, time: 5000, className: "redbb" });
                                    }
                                }

                                //TestButton = document.getElementById(settingsID + "TestEmailButton");
                                TestButton.innerHTML = "Send Test Email";
                                TestButton.disabled = false;
                            }

                        }
                    }

                    function SpamSolver(intDraftID) {

                        if (confirm("Clicking OK will launch the Spam Solver. You'll be able to see whether your emails land in the Inbox, Spam, or Promotions folder, and then you can vary your message until you get higher Inbox placement.\n\nClick OK to watch the magic happen.")) {

                            sdk.ButterBar.showMessage({ text: "Launching the Spam Solver...", time: 30000 });

                            //get seeds
                            var xmlOuter = new XMLHttpRequest();
                            xmlOuter.open("GET", "https://www.gmass.co/inbox/seeds", true);
                            xmlOuter.send();
                            xmlOuter.onreadystatechange = function () {
                                if (xmlOuter.readyState == 4) {
                                    var resultSeedsJSON = JSON.parse(xmlOuter.responseText);

                                    //var xmlTest = new XMLHttpRequest();

                                    var URLParams = "gmass/send?SeedTest=true&emailAddress=" + sdk.User.getEmailAddress() + "&draftId=" + intDraftID + "&gu=" + encodeURIComponent(document.location.href) + "&deleteDraft=false" + "&ReplyTo=" + encodeURIComponent(myReplyTo) + "&TestAddresses=" + resultSeedsJSON.Seeds.toString();

                                    if (myOpenTracking == "on") {
                                        URLParams = URLParams + "&OpenTracking=true";
                                    }
                                    if (myClickTracking == "on") {
                                        URLParams = URLParams + "&ClickTracking=true";
                                    }

                                    if ((SMTP == "on")) {
                                        URLParams = URLParams + "&UseSMTP=true";
                                    }
                                    else if ((SMTP == "off")) {
                                        URLParams = URLParams + "&UseSMTP=false";
                                    }
                                    else if ((SMTP == "notset")) {
                                        URLParams = URLParams + "&UseSMTP=notset";
                                    }

                                    URLParams += "&SMTPOptionPresent=true";

                                    var FromContact = composeView.getFromContact();
                                    URLParams = URLParams + "&FromName=" + encodeURIComponent(FromContact.name);

                                    //launch window: gmass.co/spamsolver?url=varBaseURL + URLParams
                                    window.open("https://www.gmass.co/" + "spamsolver?url=" + encodeURIComponent(varBaseURL + URLParams));

                                    //xmlTest.open("GET", varBaseURL + URLParams, true);

                                    //xmlTest.send();

                                    localStorage.setItem("mySendSave", mySendSave);
                                    localStorage.setItem("GMassSMTP", (resultHTTPApplyLabel.UseSMTP ? "on" : (localStorage.getItem("GMassSMTP") == "notset" ? "notset" : "off")));
                                    localStorage.setItem("myNewReply", myNewReply);
                                    localStorage.setItem("myOpenTracking", myOpenTracking);
                                    localStorage.setItem("myClickTracking", myClickTracking);
                                    localStorage.setItem("myDelay", myDelay);
                                    localStorage.setItem("fastSMTP", fastSMTP);


                                }
                            }

                        }
                    }  

                    function SendToSeeds(intDraftID) {

                        if (confirm("Clicking OK will send your email to a few of our test addresses. You'll instantly be able to see whether your emails land in the Inbox, Spam, or Promotions folder across a variety of accounts. Your results will also be public for others to view, but the content of your email will remain private.\n\nClick OK to watch the magic happen.")) {

                            sdk.ButterBar.showMessage({ text: "Sending to seeds...", time: 30000 });

                            //get seeds
                            var xmlOuter = new XMLHttpRequest();
                            xmlOuter.open("GET", "https://www.gmass.co/inbox/seeds", true);
                            xmlOuter.send();
                            xmlOuter.onreadystatechange = function () {
                                if (xmlOuter.readyState == 4) {
                                    var resultSeedsJSON = JSON.parse(xmlOuter.responseText);

                                    var xmlTest = new XMLHttpRequest();

                                    var URLParams = "gmass/send?SeedTest=true&emailAddress=" + sdk.User.getEmailAddress() + "&draftId=" + intDraftID + "&gu=" + encodeURIComponent(document.location.href) + "&deleteDraft=false" + "&ReplyTo=" + encodeURIComponent(myReplyTo) + "&TestAddresses=" + resultSeedsJSON.Seeds.toString();

                                    if (myOpenTracking == "on") {
                                        URLParams = URLParams + "&OpenTracking=true";
                                    }
                                    if (myClickTracking == "on") {
                                        URLParams = URLParams + "&ClickTracking=true";
                                    }

                                    if ((SMTP == "on")) {
                                        URLParams = URLParams + "&UseSMTP=true";
                                    }
                                    else if ((SMTP == "off")) {
                                        URLParams = URLParams + "&UseSMTP=false";
                                    }
                                    else if ((SMTP == "notset")) {
                                        URLParams = URLParams + "&UseSMTP=notset";
                                    }

                                    URLParams += "&SMTPOptionPresent=true";

                                    var FromContact = composeView.getFromContact();
                                    URLParams = URLParams + "&FromName=" + encodeURIComponent(FromContact.name);

                                    xmlTest.open("GET", varBaseURL + URLParams, true);

                                    xmlTest.send();
                                    xmlTest.onreadystatechange = function () {
                                        if (xmlTest.readyState == 4) {

                                            var resultHTTPApplyLabel = JSON.parse(xmlTest.responseText);

                                            if ((resultHTTPApplyLabel.success) && (resultHTTPApplyLabel.sentCount > 0)) {
                                                sdk.ButterBar.showMessage({ html: "Your email has been sent to the seed addresses. Now go to <a style=\"color: #99FFFF\" target=\"seeds\" href=\"https://www.gmass.co/inbox?q=" + FromContact.emailAddress + "\">https://www.gmass.co/inbox</a> to see your results.", time: 30000 });

                                                localStorage.setItem("mySendSave", mySendSave);
                                                localStorage.setItem("GMassSMTP", (resultHTTPApplyLabel.UseSMTP ? "on" : (localStorage.getItem("GMassSMTP") == "notset" ? "notset" : "off")));
                                                localStorage.setItem("myNewReply", myNewReply);
                                                localStorage.setItem("myOpenTracking", myOpenTracking);
                                                localStorage.setItem("myClickTracking", myClickTracking);
                                                localStorage.setItem("myDelay", myDelay);
                                                localStorage.setItem("fastSMTP", fastSMTP);

                                            }
                                            else {
                                                if ((resultHTTPApplyLabel.sentCount == 0) && (resultHTTPApplyLabel.success)) {
                                                    var SendError = resultHTTPApplyLabel.SendError;
                                                    var BBMessage = "Error: Your seed emails were NOT sent. A seed might be on your account's Unsubscribe or Bounce list."
                                                    if (SendError != null) {
                                                        BBMessage += " There was an error: " + SendError;
                                                    }
                                                    sdk.ButterBar.showMessage({ text: BBMessage, time: 15000, className: "redbb" });
                                                }
                                                else {
                                                    sdk.ButterBar.showMessage({ text: "There was a PROBLEM sending your seed emails: " + resultHTTPApplyLabel.error, time: 5000, className: "redbb" });
                                                }
                                            }

                                        }

                                    }

                                }
                            }

                        }
                    }

                    function AnalyzeThis(intDraftID) {

                        //if (confirm("Clicking OK will send your email to a few of our test addresses. You'll instantly be able to see whether your emails land in the Inbox, Spam, or Promotions folder across a variety of accounts. Your results will also be public for others to view, but the content of your email will remain private.\n\nClick OK to watch the magic happen.")) {

                            sdk.ButterBar.showMessage({ text: "Sending your email for analysis...", time: 30000 });

                            //get seeds
                            var xmlOuter = new XMLHttpRequest();
                            xmlOuter.open("GET", "https://www.gmass.co/analyze?calledFromExtension=1", true);
                            xmlOuter.send();
                            xmlOuter.onreadystatechange = function () {
                                if (xmlOuter.readyState == 4) {
                                    var resultRandomJSON = JSON.parse(xmlOuter.responseText);

                                    var xmlTest = new XMLHttpRequest();

                                    var URLParams = "gmass/send?SeedTest=true&emailAddress=" + sdk.User.getEmailAddress() + "&draftId=" + intDraftID + "&gu=" + encodeURIComponent(document.location.href) + "&deleteDraft=false" + "&ReplyTo=" + encodeURIComponent(myReplyTo) + "&TestAddresses=" + resultRandomJSON.emailaddress.toString();

                                    if (myOpenTracking == "on") {
                                        URLParams = URLParams + "&OpenTracking=true";
                                    }
                                    if (myClickTracking == "on") {
                                        URLParams = URLParams + "&ClickTracking=true";
                                    }

                                    if ((SMTP == "on")) {
                                        URLParams = URLParams + "&UseSMTP=true";
                                    }
                                    else if ((SMTP == "off")) {
                                        URLParams = URLParams + "&UseSMTP=false";
                                    }
                                    else if ((SMTP == "notset")) {
                                        URLParams = URLParams + "&UseSMTP=notset";
                                    }

                                    URLParams += "&SMTPOptionPresent=true";

                                    var FromContact = composeView.getFromContact();
                                    URLParams = URLParams + "&FromName=" + encodeURIComponent(FromContact.name);

                                    xmlTest.open("GET", varBaseURL + URLParams, true);

                                    xmlTest.send();
                                    xmlTest.onreadystatechange = function () {
                                        if (xmlTest.readyState == 4) {

                                            var resultHTTPApplyLabel = JSON.parse(xmlTest.responseText);

                                            if ((resultHTTPApplyLabel.success) && (resultHTTPApplyLabel.sentCount > 0)) {
                                                sdk.ButterBar.showMessage({ html: "Done! Launching the results in a popup...", time: 30000 });
                                                window.open("https://www.gmass.co/analyze?emailaddress=" + encodeURIComponent(resultRandomJSON.emailaddress.toString()) + "&alreadySent=true", "analyzer", "width=1300, height=900, left=100, top=100, resizable=yes, scrollbars=yes");

                                                localStorage.setItem("mySendSave", mySendSave);
                                                localStorage.setItem("GMassSMTP", (resultHTTPApplyLabel.UseSMTP ? "on" : (localStorage.getItem("GMassSMTP") == "notset" ? "notset" : "off")));
                                                localStorage.setItem("myNewReply", myNewReply);
                                                localStorage.setItem("myOpenTracking", myOpenTracking);
                                                localStorage.setItem("myClickTracking", myClickTracking);
                                                localStorage.setItem("myDelay", myDelay);
                                                localStorage.setItem("fastSMTP", fastSMTP);

                                            }
                                            else {
                                                if ((resultHTTPApplyLabel.sentCount == 0) && (resultHTTPApplyLabel.success)) {
                                                    var SendError = resultHTTPApplyLabel.SendError;
                                                    var BBMessage = "Error: Your email could not be sent for analysis."
                                                    if (SendError != null) {
                                                        BBMessage += " There was an error: " + SendError;
                                                    }
                                                    sdk.ButterBar.showMessage({ text: BBMessage, time: 15000, className: "redbb" });
                                                }
                                                else {
                                                    sdk.ButterBar.showMessage({ text: "There was a PROBLEM analyzing your email: " + resultHTTPApplyLabel.error, time: 5000, className: "redbb" });
                                                }
                                            }

                                        }

                                    }

                                }
                            }

                        //}
                    }


                    function UserModifiedMaxEmails(TheEmail) {
                        var inputbox = document.getElementById(settingsID + "MaxEmails");
                        if ((isNaN(inputbox.value)) && (inputbox.value != "") && (inputbox.value != "max")) {
                            sdk.ButterBar.showMessage({ html: "The 'Spread Out' field needs a valid number or must be left blank.", time: 10000, className: "redbb" });
                            inputbox.value = myMaxEmails;
                            if (myMaxEmails == "max") { inputbox.style.color = "gray"; }
                        }
                        else if ((TheEmail.indexOf("gmail.com") == -1 && !isNaN(inputbox.value)) && (inputbox.value < 1 || (inputbox.value > 2000 && SMTP == "off"))) {
                            sdk.ButterBar.showMessage({ html: "When sending with Gmail, the 'Spread Out' field must be at least 1 but not more than 2000. G Suite accounts can send up to 2,000 emails per 24 hours.", time: 10000, className: "redbb" });
                            inputbox.value = myMaxEmails;
                            if (myMaxEmails == "max") { inputbox.style.color = "gray"; }
                        }
                        else if ((TheEmail.indexOf("gmail.com") > 0 && !isNaN(inputbox.value)) && (inputbox.value < 1 || (inputbox.value > 500 && SMTP == "off"))) {
                            sdk.ButterBar.showMessage({ html: "When sending with Gmail, the 'Spread Out' field must be at least 1 but not more than 500. Regular Gmail accounts can send up to 500 emails per 24 hours.", time: 10000, className: "redbb" });
                            inputbox.value = myMaxEmails;
                            if (myMaxEmails == "max") { inputbox.style.color = "gray"; }
                        }
                        else {
                            myMaxEmails = inputbox.value;
                            if (myMaxEmails == "" || myMaxEmails == "max"){
                                ScheduleStatus = ScheduleStatus.replace("|daily limit|", "");
                            }
                            else{
                                ScheduleStatus = (ScheduleStatus.includes("|daily limit|") ? ScheduleStatus : ScheduleStatus + "|daily limit|");
                            }
                        }
                    }

                    function UserModifiedRecurEvery(DropDown) {
                        var inputbox = document.getElementById(settingsID + "RecurEvery");
                        if ((isNaN(inputbox.value)) && (inputbox.value != "")) {
                            sdk.ButterBar.showMessage({ html: "The 'Repeat Every' field needs a valid number or must be left blank.", time: 10000, className: "redbb" });
                            //reverting to what it was
                            inputbox.value = myRecurEvery;
                            
                        }
                        else if (!isNaN(inputbox.value) && (inputbox.value < 1 || inputbox.value > 365)) {
                            sdk.ButterBar.showMessage({ html: "The 'Repeat Every' field needs to be a number between 1 and 365.", time: 10000, className: "redbb" });
                            //reverting to what it was
                            inputbox.value = myRecurEvery;
                        }
                        else {
                            //it's changing
                            if (inputbox.value != myRecurEvery) {
                                myRecurEvery = inputbox.value;
                                //RepeatDH
                                var i;
                                for (i = 0; i < DropDown.length; i++) {
                                    if (myRecurEvery > 1) {
                                        if (!DropDown.options[i].text.includes("s")) {
                                            DropDown.options[i].text += "s";
                                        }
                                    }
                                    else {
                                        DropDown.options[i].text = DropDown.options[i].text.replace("s", "");
                                    }
                                }
                            }
                        }
                    }

                    function UserModifiedSuppressionDays() {
                        var inputbox = document.getElementById(settingsID + "SuppressionDays");
                        if (isNaN(inputbox.value) && (inputbox.value != "")) {
                            sdk.ButterBar.showMessage({ html: "The 'Suppression by Days' field needs a valid number or must be left blank.", time: 10000, className: "redbb" });
                            inputbox.value = mySuppressionDays;
                            
                        }
                        else {
                            mySuppressionDays = inputbox.value;
                            if (!isNaN(mySuppressionDays) && mySuppressionDays > 0){
                                AdvancedStatus += "|suppression days set|";
                            }
                            else{
                                AdvancedStatus = AdvancedStatus.replace("|suppression days set|", "");
                            }
                        }
                    }

                    // Event handler for when the user selects a datetime option from the list
                    function DateTimeSelected() {
                        var option = document.getElementById(settingsID + "GMassDateDropdown").value;
                        var datetimeField = document.getElementById(settingsID + "GMassDateTime");

                        var date = new Date();
                        var clearMinSecMs = function (date) {
                            date.setMinutes(0);
                            date.setSeconds(0);
                            date.setMilliseconds(0);
                        };

                        switch (option) {
                            case 'Now':
                                GMassDateDropdown = "Now";
                                break;
                            case 'OneHour': date.setTime(date.getTime() + 1000 * 60 * 60);
                                GMassDateDropdown = "OneHour";
                                break;
                            case 'ThreeHours': date.setTime(date.getTime() + 1000 * 3 * 60 * 60);
                                GMassDateDropdown = "ThreeHours";
                                break;
                            case 'TomorrowMor': date.setTime(date.getTime() + 1000 * 60 * 60 * 24);
                                date.setHours(8);
                                clearMinSecMs(date);
                                GMassDateDropdown = "TomorrowMor";
                                break;
                            case 'TomorrowAft': date.setTime(date.getTime() + 1000 * 60 * 60 * 24);
                                date.setHours(13);
                                clearMinSecMs(date);
                                GMassDateDropdown = "TomorrowAft";
                                break;
                            case 'TomorrowEve': date.setTime(date.getTime() + 1000 * 60 * 60 * 24);
                                date.setHours(19);
                                clearMinSecMs(date);
                                GMassDateDropdown = "TomorrowEve";
                                break;
                            case 'Custom':      // Set the field to the current time so the user knows how to format it
                                GMassDateDropdown = "Custom";
                                break;
                            default:
                                // Not sure what to do here.
                                break;
                        }

                        if (option != 'Now') {
                            datetimeField.style.display = 'block';
                            //datetimeField.style.display='block';
                            datetimeField.value = FormatDate(date);
                            ScheduleStatus = (ScheduleStatus.includes("|send later|") ? ScheduleStatus : ScheduleStatus + "|send later|");
                        }
                        else {
                            //datetimeField.disabled=true;
                            datetimeField.style.display = 'none';
                            ScheduleStatus = ScheduleStatus.replace("|send later|", "");
                        }

                        GMassDateTextBox = datetimeField.value;
                    }

                    // If the user manually modifies the datetime, select the custom datetime option
                    function UserModifiedDateTime() {
                        var select = document.getElementById(settingsID + "GMassDateDropdown");
                        select.value = 'Custom';
                        var datetimeField = document.getElementById(settingsID + "GMassDateTime");
                        GMassDateDropdown = "Custom";
                        ScheduleStatus = (ScheduleStatus.includes("|send later|") ? ScheduleStatus : ScheduleStatus + "|send later|");
                        GMassDateTextBox = datetimeField.value;
                    }
                }
                //if for inbox/inline composeview	

                if (App.includes("Gmail")) {
                    //trying to modify inboxsdk styles
                    var elements = document.querySelectorAll('.inboxsdk__compose_sendButton');
                    for (var i = 0; i < elements.length; i++) {
                        //elements[i].style.removeProperty('background-color');
                        elements[i].style.backgroundColor = "transparent";
                        elements[i].style.paddingLeft = "0px";
                        elements[i].style.paddingRight = "6px";
                        elements[i].style.backgroundImage = "none";
                        elements[i].style.borderColor = "transparent";

                        if (App == "newGmail") {

                            elements[i].style.paddingRight = "0px";

                            //just for settings button
                            if (elements[i].getAttribute("aria-label") == "GMass Settings") {
                                elements[i].style.marginLeft = "0px";
                            }

                        }

                    }

                    var elements2 = document.querySelectorAll('.GmailClass');
                    for (var i = 0; i < elements2.length; i++) {


                        if (App == "newGmail") {
                            elements2[i].style.height = "36px";
                            elements2[i].style.fontSize = "14px";
                            //elements2[i].style.lineHeight = "2.7em";
                            elements2[i].style.width = "55px";
                            elements2[i].style.border = "none";
                            elements2[i].style.padding = "5px 5px 4px 5px";
                            elements2[i].style.alignItems = "center";
                            elements2[i].style.display = "inline-flex";
                            elements2[i].style.justifyContent = "center";
                            elements2[i].style.position = "relative";
                            elements2[i].style.zIndex = "0";
                            elements2[i].style.borderRadius = "4px 0px 0px 4px";
                            elements2[i].style.boxSizing = "border-box";
                            elements2[i].style.letterSpacing = ".15px";
                            elements2[i].style.fontFamily = "'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif";
                            elements2[i].style.backgroundImage = "none";
                            elements2[i].style.backgroundColor = "rgb(196, 35, 41)";
                        }
                        else {
                            elements2[i].style.height = "29px";
                            elements2[i].style.fontSize = "8pt";
                            elements2[i].style.lineHeight = "2.7em";
                        }


                    }

                    var elements3 = document.querySelectorAll('.GmailClassSettings');
                    for (var i = 0; i < elements3.length; i++) {
                        if (App == "newGmail") {
                            elements3[i].style.height = "36px";
                            elements3[i].style.borderRadius = "0px 4px 4px 0px";
                        }

                        else {
                            elements3[i].style.height = "29px";
                        }

                    }
                }
            }); //register ComposeViewHandler closing

            //sets just TO field
            function LaunchCompose(ToAddress) {
                //composeView.getDraftID().then(function(draftID) {
                //		console.log("getDraftID=" + draftID);

                sdk.Compose.openNewComposeView().then(function (composeviewobject) {
                    if (GMassDebug) { console.log("***composeview launched"); }
                    //composeviewobject.setSubject(ToAddress);
                    //if (GMassDebug) { console.log("***composeview launched, subject set"); }

                    

                    /*if (sdk.User.getEmailAddress() == "ryan@e1even.com"){
                        //composeviewobject.setSubject([ToAddress]);

                        setTimeout(function(){ 
                            composeviewobject.setToRecipients([ToAddress]);
                            composeviewobject.setSubject(ToAddress);  
                        }, 3000);
                    }
                    else{
                        composeviewobject.setToRecipients([ToAddress]);
                    }*/

                    composeviewobject.setToRecipients([ToAddress]);

                    //sdk.ButterBar.showMessage({ text: "If the To field is blank, set it to: " + ToAddress, time: 10000 });

                    if (GMassDebug) { console.log("***TO address set"); }
                });

                ComposeTagger = ToAddress;
            }

            //sets TO field and Subject and Body
            function LaunchCompose2(ToAddresses, Subject, Body) {
                //composeView.getDraftID().then(function(draftID) {
                //		console.log("getDraftID=" + draftID);

                sdk.Compose.openNewComposeView().then(function (composeviewobject) {
                    if (GMassDebug) { console.log("composeview launched"); }
                    composeviewobject.setToRecipients(ToAddresses);
                    composeviewobject.setSubject(Subject);
                    composeviewobject.setBodyHTML(Body);
                });
            }

            function include(arr, obj) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == obj) return true;
                }
            }


            function CheckAuth(buttonClicked) {

                var xmlhttpUser = new XMLHttpRequest();
                //passing in gmasskey here just to get information back as to whether it's right or not. if not right, and user did not click button (meaning fresh gmail reload), then we will ask him to re auth to fix it
                xmlhttpUser.open("GET", varBaseURL + "gmass/getuserstatus?emailaddress=" + sdk.User.getEmailAddress() + "&buttonClicked=" + buttonClicked + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())));
                xmlhttpUser.send();

                //create authentication div and launch if user not authenticated
                xmlhttpUser.onreadystatechange = function () {
                    if (xmlhttpUser.readyState == 4) {
                        UserResult = JSON.parse(xmlhttpUser.responseText);
                        EverSent = UserResult.everSent;

                        //this condition: !buttonClicked && UserResult.IsKeyValid==false
                        //is so that when gmail is reloaded (!buttonClicked version of CheckAuth) if we find that key not valid and popup under threshold, we want user to re auth
                        //don't want to do it for all checkauth, like when clicking spreadsheet button or clicking manual followup button, because hose have their own checks for valid key, so don't want two popups asking user to re auth
                        //but actually, other than on loading gmail only button presses that trigger checkauth are main gmass button, build list button, maybe one other place
                        if ((!UserResult.hasToken || !UserResult.isAuthorized || (!buttonClicked && UserResult.IsKeyValid==false)) && ((parseInt(localStorage.getItem("GMassPopup")) < 2) || buttonClicked)) {

                            //only launch this popup twice, don't want to annoy user
                            localStorage.setItem("GMassPopup", parseInt(localStorage.getItem("GMassPopup")) + 1);
                            var popuptype;
                            if ((UserResult.hasToken && UserResult.isAuthorized) && UserResult.IsKeyValid==false)
                            {
                                popuptype = 2;
                            }
                            else{
                                popuptype = 1;
                            }
                            LaunchAuth(false, false, sdk.User.getEmailAddress(), popuptype);
                        }
                        else if (UserResult.isAuthorized && !UserResult.everSent && UserResult.ExtensionLoads <= 2 && !buttonClicked)
                        {
                            console.log("extension loaded, launch sample");
                            LaunchGMassSample("reload");
                        }
                    }
                }

            }

            function CheckAuthSheets(buttonClicked) {

                var xmlhttpUser = new XMLHttpRequest();
                xmlhttpUser.open("GET", varBaseURL + "data/userhassheetspermission?emailaddress=" + sdk.User.getEmailAddress());
                xmlhttpUser.send();

                xmlhttpUser.onreadystatechange = function () {
                    if (xmlhttpUser.readyState == 4) {
                        UserResult = JSON.parse(xmlhttpUser.responseText);

                        if (!UserResult.hasSheetsPermission) {
                            //localStorage.setItem("SheetsPermission", "false");
                            if (buttonClicked) { 
                                if (UserResult.userExists){
                                    LaunchAuth(false, true, sdk.User.getEmailAddress(), 3); 
                                }
                                else{
                                    LaunchAuth(false, true, sdk.User.getEmailAddress(), 1); 
                                }
                            }
                        }
                        else {
                            //localStorage.setItem("SheetsPermission", "true");
                            if (buttonClicked) {
                                LaunchImport();
                            }
                        }

                    }
                }

            }

            function LaunchUpgrade() {

                var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
                var wTop = window.screenTop ? window.screenTop : window.screenY;

                var left = wLeft + (window.innerWidth / 2) - (1400 / 2);
                var top = wTop + (window.innerHeight / 2) - (1200 / 2);

                var UpgradeDiv = document.createElement("div");
                UpgradeDiv.style.color = "black";
                UpgradeDiv.style.width = "300px";
                UpgradeDiv.style.height = "300px";
                UpgradeDiv.style.borderColor = "black";
                UpgradeDiv.style.borderStyle = "solid";
                UpgradeDiv.style.backgroundColor = "white";
                UpgradeDiv.style.display = "none";
                UpgradeDiv.setAttribute("id", "UpgradeDiv");
                var HTMLString = "<p style=\"color: #145DC9; text-align: center\"><img width=\"228px\" src=\"https://www.gmass.co/Extension2019Images/google_sheet_2.png\">";


                HTMLString = HTMLString + "<span>Please upgrade your account <strong>(" + sdk.User.getEmailAddress() + ")</strong> because free accounts are limited to sending 50 emails per rolling 24 hours.<span>Don't worry - you can come right back here to send your campaign afterward.</span></span>";

                HTMLString = HTMLString + "<div id=UpgradeButton>Choose a plan</div></p>";
                UpgradeDiv.innerHTML = HTMLString;
                document.body.appendChild(UpgradeDiv);

                var UpgradeButtonDiv = document.getElementById("UpgradeButton");
                UpgradeButtonDiv.addEventListener("click", function () {
                    TestBPopup.close();
                    //do xmlhttp stuff
                    window.open('https://www.gmass.co/pricing?email=' + sdk.User.getEmailAddress(), 'PricingWindow', 'width=1400, height=1200, top=' + top + ', left=' + left);

                });

                UpgradeButtonDiv.style.width = "200px";
                UpgradeButtonDiv.style.textAlign = "center";
                UpgradeButtonDiv.style.color = "white";
                UpgradeButtonDiv.style.padding = "9px 5px 9px 12px";
                UpgradeButtonDiv.style.fontWeight = "bold";
                UpgradeButtonDiv.style.fontSize = "14px";
                UpgradeButtonDiv.style.borderRadius = "8px";
                UpgradeButtonDiv.style.margin = "auto";
                UpgradeButtonDiv.style.backgroundColor = "#145DC9";
                UpgradeButtonDiv.style.cursor = "pointer";

                var TestBPopup = $('#UpgradeDiv').bPopup({ opacity: 0.6, });
            }
            // LaunchUpgrade();

            //this can be outside inboxsdk designation cause not using user's email address. not anymore!
            function LaunchAuth(justContacts, justSheets, emailAddress, messagetouser) {

                var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
                var wTop = window.screenTop ? window.screenTop : window.screenY;

                var left = wLeft + (window.innerWidth / 2) - (600 / 2);
                var top = wTop + (window.innerHeight / 2) - (800 / 2);



                var para = document.createElement("div");
                para.style.color = "black";
                para.style.width = "300px";
                para.style.height = "300px";
                para.style.borderColor = "black";
                para.style.borderStyle = "solid";
                para.style.backgroundColor = "white";
                para.style.display = "none";
                para.setAttribute("id", "AuthDiv");
                var HTMLString = "<p style=\"text-align: center\"><img src=\"https://www.gmass.co/images/gmass_logo_auth.gif\">";

                if (messagetouser==1){
                    HTMLString = HTMLString + "You must connect GMass to your Google account for this to work.";
                }
                else if (messagetouser==2){
                    HTMLString = HTMLString + "This browser isn't connected to your account. Please re-connect.";
                }
                else if (messagetouser==3){
                    HTMLString = HTMLString + "Google recently made a change to how Google Sheets work, so we need to re-connect your account to your Sheets.";
                }
                
                HTMLString = HTMLString + "<div id='authbutton'><img src='https://www.gmass.co/Extension2019Images/icon_sign_up_google.png'></div></p>";
                para.innerHTML = HTMLString;
                document.body.appendChild(para);

                var elLink = document.getElementById("authbutton");

                elLink.addEventListener("click", function () {
                    AuthBPopup.close();
                    window.open('http://www.gmass.co/oauth/login?emailaddress=' + emailAddress, 'AuthWindow', 'width=600, height=800, top=' + top + ', left=' + left);
                    //var Counter = 0;
                    //localStorage.setItem("AuthCounter", 0);
                    AuthCounter = 0;

                    setTimeout(CheckAuthRepeat, 3000);
                });

                var AuthButton = document.getElementById("authbutton");
                AuthButton.style.textAlign = "center";
                /*AuthButton.style.width = "200px";
                
                AuthButton.style.color = "white";
                AuthButton.style.padding = "9px 5px 9px 12px";
                AuthButton.style.fontWeight = "bold";
                AuthButton.style.fontSize = "14px";
                AuthButton.style.borderRadius = "8px";
                AuthButton.style.margin = "auto";
                AuthButton.style.backgroundColor = "#c42329";*/
                AuthButton.style.cursor = "pointer";

                var AuthBPopup = $('#AuthDiv').bPopup({ opacity: 0.6, });

            }
            // LaunchAuth();


            //this is only triggered when user clicks button to initiate google login
            function CheckAuthRepeat() {

                        //console.log(AuthCounter);
                        
                        AuthCounter = AuthCounter + 1;
                        var xmlhttpUser = new XMLHttpRequest();
                        xmlhttpUser.open("GET", varBaseURL + "gmass/getuserstatus?emailaddress=" + sdk.User.getEmailAddress());
                        xmlhttpUser.send();

                        //create authentication div and launch if user not authenticated
                        xmlhttpUser.onreadystatechange = function () {
                            if (xmlhttpUser.readyState == 4) {
                                UserResult = JSON.parse(xmlhttpUser.responseText);

                                if ((UserResult.hasToken && UserResult.isAuthorized && UserResult.ExtensionKey != "n") || (AuthCounter >= 60)) {
                                    //console.log(AuthCounter + " got positive result from getuserstatus, so stop checking");
                                    //display butter bar
                                    if (UserResult.hasToken && UserResult.isAuthorized && UserResult.ExtensionKey != "n") {

                                        
                                        localStorage.setItem("GMassKey-" + sdk.User.getEmailAddress(), UserResult.ExtensionKey);
                                        

                                        sdk.ButterBar.showMessage({ text: "Your Gmail account and browser are now connected to GMass." });

                                        if (ShouldLaunchSample){
                                            ShouldLaunchSample = false;
                                            LaunchGMassSample("connected");

                                        }

                                    }
                                    else{

                                        sdk.ButterBar.showMessage({ text: "You waited too long to login to your Google account. Please try again by clicking any main GMass button." });
                                    }
                                    

                                }
                                else{
                                    //console.log(AuthCounter + " no positive result from getuserstatus, so about to call CheckAuthRepeat in 3 seconds");
                                    setTimeout(CheckAuthRepeat, 3000);
                                }

                            }
                        }

            }    

            function LaunchGMassSample(reason){
                var testemaildiv = document.createElement("div");
                testemaildiv.style.color = "black";
                testemaildiv.style.width = "300px";
                testemaildiv.style.height = "300px";
                testemaildiv.style.borderColor = "black";
                testemaildiv.style.borderStyle = "solid";
                testemaildiv.style.backgroundColor = "white";
                testemaildiv.style.display = "none";
                testemaildiv.setAttribute("id", "TestEmailDiv");
                var HTMLString = "<p style=\"color: green; text-align: center\"><img src=\"https://www.gmass.co/Extension2019Images/google_sheet_3.png\">";


                HTMLString = HTMLString + "<span>Nice work. You're all set!<span>Click button below to create a sample message. Then click the GMass button to send my staff a mass, personalized email.</span></span>";

                HTMLString = HTMLString + "<div id=TestEmailButton>Show me some magic!</div></p>";
                testemaildiv.innerHTML = HTMLString;
                document.body.appendChild(testemaildiv);

                var MagicButton = document.getElementById("TestEmailButton");
                MagicButton.addEventListener("click", function () {
                    TestBPopup.close();
                    //do xmlhttp stuff


                var TestMsgHTTP = new XMLHttpRequest();
                TestMsgHTTP.open("GET", varBaseURL + "gmass/GetTestMessageInfo?emailAddress=" + sdk.User.getEmailAddress() + "&reason=" + reason, true);
                TestMsgHTTP.send();
                TestMsgHTTP.onreadystatechange = function () {
                    if (TestMsgHTTP.readyState == 4) {
                        var TestMessage = JSON.parse(TestMsgHTTP.responseText);
                        LaunchCompose2(TestMessage.To, TestMessage.Subject, TestMessage.Body);
                        //LaunchCompose(TestMessage.To);
                    }

                }

                    

                });

                MagicButton.style.width = "200px";
                MagicButton.style.textAlign = "center";
                MagicButton.style.color = "white";
                MagicButton.style.padding = "9px 5px 9px 12px";
                MagicButton.style.fontWeight = "bold";
                MagicButton.style.fontSize = "14px";
                MagicButton.style.borderRadius = "8px";
                MagicButton.style.margin = "auto";
                MagicButton.style.backgroundColor = "#c42329";
                MagicButton.style.cursor = "pointer";

                var TestBPopup = $('#TestEmailDiv').bPopup({ opacity: 0.6, });
            }    
            // LaunchGMassSample("reload");

            //handles when user clicks on the Gmass Search button -- makes call to server to generate Draft
            function GenerateDraft() {

                if ((App == "Inbox" && ((document.location.href.search("search") >= 0) || (document.location.href.search("cluster") >= 0))) ||
                    ((App.includes("Gmail")) && ((document.location.href.search("#search") >= 0) ||
                        (document.location.href.search("#advanced-search") >= 0) || (document.location.href.search("#label") >= 0)))) {

                	//var searchbox = document.querySelector(QuerySelectorSearchInput);

                    if (SearchInput == null) {
                        //SearchInput = document.querySelector(QuerySelectorSearchInputNonEnglish);

                        //if (SearchInput == null){
                            NotifyMissingElement(App + " search BOX could not find QuerySelector ");
                        //}
                    }

                    if (SearchInput != null){

                    var SearchBB = sdk.ButterBar.showMessage({ text: "GMass is searching through your messages to build an email list. Please wait, this may take a minute...", time: 60000 });
                    var SearchID = Math.floor((Math.random() * 10000) + 1);
                    var BuildListIntervalCounter = 0
                    var BuildListStatusInterval = setInterval(function () {

                        var BuildListStatusXML = new XMLHttpRequest();

                        BuildListStatusXML.open("GET", varBaseURL + "gmass/generaterecipientlist2status?" + "emailaddress=" + sdk.User.getEmailAddress() + "&SearchID=" + SearchID, true);
                        BuildListStatusXML.send();
                        BuildListStatusXML.onreadystatechange = function () {
                            if (BuildListStatusXML.readyState == 4) {
                                var SearchStatusBB = sdk.ButterBar.showMessage({ text: JSON.parse(BuildListStatusXML.responseText).StatusMessage + "...", time: 5000 });
                            }

                        }
                        BuildListIntervalCounter++;
                        if (BuildListIntervalCounter == 120) {
                            clearInterval(BuildListStatusInterval);
                        }

                    }, 5000);

                    var SearchHTTP = new XMLHttpRequest();
                    //modifying user's search criteria to exclude drafts to prevent search results changing if user is using consecutively without then sending (drafts created by gmass shouldn't count unless they're sent)
                    
                    /*if (App == "Inbox") {
                        var searchbox = document.querySelector("input.gc.sp.qW");
                    }
                    else if (App == "newGmail") {
                        //var searchbox = document.querySelector(".gb_9e");
                        var searchbox = document.querySelector("input[placeholder='Search mail']");
                    }
                    else {
                        var searchbox = document.getElementsByClassName("gbqfif")[0];
                    }*/


                    //SearchHTTP.open("GET", varBaseURL + "gmass/generaterecipientlist2?" + ((App == "Inbox" || App == "newGmail") ? "CreateDraft=false&" : "") + "emailAddress=" + sdk.User.getEmailAddress() + "&searchCriteria=" + searchbox.value + " -in:drafts" + "&SearchID=" + SearchID, true);
                    SearchHTTP.open("GET", varBaseURL + "gmass/generaterecipientlist2?" + ((1 == 1) ? "CreateDraft=false&" : "") + "emailAddress=" + sdk.User.getEmailAddress() + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())) + "&searchCriteria=" + encodeURIComponent(SearchInput.value) + " -in:drafts" + "&SearchID=" + SearchID, true);
                    SearchHTTP.send();
                    SearchHTTP.onreadystatechange = function () {
                        if (SearchHTTP.readyState == 4) {
                            clearInterval(BuildListStatusInterval);
                            //alert(xmlhttp.responseText);

                            if (JSON.parse(SearchHTTP.responseText).success) {

                                LaunchCompose(JSON.parse(SearchHTTP.responseText).ToAddress);

                            }
                            else
                            {

                                if (JSON.parse(SearchHTTP.responseText).reason == "BadKey") {
                                    sdk.ButterBar.showMessage({ text: "This computer needs to re-connect to your Gmail account.", time: 60000 });
                                    LaunchAuth(false, false, sdk.User.getEmailAddress(), 2); 
                                }
                                else if (JSON.parse(SearchHTTP.responseText).reason == "Token not found") {
                                    sdk.ButterBar.showMessage({ text: "You haven't created a GMass account for " + sdk.User.getEmailAddress() + "yet.", time: 60000 });
                                    LaunchAuth(false, false, sdk.User.getEmailAddress(), 2); 
                                }
                                else{
                                    sdk.ButterBar.showMessage({ text: "There was an error, likely caused by too many email addresses being found. Please narrow your search criteria.", className: "redbb" });
                                }

                            }
                        }
                    }

                }
                else{
                	sdk.ButterBar.showMessage({ html: "GMass: Sorry, GMass couldn't determine your search query. This usually happens when Gmail changes its underlying code and breaks parts of GMass. We usually fix this type of issue within hours, and actually, we <em>may</em> have ALREADY fixed it. Please reload Gmail now using Chrome's RELOAD button, and see if the issue persists. If it does, contact us at <a style='color: #99FFFF' target='_support' href='https://www.gmass.co/g/support'>gmass.co/g/support</a>.", time: 10000 });
                }
                }
                else {
                    sdk.ButterBar.showMessage({ html: "GMass: This button builds an email list from your conversations after you've searched for something. Go ahead, search for something now and then try again!", time: 10000 });
                }
            }

            function BBFunc() {

                if (GMassSearch != null){
                    if (((App == "Inbox") && ((document.location.href.search("cluster") >= 0) || (document.location.href.search("search") >= 0))) ||
                        ((App.includes("Gmail")) && (((document.location.href.search("#search") >= 0) || (document.location.href.search("#advanced-search") >= 0) ||
                            (document.location.href.search("#label") >= 0))))) {

                        GMassSearch.style.display = "block";
                        GMassSearch.style.backgroundColor = "#c42329";
                        GMassSearch.style.backgroundImage = "url('https://www.gmass.co/images/MagnifyingGlassRedFlipped-small.png')";

                    }
                    else {

                        GMassSearch.style.display = "none";
                        GMassSearch.style.backgroundColor = "gray";
                        GMassSearch.style.backgroundImage = "url('https://www.gmass.co/images/MagnifyingGlassGrayFlipped-small.png')";

                    }
                }
            }

            function CheckNotices2() {


                if (CheckforStatuses(BBCheckCounter, EverSent)) {


                    var xmlhttpEvents = new XMLHttpRequest();
                    var StringOfOpens = "";
                    var StringOfClicks = "";
                    xmlhttpEvents.open("GET", varBaseURL + "gmass/checkbutterbar?emailaddress=" + sdk.User.getEmailAddress(), true);
                    //&setNotified=false&
                    xmlhttpEvents.send();
                    xmlhttpEvents.onreadystatechange = function () {
                        if (xmlhttpEvents.readyState == 4) {
                            //alert(xmlhttp.responseText);
                            var resultEvents = JSON.parse(xmlhttpEvents.responseText);

                            if (resultEvents.success) {

                                if (resultEvents.o) {
                                    var arrayLength = resultEvents.o.length;
                                    for (var i = 0; i < arrayLength; i++) {
                                        if (StringOfOpens.length > 0) {
                                            StringOfOpens = StringOfOpens + ", " + resultEvents.o[i]
                                        }
                                        else {
                                            StringOfOpens = resultEvents.o[i]
                                        }

                                    }
                                    if (arrayLength > 0) {
                                        StringOfOpens = StringOfOpens.replace("undefined, ", "");
                                        //sdk.ButterBar.showMessage({text: "GMass: The following people just opened an email: " + StringOfOpens, time: 6000});
                                    }
                                }

                                if (resultEvents.c) {
                                    arrayLength = resultEvents.c.length;
                                    for (var i = 0; i < arrayLength; i++) {
                                        if (StringOfClicks.length > 0) {
                                            StringOfClicks = StringOfClicks + ", " + resultEvents.c[i]
                                        }
                                        else {
                                            StringOfClicks = resultEvents.c[i]
                                        }
                                    }
                                    if (arrayLength > 0) {
                                        StringOfClicks = StringOfClicks.replace("undefined, ", "");
                                        //sdk.ButterBar.showMessage({text: "GMass: The following people just clicked an email: " + StringOfClicks, time: 6000});
                                    }
                                }


                            }

                        }

                        var BBMessage = ""

                        if (StringOfOpens.length > 0) {
                            BBMessage = "The following people just OPENED an email: " + StringOfOpens + ". "
                        }
                        if (StringOfClicks.length > 0) {
                            BBMessage = BBMessage + "The following people just CLICKED an email: " + StringOfClicks + ". "
                        }
                        if (BBMessage.length > 0) {
                            sdk.ButterBar.showMessage({ text: BBMessage + "See the \"GMass Reports\" Label for more detail.", time: 5000 });
                        }
                    }


                }

                BBCheckCounter = BBCheckCounter + 1;

            }

            function removeOptions(selectbox) {
                var i;
                for (i = selectbox.options.length - 1; i >= 0; i--) {
                    selectbox.remove(i);
                }
            }

            function LaunchImport() {

                var bbSheets = sdk.ButterBar.showMessage({ text: "Please wait for your Google Sheets spreadsheets to load.", time: 60000 });

                var xmlhttpSheets = new XMLHttpRequest();
                xmlhttpSheets.open("GET", varBaseURL + "data/GetListOfSpreadsheets?emailAddress=" + sdk.User.getEmailAddress() + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())), true);
                xmlhttpSheets.send();
                xmlhttpSheets.onreadystatechange = function () {
                    if (xmlhttpSheets.readyState == 4) {

                        bbSheets.destroy();

						var resultSheets = JSON.parse(xmlhttpSheets.responseText);
                        if (resultSheets.success) {

                        //remove the whole div to start
                        if (document.getElementById('mainsheetsdiv') != null) {
                            document.getElementById('mainsheetsdiv').remove();
                        }

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
                        MainSheetsDiv.innerHTML = "<div><div style=\"text-align: center\"><img width=\"80px\" src=\"https://www.gmass.co/Extension2019Images/google_sheet_1.png\"></div><div style=\"margin-bottom: 20px; text-align: center\">Choose a Google Sheet below. <a target=\"_blog\" href=\"https://www.gmass.co/blog/google-sheets-mail-merge/\">Learn more.</a></div><form id=\"SheetsForm\"></form></div>";

                        //adding the div to the document
                        document.body.appendChild(MainSheetsDiv);

                        var SheetsFormDiv = document.getElementById("SheetsForm");

                        //get rid of the sheets dropdown
                        if (document.getElementById('divsheets') != null) {
                            document.getElementById('divsheets').remove();
                        }
                        //if worksheets dropdown exists remove it
                        if (document.getElementById('divworksheets') != null) {
                            document.getElementById('divworksheets').remove();
                        }


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

                        var myoption;

                        

                        //going through the list of sheets and creating option for each of them
                        

                            myoption = document.createElement("option");
                            myoption.text = "";
                            myoption.value = "";
                            elSheets.add(myoption);

                            var arraySheetsLength = resultSheets.spreadsheets.length;

                            for (i = 0; i < (resultSheets.spreadsheets.length) ; i++) {

                                myoption = document.createElement("option");
                                myoption.text = resultSheets.spreadsheets[i].Title;
                                myoption.value = resultSheets.spreadsheets[i].Id;
                                myoption.setAttribute("UpdatedTime", resultSheets.spreadsheets[i].UpdatedTime);
                                elSheets.add(myoption);

                            }

                            //creating div for the worksheets
                            var divWorksheets = document.createElement("div");
                            divWorksheets.id = "divworksheets";
                            divWorksheets.innerHTML = "Worksheets: ";
                            //Worksheets div/dropdown should be hidden to begin with, until a spreadsheet is chosen
                            //divWorksheets.style.display = 'none';
                            //divWorksheets.style.padding = '3px';

                            //adding the div and select for the worksheets to the form
                            EverythingButSheetsDD.appendChild(divWorksheets);
                            //divWorksheets.appendChild(SelectWorksheets);

                            //adding the checkbox for duplicate
                            var divDupes = document.createElement("label");
                            divDupes.id = "divdupes";
                            divDupes.className = 'g_checkbox';
                            divDupes.innerHTML = "<span>Keep Duplicates:</span> ";
                            //divDupes.style.visibility = 'hidden';
                            //divDupes.style.padding = '3px';
                            divDupes.style.fontSize = '10pt';
                            var checkboxDupes = document.createElement("input");
                            checkboxDupes.type = "checkbox";
                            checkboxDupes.id = "formcheckbox";
                            if (localStorage.getItem("GMassKeepDuplicates") == "true") { checkboxDupes.checked = true; }

                            //options for filtering
                            var divFilter = document.createElement("div");
                            divFilter.id = "divfilter";
                            divFilter.innerHTML = "<span style='vertical-align:top'>Filter Rows: </span>";
                            //divFilter.style.visibility = 'hidden';
                            //divFilter.style.padding = '3px';
                            divFilter.style.fontSize = '10pt';
                            var FilterTextArea = document.createElement("textarea");
                            FilterTextArea.rows = "3";
                            FilterTextArea.cols = "35";
                            FilterTextArea.style.fontFamily = "Courier";
                            FilterTextArea.style.fontSize = "8pt";
                            FilterTextArea.style.color = "gray";
                            FilterTextArea.value = "Column1=Value1\nColumn2=Value2";
                            FilterTextArea.id = "filtertextarea";

                            FilterTextArea.addEventListener("focus", function () {
                                if (FilterTextArea.style.color == 'gray') {
                                    FilterTextArea.style.color = 'black';
                                    FilterTextArea.value = '';
                                }
                            });

                            FilterTextArea.addEventListener("blur", function () {
                                if (FilterTextArea.value == '') {
                                    FilterTextArea.style.color = 'gray';
                                    FilterTextArea.value = 'Column1=Value1\nColumn2=Value2';
                                }
                            });

                            //dropdown that shows AND or OR
                            var SelectCompare = document.createElement("select");
                            SelectCompare.id = "CompareSelect";
                            SelectCompare.style.verticalAlign = "top";
                            var CompareOption = document.createElement("option");
                            CompareOption.text = "AND";
                            CompareOption.value = "And";
                            var CompareOption2 = document.createElement("option");
                            CompareOption2.text = "OR";
                            CompareOption2.value = "Or";
                            SelectCompare.add(CompareOption);
                            SelectCompare.add(CompareOption2);

                            //help link
                            var HelpFilter = document.createElement("SPAN");
                            HelpFilter.innerHTML = "<a style='text-decoration: none; vertical-align: top;margin-left:3px' href='http://blog.gmass.co/2016/07/send-email-mail-merge-to-selected-rows-of-spreadsheet.html' target='_blog'>?</a>";
                            //HelpFilter.style.margin = "0px 0px 0px 3px";

                            //oval around options
                            var OptionsOuter = document.createElement("div");
                            OptionsOuter.id = "optionsouter";
                            OptionsOuter.style = "padding: 6px; border: 1px;border-style: solid;border-radius: 8px;border-color: #80808057;width:  450px;";


                            //optional label
                            var OptionalDiv = document.createElement("div");
                            OptionalDiv.id = "optionaldiv";
                            OptionalDiv.style.marbinBottom = "4px";
                            OptionalDiv.style.cursor = "pointer";
                            OptionalDiv.innerHTML = '<span style="color: blue;" id="OptionalSettingsExpander">+</span> <span>Optional Settings:</span>';
                            //OptionalDiv.style.fontSize = '10pt';
                            OptionalDiv.style.fontWeight = 'normal';
                            //OptionalDiv.style.visibility = 'hidden';
                            OptionalDiv.style.marginTop = "20px";                   

                            EverythingButSheetsDD.appendChild(OptionalDiv);
                            OptionsOuter.appendChild(divFilter);
                            divFilter.appendChild(FilterTextArea);
                            divFilter.appendChild(SelectCompare);
                            divFilter.appendChild(HelpFilter);

                            OptionsOuter.appendChild(divDupes);
                            EverythingButSheetsDD.appendChild(OptionsOuter);
                            
                            // divDupes.appendChild(checkboxDupes);
                            divDupes.prepend(checkboxDupes);

                            var OptionalSettingsExpanderSpan = document.getElementById("OptionalSettingsExpander");
                            if (localStorage.getItem("GMassKeepDuplicates") == "true") {
                                OptionsOuter.style.display = "block";
                                OptionalSettingsExpanderSpan.innerHTML = "-";
                            }
                            else{
                                OptionsOuter.style.display = "none";
                                OptionalSettingsExpanderSpan.innerHTML = "+";
                            }                     

                            //styling the CONNECT button
                            var SheetsConnectButton = document.createElement("div");
                            SheetsConnectButton.style.width = "300px";
                            SheetsConnectButton.style.textAlign = "center";
                            SheetsConnectButton.style.color = "white";
                            SheetsConnectButton.style.padding = "9px 5px 9px 12px";
                            SheetsConnectButton.style.fontWeight = "bold";
                            SheetsConnectButton.style.fontSize = "11px";
                            SheetsConnectButton.style.borderRadius = "8px";
                            SheetsConnectButton.style.margin = "auto";
                            SheetsConnectButton.style.backgroundColor = "gray";
                            SheetsConnectButton.style.marginTop = "20px";
                            SheetsConnectButton.style.cursor = "pointer";
                            SheetsConnectButton.innerHTML = "CONNECT TO SPREADSHEET";
                            SheetsConnectButton.id = "ConnectButton";

                            //event handler for clicking the connect button			
                            SheetsConnectButton.addEventListener("click", function () {

                                if (elSheets.value != "default" && elSheets.value != "") {

                                    SheetsConnectButton.innerHTML = "PLEASE WAIT...";

                                    var EnsureWorksheetID = setInterval(function () {



                                        if (document.getElementById('WorksheetsSelect').value != "") {

                                            clearInterval(EnsureWorksheetID);
                                            var xmlSubmitWorksheet = new XMLHttpRequest();

                                            var KeepDupes = "false";
                                            if (checkboxDupes.checked) {
                                                KeepDupes = "true";
                                                localStorage.setItem("GMassKeepDuplicates", "true");
                                            }
                                            else {
                                                localStorage.setItem("GMassKeepDuplicates", "false");
                                            }

                                            var ActualFC;
                                            if (FilterTextArea.style.color == 'gray') {
                                                ActualFC = '';
                                            }
                                            else {
                                                ActualFC = encodeURI(FilterTextArea.value);
                                            }
                                            xmlSubmitWorksheet.open("GET", varBaseURL + "gmass/GenerateRecipientListFromGoogleSheets2?" + ((1 == 1) ? "CreateDraft=false&" : "") + "emailAddress=" + sdk.User.getEmailAddress() + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())) + "&FilterCriteria=" + ActualFC + "&AndOr=" + SelectCompare.value + "&spreadsheetId=" + elSheets.value + "&worksheetId=" + document.getElementById('WorksheetsSelect').value + "&KeepDuplicates=" + KeepDupes, true);
                                            xmlSubmitWorksheet.send();
                                            xmlSubmitWorksheet.onreadystatechange = function () {

                                                if (xmlSubmitWorksheet.readyState == 4) {

                                                    if (JSON.parse(xmlSubmitWorksheet.responseText).success) {
                                                        myBPopup.close();

                                                        //if (App == "Inbox" || App == "newGmail") {
                                                        if (1 == 1) {
                                                            LaunchCompose(JSON.parse(xmlSubmitWorksheet.responseText).ToAddress);
                                                        }
                                                        else if (App == "oldGmail") {

                                                            //var draftresponse = JSON.parse(xmlSubmitWorksheet.responseText);
                                                            if (document.location.href.search("compose=") >= 0) {
                                                                document.location.href = document.location.href + "," + JSON.parse(xmlSubmitWorksheet.responseText).messageId;
                                                            }
                                                            else {

                                                                var messageId = JSON.parse(xmlSubmitWorksheet.responseText).messageId;
                                                                document.location.href = document.location.href + "?compose=" + messageId;

                                                            }

                                                        }

                                                    }
                                                    else {
                                                        var SheetsError = JSON.parse(xmlSubmitWorksheet.responseText).error;
                                                        var pos = SheetsError.indexOf(" at ");
                                                        SheetsError = SheetsError.substring(0, pos).replace("System.Exception: ", "");
                                                        sdk.ButterBar.showMessage({ html: "GMass: " + SheetsError, time: 10000, className: "redbb" });
                                                        SheetsConnectButton.innerHTML = "CONNECT TO SPREADSHEET";
                                                    }
                                                }

                                            }
                                        }
                                    }, 500);
                                }
                                else {
                                    sdk.ButterBar.showMessage({ html: "GMass: You didn't choose a spreadsheet.", time: 10000, className: "redbb" });
                                }

                            });

                            SheetsConnectButton.addEventListener("mouseover", function () {
                                if (SheetsConnectButton.style.backgroundColor != "gray"){
                                    SheetsConnectButton.style.backgroundColor = "blue";
                                }
                            });
                            SheetsConnectButton.addEventListener("mouseout", function () {
                                if (SheetsConnectButton.style.backgroundColor != "gray"){
                                    SheetsConnectButton.style.backgroundColor = "#c42329";
                                }
                            });                    

                            document.getElementById('mainsheetsdiv').appendChild(SheetsConnectButton);

                        

                        myBPopup = $('#mainsheetsdiv').bPopup({
                            opacity: 0.6,
                        });



                        $('#selectsheets').select2({
                            placeholder: "Select spreadsheet",
                            dropdownParent: $('#' + 'mainsheetsdiv'),
                            templateResult: formatSpreadsheets,
                            templateSelection: formatSpreadsheetsResult,
                            selectOnClose: true

                        });

                        if (document.getElementById("select2-selectsheets-container")){
                            document.getElementById("select2-selectsheets-container").style.fontSize = "12pt";
                            document.getElementById("select2-selectsheets-container").style.paddingLeft = "8px";
                        }
                        if (document.querySelector('[aria-labelledby="select2-selectsheets-container"]')){
                            document.querySelector('[aria-labelledby="select2-selectsheets-container"]').style.height = "50px";
                            document.querySelector('[aria-labelledby="select2-selectsheets-container"]').style.paddingTop = "15px";
                        }
                        if (document.querySelector('span[aria-labelledby="select2-selectsheets-container"]  > [role="presentation"][class="select2-selection__arrow"]')){
                            document.querySelector('span[aria-labelledby="select2-selectsheets-container"]  > [role="presentation"][class="select2-selection__arrow"]').style.paddingTop = "30px";
                        }


                        $('#selectsheets').on('change', function (e) {

                                
                                WaitingStatus.style.display = "block";
                                EverythingButSheetsDD.style.display = "none";

                                //creating select for the worksheets
                                var SelectWorksheets = document.createElement("select");
                                SelectWorksheets.id = "WorksheetsSelect";
                                SelectWorksheets.style.width = "450px"

                                //if worksheets dropdown exists remove it
                                if (divWorksheets != null) {

                                    //instead of removing it, should remove all the options inside it
                                    //document.getElementById('divworksheets').remove();
                                    removeOptions(SelectWorksheets);

                                    while (divWorksheets.hasChildNodes()) {
                                        divWorksheets.removeChild(divWorksheets.firstChild);
                                    }

                                }

                                if (elSheets.value != "default") {
                                    SheetsConnectButton.style.backgroundColor = "#c42329";

                                    var xmlhttpWorksheets = new XMLHttpRequest();
                                    xmlhttpWorksheets.open("GET", varBaseURL + "data/GetWorksheetsInSpreadsheet?emailAddress=" + sdk.User.getEmailAddress() + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())) + "&spreadsheetId=" + elSheets.value, true);
                                    xmlhttpWorksheets.send();
                                    xmlhttpWorksheets.onreadystatechange = function () {

                                        //retrieved list of worksheets, now populate dropdown
                                        if (xmlhttpWorksheets.readyState == 4) {

                                            WaitingStatus.style.display = "none";
                                            EverythingButSheetsDD.style.display = "block";
                                            //OptionsOuter.style.display = "none";

                                            var resultWorkSheets = JSON.parse(xmlhttpWorksheets.responseText);

                                            //var WSOptionDefault = document.createElement("option");
                                            //WSOptionDefault.text = "";
                                            //WSOptionDefault.value = "";
                                            //SelectWorksheets.add(WSOptionDefault);

                                            for (i = 0; i < (resultWorkSheets.worksheets.length) ; i++) {

                                                var WSOption = document.createElement("option");
                                                WSOption.text = resultWorkSheets.worksheets[i].Title;
                                                WSOption.value = resultWorkSheets.worksheets[i].Id;
                                                WSOption.setAttribute("Rows", resultWorkSheets.worksheets[i].Rows);
                                                WSOption.setAttribute("Columns", resultWorkSheets.worksheets[i].Columns);
                                                SelectWorksheets.add(WSOption);

                                            }

                                            //divWorksheets.style.visibility = 'visible';
                                            /*if (resultWorkSheets.worksheets.length == 1) {
                                                //can't refer to it by regular variable because it's not local inside this event function
                                                divWorksheets.style.display = 'none';
                                            }
                                            else {*/
                                                //can't refer to it by regular variable because it's not local inside this event function
                                                //divWorksheets.style.display = 'block';
                                            //}

                                            //OptionalDiv.style.visibility = 'visible';
                                            //divDupes.style.visibility = 'visible';
                                            //divFilter.style.visibility = 'visible';

                                            divWorksheets.appendChild(SelectWorksheets);

                                            $('#WorksheetsSelect').select2({
                                                dropdownParent: $('#' + 'mainsheetsdiv'),
                                                templateResult: formatWorksheets,
                                                templateSelection: formatWorksheetsResult,
                                                disabled: (resultWorkSheets.worksheets.length == 1 ? true : false)
                                                //placeholder: "Select worksheet",
                                                //create: false
                                            });

                                            if (document.getElementById("select2-WorksheetsSelect-container")){
                                                document.getElementById("select2-WorksheetsSelect-container").style.fontSize = "12pt";
                                                document.getElementById("select2-WorksheetsSelect-container").style.paddingLeft = "8px";
                                            }
                                            if (document.querySelector('[aria-labelledby="select2-WorksheetsSelect-container"]')){
                                                document.querySelector('[aria-labelledby="select2-WorksheetsSelect-container"]').style.height = "50px";
                                                document.querySelector('[aria-labelledby="select2-WorksheetsSelect-container"]').style.paddingTop = "15px";
                                            }
                                            if (document.querySelector('span[aria-labelledby="select2-WorksheetsSelect-container"]  > [role="presentation"][class="select2-selection__arrow"]')){
                                                document.querySelector('span[aria-labelledby="select2-WorksheetsSelect-container"]  > [role="presentation"][class="select2-selection__arrow"]').style.paddingTop = "30px";
                                            }                           


                                        }


                                    }
                                }
                                else {
                                    document.getElementById('ConnectButton').style.backgroundColor = "gray";
                                }


                        });

                        
                        $('#optionaldiv').on('click', function (e) {
                            if (OptionalSettingsExpanderSpan.innerHTML == "+"){
                                OptionsOuter.style.display = "block";
                                OptionalSettingsExpanderSpan.innerHTML = "-";
                            }
                            else if (OptionalSettingsExpanderSpan.innerHTML == "-"){
                            
                                OptionsOuter.style.display = "none";
                                OptionalSettingsExpanderSpan.innerHTML = "+";
                            }
                        });

                        }
                        else{

                        	if (resultSheets.success==false && resultSheets.reason == "BadKey"){
                        		sdk.ButterBar.showMessage({ text: "This computer needs to re-connect to your Gmail account.", time: 60000 });
                        		LaunchAuth(false, false, sdk.User.getEmailAddress(), 2); 
                        	}
                        } //if resultsSheets.success end


                    }//readystate=4 on getting sheets list

                }//event handler close for xmlhttp getting sheets list

            } // function LaunchImport close
            // LaunchImport();

            function LaunchFollowup() {

                var bbFollowup = sdk.ButterBar.showMessage({ text: "Please wait for your campaigns to load.", time: 60000 });

                var xmlhttpCampaigns = new XMLHttpRequest();
                xmlhttpCampaigns.open("GET", varBaseURL + "gmass/GetCampaigns?emailAddress=" + sdk.User.getEmailAddress() + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())), true);
                xmlhttpCampaigns.send();
                xmlhttpCampaigns.onreadystatechange = function () {
                    if (xmlhttpCampaigns.readyState == 4) {

                        var resultCampaigns = JSON.parse(xmlhttpCampaigns.responseText);
                        bbFollowup.destroy();

                        if (resultCampaigns.success){

                        //remove the whole div to start
                        if (document.getElementById('maincampaignsdiv') != null) {
                            document.getElementById('maincampaignsdiv').remove();
                        }

                        var MainCampaignsDiv = document.createElement("div");
                        MainCampaignsDiv.style.color = "black";
                        MainCampaignsDiv.style.width = "700px";
                        MainCampaignsDiv.style.borderColor = "black";
                        MainCampaignsDiv.style.padding = "8px";
                        MainCampaignsDiv.style.width = "850px";
                        MainCampaignsDiv.style.borderStyle = "solid";
                        MainCampaignsDiv.style.backgroundColor = "white";
                        MainCampaignsDiv.style.display = "none";
                        MainCampaignsDiv.setAttribute("id", "maincampaignsdiv");
                        //MainCampaignsDiv.innerHTML = "<p style=\"text-align: center\"><img src=\"http://www.gmass.co/images/gmass_logo_auth.gif\"></br>Choose a previously sent campaign below to send a follow-up campaign.</br></br>  <form id=\"CampaignForm\"></form><form id=\"FollowupForm\"><div id=ThirdBumpDiv style=\"float: right;\">Third Stage:<br><input type=text id=ThirdBumpDays><br><textarea id=ThirdBumpAddedText></textarea></div><div id=SecondBumpDiv style=\"float: right\">Second Stage:<br><input type=text id=SecondBumpDays><br><textarea id=SecondBumpAddedText></textarea></div><div id=FirstBumpDiv>First Stage:<br><input type=text id=FirstBumpDays><br><textarea id=FirstBumpAddedText></textarea></div></form></p>";

                        MainCampaignsDiv.innerHTML = "<p style=\"text-align: center\"><img width=\"305px\" src=\"https://www.gmass.co/Extension2019Images/campaign.png\"><span>Choose a past campaign to send a manual follow-up campaign.</span> <a target=\"_blog\" href=\"https://www.gmass.co/blog/new-feature-send-follow-up-mail-merge-campaigns-in-gmail/\">Learn more.</a><form id=\"CampaignForm\"></form>";



                        //adding the div to the document
                        document.body.appendChild(MainCampaignsDiv);

                        //get rid of the campaigns dropdown
                        if (document.getElementById('divcampaigns') != null) {
                            document.getElementById('divcampaigns').remove();
                        }
                        //if worksheets dropdown exists remove it
                        if (document.getElementById('divbehaviors') != null) {
                            document.getElementById('divbehaviors').remove();
                        }


                        //create the campaigns
                        var divCampaigns = document.createElement("div");
                        divCampaigns.id = "divcampaigns";
                        divCampaigns.style.marginBottom = "10px";
                        divCampaigns.innerHTML = "<span>Past Campaigns:</span>"

                        //create the behaviors SELECT
                        var elCampaigns = document.createElement("select");
                        elCampaigns.id = "selectcampaigns";
                        elCampaigns.style.width = "800px";

                        //adding the campaigns div/dropdown to the div
                        document.getElementById('CampaignForm').appendChild(divCampaigns);
                        document.getElementById('divcampaigns').appendChild(elCampaigns);
                        //****************									

                        var myoption;

                        

                        

                            myoption = document.createElement("option");
                            myoption.text = "";
                            myoption.value = "";
                            elCampaigns.add(myoption);

                            var arrayCampaignsLength = resultCampaigns.campaigns.length;

                            if (resultCampaigns.campaigns.length == 0) {
                                MainCampaignsDiv.innerHTML = "<p style=\"text-align: center; color: red;\"><img src=\"http://www.gmass.co/images/gmass_logo_auth.gif\"></br>You haven't sent any mass emails with GMass yet. Send one now, and then come back here.</br></br>  <form id=\"CampaignForm\"></form></p>";
                            }

                            for (i = 0; i < (resultCampaigns.campaigns.length) ; i++) {

                                myoption = document.createElement("option");
                                /*if (resultCampaigns.campaigns[i].campaignName == null) {
                                    myoption.text = resultCampaigns.campaigns[i].TheDate + ": " + "NO NAME AVAILABLE" + "--" + resultCampaigns.campaigns[i].Count;
                                }
                                else {*/
                                                                        /*    myoption.text = (CampaignNameFriendly == null ? "" : "[" + CampaignNameFriendly + "] ") + (CampaignNameSubject || "NO SUBJECT AVAILABLE");
                                                myoption.setAttribute("subjectName", (CampaignNameSubject || "NO SUBJECT AVAILABLE"));
                                                myoption.setAttribute("friendlyName", (CampaignNameFriendly || ""));
                                                myoption.setAttribute("theCount", resultCampaigns.campaigns[i].Count);

                                                */
                                myoption.text = (resultCampaigns.campaigns[i].friendlyName || "") + " " + (resultCampaigns.campaigns[i].campaignName || "");
                                myoption.setAttribute("subjectName", (resultCampaigns.campaigns[i].campaignName || "NO SUBJECT AVAILABLE"));
                                myoption.setAttribute("friendlyName", (resultCampaigns.campaigns[i].friendlyName || ""));
                                myoption.setAttribute("theCount", resultCampaigns.campaigns[i].Count);
                                myoption.setAttribute("theDate", resultCampaigns.campaigns[i].TheDate);
                                //}
                                //"<dt>" + resultCampaigns.campaigns[i].TheDate + "</dt><nmfrndl>" + 
                                //numberWithCommas(resultCampaigns.campaigns[i].Count)

                                if (resultCampaigns.campaigns[i].HasBumps == 1) {
                                    //myoption.style.backgroundColor = "green";
                                    //myoption.text += "<af></af>";
                                    myoption.setAttribute("af", "true");
                                }
                                else{
                                    myoption.setAttribute("af", "false");
                                }

                                myoption.value = resultCampaigns.campaigns[i].campaignID;

                                //elCampaigns.style.backgroundColor = "green";
                                //elCampaigns.style.color = "green";
                                elCampaigns.add(myoption);



                            }


                            var divBehaviors = document.createElement("div");
                            divBehaviors.id = "divbehaviors";
                            //divBehaviors.innerHTML = ""
                            //divBehaviors.style.visibility = 'hidden';



                            document.getElementById('CampaignForm').appendChild(divBehaviors);
                            //document.getElementById('divbehaviors').appendChild(SelectBehaviors);											

                            var FollowupConnectButton = document.createElement("div");
                            FollowupConnectButton.style.width = "300px";
                            FollowupConnectButton.style.textAlign = "center";
                            FollowupConnectButton.style.color = "white";
                            FollowupConnectButton.style.padding = "9px 5px 9px 12px";
                            FollowupConnectButton.style.fontWeight = "bold";
                            FollowupConnectButton.style.fontSize = "11px";
                            FollowupConnectButton.style.borderRadius = "8px";
                            FollowupConnectButton.style.margin = "auto";
                            FollowupConnectButton.style.backgroundColor = "gray";
                            FollowupConnectButton.style.cursor = "pointer";
                            FollowupConnectButton.innerHTML = "COMPOSE FOLLOW-UP";
                            FollowupConnectButton.id = "FollowupConnectButton";


                            FollowupConnectButton.addEventListener("click", function () {

                                if (elCampaigns.value != "default" && elCampaigns.value != "") {

                                    FollowupConnectButton.innerHTML = "PLEASE WAIT...";

                                    var behaviorType;
                                    if (document.getElementById('BehaviorsSelect') == null){
                                        behaviorType = "s";
                                    }
                                    else{
                                        behaviorType = document.getElementById('BehaviorsSelect').value;
                                    }

                                    var xmlSubmitBehavior = new XMLHttpRequest();
                                    //6/25/16 - changing from GenerateRecipientListBehavior to GenerateRecipientListBehavior2. not sure why i didn't do this a long time ago
                                    xmlSubmitBehavior.open("GET", varBaseURL + "gmass/GenerateRecipientListBehavior2?" + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())) + ((1 == 1) ? "&CreateDraft=false" : "") + "&emailAddress=" + sdk.User.getEmailAddress() + "&campaignId=" + elCampaigns.value + "&behaviorType=" + behaviorType, true);
                                    xmlSubmitBehavior.send();
                                    xmlSubmitBehavior.onreadystatechange = function () {

                                        if (xmlSubmitBehavior.readyState == 4) {

                                            if (JSON.parse(xmlSubmitBehavior.responseText).success) {
                                                myBPopup.close();

                                                if (1 == 1) {
                                                    LaunchCompose(JSON.parse(xmlSubmitBehavior.responseText).ToAddress);
                                                }
                                                else if (App == "oldGmail") {
                                                    //var draftresponse = JSON.parse(xmlSubmitWorksheet.responseText);
                                                    if (document.location.href.search("compose=") >= 0) {
                                                        document.location.href = document.location.href + "," + JSON.parse(xmlSubmitBehavior.responseText).messageId;
                                                    }
                                                    else {

                                                        var messageId = JSON.parse(xmlSubmitBehavior.responseText).messageId;
                                                        document.location.href = document.location.href + "?compose=" + messageId;

                                                    }
                                                }

                                            }
                                            else {
                                                var CampaignsError = JSON.parse(xmlSubmitBehavior.responseText).error;
                                                //var pos = CampaignsError.indexOf(" at ");
                                                //CampaignsError = CampaignsError.substring(0, pos).replace("System.Exception: ", "");
                                                sdk.ButterBar.showMessage({ html: "GMass: " + CampaignsError, time: 10000, className: "redbb" });
                                                FollowupConnectButton.innerHTML = "COMPOSE FOLLOW-UP";
                                            }
                                        }

                                    }

                                }
                                else {
                                    sdk.ButterBar.showMessage({ html: "GMass: You didn't choose a campaign.", time: 10000, className: "redbb" });
                                }

                            });

                            FollowupConnectButton.addEventListener("mouseover", function () {
                                if (FollowupConnectButton.style.backgroundColor != "gray"){
                                    FollowupConnectButton.style.backgroundColor = "blue";
                                }
                            });
                            FollowupConnectButton.addEventListener("mouseout", function () {
                                if (FollowupConnectButton.style.backgroundColor != "gray"){
                                    FollowupConnectButton.style.backgroundColor = "#c42329";
                                }
                            });                      


                            var Spacer = document.createElement("div");
                            Spacer.style.height = "25px";

                            document.getElementById('CampaignForm').appendChild(Spacer);
                            document.getElementById('CampaignForm').appendChild(FollowupConnectButton);

                            //**********

                        

                        myBPopup = $('#maincampaignsdiv').bPopup({
                            opacity: 0.6,
                        });


                        $('#selectcampaigns').select2({
                            placeholder: "Select campaign",
                            dropdownParent: $('#divcampaigns'),
                            templateResult: formatCampaignTextPopup,
                            templateSelection: formatCampaignTextPopupResult,
                            selectOnClose: true


                        });

                        if (document.getElementById("select2-selectcampaigns-container")){
                            document.getElementById("select2-selectcampaigns-container").style.fontSize = "12pt";
                            document.getElementById("select2-selectcampaigns-container").style.paddingLeft = "8px";
                        }
                        if (document.querySelector('[aria-labelledby="select2-selectcampaigns-container"]')){
                            document.querySelector('[aria-labelledby="select2-selectcampaigns-container"]').style.height = "50px";
                            document.querySelector('[aria-labelledby="select2-selectcampaigns-container"]').style.paddingTop = "15px";
                        }
                        if (document.querySelector('span[aria-labelledby="select2-selectcampaigns-container"]  > [role="presentation"][class="select2-selection__arrow"]')){
                            document.querySelector('span[aria-labelledby="select2-selectcampaigns-container"]  > [role="presentation"][class="select2-selection__arrow"]').style.paddingTop = "30px";  
                        }          

                        $('#selectcampaigns').on('change', function (e) {



                            var theID = "BehaviorsSelect";
                            var SelectBehaviors = document.createElement("select");
                            SelectBehaviors.id = theID;
                            SelectBehaviors.style.width = "300px";


                            //if worksheets dropdown exists remove it
                            if (divBehaviors != null) {

                                //just hide it to begin with, so user doesn't see the options being emptied out. just nicer this way
                                //document.getElementById('divbehaviors').style.visibility = 'hidden';

                                //var node = document.getElementById('divbehaviors');

                                while (divBehaviors.hasChildNodes()) {
                                    divBehaviors.removeChild(divBehaviors.firstChild);
                                }

                                divBehaviors.innerHTML = "<span style='color: blue'>Please wait...</span>";

                                /*if (document.getElementById(theID)){
                                    document.getElementById('divbehaviors').removeChild(SelectBehaviors);
                                }*/


                            }

                            if (elCampaigns.value != "default") {



                                document.getElementById('FollowupConnectButton').style.backgroundColor = "#c42329";

                                var xmlhttpBehaviors = new XMLHttpRequest();
                                xmlhttpBehaviors.open("GET", varBaseURL + "gmass/GetCampaignBehaviors?emailAddress=" + sdk.User.getEmailAddress() + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())) + "&campaignId=" + elCampaigns.value, true);
                                xmlhttpBehaviors.send();
                                xmlhttpBehaviors.onreadystatechange = function () {

                                    if (xmlhttpBehaviors.readyState == 4) {

                                        var resultBehaviors = JSON.parse(xmlhttpBehaviors.responseText);

                                        //for (i = 0; i < (resultBehaviors.behaviors.length); i++) {

                                        var BOption = document.createElement("option");
                                        BOption.text = "Sent";
                                        BOption.value = "s";
                                        BOption.setAttribute("theBehavior", "Sent");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalSent);
                                        SelectBehaviors.add(BOption);

                                        var BOption = document.createElement("option");
                                        BOption.text = "Opened";
                                        BOption.value = "o";
                                        BOption.setAttribute("theBehavior", "Opened");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalOpened);
                                        SelectBehaviors.add(BOption);

                                        var BOption = document.createElement("option");
                                        BOption.text = "Didn't Open";
                                        BOption.value = "p";
                                        BOption.setAttribute("theBehavior", "Didn't Open");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalSent - resultBehaviors.behaviors[0].TotalOpened);
                                        SelectBehaviors.add(BOption);

                                        var BOption = document.createElement("option");
                                        BOption.text = "Clicked";
                                        BOption.value = "c";
                                        BOption.setAttribute("theBehavior", "Clicked");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalClicked);
                                        SelectBehaviors.add(BOption);

                                        var BOption = document.createElement("option");
                                        BOption.text = "Didn't Click";
                                        BOption.value = "d";
                                        BOption.setAttribute("theBehavior", "Didn't Click");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalSent - resultBehaviors.behaviors[0].TotalClicked);
                                        SelectBehaviors.add(BOption);

                                        var BOption = document.createElement("option");
                                        BOption.text = "Opened but didn't click";
                                        BOption.value = "z";
                                        BOption.setAttribute("theBehavior", "Opened but didn't click");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalOpenedNoClicked);                                
                                        SelectBehaviors.add(BOption);

                                        var BOption = document.createElement("option");
                                        BOption.text = "Replied";
                                        BOption.value = "1";
                                        BOption.setAttribute("theBehavior", "Replied");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalReplies);                               
                                        SelectBehaviors.add(BOption);

                                        var BOption = document.createElement("option");
                                        BOption.text = "Didn't Reply";
                                        BOption.value = "2";
                                        BOption.setAttribute("theBehavior", "Didn't Reply");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalNoReplies);                                
                                        SelectBehaviors.add(BOption);

                                        var BOption = document.createElement("option");
                                        BOption.text = "Opened but Didn't Reply";
                                        BOption.value = "3";
                                        BOption.setAttribute("theBehavior", "Opened but Didn't Reply");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalOpenedNoReply);                                
                                        SelectBehaviors.add(BOption);

                                        var BOption = document.createElement("option");
                                        BOption.text = "Exceeded Gmail Limit";
                                        BOption.value = "l";
                                        BOption.setAttribute("theBehavior", "Exceeded Gmail Limit");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalOverLimit);                                
                                        SelectBehaviors.add(BOption);

                                        var BOption = document.createElement("option");
                                        BOption.text = "Gmail API Errors";
                                        BOption.value = "e";
                                        BOption.setAttribute("theBehavior", "Gmail API Errors");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalErrors);                                
                                        SelectBehaviors.add(BOption);

                                        var BOption = document.createElement("option");
                                        BOption.text = "Blocks";
                                        BOption.value = "b";
                                        BOption.setAttribute("theBehavior", "Blocks");
                                        BOption.setAttribute("theCount", resultBehaviors.behaviors[0].TotalBlocks);                                
                                        SelectBehaviors.add(BOption);

                                        //if (document.getElementById(theID) == null){
                                        divBehaviors.innerHTML = "";
                                        divBehaviors.appendChild(SelectBehaviors);
                                        //}                                         

                                        //document.getElementById('divbehaviors').style.visibility = 'visible';

                                        $('#' + theID).select2({
                                            dropdownParent: $('#divcampaigns'),
                                            placeholder: "Select behavior",
                                            templateResult: formatCampaignBehaviors,
                                            templateSelection: formatCampaignBehaviorsResult,
                                            selectOnClose: true
                                        });

                                        if (document.getElementById("select2-BehaviorsSelect-container")){
                                            document.getElementById("select2-BehaviorsSelect-container").style.fontSize = "12pt";
                                            document.getElementById("select2-BehaviorsSelect-container").style.paddingLeft = "8px";
                                        }
                                        if (document.querySelector('[aria-labelledby="select2-BehaviorsSelect-container"]')){
                                            document.querySelector('[aria-labelledby="select2-BehaviorsSelect-container"]').style.height = "50px";
                                            document.querySelector('[aria-labelledby="select2-BehaviorsSelect-container"]').style.paddingTop = "15px";
                                        }
                                        if (document.querySelector('span[aria-labelledby="select2-BehaviorsSelect-container"]  > [role="presentation"][class="select2-selection__arrow"]')){
                                            document.querySelector('span[aria-labelledby="select2-BehaviorsSelect-container"]  > [role="presentation"][class="select2-selection__arrow"]').style.paddingTop = "30px";
                                        }                          

                                        //}

                                        /*if (resultWorkSheets.worksheets.length==1){
                                            //can't refer to it by regular variable because it's not local inside this event function
                                            document.getElementById('divworksheets').style.visibility = 'hidden';
                                        }
                                        else
                                        {
                                            //can't refer to it by regular variable because it's not local inside this event function
                                            document.getElementById('divworksheets').style.visibility = 'visible';
                                        }*/


                                    }


                                }
                            }

                            else {
                                document.getElementById('FollowupConnectButton').style.backgroundColor = "gray";
                            }

                            


                        });

                        } //if resultsSheets.success end
                        else{
                            //probably bad key
                                if (resultCampaigns.success==false && resultCampaigns.reason == "BadKey"){
                                sdk.ButterBar.showMessage({ text: "This computer needs to re-connect to your Gmail account.", time: 60000 });
                                LaunchAuth(false, false, sdk.User.getEmailAddress(), 2); 
                            }

                        }           

                    }//readystate=4 on getting sheets list

                }//event handler close for xmlhttp getting sheets list

            } // function LaunchImport close


            /*function NotifyMissingElement(MissingInfo) {
                var xmlNotify = new XMLHttpRequest();
                xmlNotify.open("GET", varBaseURL + "gmass/NotifyMissingElement?emailaddress=" + sdk.User.getEmailAddress() + "&info=" + MissingInfo + "&url=" + encodeURIComponent(window.location.href), true);
                xmlNotify.send();

                xmlNotify.onreadystatechange = function () {
                    if (xmlNotify.readyState == 4) {

                        if (JSON.parse(xmlNotify.responseText).success) {
                            //email was sent
                        };

                    }
                }
            }*/

            function NotifyMissingElement(MissingInfo) {

                if ( !(window.location.href.includes("view=btop")) && !(window.location.href.includes("view=pt")) && !(window.location.href.includes("view=cm")) && !(window.location.href.includes("view=lg")) ) {

                    //if it's not bigger than 200K, then it's not a full gmail page, it's some alternate view
                    if (document.documentElement.innerHTML.length > 200000){

                        var xmlNotify = new XMLHttpRequest();
                        xmlNotify.open("POST", varBaseURL + "gmass/NotifyMissingElement?emailaddress=" + sdk.User.getEmailAddress() + "&info=" + MissingInfo + "&url=" + encodeURIComponent(window.location.href) + "&version=" + JSVersion, true);
                        xmlNotify.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xmlNotify.send("dom=" + encodeURIComponent(document.documentElement.innerHTML));

                        xmlNotify.onreadystatechange = function () {
                            if (xmlNotify.readyState == 4) {

                                if (JSON.parse(xmlNotify.responseText).success) {
                                    //email was sent
                                };

                            }
                        }
                    }
                }
            }

            function DisplayCampaignSentStatus(ComposeDraftID, composeView){
                var xmlDraftSentStatus = new XMLHttpRequest();
                xmlDraftSentStatus.open("GET", varBaseURL + "gmass/GetDraftSentStatus?draftId=" + ComposeDraftID, true);
                xmlDraftSentStatus.send();

                sdk.ButterBar.showMessage({ text: "Retrieving the status of this email campaign...", time: 25000 });

                xmlDraftSentStatus.onreadystatechange = function () {
                    if (xmlDraftSentStatus.readyState == 4) {

                        varDraftSentState = JSON.parse(xmlDraftSentStatus.responseText);

                        //IsProcessing = varDraftSentState.Processing;
                        //IsPaused = varDraftSentState.Paused;
                        //sdk.ButterBar.showMessage({text: "This campaign has sent " + varDraftSentState.SentCount + " emails so far. It has been processed " + varDraftSentState.TimesProcessed + " time(s). It will send next at " + varDraftSentState.NextSend + " GMT time. Please convert to your local time zone.", time: 25000});
                        
                        if (ComposeFirstAddressAlias(composeView)){
                            sdk.ButterBar.showMessage({ messageKey: "aliasmessage", html: varDraftSentState.StatusMessage + "<br><br>The TO field is set to: " + composeView.getToRecipients()[0].emailAddress + " and represents your list, but you can also see the individual addresses if you like:", time: 10000, buttons: [{title: "Expand address", onClick:function()
                                {
                                    ExpandToAddress(composeView);

                                } 
                            },
                            {title: "Download addresses", onClick:function()
                                {
                                    DownloadToAddress(composeView);
                                } 
                            }
                            ]});
                        }
                        else
                        {

                            sdk.ButterBar.showMessage({ messageKey: "aliasmessage", html: varDraftSentState.StatusMessage, time: 10000 });
                        }


                    }
                }
            }

            function ExpandToAddress(composeView){

                if (AliasSize(composeView.getToRecipients()[0].emailAddress) < 2000){
                    sdk.ButterBar.showMessage({ messageKey: "aliasmessage", text: "Expanding the email address list in the TO field...", time: 20000 });
                    var xmlhttpSearch = new XMLHttpRequest();

                    xmlhttpSearch.open("GET", varBaseURL + "gmass/fetchemailaddresses?alias=" + composeView.getToRecipients()[0].emailAddress + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())), true);
                    xmlhttpSearch.send();
                    xmlhttpSearch.onreadystatechange = function () {
                        if (xmlhttpSearch.readyState == 4) {
                            var SearchResults = JSON.parse(xmlhttpSearch.responseText);
                            if (SearchResults.success) {

                                composeView.setToRecipients(SearchResults.addresses);
                                sdk.ButterBar.showMessage({ messageKey: "aliasmessage", text: "Done!", time: 20000 });

                            }
                            else{
                                if (SearchResults.reason = "BadKey"){
                                //likely bad extension key. only consequence here will be to tell them we couldn't expand the alias. if they're about to send anyway, that will set extension key and correct it for next time
                                    sdk.ButterBar.showMessage({ messageKey: "aliasmessage", text: "We couldn't expand your alias address into the actual recipient addresses in the Compose box, but that's okay -- it will still work. You just can't see the actual addresses for now.", time: 25000 });
                                }
                            }
                        }
                    }
                }
                else{
                    sdk.ButterBar.showMessage({ messageKey: "aliasmessage", text: "Sorry, you can't expand this alias address into the individual addresses, because there are more than 2,000 individual addresses and that would 'freeze' the Gmail Compose window.", time: 20000 });
                }
            }

            function DownloadToAddress(composeView){

                var ToList = composeView.getToRecipients();
                var FinalList = [""];
                //var myStringArray = ["Hello","World"];
                var arrayLength = ToList.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (ToList[i].emailAddress.toLowerCase() != "download@gmass.co"){
                        FinalList.push(ToList[i].emailAddress);
                    }
                    //Do something
                }
                composeView.setToRecipients(FinalList);
                

                /*var downloadUrl = varBaseURL + "gmass/downloadaddresslist?alias=" + composeView.getToRecipients()[0].emailAddress + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress()));

                var downloading = chrome.downloads.download({
                  url : downloadUrl,
                  //filename : 'my-image-again.png',
                  conflictAction : 'uniquify'
                });*/

                //at some point make this slicker, so the download happens in gmail tab, not a new tab
                window.open(varBaseURL + "gmass/downloadaddresslist?alias=" + composeView.getToRecipients()[0].emailAddress + "&GMassKey=" + encodeURIComponent(localStorage.getItem("GMassKey-" + sdk.User.getEmailAddress())));
                    
            }

            function AliasSize(aliasaddress){
                //to cast as a string
                aliasaddress = aliasaddress + "";
                return aliasaddress.substr(0, aliasaddress.indexOf("-recipients"));
            }

            function ComposeFirstAddressAlias(composeView){
                if (composeView.getToRecipients().length > 0 && composeView.getToRecipients()[0].emailAddress.includes("recipients") && composeView.getToRecipients()[0].emailAddress.substr(composeView.getToRecipients()[0].emailAddress.length - 8) == "gmass.co"){
                    return true;
                }
                else{
                    return false;
                }
            }

        }
        
        catch(err) {

            ErrorHandler(err.message);

        }

        }) //inbox sdk closing
    




    }; //window onload closing







//********************START OF SECTION OUTSIDE WINDOW ONLOAD AND INBOX SDK

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function CheckforStatuses(Counter, everSent) {

    //never sent anything, don't even bother
    if (everSent == false) {
        return false;
    }
        //under 8 minutes
    else if (Counter < 100) {
        return true;
    }
        //8 minutes to 16 minutes
    else if ((Counter >= 100 && Counter < 200) && (Counter % 2 == 0)) {
        return true;
    }
        //16 minutes to 24 minutes
    else if ((Counter >= 200 && Counter < 300) && (Counter % 3 == 0)) {
        return true;
    }
    else if ((Counter >= 300 && Counter < 400) && (Counter % 4 == 0)) {
        return true;
    }
    else if ((Counter >= 400 && Counter < 500) && (Counter % 5 == 0)) {
        return true;
    }
    else if ((Counter >= 500 && Counter < 600) && (Counter % 6 == 0)) {
        return true;
    }
    else if ((Counter >= 600 && Counter < 700) && (Counter % 7 == 0)) {
        return true;
    }
    else if ((Counter >= 700 && Counter < 800) && (Counter % 8 == 0)) {
        return true;
    }
    else if ((Counter >= 800 && Counter < 900) && (Counter % 9 == 0)) {
        return true;
    }
    else if ((Counter >= 900 && Counter < 1000) && (Counter % 10 == 0)) {
        return true;
    }
    else if ((Counter >= 1000 && Counter < 1100) && (Counter % 11 == 0)) {
        return true;
    }
    else if ((Counter >= 1100) && (Counter % 12 == 0)) {
        return true;
    }
    else {
        return false;
    }

}





// Formats a date to look how we expect it
function FormatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = "am";

    var timeZoneOffset = date.getTimezoneOffset();
    var timeZoneOffsetSign = '-';
    // i think this was a long-standing bug, wrong variable being set, AND + sign not being URL encoded, which is why positive offsets failed validation
    // if(timeZoneOffset < 0) timeZoneOffset = '+';
    if (timeZoneOffset < 0) timeZoneOffsetSign = '+';
    timeZoneOffset = Math.abs(timeZoneOffset);
    var timeZoneOffsetHours = Math.floor(timeZoneOffset / 60);
    var timeZoneOffsetMins = timeZoneOffset - (60 * timeZoneOffsetHours);

    // Handle padding/formatting of individual pieces
    var pad = function (num) {
        if (num < 10) return "0" + num;
        return num;
    }
    month = pad(month);
    day = pad(day);
    if (hours >= 12) ampm = "pm";
    hours = pad(hours % 12);
    minutes = pad(minutes);
    timeZoneOffsetHours = pad(timeZoneOffsetHours);
    timeZoneOffsetMins = pad(timeZoneOffsetMins);

    // MM/DD/YYYY HH:mmA Z
    return "" + month + "/" + day + "/" + year + " " + hours + ":" + minutes + ampm + " " + timeZoneOffsetSign + timeZoneOffsetHours + ":" + timeZoneOffsetMins;
}


function InsertField(button, composeView) {
    var fieldName = button.getAttribute('data-field');
    composeView.insertTextIntoBodyAtCursor(fieldName);
}

function InsertFiInsertFieldDD(persfield, composeView) {
    //var fieldName = button.getAttribute('data-field');
    composeView.insertTextIntoBodyAtCursor(persfield);
}

function InsertFieldUnsub(button, composeView) {
    var fieldName = button.getAttribute('data-field');
    composeView.insertHTMLIntoBodyAtCursor('You may <a href="https://www.gmass.co/gmass/u?u=OUTBOUND">unsubscribe</a> to stop receiving our emails.');
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    
    return (false)
}
function StylizeOvals(status){
    var returnOvals = status;
    //<span style="color: white; background: gray; border-radius: 5px; border: 2px solid gray;">send as replies</span>
    //first char is |
    if (status.substring(0, 1) == "|"){
        returnOvals = '<span style="margin-left: 3px; color: white; background: gray; border-radius: 5px; border: 2px solid gray;">' + status.substring(1);
    }
    //last char is |
    if (status.substring(status.length - 1) == "|"){
        returnOvals = returnOvals.substring(0, returnOvals.length - 1) + '</span>';
    }
    //normal javascript replace only replaces first occurrence. to replace all occurences, you have to do a "global" regex replacement
    returnOvals = returnOvals.replace(/\|\|/g, '</span><span style="margin-left: 3px; color: white; background: gray; border-radius: 5px; border: 2px solid gray;">');

    return returnOvals;
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function formatCampaignText(campaign){

    if (campaign.disabled)
    {
        return $(campaign.text);
    }
    else        
    {
        return $((campaign.element.getAttribute("friendlyName") == "" ? "" : '<span style="font-weight: bold">[' + campaign.element.getAttribute("friendlyName") + ']</span> ') + '<span>' + campaign.element.getAttribute("subjectName") + '</span> <span style="font-size: 8pt; padding: 1px 2px 1px 2px; border-radius: 5px; background: gray; color: white; float: right;">' + numberWithCommas(campaign.element.getAttribute("theCount")) + ' emails</span>');
    }

}

function formatCampaignTextResult(campaign){

    if (campaign.id == "")
    {
        return campaign.text;
    }
    else
    {
        return $((campaign.element.getAttribute("friendlyName") == "" ? "" : '<span style="font-weight: bold">[' + campaign.element.getAttribute("friendlyName") + ']</span> ') + '<span>' + campaign.element.getAttribute("subjectName") + '</span> <span style="font-size: 8pt; padding: 1px 2px 1px 2px; border-radius: 5px; background: gray; color: white; float: right;">' + numberWithCommas(campaign.element.getAttribute("theCount")) + ' emails</span>');
    }
    

}

function formatCampaignTextPopup(campaign){

    if (campaign.disabled)
    {
        return $(campaign.text);
    }
    else        
    {
        return $('<span style="font-size: 8pt; padding: 3px; border-radius: 5px; background: #D3D3D3; color: gray">' + campaign.element.getAttribute("theDate") + '</span> ' + (campaign.element.getAttribute("friendlyName") == "" ? "" : '<span style="font-size: 12pt; font-weight: bold">[' + campaign.element.getAttribute("friendlyName") + ']</span> ') + '<span style="font-size: 12pt;">' + campaign.element.getAttribute("subjectName") + '</span> <span style="font-size: 8pt; padding: 1px 2px 1px 2px; border-radius: 5px; background: gray; color: white; float: right;">' + numberWithCommas(campaign.element.getAttribute("theCount")) + ' emails</span>');
    }
    //return (campaign.text);

}

function formatCampaignTextPopupResult(campaign){

    if (campaign.id == "")
    {
        return (campaign.text);
    }
    else        
    {
        return $('<span style="font-size: 8pt; padding: 3px; border-radius: 5px; background: #D3D3D3; color: gray">' + campaign.element.getAttribute("theDate") + '</span> ' + (campaign.element.getAttribute("friendlyName") == "" ? "" : '<span style="font-size: 12pt; font-weight: bold">[' + campaign.element.getAttribute("friendlyName") + ']</span> ') + '<span style="font-size: 12pt;">' + campaign.element.getAttribute("subjectName") + '</span> <span style="font-size: 8pt; padding: 1px 2px 1px 2px; border-radius: 5px; background: gray; color: white; float: right;">' + numberWithCommas(campaign.element.getAttribute("theCount")) + ' emails</span>');
    }
    //return (campaign.text);

}

function formatSpreadsheets(campaign){

    if (campaign.disabled)
    {
        return (campaign.text);
    }
    else        
    {
        return $('<div style="height: 50px; display: flex; align-items: center">' + '<div><img height="40px" src="https://www.gmass.co/img2017/google-sheets.png"></div> ' + '<div style="margin-left: 0px; font-size: 8pt; padding: 3px; border-radius: 5px; background: #D3D3D3; color: gray">' + campaign.element.getAttribute("UpdatedTime") + '</div>' + '<div style="margin-left: 4px; font-size: 12pt;">' + campaign.element.text + '</div></div>');
    }
    //return (campaign.text);

}

function formatSpreadsheetsResult(campaign){

    if (campaign.id == "")
    {
        return (campaign.text);
    }
    else        
    {
        return $('<span style="font-size: 8pt; padding: 3px; border-radius: 5px; background: #D3D3D3; color: gray">' + campaign.element.getAttribute("UpdatedTime") + '</span> ' + '<span style="font-size: 12pt;">' + campaign.element.text + '</span>');
    }
    //return (campaign.text);

}

function formatWorksheets(campaign){

    if (campaign.disabled)
    {
        return (campaign.text);
    }
    else        
    {
        return $('<span style="font-size: 12pt;">' + campaign.element.text + '</span> ' + '<span style="font-size: 8pt; padding: 3px; border-radius: 5px; background: green; color: white; float: right;">' + numberWithCommas(campaign.element.getAttribute("Rows")) + ' rows</span> ');
    }
    //return (campaign.text);

}

function formatWorksheetsResult(campaign){

    if (campaign.id == "")
    {
        return (campaign.text);
    }
    else
    {
        return $('<span style="font-size: 12pt;">' + campaign.element.text + '</span> ' + '<span style="font-size: 8pt; padding: 3px; border-radius: 5px; background: green; color: white; float: right;">' + numberWithCommas(campaign.element.getAttribute("Rows")) + ' rows</span> ');
    }
    //return (campaign.text);

}

function formatCampaignBehaviors(campaign){

    if (campaign.disabled)
    {
        return $(campaign.text);
    }
    else        
    {
        return $('<span style="font-size: 12pt; font-weight: normal;">' + campaign.element.getAttribute("theBehavior") + ':</span> ' + '<span style="color: blue; float: right;">' + numberWithCommas(campaign.element.getAttribute("theCount")) + ' people</span>');
    }

}

function formatCampaignBehaviorsResult(campaign){

    if (campaign.id == "")
    {
        return $(campaign.text);
    }
    else        
    {
        return $('<span style="font-size: 12pt; font-weight: normal;">' + campaign.element.getAttribute("theBehavior") + ':</span> ' + '<span style="color: blue; float: right;">' + numberWithCommas(campaign.element.getAttribute("theCount")) + ' people</span>');
    }

}



function formatCampaignTextResultSuppress(campaign){

    if (campaign.id == "")
    {
        return campaign.text;
    }
    else
    {
        return $('<span style="font-size: 8pt; padding: 1px 2px 1px 2px; border-radius: 5px; background: gray; color: white">' + numberWithCommas(campaign.element.getAttribute("theCount")) + ' emails</span> ' + (campaign.element.getAttribute("friendlyName") == "" ? "" : '<span style="font-weight: bold">[' + campaign.element.getAttribute("friendlyName") + ']</span> ') + '<span>' + campaign.element.getAttribute("subjectName") + '</span>');
    }
    

}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function openPopupPage(htmlcontent)
{
 var param = { 'html' : htmlcontent };
 OpenWindowWithPost("width=1000, height=600, left=100, top=100, resizable=yes, scrollbars=yes", "NewFile", param);
}
 
 
function OpenWindowWithPost(windowoption, name, params)
{
 var form = document.createElement("form");
 form.setAttribute("method", "post");
 form.setAttribute("action", "https://www.gmass.co/linkchecker/");
 form.setAttribute("target", name);
 for (var i in params)
 {
   if (params.hasOwnProperty(i))
   {
     var input = document.createElement('input');
     input.type = 'hidden';
     input.name = i;
     input.value = params[i];
     form.appendChild(input);
   }
 }
 document.body.appendChild(form);
 //note I am using a post.htm page since I did not want to make double request to the page
 //it might have some Page_Load call which might screw things up.
 window.open("https://www.gmass.co", name, windowoption);
 form.submit();
 document.body.removeChild(form);
}

function RepeatTranslateToFrequency(thevalue){

	if (thevalue == "1"){
		return "h";
	}
	if (thevalue == "2"){
		return "d";
	}
	if (thevalue == "3"){
		return "w";
	}
	if (thevalue == "4"){
		return "m";
	}

	//if not 1 2 3 or 4 then it's already h/d/w/m
	return thevalue;
}
function RepeatTranslateToCharacter(frequency, mode){

	if (mode == "n"){
		return frequency;
	}
	if (mode == "a"){
		if (frequency == "h"){
			return "1";
		}
		if (frequency == "d"){
			return "2";
		}
		if (frequency == "w"){
			return "3";
		}
		if (frequency == "m"){
			return "4";
		}						
	}
}

function RepeatTranslateToNewOrAll(frequency){

    if (frequency == "h" || frequency == "d" || frequency == "w" || frequency == "m"){
        return "n";
    }
    else{
        return "a";
    }

}

function CopyClipboard(itemtocopy){

    var textArea = document.createElement("textarea");
    textArea.value = itemtocopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    
}

function ErrorHandler(errmessage) {
            
            console.log("GMass Error Message: " + errmessage);

            var xmlNotify = new XMLHttpRequest();
            xmlNotify.open("GET", varBaseURL + "gmass/NotifyExtensionError?ErrorMessage=" + encodeURIComponent(errmessage) + "&url=" + encodeURIComponent(window.location.href) + "&version=" + JSVersion, true);
            xmlNotify.send();

            xmlNotify.onreadystatechange = function () {
                if (xmlNotify.readyState == 4) {

                    if (JSON.parse(xmlNotify.responseText).success) {
                        //email was sent
                    };

                }
            }

}
