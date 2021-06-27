let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function(resolve,reject){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            console.log(methodType + " State changed called at " + showTime() + ". Ready state: " +
                        xhr.readyState + " Status " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if(xhr.status >= 400) {
                    reject({
                        status : xhr.status,
                        statustext :xhr.statusText
                    })
                    console.log("Handle 400 client error or 500 server error at" +showTime());
                }
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }else{
            xhr.send();
        }
        console.log(methodType + " request sent to server at " + showTime());
    });
}

const getURL = "http://localhost:3000/employess/";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get user data: " + responseText)
    })
    .catch(error => {
        console.log("Get error status: " + JSON.stringify(error));
    });

console.log("Made GET Promise call to server at " + showTime());


const deleteURL = "http://localhost:3000/employess/5";
makePromiseCall("DELETE", deleteURL, true)
    .then(responseText => {
        console.log("Get user data: " + responseText);
    })
    .catch(error => {
        console.log("Get error status: " + JSON.stringify(error));
    });

console.log("Made DELETE Promise call to server at " + showTime());

const postURL = "http://localhost:3000/employess";
const emplData = {"name": "Harry", "salary": "33000"};
makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
        console.log("Get user data: " + responseText)
    })
    .catch(error => {
        console.log("Get error status: " + JSON.stringify(error));
    });

console.log("Made POST Promise call to server at " + showTime());

