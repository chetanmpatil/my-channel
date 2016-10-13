$(document).ready(function() {

	$(".headroom").headroom({
		"tolerance":10,
		"offset": 50,
		"classes": {
			"initial": "animated",
			"pinned": "slideDown",
			"unpinned": "slideUp"
		}
	});

});
var footer1=$(".footer1");
var Yposition;
/*function slidfooter()
{
	Yposition=window.pageYOffset;
	
	
}
window.addEventListener('scroll',slidfooter);*/
