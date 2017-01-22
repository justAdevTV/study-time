var blockedSites;

chrome.storage.sync.get('blockedSites', function(res){

	blockedSites = res.blockedSites;

	chrome.webNavigation.onBeforeNavigate.addListener(function(details) { 
	    chrome.storage.sync.get('isStudying', function(res){
			var isStudying = res.isStudying;

			if (isStudying) {
				suspendTab(); 
			}	
		});
	}, blockedSites); 
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