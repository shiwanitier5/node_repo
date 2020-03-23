var SettingsFormed = false;
var GMassPersonalization = "";
                    var AccountStatusRetrieved = false;
                    var TestButton;
                    var SettingsBox = document.createElement("div");

                    SettingsBox.id = settingsID;
                    document.body.appendChild(SettingsBox);
                    if (GMassDebug) { console.log("settings box created with id " + settingsID); }

                    //new way: still want to get state of Draft/Compose so we can set the right HTML off initially
                    //SETTINGS DIV WON'T EVEN START TO BE CREATED UNTIL GOTSTATE==TRUE
                    var SettingsInterval = setInterval(function () {

                        //if (GotState == true) {
                            if (GMassDebug) 
                            { 
                                console.log("about to clear interval and start forming settings box"); 
                            }
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
                           
                            //     <option value="Now" [NOW]>Now</option> \
                            //     <option value="OneHour" [ONEHOUR]>In 1 Hour</option> \
                            //     <option value="ThreeHours" [THREEHOURS]>In 3 hours</option> \
                            //     <option value="TomorrowMor" [TOMRROWMOR]>Tomorrow morning at 8am</option> \
                            //     <option value="TomorrowAft" [TOMORROWAFT]>Tomorrow aftern  // OptionsBox = OptionsBox +
                            // '<div class="g_settings_accordions">Settings:</div><div class="g_auto_follow_up"><div id="' + settingsID + 'oa"><div><span>Auto Follow-up:</span> <span id="' + settingsID + 'mainauto"><a>+</a></span></div>';
                            // OptionsBox += '<div id="' + settingsID + 'afstatus" style="display: block; overflow:hidden; font-size:8pt"></div>';
                            // OptionsBox += '<div id="' + settingsID + 'GMassAFDisplay" style="display: none; overflow: hidden;">';

                            // if (IsScheduled && (GMassFirstBumpBox == "y")) {
                            //     OptionsBox += '<div id="' + settingsID + 'autoclear"><div id="' + settingsID + 'ac" style="overflow: auto"><div style="float:left; margin-right:3px; padding-top:2px"><button class="autoclear_btn" type="button" id="' + settingsID + 'ClearBumps">Clear all auto follow-ups</button></div></div></div>';
                            // }

                            // OptionsBox += ' \
                            //     <div id="' + settingsID + 'firstbump"><div id="' + settingsID + 'fc" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'FirstBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'FirstBumpDays" name="FirstBumpDays" value=""> <span>days if</span> <select name="FirstBumpAction" id="' + settingsID + 'FirstBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'FirstBumpChoicet" name="FirstBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'FirstBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'FirstBumpChoicec" name="FirstBumpChoice" value="c"> <span id="' + settingsID + 'CM1" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'FirstBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'FirstBumpCustom" name="FirstBumpCustom"><option></option></select></div></div></div></div></div> \
                            //     <div id="' + settingsID + 'addsecondbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 2nd Stage</a></div> \
                            //     <div id="' + settingsID + 'secondbump"><div id="' + settingsID + 'sc" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'SecondBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'SecondBumpDays" name="SecondBumpDays" value=""> <span>days if</span> <select name="SecondBumpAction" id="' + settingsID + 'SecondBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'SecondBumpChoicet" name="SecondBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'SecondBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'SecondBumpChoicec" name="SecondBumpChoice" value="c"> <span id="' + settingsID + 'CM2" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'SecondBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'SecondBumpCustom" name="SecondBumpCustom"><option></option></select></div></div></div></div></div> \
                            //     <div id="' + settingsID + 'addthirdbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 3rd Stage</a></div> \
                            //     <div id="' + settingsID + 'thirdbump"><div id="' + settingsID + 'tc" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'ThirdBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'ThirdBumpDays" name="ThirdBumpDays" value=""> <span>days if</span> <select name="ThirdBumpAction" id="' + settingsID + 'ThirdBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'ThirdBumpChoicet" name="ThirdBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'ThirdBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'ThirdBumpChoicec" name="ThirdBumpChoice" value="c"> <span id="' + settingsID + 'CM3" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'ThirdBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'ThirdBumpCustom" name="ThirdBumpCustom"><option></option></select></div></div></div></div></div> \
                            //     <div id="' + settingsID + 'addfourthbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 4th Stage</a></div> \
                            //     <div id="' + settingsID + 'fourthbump"><div id="' + settingsID + '4c" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'FourthBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'FourthBumpDays" name="FourthBumpDays" value=""> <span>days if</span> <select name="FourthBumpAction" id="' + settingsID + 'FourthBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'FourthBumpChoicet" name="FourthBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'FourthBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'FourthBumpChoicec" name="FourthBumpChoice" value="c"> <span id="' + settingsID + 'CM4" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'FourthBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'FourthBumpCustom" name="FourthBumpCustom"><option></option></select></div></div></div></div></div> \
                            //     <div id="' + settingsID + 'addfifthbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 5th Stage</a></div> \
                            //     <div id="' + settingsID + 'fifthbump"><div id="' + settingsID + '5c" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'FifthBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'FifthBumpDays" name="FifthBumpDays" value=""> <span>days if</span> <select name="FifthBumpAction" id="' + settingsID + 'FifthBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'FifthBumpChoicet" name="FifthBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'FifthBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'FifthBumpChoicec" name="FifthBumpChoice" value="c"> <span id="' + settingsID + 'CM5" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'FifthBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'FifthBumpCustom" name="FifthBumpCustom"><option></option></select></div></div></div></div></div> \
                            //     <div id="' + settingsID + 'addsixthbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 6th Stage</a></div> \
                            //     <div id="' + settingsID + 'sixthbump"><div id="' + settingsID + '6c" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'SixthBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'SixthBumpDays" name="SixthBumpDays" value=""> <span>days if</span> <select name="SixthBumpAction" id="' + settingsID + 'SixthBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'SixthBumpChoicet" name="SixthBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'SixthBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'SixthBumpChoicec" name="SixthBumpChoice" value="c"> <span id="' + settingsID + 'CM6" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'SixthBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'SixthBumpCustom" name="SixthBumpCustom"><option></option></select></div></div></div></div></div> \
                            //     <div id="' + settingsID + 'addseventhbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 7th Stage</a></div> \
                            //     <div id="' + settingsID + 'seventhbump"><div id="' + settingsID + '7c" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'SeventhBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'SeventhBumpDays" name="SeventhBumpDays" value=""> <span>days if</span> <select name="SeventhBumpAction" id="' + settingsID + 'SeventhBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'SeventhBumpChoicet" name="SeventhBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'SeventhBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'SeventhBumpChoicec" name="SeventhBumpChoice" value="c"> <span id="' + settingsID + 'CM7" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'SeventhBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'SeventhBumpCustom" name="SeventhBumpCustom"><option></option></select></div></div></div></div></div> \
                            //     <div id="' + settingsID + 'addeighthbump" style="margin-top: 6px;"><a style="cursor:pointer;color:blue;text-decoration:underline;">+ Show 8th Stage</a></div> \
                            //     <div id="' + settingsID + 'eighthbump"><div id="' + settingsID + '8c" style="overflow: hidden"><label class="g_checkbox" style="float:left; margin-right:3px; padding-top:2px"><input type="checkbox" id="' + settingsID + 'EighthBumpBox"><span></span></label><div style="overflow:hidden; padding-left: 2px;"><span>After</span> <input type=text size=2 id="' + settingsID + 'EighthBumpDays" name="EighthBumpDays" value=""> <span>days if</span> <select name="EighthBumpAction" id="' + settingsID + 'EighthBumpAction"><option value="r">No Reply</option><option value="o">No Open</option><option value="c">No Click</option><option value="a">All</option></select><br /><label class="g_radio"><input type="radio" id="' + settingsID + 'EighthBumpChoicet" name="EighthBumpChoice" value="t"> <span style="font-size:8pt">Send text above original:</span></label><br /><textarea id="' + settingsID + 'EighthBumpAddedText" cols=34 rows=7></textarea><div><label class="g_radio"><input type="radio" id="' + settingsID + 'EighthBumpChoicec" name="EighthBumpChoice" value="c"> <span id="' + settingsID + 'CM8" style="font-size:8pt">Send custom message above original:</span></label><div id="' + settingsID + 'EighthBumpCustomDiv"><select style="width: 260px; font-size:8pt" id="' + settingsID + 'EighthBumpCustom" name="EighthBumpCustom"><option></option></select></div></div></div></div></div>'
                            // // if (IsScheduled && HasCampaign) {
                            // //     OptionsBox = OptionsBox + '<div id="' + settingsID + 'autosuppress" class="g_autosuppress"><div id="' + settingsID + 'as" style="overflow: auto"><div><span>Do not send auto follow-ups to:</span><input type="text" size="30" placeholder="Comma-separated emails or domains" name="AutoSuppress" id="' + settingsID + 'AutoSuppress"></div></div></div>'
                            // // }
                            // // OptionsBox = OptionsBox + '</div></div></div>'

                            // // //}

                            // // //scheduling
                            // // //if (!composeView.isInlineReplyForm()){
                            // //     OptionsBox = OptionsBox + '<div class="g_schedule"><div><span>Schedule: </span><span id="' + settingsID + 'mainspread" style="font-weight: normal"><a style="cursor:pointer;color:blue;text-decoration:none;">+</a></span></div><div id="' + settingsID + 'schedulestatus" style="display: block; overflow:hidden; font-size:8pt"></div><div id="' + settingsID + 'spreadfloater" style="display: none; float:left; font-size:8pt"><div style="float: left; font-size:8pt"><div style="overflow: auto" id="timecontainer"><div style="width: 40px; float: left; margin-bottom: 5px;margin-right: 5px; font-weight: normal;color: #08639c;">Time:</div><div style="float: left;"><select id="' + settingsID + 'GMassDateDropdown"> \
                            // //     <option selected disabled hidden value=""></option>oon at 1pm</option> \
                            //     <option value="TomorrowEve" [TOMORROWEVE]>Tomorrow evening at 7pm</option> \
                            //     <option value="Custom" [CUSTOM]>Custom date/time</option> \
                            //     </select>';
                            // //}

                            // OptionsBox = OptionsBox + '<BR><input style="[STYLEBOX]" size="30" type="text" id="' + settingsID + 'GMassDateTime" value="[CUSTOMTIME]" />';



                            //skip weekends
                            // if (!composeView.isInlineReplyForm()) {
                            //     OptionsBox = OptionsBox + '<div style="margin-top: 5px" id="' + settingsID + 'SkipWeekendsDiv"><label class="g_checkbox"><input type="checkbox" name="SkipWeekends" id="' + settingsID + 'SkipWeekends" [SKIPWEEKENDSON]> <span>Skip weekends</span></label></div>';
                            //     OptionsBox += "</div></div>";
                            //     OptionsBox = OptionsBox + '<div style="overflow: auto; margin-top: 8px;" id="speedcontainer"><div style="width: 40px; float: left; margin-bottom: 5px; margin-top:  5px; margin-right: 5px; margin-top: 3px; font-weight: normal; color: #08639c">Speed:</div><div style="float: left;"><div style="padding-top:0px;"><span>Send</span> <input type=text size=4 id="' + settingsID + 'MaxEmails" name=MaxEmails value="[MAXEMAILS]"> <span>emails/day</span> <button type="button" id="' + settingsID + 'checkusage">Show usage</button></div><div style="margin-top:4px;"><label class="g_checkbox"><input type="checkbox" id="' + settingsID + 'DelayCheckbox" [DELAYOFF]> <span>Pause a few seconds between emails</span></label></div>';
                            //     OptionsBox += "</div></div>";

                            //     //no longer just for sheets, but repeat option doesn't make sense for reply
                            //     OptionsBox = OptionsBox + '<div style="overflow: auto; margin-top: 8px;" id="repeatcontainer"><div style="margin-top: 5px" id="' + settingsID + 'RecurDiv"><div style="width: 40px; float: left; margin-bottom: 5px; margin-top: 2px; margin-right: 5px; font-weight: normal; color: #08639c">Repeat:</div><div style="float: left; align-items: center;"><label class="g_checkbox"><input type="checkbox" style="position: relative;" name="Recur" id="' + settingsID + 'Recur" [RECURON]><span></span></label><span id="' + settingsID + 'RecurEveryLabel" style="font-size: 13px; margin-right: 3px;">Every</span> <input style="margin-right: 2px;" type=text size=2 id="' + settingsID + 'RecurEvery" name=RecurEvery value="[RECUREVERY]"> <select name="repeatdh" id="' + settingsID + 'repeatdh"><option value="d">Day</option><option value="h">Hour</option><option value="w">Week</option><option value="m">Month</option></select><div id="' + settingsID + 'repeatmode" style="display: inline; visibility: hidden;"> <span id="' + settingsID + 'RecurToLabel">to</span> <select name="repeatneworall" id="' + settingsID + 'repeatneworall"><option value="n">new</option><option value="a">all</option></select> <span id="' + settingsID + 'RecurSheetLabel">Sheet emails</span></div></div>';
                            //     OptionsBox += "</div></div>";
                            // }
                            // else{
                            //     OptionsBox += "</div></div>";
                            // }








                            // OptionsBox = OptionsBox + '</div></div></div>'

                            //suppression box
                            // if (!composeView.isInlineReplyForm()) { 

                            //     OptionsBox = OptionsBox + '<div class="g_advanced"><div><span>Advanced: </span><span id="' + settingsID + 'mainadvanced" style="font-weight: normal"><a style="cursor:pointer;color:blue;text-decoration:none;">+</a></span></div>';
                            //     OptionsBox = OptionsBox + '<div style="overflow: hidden">'; //container div on the right
                            //     OptionsBox = OptionsBox + '<div id="' + settingsID + 'advancedstatus" style="display: block; font-size:8pt"></div>';
                            //     OptionsBox = OptionsBox + '<div class="advanced-box" style="display: none; font-size:8pt" id="' + settingsID + 'advanceddiv">';
                                
                            //     OptionsBox = OptionsBox + '<div id="advanced0" style="margin-bottom: 10px;">';

                            //     OptionsBox = OptionsBox + '<span>Send as:</span> <label class="g_radio"><input type=radio [NEW] id="' + settingsID + 'NewRadio" name="' + settingsID + 'NewReplyRadio" value=x> <span>New messages</span></label>&nbsp;&nbsp;&nbsp;&nbsp;<label class="g_radio"><input type=radio [REPLY] id="' + settingsID + 'ReplyRadio" name="' + settingsID + 'NewReplyRadio" value=y> <span>Replies</span></label>';

                            //     OptionsBox = OptionsBox + '</div><hr style="margin-top: 0px; margin-bottom: 10px;">';

                            //     OptionsBox = OptionsBox + '<div id="advanced2" style="margin-bottom: 10px;">';
                            //     //OptionsBox = OptionsBox + 'Reply-To: <input size="36" placeholder="' + (IsScheduled ? "none" : "Uses Gmail Settings, unless overridden") + '" value="' + myReplyTo + '" type="search" id="' + settingsID + 'replyto">';
                            //     OptionsBox = OptionsBox + '<span>Reply-To:</span> <select style="width: 200px;" id="' + settingsID + 'replyto"><option></option></select>';
                            //     OptionsBox = OptionsBox + '</div><hr style="margin-top: 0px; margin-bottom: 10px;">'; 

                            //     OptionsBox = OptionsBox + '<div id="advanced1" style="margin-bottom: 10px;">';

                            //     OptionsBox = OptionsBox + '<span>Suppress anyone who received these campaigns:</span><select style="margin-bottom: 3px; width: 280px" multiple name="suppression" id="' + settingsID + 'suppression" size="5"></select><span class="receive receive-past">Or received anything in the past</span> <input class="receive-input" type="text" placeholder="0" size="3" id="' + settingsID + 'SuppressionDays" value="[SUPPRESSIONDAYS]"> <span class="receive">days</span>';

                            //     OptionsBox = OptionsBox + '</div><hr style="margin-top: 0px; margin-bottom: 10px;">';

                            //     OptionsBox = OptionsBox + '<div id="advanced3">';

                            //     OptionsBox = OptionsBox + '<span>Friendly Name:</span> <input size="32" placeholder="' + (IsScheduled ? "none" : "Choose a friendly campaign name") + '" value="' + myFriendlyName + '" type="search" id="' + settingsID + 'friendlyname">';

                            //     OptionsBox = OptionsBox + '</div>';                         

                            //     OptionsBox = OptionsBox + '</div>';



                            //     OptionsBox = OptionsBox + '</div>'; 
                            //     OptionsBox = OptionsBox + '</div>';
                            // }  

                            // if (IsScheduled) {

                            //     OptionsBox += '<div class="g_campaigns" overflow: hidden;><div style="overflow: hidden;">';

                            //     if (1==1){
                            //         OptionsBox += '<button type="button" id="' + settingsID + 'savecampaign">SAVE Changes</button><button type="button" id="' + settingsID + 'pauseresumecampaign">';
            				// 		if (IsPaused) {
                            //             OptionsBox += 'Resume Campaign';
                            //         }
                            //         else {
                            //             OptionsBox += 'Pause Campaign';
                            //         }
            				// 		OptionsBox += '</button><button type="button" id="' + settingsID + 'cancelcampaign">Cancel Campaign</button><br> ';

                            //     }
                            //     //has a scheduled but maybe errored out, because errored out = AllDone true
                            //     OptionsBox += '<a href="javascript:void(0)"><span id="' + settingsID + 'getcampaignstatus">Get campaign status</span></a></div></div>'; 

                            // }
                            


                            // // OptionsBox += '<div class="g_guide"><a style="text-decoration: none" href="http://www.gmass.co/blog/users-guide-to-the-gmass-settings-box/" target="_gmass">?</a></div> \
                            // // <div class="g_status" id="' + settingsID + 'AccountStatusDiv" style="display: inline-block; padding-top: 2px; padding-bottom: 2px; padding-left: 6px; padding-right: 6px; border-radius: 8px; float: right; margin-right: 4px; font-size: 8pt;">'
                            // // OptionsBox += 'Please wait...' + '</div>';



                            // /*if (sdk.User.getEmailAddress() == "ryan@e1even.com"){
                            //     OptionsBox += '<span id="testlink">[test]</span>';
                            // }*/

                            // //break draft free feature
                            // if (composeView.isInlineReplyForm()) {
                            //     OptionsBox += '<div class="g_draft_free" id="' + settingsID + 'BreakDraftFreeLink"><a id="' + settingsID + 'BDFText">Break Draft Free</a></div>';
                            // }
                            // //href="http://www.gmass.co/gmass/breakdraftfree?emailaddress=' + sdk.User.getEmailAddress() + '&draftid=' + ComposeDraftID +  '" target="_gmass"

                            // if (GMassDebug) {
                            //     OptionsBox += '<div id="' + settingsID + 'Debug" style="display: inline-block; padding-top: 2px; padding-bottom: 2px; padding-left: 6px; padding-right: 6px; border-radius: 8px; float: right; margin-right: 4px; font-size: 8pt;">Debug</div>'
                            // }

                            // OptionsBox += '</div>';

                            // //should also clear out other brackets for each matching if condition, it's a pain i know
                            // if (GMassDateDropdown == "Now") {
                            //     OptionsBox = OptionsBox.replace("[NOW]", "selected");
                            // }
                            // if (GMassDateDropdown == "OneHour") {
                            //     OptionsBox = OptionsBox.replace("[ONEHOUR]", "selected");
                            // }

                            // if (GMassDateDropdown == "ThreeHours") {
                            //     OptionsBox = OptionsBox.replace("[THREEHOURS]", "selected");
                            // }
                            // if (GMassDateDropdown == "TomorrowMor") {
                            //     OptionsBox = OptionsBox.replace("[TOMRROWMOR]", "selected");
                            // }
                            // if (GMassDateDropdown == "TomorrowAft") {
                            //     OptionsBox = OptionsBox.replace("[TOMORROWAFT]", "selected");
                            // }
                            // if (GMassDateDropdown == "TomorrowEve") {
                            //     OptionsBox = OptionsBox.replace("[TOMORROWEVE]", "selected");
                            // }
                            // if (GMassDateDropdown == "Custom") {
                            //     OptionsBox = OptionsBox.replace("[CUSTOM]", "selected");
                            // }


                            // if (GMassDateTextBox !== null) {

                            //     OptionsBox = OptionsBox.replace("[CUSTOMTIME]", GMassDateTextBox);

                            // }

                            // if (GMassDateTextBox == "") {

                            //     OptionsBox = OptionsBox.replace("[STYLEBOX]", "display: none;");
                            // }


                            // if (myMaxEmails !== null) {

                            //     OptionsBox = OptionsBox.replace("[MAXEMAILS]", myMaxEmails);

                            // }
                            // else {
                            //     //OptionsBox = OptionsBox.replace("[LISTNAME]", "");
                            //     OptionsBox = OptionsBox.replace("[MAXEMAILS]", "max");
                            // }

                            // if (myRecurEvery !== null) {

                            //     OptionsBox = OptionsBox.replace("[RECUREVERY]", myRecurEvery);

                            // }
                            // else {
                            //     //OptionsBox = OptionsBox.replace("[LISTNAME]", "");
                            //     OptionsBox = OptionsBox.replace("[RECUREVERY]", "1");
                            // }

                            // if (mySuppressionDays !== null) {

                            //     OptionsBox = OptionsBox.replace("[SUPPRESSIONDAYS]", mySuppressionDays);

                            // }
                            // else {
                            //     //OptionsBox = OptionsBox.replace("[LISTNAME]", "");
                            //     OptionsBox = OptionsBox.replace("[SUPPRESSIONDAYS]", "0");
                            // }


                            // if (mySendSave == "send" || mySendSave == "default") {

                            //     OptionsBox = OptionsBox.replace("[SEND]", "checked")

                            // }
                            // else if (mySendSave == "save") {

                            //     OptionsBox = OptionsBox.replace("[SAVE]", "checked")


                            // }

                            // if (SMTP == "on") {
                            //     OptionsBox = OptionsBox.replace("[SMTP]", "checked")
                            // }
                            // else if (SMTP == "off") {
                            //     OptionsBox = OptionsBox.replace("[GMAIL]", "checked")
                            // }


                            // if (myNewReply == "new" || myNewReply == "default") {

                            //     OptionsBox = OptionsBox.replace("[NEW]", "checked")

                            // }
                            // else if (myNewReply == "reply") {

                            //     OptionsBox = OptionsBox.replace("[REPLY]", "checked")

                            // }

                            // if (myDelay == "on") {

                            //     OptionsBox = OptionsBox.replace("[DELAYOFF]", "checked")
                            //     //GMassSpreadDisplay = "show";

                            // }

                            // if (fastSMTP == "on") {

                            //     OptionsBox = OptionsBox.replace("[FASTSMTPOFF]", "checked")
                            //     //GMassSpreadDisplay = "show";

                            // }                    

                            // if (myOpenTracking == "on" || myOpenTracking == "default") {

                            //     OptionsBox = OptionsBox.replace("[OPENON]", "checked")

                            // }
                            // else if (myOpenTracking == "off") {

                            //     OptionsBox = OptionsBox.replace("[OPENOFF]", "checked")

                            // }
                            // //if (myClickTracking=="on" || myClickTracking=="default"){
                            // if (myClickTracking == "on" || myClickTracking == "default") {

                            //     OptionsBox = OptionsBox.replace("[CLICKON]", "checked")

                            // }


                            // if (SkipWeekends == "on") {

                            //     OptionsBox = OptionsBox.replace("[SKIPWEEKENDSON]", "checked")

                            // }

                            // //OptionsBox = OptionsBox.replace("[TESTADDRESSES]", myTestAddresses)

                            // //clean up
                            // OptionsBox = OptionsBox.replace("[SEND]", "");
                            // OptionsBox = OptionsBox.replace("[SAVE]", "");
                            // OptionsBox = OptionsBox.replace("[SMTP]", "");
                            // OptionsBox = OptionsBox.replace("[GMAIL]", "");
                            // OptionsBox = OptionsBox.replace("[NEW]", "");
                            // OptionsBox = OptionsBox.replace("[REPLY]", "");
                            // OptionsBox = OptionsBox.replace("[OPENON]", "");
                            // OptionsBox = OptionsBox.replace("[OPENOFF]", "");
                            // OptionsBox = OptionsBox.replace("[CLICKON]", "");
                            // OptionsBox = OptionsBox.replace("[CLICKOFF]", "");
                            // OptionsBox = OptionsBox.replace("[SKIPWEEKENDSON]", "");
                            // OptionsBox = OptionsBox.replace("[DELAYOFF]", "");

                            // //**********DONE CREATING HTML FOR SETTINGS BOX DIV
                            // //*********************************
                            // //*********************************
                            // //*********************************
                            // //*********************************
                            // if (GMassDebug) { console.log("about to set HTML for options box"); }
                            // SettingsBox.innerHTML = OptionsBox;
                            // if (GMassDebug) { console.log("DONE to set HTML for options box"); }

                            // //document.getElementById(settingsID + "sendwith").innerHTML = "blahblah";
                            // //if (GMassDebug) { console.log("***sendwidth div retrieved"); }
                            // //*********************************
                            // //*********************************

                            // //SettingsBox.innerHTML = OptionsBox
                            // //SettingsBox.style.display = "block";
                            // /*SettingsBox.style.zIndex = "8";
                            // SettingsBox.style.fontSize = "10pt";
                            // SettingsBox.style.overflow = "auto";
                            // SettingsBox.style.background = "white";
                            // SettingsBox.style.width = "500px";*/
                            // //SettingsBox.style.height = "500px";
                            // /*SettingsBox.style.position = "fixed";
                            // SettingsBox.style.visibility = "hidden";*/

                            // //************EVENT HANDLERS FOR SETTINGS ELEMENTS**********************
                            // //**********************************
                            // //**********************************
                            // //**********************************
                            // //**********************************

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
                            //     $('#' + settingsID + 'FirstBumpCustom').select2({
                            //         dropdownParent: $('#' + settingsID + 'FirstBumpCustomDiv'),
                            //         width: "style",
                            //         templateResult: formatCampaignText,
                            //         placeholder: ("Select message")
                            //     });                        

                            //     $('#' + settingsID + 'SecondBumpCustom').select2({
                            //         dropdownParent: $('#' + settingsID + 'SecondBumpCustomDiv'),
                            //         width: "style",
                            //         templateResult: formatCampaignText,
                            //         placeholder: ("Select message")
                            //     });     

                            //     $('#' + settingsID + 'ThirdBumpCustom').select2({
                            //         dropdownParent: $('#' + settingsID + 'ThirdBumpCustomDiv'),
                            //         width: "style",
                            //         templateResult: formatCampaignText,
                            //         placeholder: ("Select message")
                            //     });

                            //     $('#' + settingsID + 'FourthBumpCustom').select2({
                            //         dropdownParent: $('#' + settingsID + 'FourthBumpCustomDiv'),
                            //         width: "style",
                            //         templateResult: formatCampaignText,
                            //         placeholder: ("Select message")
                            //     });     

                            //     $('#' + settingsID + 'FifthBumpCustom').select2({
                            //         dropdownParent: $('#' + settingsID + 'FifthBumpCustomDiv'),
                            //         width: "style",
                            //         templateResult: formatCampaignText,
                            //         placeholder: ("Select message")
                            //     });     

                            //     $('#' + settingsID + 'SixthBumpCustom').select2({
                            //         dropdownParent: $('#' + settingsID + 'SixthBumpCustomDiv'),
                            //         width: "style",
                            //         templateResult: formatCampaignText,
                            //         placeholder: ("Select message")
                            //     });     

                            //     $('#' + settingsID + 'SeventhBumpCustom').select2({
                            //         dropdownParent: $('#' + settingsID + 'SeventhBumpCustomDiv'),
                            //         width: "style",
                            //         templateResult: formatCampaignText,
                            //         placeholder: ("Select message")
                            //     });     

                            //     $('#' + settingsID + 'EighthBumpCustom').select2({
                            //         dropdownParent: $('#' + settingsID + 'EighthBumpCustomDiv'),
                            //         width: "style",
                            //         templateResult: formatCampaignText,
                            //         placeholder: ("Select message")
                            //     });     
                             });
                        }, 100);
                    