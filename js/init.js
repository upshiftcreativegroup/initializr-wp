var qstring = '?v='+site.qstring, 

pluginsJs = document.createElement('script'), 
mainJs = document.createElement('script'), 
gravityBoyJs = document.createElement('script'), // ajax in gforms
fancyBoxJs = document.createElement('script'),
wpEmbed = document.createElement('script'),
jarallaxCombo = document.createElement('script'),
laxCombo = document.createElement('script'),
bbJs = document.createElement('script'),
requireJs = document.createElement('script'),
flatPicker = document.createElement('script'),
mapJs = document.createElement('script');





pluginsJs.type = 'text/javascript',
mainJs.type = 'text/javascript',
gravityBoyJs.type = 'text/javascript',
fancyBoxJs.type = 'text/javascript',
wpEmbed.type = 'text/javascript',
jarallaxCombo.type = 'text/javascript',
laxCombo.type = 'text/javascript',
bbJs.type = 'text/javascript',
requireJs.type = 'text/javascript',
flatPicker.type = 'text/javascript';
mapJs.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyA_lIRfNJWxL3wwliBXrC1TKmtdHTqlZaU&libraries=places&callback=initMap';


pluginsJs.src = site.theme_path + '/js/plugins.js'+qstring,
mainJs.src = site.theme_path + '/js/main.js'+qstring,
fancyBoxJs.src = site.theme_path + '/js/vendor/jquery.fancybox.min.js'+qstring,
gravityBoyJs.src = site.theme_path + '/js/gravityboy.js'+qstring,
requireJs.src = site.theme_path + '/js/vendor/require.js'+qstring,
bbJs.src = site.theme_path + '/js/vendor/bluebird.min.js'+qstring;

flatPicker.src = site.theme_path + '/js/vendor/flatpickr.min.js'+qstring,
jarallaxCombo.src = site.theme_path + '/js/vendor/jarallax.min.js'+qstring;
laxCombo.src = site.theme_path + '/js/vendor/lax.min.js'+qstring;



// gravity forms scripts because we're gonna load it on our own terms. they get called in gravityboy.js.
jsonJs = document.createElement('script'),
gravityformsJs = document.createElement('script'),
placeholdersJs = document.createElement('script'),
maskedInputJs = document.createElement('script');

jsonJs.src = site.plugins_path + '/gravityforms/js/jquery.json.min.js'+qstring,
gravityformsJs.src = site.plugins_path + '/gravityforms/js/gravityforms.min.js'+qstring,
placeholdersJs.src = site.plugins_path + '/gravityforms/js/placeholders.jquery.min.js'+qstring;
maskedInputJs.src = site.plugins_path + '/gravityforms/js/jquery.maskedinput.min.js'+qstring;
//end gforms js


pluginsJs.setAttribute('async', ''), 
mainJs.setAttribute('async', '');

var packCss = document.createElement('link'), fancyboxCss = document.createElement('link'), tKit = document.createElement('link');
packCss.rel = 'stylesheet', fancyboxCss.rel = 'stylesheet', tKit.rel = 'stylesheet';
packCss.href = site.theme_path + '/css/pack.css'+qstring;

tKit.href = 'https://use.typekit.net/knt2slk.css'+qstring;



var cB = 'cubic-bezier(0.645, 0.045, 0.355, 1)';

pluginsJs.onload = function() {
	if(!Modernizr.promises) {
		document.body.appendChild(requireJs);		
	} else {
		mainCallBack();
	}
};

requireJs.onload = function() {
	var Promise = require([bbJs.src]);
	mainCallBack();
}

function mainCallBack() {

	//if(document.getElementById('parallax'))
	//	document.body.appendChild(laxCombo);

	document.body.appendChild(mainJs);
	//document.body.appendChild(gravityBoyJs);

/*
(function (d, t) {
  var bh = d.createElement(t), s = d.getElementsByTagName(t)[0];
  bh.type = 'text/javascript';
  bh.src = 'https://www.bugherd.com/sidebarv2.js?apikey=4cpb5mmno3cvny1xim2xcw';
  s.parentNode.insertBefore(bh, s);
  })(document, 'script');
*/
	if(document.getElementById('map'))
		document.body.appendChild(mapJs);
}




window.onload = function() {

	//if(document.getElementById('api_form'))
	//	document.body.appendChild(flatPicker);	

	document.getElementsByTagName('head')[0].appendChild(packCss);
	document.body.appendChild(pluginsJs);

	// slowly-delivered external webfont scripts can go here
	//document.getElementsByTagName('head')[0].appendChild(tKit);

}

ffo();
function ffo() { // try using http://bluebirdjs.com/docs/getting-started.html
	"use strict"
	var exampleFontData = {
		'GuthenBloots': {family:'Guthen Bloots Basic', data:{weight: 400, style: 'normal'} },
		'KlinicSlab': {family:'klinic_slab', data:{weight: 300, style: 'normal'} },
		'KlinicSlab_it': {family:'klinic_slab', data:{weight: 300, style: 'italic'} },
		'Montserrat_400': {family:'Montserrat', data:{weight: 400, style: 'normal'} },
		'Montserrat_500': {family:'Montserrat', data:{weight: 500, style: 'normal'} },
		'Montserrat_600': {family:'Montserrat', data:{weight: 600, style: 'normal'} },
	};

	var observers = [];

	// Make one observer for each font,
	// by iterating over the data we already have
	Object.keys(exampleFontData).forEach(function(familySet) {
		var data = exampleFontData[familySet];
		var obs = new FontFaceObserver(data['family'], data['data']);
		observers.push(obs.load(null,8000));
	});

	Promise.all(observers)
	  .then(function(fonts) {
	    document.body.className += " fl";
	  })
	  .catch(function(err) {
	    console.warn('Some critical font are not available:', err);
	  });
}
