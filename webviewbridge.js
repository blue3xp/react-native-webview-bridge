export var script = `(function (window) {
  'use strict';
  //Make sure that if WebViewBridge already in scope we don't override it.
  if (window.WebViewBridge) {
    return;
  }
  var sendQueue = new Map();
  var WebViewBridge = {
    /* message format
    {functionName:'xxxx','params':{}}
    */
    send:function(message,callback){
      if ('string' !== typeof message){
        console.error("message is type '" + typeof message + "', and it needs to be string");
        return;
      }
      var obj = JSON.parse(message);
      var functionName = obj.functionName;
      sendQueue.set(functionName,callback);
      window.ReactNativeWebView.postMessage(message);
    },
    onMessage:function(functionName,message){
      var func = sendQueue.get(functionName);
      func(message);
    }
  };
  window.WebViewBridge = WebViewBridge;
}(window));`
