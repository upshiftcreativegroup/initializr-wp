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

function switcher() {
	$('.switch_wrap').each(function() {
		var thisWrap = $(this);
		var switch1 = thisWrap.find('.switch1');
		var switch2 = thisWrap.find('.switch2');

		switchIt(switch1, switch2);

		$(window).resize(function() {
			switchIt(switch1, switch2);
		});
	});
}

function switchIt(switch1, switch2) {
	if($('#res').css('z-index') > 1) {

		switch1.insertBefore(switch2);
	} else {
		switch2.insertBefore(switch1);
	}
}

switcher();

function headHelp() {
	if($('.hello').length) {
		var newMin = 0;
		newMin = $('header .pure-g').height();
		newMin = newMin + 10;
		$('header').css('min-height', newMin);
	}
}
headHelp();

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
			if(imgEl.data('src')) {
				imgSrc = imgEl.data('src');
			} else if(imgEl.attr('src')) {
				imgSrc = imgEl.prop('src');
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


if($('.lazy_waypoint')) {
	$('.lazy_waypoint').waypoint(function(direction) {
		$(this.element).loadImg();
		this.destroy();
	}, {
		offset: '100%'
	});
}


function runSlider(hbSlider) {
	hbSlider.on('init', function(event, slick, currentSlide, nextSlide) {

		hbSlider.addClass('slideon');
		///hbSlider.find('[data-slick-index="0"] img').loadImg();

		setTimeout(function() {
			var current = $('.slick-current');

			current.addClass('custom-current');

			fadeSlide(current);


			hbSlider.find('img').each(function() {
				$(this).loadImg();
			});
		},200);

		if($(this).hasClass('news-slider') && $('#res').css('z-index') > 1 )
			unifyGrid();

		Waypoint.refreshAll();
		objectFit();

		//hbSlider.find('.slick-dots').wrap('<div class="padme"><div class="container centerm w100 rel"></div></div>');



	});
	hbSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		hbSlider.find('[data-slick-index="'+currentSlide+'"]').removeClass('custom-current');
	});
	hbSlider.on('afterChange', function(event, slick, currentSlide) {
		var current = hbSlider.find('[data-slick-index="'+currentSlide+'"]');
		fadeSlide(current);
	});

	var aHeight = false;
	var aTime = 6000;
	var autoplay = true;
	var hasDots = false;
	var touchStuff = true;
	var fading = true;

	if(hbSlider.hasClass('has_dots'))
		hasDots = true;

	if(hbSlider.hasClass('no_auto'))
		autoplay = false;

	if(hbSlider.hasClass('no_touching'))
		touchStuff = false;

	if(hbSlider.hasClass('nofading'))
		fading = false;

	hbSlider.waypoint(function(direction) {

		//console.log(hbSlider);

		hbSlider = $(this.element);
		setTimeout(function() {
			//console.log(hbSlider);
			hbSlider.slick({
				slide: '.slide',
				centerMode: false,
				slidesToShow: 1,
				pauseOnHover: false,
				slidesToScroll: 1,
				infinite: true,
				autoplay: autoplay,
				autoplaySpeed: aTime,
				speed: 650,
				pauseOnHover: false,
				fade: fading,
				dots: hasDots,
				draggable: touchStuff,
				swipe: touchStuff,
				touchMove: touchStuff,
				arrows: true,
				touchThreshold: 10,
				prevArrow: '<div class="customprev"><i class="fal fa-angle-left"></i></div>',
				nextArrow: '<div class="customnext"><i class="fal fa-angle-right"></i></div>',
				useTransform: true,
				cssEase: cB,
				adaptiveHeight: aHeight,
			});
		}, 500);



		this.destroy();
	},
	{offset: '150%'}
	);

}

function fadeSlide(current) {
	current.addClass('custom-current');
	current.find('.fade').each(function() {
		var currentFade = $(this);
		if(!currentFade.hasClass('faded'))
			currentFade.addClass('faded');
	});
}

