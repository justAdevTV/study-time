chrome.webNavigation.onBeforeNavigate.addListener(function(details) { 
    suspendTab(); 
}, { 
    url: [{ 
        // Runs on example.com, example.net, but also example.foo.com 
        hostContains: '.youtube.'
    },{
    	hostContains: '.facebook.'
    }] 
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