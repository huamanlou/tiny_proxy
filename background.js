const updateFunction = async function () {
  const res = await chrome.storage.local.get([
    "tiny_proxy_scheme",
    "tiny_proxy_host",
    "tiny_proxy_port",
    "tiny_proxy_desc",
    "tiny_proxy_block_webrtc",
  ]);

  let scheme = res.tiny_proxy_scheme;
  let host = res.tiny_proxy_host;
  let port = parseInt(res.tiny_proxy_port);
  console.log("aaaa", scheme, host, port);
  let proxy_config = {
    scheme: scheme,
    host: host,
    port: port,
  };
  console.log("bbbb", proxy_config);
  let config = {
    mode: "fixed_servers",
    rules: {
      proxyForHttp: proxy_config,
      proxyForHttps: proxy_config,
      proxyForFtp: proxy_config,
      bypassList: ["foobar.com"],
    },
  };
  chrome.proxy.settings.set({ value: config, scope: "regular" }, function () {
    console.log("setting proxy success");
  });

  let webRTC_value = "default";
  if (res.tiny_proxy_block_webrtc) {
    webRTC_value = "disable_non_proxied_udp";
  }
  chrome.privacy.network.webRTCIPHandlingPolicy.set({
    value: webRTC_value,
  });
};

chrome.runtime.onInstalled.addListener(updateFunction);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting === "update_proxy") {
    updateFunction();
  }
});
