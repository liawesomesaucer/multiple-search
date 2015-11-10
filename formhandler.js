// This page handles the construction and listening of the forms

// This is the list of strings you should add to.
// This list includes some pre-found ones. Uncomment them for them to show up.
// You can also change the order (the page order will reflect the order of this "list")
// Format: 
//			name-you-want-displayed: url-of-search-path
//
// You can also move them around to change their orders
var error = false;
//const default_urls = ["Bing", "Google", "Google_Images", "Wikipedia", "Youtube"];
const msg_form_inc = " bar contains no input. Please check again";
const url_strings = {
	"Amazon": "http://www.amazon.com/s/field-keywords=",
	"Bing": "https://bing.com/search?q=",
	"Dictionary_com": "http://dictionary.reference.com/misspelling?term=",
	// "Flickr": "https://www.flickr.com/search/?text=",
	"Google": "https://google.com/#q=",
	"Google_Images": "https://www.google.com/search?tbm=isch&q=",
	"KhanAcademy": "https://www.khanacademy.org/search?page_search_query=",
	"LinkedIn": "https://www.linkedin.com/vsearch/f?keywords=",
	"Quora": "https://www.quora.com/search?q=",
	"Reddit": "https://www.reddit.com/r/all/search?q=",
	// "SoundCloud": "https://soundcloud.com/search?q=",
	"Ted": "http://www.ted.com/search?q=",
	// "Thesaurus_com": "http://www.thesaurus.com/misspelling?term=",
	"Twitter": "https://twitter.com/search?q=",
	"Wikipedia": "https://en.wikipedia.org/wiki/Special:Search?search=",	
	"Yahoo": "https://search.yahoo.com/search?p=",
	"Yahoo_Answers": "https://answers.yahoo.com/search/search_result?p=",
	"YouTube":"https://www.youtube.com/results?search_query=",
}
const default_urls = {
	"Bing": "https://bing.com/search?q=",
	"Google": "https://google.com/#q=",
	"Google_Images": "https://www.google.com/search?tbm=isch&q=",
	"Wikipedia": "https://en.wikipedia.org/wiki/Special:Search?search=",	
	"YouTube":"https://www.youtube.com/results?search_query=",
}
const some_random_urls = {	// For test purposes
	"Ted": "http://www.ted.com/search?q=",
	"LinkedIn": "https://www.linkedin.com/vsearch/f?keywords=",
	"Quora": "https://www.quora.com/search?q=",
	"Reddit": "https://www.reddit.com/r/all/search?q=",
	"Twitter": "https://twitter.com/search?q=",
}
//var cookies_json = decode_cookie( document.cookie );
// if (document.cookie.length == 0) {
// 	console.log("No cookies found. Setting default cookies and showing defaults");
// 	document.cookie = encode_cookie( default_urls )
// }

// Now dealing with the sidebar
sidebar_shown = false;

$('#sidebar-toggle').click( function(){
	if (sidebar_shown == true) {
		$(".sidebar").animate({'left': '-300px'}, 500);
		$(".wrapper").animate({'padding-left':'0px'},500);
		sidebar_shown = false;
	} else {
		$(".sidebar").animate({'left': '0px'}, 500);
		$(".wrapper").animate({'padding-left':'300px'},500);
		sidebar_shown = true;
	}
});


function decode_cookie( cookie_string ) {
	// Converts cookie_string to valid json
	// Call it on document.cookie
	var cookie_json = {};
	var cookie_list = cookie_string.split("; ");
	for (var j=0;j<cookie_list.length;j++) {
		if (cookie_list[j].length == 0) continue;
		cookie_tuple = cookie_list[j].split("=");
		cookie_json[cookie_tuple[0]] = cookie_tuple[1];
	}	
	return cookie_json;
}

function encode_cookie( cookie_json ) {
	// Creates a cookie
	var cookie_string = "";
	jQuery.each( cookie_json, function(key, val) {	
		cookie_string = cookie_string + key + "=" + val + "; ";
	});
	return cookie_string;
}