if($('.slider').length) {

	$('.slider').each(function() {

		var hbSlider = $(this);


		if(hbSlider.hasClass('news_sl') && $('#res').css('z-index') < 2) {
			
			hbSlider.find('img').each(function() {
				$(this).loadImg();
			});

			return false;

		} 

		runSlider(hbSlider);
	});

	$(window).resize(function() {

		$('.news_sl').each(function() {
			if($(this).hasClass('news_sl') && !$(this).hasClass('slideon') && $('#res').css('z-index') > 1) {
				runSlider($('.news_sl'));
			} else if($(this).hasClass('news_sl') && $(this).hasClass('slideon') && $('#res').css('z-index') < 2) {
				$('.news_sl.slideon').slick('unslick').removeClass('slideon');
			}

		});

	});

}

if($('.hellobar').length) {
	var helloBar = $('.hellobar');
	var helloX = helloBar.find('.hello_x');
	var revTime = helloBar.data('rev');

	var helloCookie = Cookies.get('bar');
	//console.log('cur cookie: '+helloCookie);
	//console.log('revis time: '+revTime);

	if(helloCookie != revTime) {
		helloBar.removeClass('closed');
		Cookies.remove('bar');
		console.log('new cookie: '+Cookies.get('bar'));
	}

	helloX.click(function(h) {
		helloBar.addClass('closed');
		Cookies.remove('bar');
		Cookies.set('bar', revTime);
	});

}




if($('.scrollto').length) {
	$('.scrollto').on('click', function(scr) {
		var scrollHash = $(this).attr('href');
		scr.preventDefault();
		$('html,body').animate({
		    scrollTop: $(scrollHash).offset().top - 50
		}, 500);
	});
}

function hoverForm() {
	$('.form_bar').on('mouseover', function() {
		if(!$(this).hasClass('active'))
		$(this).addClass('hovered');
	});
	$('.form_bar').on('mouseout', function() {
		if(!$(this).hasClass('active'))
		$(this).removeClass('hovered');
	});
}
function openForm() {
	$('.form_bar').click(function() {
		if(!$(this).hasClass('active')) {
			$(this).addClass('active').off().removeClass('hovered');
			$('.bar_wrap').addClass('active');
			$('.form_block').removeClass('pure-u-md-5-6').addClass('pure-u-md-7-8');
			hoverForm();
		}
	});
}
$('.xb').click(function() {
	$('.form_bar').removeClass('active hovered');
	$('.form_block').removeClass('pure-u-md-7-8').addClass('pure-u-md-5-6');
	$('.bar_wrap').removeClass('active');
	setTimeout(function() {
		openForm();
	}, 200);
});
openForm();

$(document).keyup(function(e) {
	if(e.keyCode === 27 && $('.form_bar').hasClass('active')) {
		$('.xb').click();
	}
});

var vipButton = $('a[href="#vip"]');
vipButton.on('click', function(vip) {
	vip.preventDefault();

	if($('.form_bar').hasClass('active')) {
		/*
		$('.form_wrap').removeClass('cmon');
		setTimeout(function() {
			$('.form_wrap').addClass('cmon');
		}, 80);
		*/
	} else {
		$('.form_bar').click();
	}

});
vipButton.on('mouseover', function() {
	$('.form_bar').addClass('hovered');
});
vipButton.on('mouseout', function() {
	$('.form_bar').removeClass('hovered');
});
hoverForm();


var myElement = document.querySelector("body");
var headroom  = new Headroom(myElement, {
	"tolerance": 10,
});
headroom.init();




var splash = $('.splash_bg');
setTimeout(function() {
	//splash.removeClass('active');
	setTimeout(function() {
		//splash.removeClass('layer6').addClass('layer1');
	}, 1000);
}, 1000);


