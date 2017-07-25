

window.onload = function () {
	
	var indicator = document.getElementById("indicator");
	indicator.style.visibility = "hidden";
	

};

function register(){
	var FEED_URL = "http://83.69.213.178:8081/init?device_id=02";
	$(document).ready(function () {
	    $.ajax({
	        type: "post",
	        dataType: 'json',
	        url: FEED_URL,
	        success: function (data) {
	            console.log(data);   
	        }
	    });
	});
}

function getcoord(){
	var x, y;
	if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {maximumAge: 60000, timeout: 100000});
        document.getElementById('locinfo').innerHTML = 'Geolocation is supported. watchid=' + watchId;

    } else {
        document.getElementById('locinfo').innerHTML = 'Geolocation is not supported.';
    }
	
	function successCallback(position) {
	    x = position.coords.latitude;
	    y = position.coords.longitude;
        document.getElementById('locinfo').innerHTML = 'successCallback:'+x+" "+y;
        
	}
	function errorCallback(error) {
	    document.getElementById('locinfo').innerHTML = "errorCallback";

	}
}




function check(){
	var x, y;
	if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {maximumAge: 60000, timeout: 100000});
        document.getElementById('locinfo').innerHTML = 'Geolocation is supported. watchid=' + watchId;

    } else {
        document.getElementById('locinfo').innerHTML = 'Geolocation is not supported.';
    }
	
	function successCallback(position) {
	    x = position.coords.latitude;
	    y = position.coords.longitude;
        document.getElementById('locinfo').innerHTML = 'successCallback';
	    
	    
	    var FEED_URL = "http://83.69.213.178:8081/check_point?game_id=02&latitude=" + x + "&longitude=" + y;
		$(document).ready(function () {
		    request = $.ajax({
		        type: "post",
		        dataType: 'json',
		        url: FEED_URL,
		        success: function (data) {
		            console.log(data);   
		        },
		    });
		    request.done(function (response, textStatus, jqXHR){
		        // Log a message to the console
		    	if (response['status'] == 'ok') {
		    		document.getElementById('distinfo').innerHTML = response["distance"] + " " + response["remained_points"];
		    	}
		    	if (response['status'] == 'found') {
		            $("#locinfo").append(response["description"]);
		            alert("found point");
		            
		    	}
		        console.log("Hooray, it worked!");
		    });
		    request.fail(function (jqXHR, textStatus, errorThrown){
		        // Log the error to the console
		        console.error(
		            "The following error occurred: "+
		            textStatus, errorThrown
		        );
		    });
		    
		});
	}

	function errorCallback(error) {
	    console.log("errorCallback");
	}
	
}


function searchiTunes(){
	var FEED_URL = "https://itunes.apple.com/search?term=beardycast";
	$(document).ready(function () {
	    request = $.ajax({
	        type: "get",
	        dataType: 'json',
	        url: FEED_URL,
	        success: function (data) {
	            console.log(data);   
	        }
	    });
	    /*request.done(function (response, textStatus, jqXHR){
	        // Log a message to the console
	        console.log("Hooray, it worked!");
	    });
	    request.fail(function (jqXHR, textStatus, errorThrown){
	        // Log the error to the console
	        console.error(
	            "The following error occurred: "+
	            textStatus, errorThrown
	        );
	    });
        console.log(response);*/
	});
}


function searchResults(){
	var FEED_URL = "http://83.69.213.178:8081/init?device_id=02";
	$(document).ready(function () {
	    request = $.ajax({
	        type: "get",
	        dataType: 'json',
	        url: FEED_URL,
	        success: function (data) {
	            console.log(data);   
	        }
	    });
	    /*request.done(function (response, textStatus, jqXHR){
	        // Log a message to the console
	        console.log("Hooray, it worked!");
	    });
	    request.fail(function (jqXHR, textStatus, errorThrown){
	        // Log the error to the console
	        console.error(
	            "The following error occurred: "+
	            textStatus, errorThrown
	        );
	    });
        console.log(response);*/
	});
}




function getFeed(){
	var indicator = document.getElementById("indicator");
	indicator.style.visibility = "visible";
    var width = screen.width;
	var FEED_URL = "http://beardycast.libsyn.com/rss";

	$(document).ready(function () {
		    $.ajax({
		        type: "GET",
		        url: FEED_URL,
		        dataType: "xml",
		        success: xmlParser
		    });
		});

		function xmlParser(xml) {
			indicator.style.display = "none";
			var cur = 0;
		    $(xml).find("item").each(function () {
		    var url =  $(this).find("enclosure").attr('url')
		    $('div[data-role=collapsible]').collapsible();

		    $("#rssContent").append('<div class="feed"><div class="image"><img src="podcast.jpg" width=' + width + 'px /><div class="title">' + $(this).find("title").text() 
		    + '</div><br><div data-role="collapsible"><h1>Click to see description</h1><p>' + $(this).find("description").text() + '</p></div><audio controls><source src=' + url + '></audio></div>');
		    });
		}
}