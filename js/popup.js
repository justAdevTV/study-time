document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('suspend-button');
    // onClick's logic below:
    link.addEventListener('click', function() { 

    	var url;

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

        	var url = tabs[0].url;

	    	suspendTab(tabs[0].id);

		});
    });
});

function suspendTab(urlId, url) {

	chrome.tabs.remove(urlId, function(){
		chrome.tabs.create({
			'url': 'back-to-work.html'
		}, function(){
			// #TODO: Fix
			setTimeout(function(){
				chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
			    	
			    	chrome.tabs.remove(tabs[0]);
				});
			}, 2000);
		})
	});


}