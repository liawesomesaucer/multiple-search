// Handles tabs in the settings page
// Depends on both other files

const about_string = '<h3>Multiple Search, v1.1</h3>' + 
	'<div class="about_paragraph"><p>Multiple Search allows you to have all your' +
	' search bars on one page.  You can clone the repo' + 
	' <a class="underline" href="http://github.com/liawesomesaucer/multiple-search">here</a>.' +
	'</p></div>' + 
	'<div class="about_paragraph"><p>- Javascript is required for this to work.</p>' +
	'<p>- Cookies are required to remember preferences</p></div>' +
	'<div class="about_paragraph"><h4>Latest additions:</h4></div>' +
	'<div class="about_paragraph"><p>- Colors can now be changed from the client but not yet stored</p>' +
	'<p>- Now uses cookies to store your selected search bars</p></div>';

// Handling event clicks
$("#url_settings").click( function() {
	tab_urls();
});
$("#color_settings").click( function() {
	tab_colors();
});
$("#about_settings").click( function() {
	tab_about();
});


function tab_urls() {
	find_checked_urls( url_strings );
	change_colors( color_scheme );
	dehighlight_tab("#about_settings")
	dehighlight_tab("#color_settings");
	highlight_tab("#url_settings");
}
function tab_colors() {
	color_settings_string = "<h2>Color Schemes</h2><ul>";
	jQuery.each( colors, function(key, val) {
		color_settings_string = color_settings_string + 
		'<a class="change_color" id="change_color_to_'+ key + '"><li class="color_box">' +
			'<div class="color_background" id="color_background_'+ key +'">' +
				'<div class="color_input" id="color_input_' + key + '">' +
					'<p class="color_text" id="color_text_' + key + '">' + key + '</p>' +
				'</div>' +
			'</div>' +
		'</li></a>';
	});
	color_settings_string = color_settings_string + "</ul>"
	$("#sidebar-list").html(color_settings_string);
	jQuery.each( colors, function(key, val) {
		setup_color_schemes(key, val);
	});
	dehighlight_tab("#about_settings")
	dehighlight_tab("#url_settings");
	highlight_tab("#color_settings");
	color_scheme_listen();
}
function tab_about() {
	$( "#sidebar-list" ).html(about_string);
	change_colors( color_scheme );
	dehighlight_tab("#color_settings");
	dehighlight_tab("#url_settings");
	highlight_tab("#about_settings");
}

function highlight_tab(elem_id) {
	$(elem_id + " li").css({"background-color": color_settings["background-color"],
							"border": "1px solid",
							"margin": "0",
							"border-bottom": "none",});	// Do stuff
}

function dehighlight_tab(elem_id) {
	$(elem_id + " li").css({"background-color": color_settings["input-background-color"],
							"border": "none",
							"margin": "1px 1px 0 1px"});
}

function setup_color_schemes( key, val ) {
	$("#color_background_" + key ).css({"background-color": val["background-color"]});
	$("#color_input_" + key ).css({"background-color": val["input-background-color"]});
	$("#color_text_" + key ).css({"color": val["main-color"] + " !important" });
	$("#color_background_" + key ).css({"border": "1px solid " + val["main-color"] });
}
// By default, highlight the urls tab
highlight_tab("#url_settings");
function color_scheme_listen() {
	$( ".change_color").click( function() {
		color_scheme = this.id.split("change_color_to_")[1];
		change_colors( color_scheme );
		dehighlight_tab("#about_settings");	// Deals with tab colors
		dehighlight_tab("#url_settings");
		highlight_tab("#color_settings");
		// tab_colors();
	});
}