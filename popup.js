// popup.js
document.addEventListener('DOMContentLoaded', function () {
    // 从 local 存储区域获取数据
    chrome.storage.local.get(['tiny_proxy_scheme', 'tiny_proxy_host', 'tiny_proxy_port', 'tiny_proxy_desc'], function(res) {
      document.getElementById('scheme').value = res.tiny_proxy_scheme;
      document.getElementById('host').value = res.tiny_proxy_host;
      document.getElementById('port').value = res.tiny_proxy_port;
      document.getElementById('desc').value = res.tiny_proxy_desc;
    });
    // Add your popup logic here
    document.getElementById('submit').addEventListener("click", () => {
        tiny_proxy_scheme = document.getElementById('scheme').value || '';
        tiny_proxy_host = document.getElementById('host').value || '';
        tiny_proxy_port = document.getElementById('port').value || '';
        tiny_proxy_desc = document.getElementById('desc').value || '';
        // 存储数据到 local 存储区域
        chrome.storage.local.set({ 'tiny_proxy_scheme':tiny_proxy_scheme, 'tiny_proxy_host':tiny_proxy_host, 'tiny_proxy_port':tiny_proxy_port, 'tiny_proxy_desc':tiny_proxy_desc }, function() {
            // alert('保存成功')
            chrome.runtime.sendMessage({ greeting: "update_proxy" }, function(response) { 
                alert('保存成功')
            });
        });

    });
});