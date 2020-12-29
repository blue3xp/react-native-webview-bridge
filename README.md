# react-native-webview-bridge

## Prerequisites

```js
//install react native webview firstly
npm install react-native-webview
```



## Usage

```js
import {registerPlugin,WebViewBridge} from 'react-native-common_service_webview';
//////////////////////RN////////////////////////////////
// register RN function
registerPlugin(callRNDemo);
// use webview bridge component
<WebViewBridge source={localHtmlFile} />
// RN function demo
// this function should be asynchronous function
export function callRNDemo(message:string){
  return new Promise(function(resolve){
    var result = message + 'from RN';
    resolve(result);
  });
}
///////////////////////HTML////////////////////////////////
//message format must follow this pattern
const message = {functionName:'callRNDemo','params':'hello from html'};
//The message between RN and html must be string
var jsonstr =JSON.stringify(message);
//WebViewBridge is the global variable. 
//Call send function to hook RN function.
WebViewBridge.send(jsonstr, function (result) {
    console.log(result);
});


```

