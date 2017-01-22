document.addEventListener('DOMContentLoaded', function() {

	showBlockedSites();

	chrome.storage.sync.get('isStudying', function(res){
		var isStudying = res.isStudying;

		if (isStudying) {
			document.getElementById('study_button').innerHTML = "Stop";
		} else {
			document.getElementById('study_button').innerHTML = "Start";
		}

	});

	var link = document.getElementById('study_button');
    // onClick's logic below:
    link.addEventListener('click', function() { 

    	toggleStudyMode();
    });
});

function toggleStudyMode() {

	chrome.storage.sync.get('isStudying', function(res){
		var isStudying = res.isStudying;

		if (isStudying) {
			isStudying = false;
			document.getElementById('study_button').innerHTML = "Stop";
		} else {
			isStudying = true;
			document.getElementById('study_button').innerHTML = "Start";
		}

		chrome.storage.sync.set({'isStudying': isStudying});

	});

}

function deleteBlockedSite(e, item) {
	e.preventDefault();
	$(item).parent().fadeOut('slow', function() { 
		$(item).parent().remove();
	});
}

$(function() {

	$("#add-blocked-site").on('click', function(e){
		e.preventDefault();
		addBlockedSite();
		submitBlockedSites($('#form-banned-sites').serializeArray());
	});

	$("#site-list").on('click', '.blocked-site-delete', function(e){
		var item = this; 
		deleteBlockedSite(e, item);
		submitBlockedSites($('#form-banned-sites').serializeArray());
	})

});

function addBlockedSite() {
	var blockedSite = $("#new-blocked-site").val();

	if (blockedSite === '' || blockedSite === undefined || blockedSite === null) {
		// #TODO: Make better LOL
		alert('Input CANNOT be empty silly!');
	} else if(/^[a-zA-Z0-9- ]*$/.test(blockedSite) == false) {
	    alert('Your input can only contain letters and hyphens!');
	} else {
		// #TODO: Add fav icon?
		$("#site-list").append("<li><input type='text' hidden" + 
			" name='hostContains'" +
			" value='."+ 
			blockedSite + 
			".'>" +
			blockedSite +
			"</input>" +
			"<button class='blocked-site-delete'>"+
			"Delete</button></li>");

		$("#new-blocked-site").val("");
	}
	
}

function showBlockedSites() {
	
	chrome.storage.sync.get('blockedSites', function(res){
		var bannedSites = res.blockedSites;

		console.log(bannedSites);

		for (i in bannedSites) {
		    $("#site-list").append("<li><input type='text' hidden" + 
				" name='hostContains'" +
				" value='"+ 
		    	bannedSites[i].value + 
				"'</input>" +
				bannedSites[i].value +
				"<button class='blocked-site-delete'>"+
				"Delete</button></li>");
		}
	});

}

function submitBlockedSites(sites){
	chrome.storage.sync.set({'blockedSites': sites});
}