$('.nav_button').on('click', function(nav) {
	nav.preventDefault();

	if($(this).hasClass('of_info')) {
		$('.infopane').toggleClass('active');
	} else {
		$('.nav_pane').toggleClass('active');
		$('body').toggleClass('menu-on');
	}

});



lax.setup(); // init

document.addEventListener('scroll', function(e) {
  lax.update(window.scrollY) // update every scroll
}, false);

window.addEventListener("resize", function() {
	lax.populateElements();
});




var apiForm = $('form#api_form');
var allRows = $('.av_row_plan, .av_row_unit, .av_card');
var allClasses = 'selected_date selected_range selected_beds';
var checksOn;

if(apiForm.length) {
	$('select').niceSelect();
}


// plan accordion to show its units
$('.plan_link').on('click', function(p) {
	p.preventDefault();

	var thisLink = $(this);

	var lastRow = $('.av_row_plan.plan_selected');
	var thisRow = thisLink.closest('.av_row_plan');
	var planId = thisLink.data('planid');


	thisRow.toggleClass('plan_selected');


	if(thisRow.hasClass('plan_selected'))
		thisLink.find('.viewnum').html('Hide');

	lastRow.next('.av_row_units').slideUp(200, function() {

		lastRow.removeClass('plan_selected').find('.viewnum').html('View');

	});

	if(lastRow.get(0) != thisRow.get(0)) {

		$('.av_row_units[data-planid="'+planId+'"]').slideToggle(200, function() {

			if($(window).width() < 710) {
				$('html, body').animate({
					scrollTop: thisRow.offset().top
				}, 200);
			}
		});
	}
	/*
	if(thisRow.hasClass('plan_selected')) {
		thisRow.find('.viewnum').html('Hide');
	}

	if(!lastRow.hasClass('plan_selected')) {
		thisRow.find('.viewnum').html('View');
	}
	*/


});


apiForm.on('submit', function(s) {
	console.log('submit')
	s.preventDefault();

	// setup for no checkboxes checked
	checksOn = 0;

	var rentMin = 0;
	var rentMax = 999999;

	//init range
	rentMin = 0;
	if($('#maxRent').val() == 0) {
		rentMax = 999999;
	} else if($('#maxRent').val()) {
		rentMax = $('#maxRent').val();
	}

	// ranges
	allRows.each(function() {
		var thisMin = $(this).data('rmin');
		var thisMax = $(this).data('rmax');

		// mark for filter
		if(thisMin <= rentMax) {
			$(this).addClass('selected_range');
		} else if(thisMin < 0 && thisMax < 0) {
			$(this).addClass('selected_range');
		} else {
			$(this).removeClass('selected_range');
		}

	});

	// date
	var rentDate = $('#avDate').val();
	console.log(rentDate);
	if(!rentDate == 'Availability') {
		rentDate = new Date(rentDate);
	} else {
		// set move-in date to today if date field is blank
		rentDate = new Date();
	}

	rentDate.setDate(rentDate.getDate() + 90); // check 90 days after selected date
	//console.log(rentDate);

	allRows.each(function() {
		var thisDate = $(this).data('date');

		if(thisDate)
			thisDate = new Date(thisDate);

		//console.log(thisDate);

		// mark for filter
		if(thisDate <= rentDate) {
			$(this).addClass('selected_date');
		} else {
			$(this).removeClass('selected_date');
		}

	});

	// bed type
	thisCheck = $(this);
	var beds = apiForm.find('#avBeds').val();
	if(beds == 'studio')
		beds = '0';

	// mark for filter
	$('.av_row_plan, .av_row_unit, .av_card').removeClass('selected_beds');
	$('.av_row_plan[data-beds="'+beds+'"], .av_row_unit[data-beds="'+beds+'"], .av_card[data-beds="'+beds+'"]').addClass('selected_beds');
		checksOn = 1;

	//$('.av_row_plan[data-beds="'+beds+'"], .av_row_unit[data-beds="'+beds+'"]').removeClass('selected_beds');



	// no bed type checked
	if(!beds)
		allRows.addClass('selected_beds');


	// re-count filtered units per plan, apply available status of units to associated plan
	allRows.each(function() {

		var unitParent = $(this).parent('.av_row_units');

		if($(this).hasClass('selected_range') && $(this).hasClass('selected_beds') && $(this).hasClass('selected_date') && unitParent.length) {
			var unitPlanId = unitParent.data('planid');

			var unitCt = $(this).siblings('.av_row_unit.selected_range.selected_beds.selected_date').length + 1;

			$('.av_row_plan[data-planid="'+unitPlanId+'"], .av_card[data-planid="'+unitPlanId+'"]').addClass('selected_range selected_beds selected_date');
			$('.av_row_plan[data-planid="'+unitPlanId+'"] .numnum').text(unitCt);

		}
	});

	// finally, hide / show
	allRows.each(function() {
		if($(this).hasClass('selected_range') && $(this).hasClass('selected_beds') && $(this).hasClass('selected_date')) {
			$(this).slideDown(200);
		} else {
			$(this).slideUp(200);
		}

	});

	setTimeout(function() {
		lax.populateElements();
	}, 250);
	
});

