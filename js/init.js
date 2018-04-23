var qstring = '?v='+site.qstring, 

pluginsJs = document.createElement('script'), 
mainJs = document.createElement('script'), 
gravityBoyJs = document.createElement('script'), // ajax in gforms
fancyBoxJs = document.createElement('script'),
wpEmbed = document.createElement('script');

pluginsJs.type = 'text/javascript',
mainJs.type = 'text/javascript',
gravityBoyJs.type = 'text/javascript',
fancyBoxJs.type = 'text/javascript',
wpEmbed.type = 'text/javascript';

pluginsJs.src = site.theme_path + '/js/plugins.js'+qstring,
mainJs.src = site.theme_path + '/js/main-dist.js'+qstring,
fancyBoxJs.src = site.theme_path + '/js/vendor/jquery.fancybox.min.js'+qstring,
gravityBoyJs.src = site.theme_path + '/js/gravityboy.js'+qstring;
wpEmbed.src = site.theme_path + '/js/gravityboy.js'+qstring;


// gravity forms scripts because we're gonna load it on our own terms. they get called in gravityboy.js.
jsonJs = document.createElement('script'),
gravityformsJs = document.createElement('script'),
placeholdersJs = document.createElement('script');
maskedInputJs = document.createElement('script');

jsonJs.src = site.plugins_path + '/gravityforms/js/jquery.json.min.js'+qstring,
gravityformsJs.src = site.plugins_path + '/gravityforms/js/gravityforms.min.js'+qstring,
placeholdersJs.src = site.plugins_path + '/gravityforms/js/placeholders.jquery.min.js'+qstring;
maskedInputJs.src = site.plugins_path + '/gravityforms/js/jquery.maskedinput.min.js'+qstring;
//end gforms js


pluginsJs.setAttribute('async', ''), 
mainJs.setAttribute('async', ''), 

var packCss = document.createElement('link'), fancyboxCss = document.createElement('link');
packCss.rel = 'stylesheet', fancyboxCss.rel = 'stylesheet';
packCss.href = site.theme_path + '/css/pack.css'+qstring;

var cB = 'cubic-bezier(0.645, 0.045, 0.355, 1)';

pluginsJs.onload = function() {

	if(document.querySelector('[data-fancybox]'))
		document.body.appendChild(fancyBoxJs);

	if(document.getElementById('gravity_contact')) {
		document.body.appendChild(gravityBoyJs);

	}

	mainCallBack();
};



function mainCallBack() {

		document.body.appendChild(mainJs);

		// slowly-delivered external webfont scripts can go here

}



window.onload = function() {
	document.body.appendChild(pluginsJs);
	document.getElementsByTagName('head')[0].appendChild(packCss);

	/*
	//bugherd coan go here because normally sometimes it's slow and blocks other scripts
	(function (d, t) {
	  var bh = d.createElement(t), s = d.getElementsByTagName(t)[0];
	  bh.type = 'text/javascript';
	  bh.src = 'https://www.bugherd.com/sidebarv2.js?apikey=irbao0evhrpopeyoywghgq';
	  s.parentNode.insertBefore(bh, s);
	  })(document, 'script');
	*/

}