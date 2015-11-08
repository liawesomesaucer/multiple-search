// This page handles the construction and listening of the forms

// This is the list of strings you should add to.
// This list includes some pre-found ones. Uncomment them for them to show up.
// You can also change the order (the page order will reflect the order of this "list")
// Format: 
//			name-you-want-displayed: url-of-search-path
//
// You can also move them around to change their orders
var default_urls = ["Bing", "Google", "Google_Images", "Wikipedia", "Youtube"];
var msg_form_inc = " bar contains no input. Please check again";
var error = false;
var url_strings = {
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
function setup_and_listen( url_strings ) {
	checked_urls = find_checked_urls( url_strings )
	setup( checked_urls );
	listen( checked_urls );
}

// Builds the html page based on url_strings
function setup( url_strings ) {
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

// Listens for a submit event from any of the forms
function listen( url_strings ) {
	jQuery.each( url_strings, function(key, val) {
		$( "#" + key ).submit( function( ev ) {
			ev.preventDefault();
		    if ( $( "#" + key + "-input" ).val() )
		    	window.location=val + $( "#" + key + "-input" ).val();
		    else display_banner( key, error=true, msg_form_inc );
		});
	});
}

// Displays messages
function display_banner( key, error, message ) {
	if ( error ) 
		$( ".banner" ).css( { "background-color": "#fff"});
	$( "#banner-msg" ).text( key + message );
	error = false;
}

setup_and_listen( url_strings );


// Now dealing with the sidebar
sidebar_shown = false;

$('#sidebar-toggle').click( function(){
	if (sidebar_shown == false) {
		$(".sidebar").animate({'left': '-300px'}, 500);
		$(".wrapper").animate({'padding-left':'20px'},500);
		sidebar_shown = true;
	} else {
		$(".sidebar").animate({'left': '0'}, 500);
		$(".wrapper").animate({'padding-left':'300px'},500);
		sidebar_shown = false;
	}
});


function find_checked_urls( url_strings ) {

	var settings_string = '';
	var cookies ={};
	var checked_urls = {};

	document.cookie.split(/\s*;\s*/).forEach(function(pair) {
  		pair = pair.split(/\s*=\s*/);
  		cookies[pair[0]] = pair.splice(1).join('=');
	});
	// document.cookie = url_strings;

	// Generates each cookie
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
	jQuery.each( url_strings, function(key, val) {
		if (cookies[key] != undefined) {
			checked_urls[key] = val;
			document.getElementById('slideThree-' + key).checked = true;
		}
	});
	// console.log(checked_urls)
	return (Object.keys(checked_urls).length != 0) ? checked_urls : url_strings;
}