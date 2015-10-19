// This page handles the construction and listening of the forms

// This is the list of strings you should add to.
// This list includes some pre-found ones. Uncomment them for them to show up.
// You can also change the order (the page order will reflect the order of this "list")
// Format: 
//			name-you-want-displayed: url-of-search-path
//
// You can also move them around to change their orders
var url_strings = {
	"Bing": "https://bing.com/search?q=",
	"Google": "https://google.com/#q=",
	// "Amazon": "http://www.amazon.com/s/field-keywords=",
	"Google Images": "https://www.google.com/search?tbm=isch&q=",
	"Wikipedia": "https://en.wikipedia.org/wiki/Special:Search?search=",
	"YouTube":"https://www.youtube.com/results?search_query=",
	// "Yahoo Answers": "https://answers.yahoo.com/search/search_result?p=",
	// "Quora": "https://www.quora.com/search?q=",
	// "Yahoo": "https://search.yahoo.com/search?p=",
	// "KhanAcademy": "https://www.khanacademy.org/search?page_search_query=",
	// "Ted": "http://www.ted.com/search?q=",
	// "Twitter": "https://twitter.com/search?q=",
	// "SoundCloud": "https://soundcloud.com/search?q=",
	// "LinkedIn": "https://www.linkedin.com/vsearch/f?keywords=",
	// "Dictionary.com": "http://dictionary.reference.com/misspelling?term=",
	// "Thesaurus.com": "http://www.thesaurus.com/misspelling?term=",
	// "Reddit": "https://www.reddit.com/r/all/search?q=",
	// "Flickr": "https://www.flickr.com/search/?text=",
}

// If you're looking at this you probably know what you're doing so...GET CRACKIN AND MAKE IT EVEN BETTER :)))))
var msg_form_inc = " bar contains no input. Please check again";
var error = false;
var setup_string = '';

function setup_and_listen( url_strings ) {
	setup( url_strings );
	listen( url_strings );
}

// Builds the html page based on url_strings
function setup( url_strings ) {
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