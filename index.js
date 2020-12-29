var React = require('react');
var ReactNativeWebView = require('react-native-webview');
var createReactClass = require('create-react-class');
var ReactNative = require('react-native');

var INJECTED_JAVASCRIPT = require('./webviewbridge.js');
var {
  DeviceEventEmitter,
  View,
  StyleSheet
} = ReactNative;
var { WebView } = ReactNativeWebView;
var {script} = INJECTED_JAVASCRIPT;
var pluginMap = new Map();
var WebViewBridge = createReactClass({
  componentDidMount: function () {

  },
  render: function () {
    let { ...props } = { ...this.props };
    var webView = <WebView
    {...props}
    javaScriptEnabled={true}
    ref='webview'
    onMessage={(message:string) => {
      this.handleMessage(message);
    }}
    injectedJavaScript={script}
    ></WebView>;
    return (<View style={styles.container}>
      { webView }
    </View>);
  },
  handleMessage:function(message:string){
    debugger;
    var obj = JSON.parse(message.nativeEvent?.data);
    var functionName = obj.functionName;
    var params = obj.params;
    var func = pluginMap.get(functionName);
    if(func != undefined){
      callFunc(func,params)
      .then((res)=>{
        debugger;
        var script = "WebViewBridge.onMessage('"+ functionName +"','"+ res + "');";
        this.refs.webview.injectJavaScript(script);
      })
      .catch(e=>{console.error(e)});
    }

  }
});
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
function registerPlugin(func:Function){
  pluginMap.set(func.name,func);
}

async function  callFunc(func:Function, message:string) {
  if ('function' === typeof func) {
    return await func(message);
  }
}
module.exports = {WebViewBridge , registerPlugin};
// module.exports = WebViewBridge;
// module.exports = registerPlugin;

