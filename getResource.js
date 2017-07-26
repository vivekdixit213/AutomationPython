// getResources.js
// Usage: 
// ./phantomjs --ssl-protocol=any --web-security=false getResources.js your_url
// the ssl-protocol and web-security flags are added to dismiss SSL errors

var page = require('webpage').create();
var system = require('system');
var urls = Array();

// function to check if the requested resource is an image
function isImg(url) {
  var acceptedExts = ['jpg', 'jpeg', 'png'];
  var baseUrl = url.split('?')[0];
  var ext = baseUrl.split('.').pop().toLowerCase();
  if (acceptedExts.indexOf(ext) > -1) {
    return true;
  } else {
    return false;
  }
}

// function to check if an url has a given extension
function isExt(url, ext) {
  var baseUrl = url.split('?')[0];
  var fileExt = baseUrl.split('.').pop().toLowerCase();
  if (ext == fileExt) {
    return true;
  } else {
    return false;
  }
}

// Listen for all requests made by the webpage, 
// (like the 'Network' tab of Chrome developper tools)
// and add them to an array
page.onResourceRequested = function(request, networkRequest) { 
  // If the requested url if the one of the webpage, do nothing
  // to allow other ressource requests
  if (system.args[1] == request.url) {
    return;
  } else if (isImg(request.url) || isExt(request.url, 'js') || isExt(request.url, 'css')) {
    // The url is an image, css or js file 
    // add it to the array
    urls.push(request.url)
    // abort the request for a better response time
    // can be omitted for collecting asynchronous loaded files
    networkRequest.abort(); 
  }
};

// When all requests are made, output the array to the console
page.onLoadFinished = function(status) {
  console.log(JSON.stringify(urls));
  phantom.exit();
};

// If an error occur, dismiss it
page.onResourceError = function(){
  return false;
}
page.onError = function(){
  return false;
}

// Open the web page
page.open(system.args[1]);
