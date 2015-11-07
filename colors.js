// Color schemes.
// Pick one of the dank implemented color schemes
color_scheme = "calm_green";

var colors = {

	"dank_blue" : {
		"main-color" : "#006666",
		"background-color" : "#33ffff",
		"input-background-color" : "#00cccc",
		"input-background-hover" : "#00b2b2",
		"banner-color": "#fff"
	},

	"default_grayscale" : {
		"main-color" : "#666",
		"background-color" : "#fff",
		"input-background-color" : "#e6e6e6",
		"input-background-hover" : "#8c8c8c",
		"banner-background-color": "#e6e6e6"
	},

	"default_blue_accent" : {
		"main-color" : "#006666",
		"background-color" : "#e6e6e6",
		"input-background-color" : "#d2d2d2",
		"input-background-hover" : "#8c8c8c",
		"banner-background-color": "#e6e6e6"
	},

	"default_dark" : {
		"main-color" : "#222",
		"background-color" : "#555",
		"input-background-color" : "#bbbbbb",
		"input-background-hover" : "#666",
		"banner-background-color": "#bbbbbb"
	},

	"calm_green" : {
		"main-color" : "rgba(0, 0, 0, 0.5)",
		"background-color" : "#2dcb89",
		"input-background-color" : "rgba( 0, 0, 0, 0.25 )",
		"input-background-hover" : "rgba( 0, 0, 0, 0.8 )",
		"banner-background-color": "rgba( 255, 255, 255, 0.8 )"
	}
}


display_color_switcher = false;

function change_colors( color_scheme ) {
	color_settings = colors[color_scheme];
	$( "*" ).css({ "color": color_settings["main-color"]});
	$( ".wrapper" ).css({ "background-color":color_settings["background-color"] });
	$( "input" ).css({ "background-color": color_settings["input-background-color"]});
	$( ".banner" ).css({ "background-color": color_settings["banner-background-color"]});
}
change_colors( color_scheme );