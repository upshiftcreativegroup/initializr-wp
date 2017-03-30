var qString = "?v=0.01", pluginsJs = document.createElement('script'), mainJs = document.createElement('script'), mapJs = document.createElement('script');
pluginsJs.type = "text/javascript", mainJs.type = "text/javascript", mapJs.type = "text/javascript";
pluginsJs.src = site.theme_path + "/js/plugins.js"+qString, mainJs.src = site.theme_path + "/js/main-dist.js"+qString, mapJs.src = '';
pluginsJs.setAttribute('async', ''), mainJs.setAttribute('async', ''), mapJs.setAttribute('async', '');

var packCss = document.createElement("link"), fancyboxCss = document.createElement("link");
packCss.rel = "stylesheet", fancyboxCss.rel = "stylesheet";
packCss.href = site.theme_path + "/css/pack.css"+qString;


pluginsJs.onload = function() {
	mainCallBack();
};

function mainCallBack() {
	document.body.appendChild(mainJs);

	if(document.getElementById('map')){
		//document.body.appendChild(mapJs);
	}
}

window.onload = function() {
	document.body.appendChild(pluginsJs);
	document.getElementsByTagName("head")[0].appendChild(packCss);
}