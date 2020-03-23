window.onload = function () {



    InboxSDK.load(2, 'sdk_30275566_68262f84cc').then(function (sdk) {

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
                    NotifyMissingElement("after 100 tries, top area div didn't reveal");

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

                        //CheckAuth(true);

                        //did this need to call a separate function? not sure -- sometimes the HTTP call would get suddenly cancelled, and GMassSearch wouldn't exist as an object at that time. was hoping that by transferring to a different function, GMassSearch's state wouldn't matter
                       // GenerateDraft();

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
                        // else {
                        //     NotifyMissingElement(App + " varElements search area" + " NOT FOUND queryselector ");
                        // }
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
                            //CheckAuthSheets(true);


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
                    // var GMassCampaigns = document.createElement("div");
                    // GMassCampaigns.setAttribute("id", "gmasscampaigns");
                    // GMassCampaigns.innerHTML = "&nbsp;&nbsp;&nbsp;";

                    // //same thing, varElements3 is the search area
                    // //varElements3 = document.querySelector(QuerySelector);

                    // if (App == "newGmail") {
                    //     GMassCampaigns.style.width = "20px";
                    // }

                    // GMassCampaigns.style.display = 'block';
                    // GMassCampaigns.style.marginLeft = '2px';
                    // GMassCampaigns.style.color = "white";
                    // GMassCampaigns.style.padding = "9px 5px 0px 12px";
                    // GMassCampaigns.style.fontWeight = "bold";
                    // GMassCampaigns.style.fontSize = "11px";
                    // GMassCampaigns.style.backgroundPosition = "center center";
                    // GMassCampaigns.style.backgroundRepeat = "no-repeat";
                    // GMassCampaigns.style.backgroundColor = "#c42329";
                    // GMassCampaigns.style.backgroundImage = "url('https://www.gmass.co/images/GMassFollowupIcon.png')";
                    // GMassCampaigns.style.cursor = "pointer";
                    // GMassCampaigns.title = "Send a follow-up campaign based on opens and clicks.";
                    // GMassCampaigns.addEventListener("click", function () {

                    //     LaunchFollowup();


                    // });


                    // if (App == "newGmail") {
                    //     //appending to our own element, so this will always work
                    //     divButtons.appendChild(GMassCampaigns);
                    // }
                    // else {
                    //     if (varElements3 != null) {
                    //         varElements3.appendChild(GMassCampaigns);
                    //     }
                    //     else {
                    //         //don't need this. if varElements3 is null so is 1
                    //         //NotifyMissingElement(App + " varElements3 search area");
                    //     }
                    // }


                    // if (App == "newGmail") {
                    //     if (varElements != null) {
                           
                    //         varElements.insertBefore(divButtons, varElements.lastChild);
                            
                    //         if (SearchWidth != null) {
                    //             //this doesn't keep the search bar wide anymore - 4/24/19
                    //             //SearchWidth.style.maxWidth = "720px";
                    //             SearchWidth.style.paddingRight = "5px";
                    //             SearchWidth.style.maxWidth = "722px";
                    //         }
                    //         else {
                    //             NotifyMissingElement("search width issue couldnt be set to 720x because querySelector NOT FOUND ");
                    //         }

                    //     }
                    //     else {
                    //         //butterbar alert
                    //         window.onload = function(e){ 
                    //             sdk.ButterBar.showMessage({ html: "<span style='color: red'>WARNING:</span><span style='color: yellow'>" + Date() + ":</span> The GMass buttons at the top didn't load. This includes the Build List button, the Google Sheet Connector button, and the Manual Followup button. This happens when Google changes Gmail's code, and GMass hasn't adapted yet. Usually our engineers react right away, and this should be fixed shortly. Feel free to also <a style='color: #99FFFF' target='_blog' href='https://www.gmass.co/g/support'>submit a support request</a> to make sure we're aware.", time: 20000 });

                    //         }
                    //         NotifyMissingElement(App + " varElements search area NOT FOUND QuerySelector ");
                    //     }
                    // }

                    // //whether to display the Gmass Search button in gray or red
                    // var MainBB = setInterval(BBFunc, 1000);


            }
            else{
                console.log("waiting for top area: " + TopAreaCounter);
            }

            TopAreaCounter++;

        //end interval
        }, 500);
    }
        catch(e){
            console.log("error")




        }
    });
}
