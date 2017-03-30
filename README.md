<h1>WordPress theme boilerplate</h1>

<p>Hi, you can use this as a starting point for your WordPress theme. FontAwesome version is <a href="http://fontawesome.io/icons/" target="_blank">4.7.0</a>.</p>

<h2>init.js</h2>
<p>This script loader loads any specified files on window load (or whenever you want). The result is that this and jQuery remain the only render-blocking scripts on page, appeasing Google PageSpeed. You can try dequeueing jQuery and loading it through init.js instead, but do so at your own risk as a lot of WP and plugin scripts seem to depend on it.</p>



<h2>Included in plugins.js</h2>
<p><i>Most</i> of these have jQuery as a dependency. All are located in /js/plugins.js. Associated stylesheets are in /css/ or /scss/.</p>

<h3>Probably will need jQuery</h3>
<ul>
	<li>Waypoints (jQuery build)</li>
	<li>fancyBox 3</li>
	<li>Slick Carousel</li>
</ul>

<h3>No dependencies</h3>
<ul>
	<li>Modernizr: objectfit, setclasses</li>
	<li>flatpickr</li>
	<li>Parsley</li>
	<li>WP-Embed (de-registered from functions.php to call here instead)</li>
</ul>

<h2>functions.php</h2>
<p>There are some handy things in here. Listed below in order of appearance.</p>

<ul>
	<li>Re-enqueue jQuery to v3.1.1</li>
	<li>Enqueue init.ja and crit.css, our only two render-blocking resources.</li>
	<li>Localize variables for use in scripts called through init.js</li>
	<li>Remove random WP scripts</li>
	<li>Nav menu registration</li>
	<li>Custom images size(s)</li>
	<li>Change excerpt output</li>
	<li>Change Gravity Forms failed validation message</li>
	<li>Rename <i>posts</i> to <i>News</i>, because sometimes people ask for that.</li>
	<li>View page via named template</li>
	<li>Menu output stuff</li>
</ul>

