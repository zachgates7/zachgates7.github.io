$(window).bind("load", function () {
	$(window).on("resize", resize);
	$("body").css("opacity", 1);
	resize();
	redirectAnchors();
	setupScene();
	handleAccent();
	setTimeout(redirect, 500);
});

/* Calculate viewport width and height */

var calcFull = function () {
	return [
		$(window).width(),
		$(window).height(),
	];
}

var calcFullPx = function () {
	return calcFull().map(function (e) {
		return e + "px";
	});
}

/* Calculate padding needed to center an element */

var calcPadPx = function (elem) {
	var full = calcFull();
	var w = (full[0] - $(elem).width())  / 2 + "px",
		h = (full[1] - $(elem).height()) / 2 + "px";
	return [w, h];
}

/* Handle resize of viewport */

var resize = function () {
	handleCover(...calcFullPx());
	handleCenter();
}

/* Handle "cover" class during resize */

var handleCover = function (w, h) {
	$("div.cover").css({               // Exact cover.
		width: w,
		height: h,
	});
	$("div.cover-m").css({             // Minimum cover.
		maxWidth: w,
		minHeight: h,
	});
	$("div.cover-w").css({width:  w}); // Cover width.
	$("div.cover-h").css({height: h}); // Cover height.
}

/* Handle "center" class during resize */

var handleCenter = function () {
	function applyPad (needw, needh) {
		var pad = calcPadPx(this);
		if (needw || false) {
			$(this).css("left", pad[0]);
		}
		if (needh || false) {
			$(this).css("top", pad[1]);
		}
	}
	$("div.center").each(applyPad, [true, true]);    // Center width and height.
	$("div.center-w").each(applyPad, [true, false]); // Center width-only.
	$("div.center-h").each(applyPad, [false, true]); // Center height-only.
}

/* Setup */

var setupScene = function () {
	$("div.cont-section span.media").each(function () {
		$(this).css("height", $(this).width() + "px");
	});
}

/* Handle accent colors */

var handleAccent = function () {
	var iters = 0,
		bgs = [
			"#a87bca", // Purple
			"#7b97ca", // Blue
			"#7bcaa4", // Green
			"#c9ca7b", // Yellow
			"#ca9c7b", // Orange
			"#ca7b88", // Red
		];
	$("div#info-cont span.media").each(function () {
		var def = "color 0.5s, opacity 0.5s, background-color ",
			num = (Math.random() * 10) + 1;
		$(this).css("transition", def + num + "s");
	});
	function swapColor () {
		$(".accent").css("background-color", bgs[iters % bgs.length]);
		iters++;
	}
	swapColor();
	setInterval(swapColor, 6000);
}

/* Handle links */

var redirectAnchors = function () {
	$("div#sidebar a").each(function () {
		var loc = this.href.split("/").pop();
		this.href = "javascript:scrollTo('" + loc + "')"
	});
}

var redirect = function () {
	var loc = window.location.hash.replace("#/", "");
	scrollTo(loc == "" ? "intro" : loc);
}

var scrollTo = function (query) {
	var pos = $("#" + query).offset().top;
	var page = $("html, body")
	page.animate({scrollTop: pos}, "slow", function () {
		page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
	});
	window.location.hash = "#/" + (query == "intro" ? "" : query);
}
