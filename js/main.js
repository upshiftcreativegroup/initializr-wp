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
} 
if(imgDefer[i].getAttribute('data-srcset')) {
imgDefer[i].setAttribute('srcset',imgDefer[i].getAttribute('data-srcset'));
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

function objectFit() {
	if ( ! Modernizr.objectfit ) {
		//console.log('no object-fit');
		$('img.object_fit').each(function() {
			var imgEl = $(this);
			var imgSrc;
			if(imgEl.attr('src') != '') {
				imgSrc = imgEl.prop('src');
			} else if(imgEl.data('src') != '') {
				imgSrc = imgEl.data('src');
			}
			//console.log('object-fit ' +imgSrc);
			imgEl.parent().addClass('bg').css('background-image', 'url(' + imgSrc + ')');
			imgEl.hide();
		}); 
	}
}

(function( $ ){
   $.fn.loadImg = function() {
   	this.attr('src', (this.data('src')));
   	this.attr('srcset', (this.data('srcset')));

      return this;
   }; 
})( jQuery );


$.easing.jswing = $.easing.swing;
$.extend($.easing,
{
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
});

if($('img.object_fit').length)
	objectFit();

if($('.defer_img').length)
	deferImg();

$('.nav_link').on('click', function(nav) {
	nav.preventDefault();
	$('.lpane, .rpane').toggleClass('pane_on');
	$('body').toggleClass('menu-on');
});


if($('.lazy_waypoint')) {
	$('.lazy_waypoint').waypoint(function(direction) {
		$(this.element).loadImg();
		this.destroy();
	}, {
		offset: '100%'
	});
}


if($('.hb-slider').length) {
	var hbSlider = $('.hb-slider');
	hbSlider.on('init', function(event, slick, currentSlide, nextSlide) {

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
		prevArrow: '<div class="customprev"><i class="fa fa-angle-left"></i></div>',
		nextArrow: '<div class="customnext"><i class="fa fa-angle-right"></i></div>',
		easing: 'easeInOutCubic'
	});
}


if($('.date_boy').length) {
		console.log('on');
		$('.date_boy input').flatpickr({
			dateFormat: "m/d/Y",
			minDate: "today",
			disableMobile: true
			//from: "today",
			//to: new Date().fp_incr(365) 
		});
}

if($('.scrollto').length) {
	$('.scrollto').on('click', function(scr) {
		var scrollHash = $(this).attr('href');
		scr.preventDefault();
		$('html,body').animate({
		    scrollTop: $(scrollHash).offset().top - 96
		}, 500);	
	});
}

