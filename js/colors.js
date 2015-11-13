// Color schemes.
// Pick one of the dank implemented color schemes
var color_scheme = "Default_Blue_Accent";

const colors = {

	"Default_Blue_Accent" : {
		"main-color" : "#006666",
		"background-color" : "#fff",
		"input-background-color" : "#eeeeee",
		"input-background-hover" : "#8c8c8c",
		"banner-background-color": "#eeeeee"
	},

	"Grayscale" : {
		"main-color" : "#555",
		"background-color" : "#ddd",
		"input-background-color" : "#c2c2c2",
		"input-background-hover" : "#8c8c8c",
		"banner-background-color": "#ddd"
	},


	"Darkened" : {
		"main-color" : "#6f0005",
		"background-color" : "#555",
		"input-background-color" : "#666",
		"input-background-hover" : "#666",
		"banner-background-color": "#555"
	},

	"Blaring_Blue" : {
		"main-color" : "rgba(0, 0, 0, 0.5)",
		"background-color" : "#4ddbff",
		"input-background-color" : "rgba(0, 0, 0, 0.25)",
		"input-background-hover" : "rgba(0, 0, 0, 0.8)",
		"banner-color": "#rgba( 255, 255, 255, 0.8)"
	},


	"Calm_Green" : {
		"main-color" : "rgba(0, 0, 0, 0.5)",
		"background-color" : "#2dcb89",
		"input-background-color" : "rgba( 0, 0, 0, 0.25 )",
		"input-background-hover" : "rgba( 0, 0, 0, 0.8 )",
		"banner-background-color": "rgba( 255, 255, 255, 0.8 )"
	},

	"Cool_Purple" : {
		"main-color" : "rgba(0, 0, 0, 0.5)",
		"background-color" : "#a679d2",
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
	//$( ".banner" ).css({ "background-color": color_settings["banner-background-color"]});
	$( ".slideThree label").css({"background-color": color_settings["background-color"]});

	$( ".sidebar-content" ).css({ "background-color": color_settings["input-background-color"]});

}