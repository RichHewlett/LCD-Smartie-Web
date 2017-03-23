        
const FLASHURL = "/lcd/displaytextflash";
const RAWTEXTDISPLAYURL = "/lcd/displaytext";
const TEXTDISPLAYURL = "/lcd/displaymessage";
const DISPLAYOFFURL = "/lcd/off";
const DISPLAYONURL = "/lcd/on";
const CLEARDISPLAYURL = "/lcd/clear";

function SendCommand(url, httpVerb, data, successCallback, errorCallback){
                
    DisplayMessageToUser("");

    var dataToSend;
    if(data!=null){
        var dataToSend = JSON.stringify(data);          
    }

    var request = new XMLHttpRequest();
    request.open(httpVerb, url, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    
    request.onload = function() {
        if(this.status >= 200 && this.status < 400){
            // success here
            console.log("Send Command:Success:" + this.status);
            var returnedData; 
            if (this.response != null){
                //returnedData = JSON.parse(this.response);
                console.log("Send Command:Success:" + data);
                successCallback(returnedData, this.status);
            }                                                                        
        }
        else{
            //error returned from server
            console.log("Send Command:Error Returned: " + this.status);
            errorCallback("Error response returned from server", this.status);
        }
    }

    request.onerror = function() {
            //connection error occurred
            console.log("Send Command:Error With Comms");
            errorCallback("Error contacting server", this.status);
    }

    if (dataToSend != null){
        request.send(dataToSend);
    }
    else{
        request.send();
    }
}

function SendClearCommand(){
    SendCommand(CLEARDISPLAYURL, "GET", null, HandleSuccess, HandleError);
}

function SendOnCommand(){
    SendCommand(DISPLAYONURL, "GET", null, HandleSuccess, HandleError);
}

function SendOffCommand(){
    SendCommand(DISPLAYOFFURL, "GET", null, HandleSuccess, HandleError);
}

function SendFlashCommand(){
    var flashModel = {
            Line: 1,
            Text: "Text Flashing"
    }
    SendCommand(FLASHURL, "POST", flashModel, HandleSuccess, HandleError);
}

function SendRawTextDisplay(){
    var rawText = document.getElementById('TextRaw').value;
    var dataToSend = JSON.stringify({"Text": rawText});
    SendCommand(RAWTEXTDISPLAYURL, "POST", dataToSend,HandleSuccess, HandleError);
}

function SendMsgDisplay(){
            
    var linesModel = {
        Lines: []
    }

    var Lines = [];
    Lines[0] = document.getElementById('TextLine01').value;
    Lines[1] = document.getElementById('TextLine02').value;
    Lines[2] = document.getElementById('TextLine03').value;
    Lines[3] = document.getElementById('TextLine04').value;
    if (false){
        Lines[4] = document.getElementById('TextLine05').value;
        Lines[5] = document.getElementById('TextLine06').value;
        Lines[6] = document.getElementById('TextLine07').value;
        Lines[7] = document.getElementById('TextLine08').value;
        Lines[8] = document.getElementById('TextLine09').value;
        Lines[9] = document.getElementById('TextLine10').value;            
    }
    linesModel.Lines = Lines;

    SendCommand(TEXTDISPLAYURL, "POST", linesModel, HandleSuccess, HandleError);
}

function HandleSuccess(dataReturned, statusCode){
    console.log("Command completed successfully : " + statusCode);
    DisplayMessageToUser("Command completed successfully");
}

function HandleError(errorMessage, statusCode){
    var errorMsg = "Command failed : " + errorMessage + " : " + statusCode;
    console.log(errorMsg);
    DisplayMessageToUser(errorMsg); 
}

function DisplayMessageToUser(message){            
    document.getElementById('UserMessages').innerText = message;
}

function ShowMoreLines(){}

function ClearUI(){
    document.getElementById('TextLine01').value = "";
    document.getElementById('TextLine02').value = "";
    document.getElementById('TextLine03').value = "";
    document.getElementById('TextLine04').value = "";
    DisplayMessageToUser("");
}

function ShowAbout(){
    alert("Smartie LCD Control Page. See RichHewlett.com or https://github.com/RichHewlett/LCD-Smartie-Web for more info");
}
