chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'loading') {
  	var domain;

	chrome.tabs.getSelected(null, function (tab) {
		var url = new URL(tab.url);
		domain = url.hostname;
		
		if (domain === 'www.facebook.com') {
			suspendTab();
		}

	});
  }
});

function suspendTab() {

	var url;

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

    	var tabId = tabs[0].id;

    	chrome.tabs.update({
			'url': 'back-to-work.html'
		}, function() {
			setTimeout(function(){
				chrome.tabs.remove(tabId); 
				// #TODO: Add notifiation to say keep studying -Juan
			    chrome.tabs.create({
			    	'url': 'http://www.google.com'
			    });
			}, 8500);
		});

	});

}