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

if (window.cookie = "") {
	console.log("No cookies found. Setting default cookies and showing defaults");
	set_default_cookies();
	window.cookie = encode_cookie( default_urls )
}

function decode_cookie( cookie_string ) {
	// Converts cookie_string to valid json
	// Call it on window.cookie
	cookie_json = {};
	cookie_list = cookie_string.split(";");
	for (var j=0;j<cookie_list.length;j++) {
		if (cookie_list[j] === "") continue;
		cookie_tuple = cookie_list[j].split("=");
		cookie_json[cookie_tuple[0]] = cookie_tuple[1];
	}	
	return cookie_json;
}

function encode_cookie( cookie_json ) {
	// Creates a cookie
	cookie_string = ""
	jQuery.each( cookie_json, function(key, val) {	
		cookie_string = cookie_string + key + "=" + val + ";";
	});
}

function validate_search() {
	// Validates if input search is valid	
}

function setup_and_listen( url_strings ) {
	checked_urls = find_checked_urls( url_strings )
	setup( checked_urls );
	listen( checked_urls );
}

function setup( url_strings ) {
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
		    	window.location=val + $( "#" + key + "-input" ).val();
		    else display_banner( key, error=true, msg_form_inc );
		});
	});
}

function display_banner( key, error, message ) {
	// Displays messages
	if ( error ) 
		$( ".banner" ).css( { "background-color": "#fff"});
	$( "#banner-msg" ).text( key + message );
	error = false;
}

setup_and_listen( url_strings );
// Convert url_list json into string
// set as cookie
// figure out how to set and get

// Now dealing with the sidebar
sidebar_shown = false;

$('#sidebar-toggle').click( function(){
	if (sidebar_shown == false) {
		$(".sidebar").animate({'left': '-300px'}, 500);
		$(".wrapper").animate({'padding-left':'0px'},500);
		sidebar_shown = true;
	} else {
		$(".sidebar").animate({'left': '0px'}, 500);
		$(".wrapper").animate({'padding-left':'300px'},500);
		sidebar_shown = false;
	}
});

// console.log(JSON.stringify(url_strings));
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function find_checked_urls( url_strings ) {

	var settings_string = "";
	// document.cookie.split(/\s*;\s*/).forEach(function(pair) {
 //  		pair = pair.split(/\s*=\s*/);
 //  		cookies[pair[0]] = pair.splice(1).join('=');
	// });
	// document.cookie = url_strings;

	// Generates each setting tab
	jQuery.each( url_strings, function(key, val) {
		settings_string = settings_string + 
			'<li id="sidebar-' + key + '" class="sidebar-elem">' +
				'<p class="sidebar-elem-name">' + key + '</p>' + 
				'<div class="slideThree">' + 	
					'<input type="checkbox" value="None" id="slideThree-'+ key + '" name="check" />' + 
					'<label for="slideThree-' + key + '"></label>' + 
				'</div>' + 
			'</li>';
	});
	$( "#sidebar-list" ).html(settings_string);

	// Checks boxes that are configurated by cookies
	cookies_json = decode_cookie(window.cookie);

	// IN case no search bars shown
	// if (jQuery.isEmptyObject(cookies_json)) cookies_json = default_urls;


	jQuery.each( cookies_json, function(key, val) {
		if (cookies_json[key] != undefined) {
			// checked_urls[key] = val;
			document.getElementById('slideThree-' + key).checked = true;
		}
	});
	return cookies_json;
	//return (Object.keys(checked_urls).length != 0) ? checked_urls : url_strings;
}