function validate_search() {
	// Validates if input search is valid	
}

function setup_and_listen( url_strings ) {
	checked_urls = find_checked_urls( url_strings )
	setup( checked_urls );
	listen( checked_urls );
}

function setup( url_strings ) {		// I should use react for this
	// Builds the html page based on url_strings
	var setup_string = '';
	jQuery.each( url_strings, function(key, val) {
		setup_string = setup_string + 
		'<li class="li-form-elem">' + 
			'<form class="form-elem" id="'+key+'">' + 
				'<input class="inline input-box" id="'+key+'-input" type="text" name="'+key+'" placeholder="'+key+'" autofocus>' + 
				'<input class="inline input-submit" id="'+key+'-submit" type="submit" value="&rarr;" tabindex="-1">' + 
			'</form>' +
		'</li>';
	});
	$( '.inner-ul' ).html( setup_string );
}

function listen( url_strings ) {
	// Listens for a submit event from any of the forms
	jQuery.each( url_strings, function(key, val) {
		$( "#" + key ).submit( function( ev ) {
			ev.preventDefault();
		    if ( $( "#" + key + "-input" ).val() )
		    	document.location=val + $( "#" + key + "-input" ).val();
		    else display_banner( key, error=true, msg_form_inc );
		});
	});
}

function display_banner( key, error, message ) {
	// Displays banner messages
	if ( error ) 
		$( ".banner" ).css( { "background-color": "#fff"});
	$( "#banner-msg" ).text( key + message );
	error = false;
}

setup_and_listen( url_strings );
// Convert url_list json into string
// set as cookie
// figure out how to set and get
function find_checked_urls( url_strings ) {
	// Generates each setting tab
	var settings_string = "";
	jQuery.each( url_strings, function(key, val) {
		settings_string = settings_string + 
			'<li id="sidebar-' + key + '" class="sidebar-elem">' +
				'<p class="sidebar-elem-name">' + key + '</p>' + 
				'<div class="slideThree">' + 	
					'<input type="checkbox" value="None" id="slideThree-'+ key + '" class="slideThree-input" onclick="rebuild_page(this)" name="check" />' + 
					'<label for="slideThree-' + key + '"></label>' + 
				'</div>' + 
			'</li>';
	});
	$( "#sidebar-list" ).html(settings_string);

	// Checks boxes that are configurated by cookies
	if (document.cookie) cookies_json = decode_cookie(document.cookie);
	else cookies_json = "";

	// IN case no search bars shown: WORKS but commented for debug purposes
	if (jQuery.isEmptyObject(cookies_json)) cookies_json = default_urls;
	// if (jQuery.isEmptyObject(cookies_json)) cookies_json = some_random_urls;

	// Check the urls that are in cookies_json
	jQuery.each( cookies_json, function(key, val) {
		if (cookies_json[key] != undefined) {
			document.getElementById('slideThree-' + key).checked = true;
		}
	});
	return cookies_json;
}

function rebuild_page(checkbox) {
	// Reconfigures search bars; called each time setting is changed
	// Also adds/removes cookies based on preferences
	var checkbox_name = checkbox.id.split("slideThree-")[1];
	if (checkbox.checked == true) {
		console.log(checkbox_name + " has been added to preferences");
		cookies_json[checkbox_name] = url_strings[checkbox_name];
		add_cookie(checkbox_name, url_strings[checkbox_name]);
	}
	else {
		console.log(checkbox_name + " has been removed from preferences");
		delete cookies_json[checkbox_name];
		delete_cookie(checkbox_name);
	}
	setup(cookies_json);
	console.log(cookies_json);
	// document.cookie = encode_cookie(cookies_json);
	console.log(encode_cookie(cookies_json));
	console.log(document.cookie);
	test_cookie = decode_cookie(document.cookie);
	console.log(test_cookie);
}

console.log(document.cookie);
console.log("wow");

function add_cookie( key, url ) {
	document.cookie = key + "=" + url + "; ";
}

function delete_cookie( key ) {
	document.cookie = key + "=;";
}