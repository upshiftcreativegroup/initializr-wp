var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");

/*
var videoDefer = document.getElementsByTagName('source');
for (var i=0; i<videoDefer.length; i++) {
if(videoDefer[i].getAttribute('data-init-load')) {
videoDefer[i].setAttribute('src',videoDefer[i].getAttribute('data-init-load'));
} }

var videoElem = document.getElementsByTagName('video');
videoElem[0].play();
*/
function deferBg() {
var bgDefer = document.getElementsByClassName('defer_bg');
for (var i=0; i<bgDefer.length; i++) {
if(bgDefer[i].getAttribute('data-bg-load')) {
bgDefer[i].setAttribute('style',bgDefer[i].getAttribute('data-bg-load'));
} } }

function deferImg() {
var imgDefer = document.getElementsByClassName('defer_img');
for (var i=0; i<imgDefer.length; i++) {
if(imgDefer[i].getAttribute('data-src')) {
imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
} } }


// find tallest .parent by measuring .height-block heights within
function unifyGrid() {
    var maxHeight = -1;

    $('.heightblock').each(function() {
        var inner = $(this).children('.innerheight');
        maxHeight = maxHeight > inner.height() ? maxHeight : inner.height();
    });
    $('.heightblock').each(function() {
        $(this).height(maxHeight);
        //console.log(maxHeight);
    });
}
function tabHelper() {
	var helper = $('.height-helper');
	var currHeight = helper.height();
	helper.height(currHeight);

	var tabHeight = helper.children('div.active').height();
	helper.height(tabHeight);
}


$.easing.jswing = $.easing.swing;
$.extend($.easing,
{
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
});

	if($('.hb-slider').length) {
		var hbSlider = $('.hb-slider');
		hbSlider.on('init', function(event, slick, currentSlide, nextSlide) {
			//homy.find('.slick-slide[data-slick-index="0"]').customLazyHead();
			//homy.find('.slick-slide[data-slick-index="1"]').customLazyHead();
			hbSlider.addClass('slideon');

			setTimeout(function() {
				$('.slick-current').addClass('custom-current');
			},300);
			
		});
		hbSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			$('.slick-current').removeClass('custom-current');
		});
		hbSlider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
			$('.slick-current').addClass('custom-current');
		});
		hbSlider.slick({
			centerMode: false,
			slidesToShow: 1,
			pauseOnHover: false,
			slidesToScroll: 1,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 8000,
			speed: 650,
			fade: true,
			dots: false,
			draggable: false,
			swipe: false,
			touchMove: false,
			arrows: false,
			easing: 'easeInOutCubic'
		});
		
		if($('.slick-slide[data-slick-index="1"]').length) { // > 1 slide
			hbSlider.append('<div class="customprev"><i class="fa fa-angle-left"></i></div><div class="customnext"><i class="fa fa-angle-right"></i></div>');
			hbSlider.find('.customnext').click(function(cn) {
				cn.preventDefault();
				hbSlider.slick('slickNext');
			});
			hbSlider.find('.customprev').click(function(cp) {
				cp.preventDefault();
				hbSlider.slick('slickPrev');
			});
		}