$('.av_row_plan .av_spec').click(function() {

	var planSelect = $(this).closest('[data-planid]').data('planid');
	$('.plan_link[data-planid="'+planSelect+'"]').click();


});



var avDateField = document.getElementById('avDate');
var firstDate = $('#firstDate');

if(firstDate.length) {
	firstDate = new Date(firstDate.val());
} else {
	firstDate = new Date();
}

if(avDateField) {
	var pickr = avDateField.flatpickr({
		altInput: true,
		altFormat: 'm/d/Y',
		disableMobile: "true",
		minDate: firstDate,
		maxDate: new Date().fp_incr(90),
		onReady: function() {
		/*
		$('#rent-form #date').siblings('.calendar-icon').css('cursor','pointer').on('click', function() {
			pickr.toggle();
			$('#rent-form .flatpickr-input').click();
		});
		*/
		}
	});
}




var gBox = $('.gallery_box');
var gImgs = $('.gallery_img');
var baseUrl = $('head [rel="canonical"]').attr('href');
var galCat;

if(window.location.href.split('/gallery/')[1]) {



	galCat = window.location.href.split('/gallery/')[1].replace(/\//gi, '');


}


var cList = $('.cl_list');
if($('.cl_list').length) {
	var cHead = $('.cl_head');

	cHead.click(function() {


		if($('#res').css('z-index') < 2) {
			cList.slideToggle(250);
			cHead.toggleClass('opened');
		}

	});

	cList.find('.cl_item').click(function() {
		var newCat = $(this).text();
		if($('#res').css('z-index') < 2) {
			cHead.text(newCat);
			cHead.click();
		}
	});

}


if($('.cat_link')) {

	$('.cat_link').on('click', function(cl) {
		cl.preventDefault();

		$(this).addClass('active').siblings('.cat_link').removeClass('active');
		var thisCat = $(this).data('cat');

		gBox.addClass('transing');

		if(thisCat == 'all-photos') {
			history.replaceState(null,null,baseUrl);
		} else {
			history.replaceState(null,null,baseUrl+thisCat+'/');
		}

		$('.gallery_img').removeClass('spread');

		setTimeout(function() {

			gImgs.removeClass('active');
			$('.gallery_img[data-cats*="'+thisCat+'"]').addClass('active');

			gBox.removeClass('transing');

			$('.gallery_img.active.pure-u-sm-1-1').each(function() {
				var thisEl = $(this);
				var prevPrev = thisEl.prev().prev('.pure-u-sm-1-2.active');

				if( !thisEl.prev().is('.active') && prevPrev.length ) {
					prevPrev.addClass('spread');
				}


			});

			Waypoint.refreshAll();

		}, 350);


	});


	if($('.cat_link[data-cat="'+galCat+'"]').length) {
		$('.cat_link[data-cat="'+galCat+'"]').click();
		cHead.text(galCat);
	} else {
		$('.cat_link[data-cat="all-photos"]').addClass('active');
	}

}


$(window).resize(function() {

	//if($('popup_caption').length) {
		var getHeight = $('.popup_caption').height();
		$('.caption_inner').css('width', getHeight+'px');
	//}
	headHelp();

});

/*
var newCaption = '<div class="popup_caption no"><div class="caption_inner"><span class="h5 caption_target"></span></div></div>';
$('[data-fancybox]').fancybox({
	//afterLoad:
	beforeShow: function(instance, current) {
		current.$slide.find('.caption_target').html('');
	},
	afterShow: function(instance, current) {
		current.$slide.find('.fancybox-content').append('<div class="cap_x gray1 p1"><i class="far fa-times"></i></div>');
		current.$slide.find('.fancybox-content').append(newCaption);

		var thisContainer = $('.fancybox-container');
		var thisCaption = $('.fancybox-caption__body').html();

		if(thisContainer.hasClass('fancybox-show-caption'))
			current.$slide.find('.caption_target').html(thisCaption);
	
		setTimeout(function() {
			$('.popup_caption').removeClass('no');
		}, 100);

		
		$('.cap_x').on('click touchstart', function() {
			$.fancybox.close();
		});

	},
	clickContent: function(current, event) {
		return false;
	},
	arrows: true,
	wheel: false,
	btnTpl: {
		arrowLeft:
		'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left white" title="{{PREV}}">' +
		'<i class="far fa-3x fa-angle-left"></i>' +
		"</button>",

		arrowRight:
		'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
		'<i class="far fa-3x fa-angle-right"></i>' +
		"</button>",
	},

});
*/




function checkInputs(input) {
	var parent = input.parent().prev('label');

	if( parent.hasClass('label_focus') && (input.val() == "" || input.val() == "(___) ___-____") ) {
		input.parent().prev('label').removeClass('label_focus');
	} else if(input.val() != "" && input.val() != "(___) ___-____") {
		input.parent().prev('label').addClass('label_focus');
	}
}

function coolHolders() {
	$('.gfield [name^="input"]').on('focusin keypress', function() {
	  $(this).parent().prev('label').addClass('label_focus');
	});
	$('.gfield [name^="input"]').on('focusout input change', function() {
		var gInput = $(this);
		checkInputs(gInput);
	});
}


function gForm_rendered() {
	$('.ginput_container_select select').niceSelect();
	coolHolders();

	$('.gfield [name^="input"]').each(function() {
		var gInput = $(this);
		checkInputs(gInput);
	});
}

gForm_rendered();
$(document).on('gform_post_render', function() {
	gForm_rendered();
});


$('[href*="regarding-unit"]').click(function(u) {
	u.preventDefault();

	var unitNum = $(this).attr('href').split('regarding-unit=')[1];

	$('.unit_field input').val(unitNum);

	$('.infopane').addClass('active');
	gForm_rendered();

});


$(document).on('gform_confirmation_loaded', function(event, formId){

    $('.form_start').removeClass('active');
    $('.form_finish').addClass('active');

});



if($('.pre_block').length) {

}

function videoStuff() {
	if($('video').length) {

		if($('#res').css('z-index') > 1)
			$('video')[0].play();

		setTimeout(function() {

			if(!$('video')[0].paused)
				$('.pre_block').addClass('bye');

		}, 100);
	}
}
videoStuff();
$(window).resize(function() {
	videoStuff();
});


if($('#avBeds').length && window.location.href.split('beds=')[1]) {

	var theseBeds = window.location.href.split('beds=')[1];
	$('#avBeds').val(theseBeds);
	console.log('search '+theseBeds);
	apiForm.submit();

}

