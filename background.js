// chrome.storage.local.get(['tiny_proxy_scheme', 'tiny_proxy_host', 'tiny_proxy_port', 'tiny_proxy_desc'], function(res) {
//   let scheme = res.tiny_proxy_scheme;
//   let host = res.tiny_proxy_host;
//   let port = parseInt(res.tiny_proxy_port);
//   console.log('aaaa', scheme, host, port)
//   let proxy_config = {
//     scheme: scheme,
//     host: host,
//     port: port
//   }
//   console.log('bbbb', proxy_config)
//   let config = {
//     mode: "fixed_servers",
//     rules: {
//       proxyForHttp: proxy_config,
//       proxyForHttps: proxy_config,
//       bypassList: ["foobar.com"]
//     }
//   };
//   chrome.proxy.settings.set(
//     {value: config, scope: 'regular'},
//     function() {
//       console.log('ccccc')
//     }
//   );
// });

chrome.runtime.onInstalled.addListener(updateFunction);
function updateFunction() {
    chrome.storage.local.get(['tiny_proxy_scheme', 'tiny_proxy_host', 'tiny_proxy_port', 'tiny_proxy_desc'], function(res) {
    let scheme = res.tiny_proxy_scheme;
    let host = res.tiny_proxy_host;
    let port = parseInt(res.tiny_proxy_port);
    console.log('aaaa', scheme, host, port)
    let proxy_config = {
      scheme: scheme,
      host: host,
      port: port
    }
    console.log('bbbb', proxy_config)
    let config = {
      mode: "fixed_servers",
      rules: {
        proxyForHttp: proxy_config,
        proxyForHttps: proxy_config,
        proxyForFtp: proxy_config,
        bypassList: ["foobar.com"]
      }
    };
    chrome.proxy.settings.set(
      {value: config, scope: 'regular'},
      function() {
        console.log('ccccc')
      }
    );
  });
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.greeting === "update_proxy"){
      updateFunction() 
    }
});
// var config = {
//   mode: "fixed_servers",
//   rules: {
//     proxyForHttp: {
//       scheme: "http",
//       host: "127.0.0.1",
//       port: 50013
//     },
//     proxyForHttps: {
//       scheme: "http",
//       host: "127.0.0.1",
//       port: 50013
//     },
//     bypassList: ["foobar.com"]
//   }
// };
// chrome.proxy.settings.set(
//   {value: config, scope: 'regular'},
//   function() {}
// );