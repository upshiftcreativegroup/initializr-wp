<h1>WordPress theme boilerplate</h1>

<p>Hi, you can use this as a starting point for your WordPress theme. FontAwesome version is <a href="http://fontawesome.io/icons/" target="_blank">4.7.0</a>.</p>

<h2>init.js</h2>
<p>This script loader loads any specified files on window load (or whenever you want). The result is that this and jQuery remain the only render-blocking scripts on page, helping to appease Google PageSpeed. You can try dequeueing jQuery and loading it through init.js instead, but do so at your own risk as a lot of WP and plugin scripts seem to depend on it.</p>



<h2>Included in plugins.js</h2>
<p><i>Most</i> of these have jQuery as a dependency. All are located in /js/plugins.js. Associated stylesheets are in /css/ or /scss/.</p>

<h3>Probably will need jQuery</h3>
<ul>
	<li>Waypoints (jQuery build)</li>
	<li>fancyBox 3</li>
	<li>Slick Carousel</li>
	<li>FancyBox v3.0.47</li>
	<li>Slick.js v1.6.0</li>
</ul>

<h3>No dependencies</h3>
<ul>
	<li>Modernizr 3.3.1: objectfit, setclasses</li>
	<li>WP-Embed (de-registered from functions.php to call here instead)</li>
	<li>Waypoints v4.0.1</li>
	<li>Flatpickr v2.4.3, a prettier iOS-y date picker.</li>
</ul>

<h2>functions.php</h2>
<p>There are some handy things in here. Listed below in order of appearance.</p>
<ul>
	<li>Dequeue wp-embed JS (loaded via init.js)</li>
	<li>Re-queue jQuery to v3.2.1</li>
	<li>Enqueue init.js and crit.css.</li>
	<li>Localize variables for use in scripts called through init.js</li>
	<li>Remove WP emoji JS and print styles CSS</li>
	<li>Remove gravity forms spinner. Forget that ugly thing.</li>
	<li>Nav menu registration</li>
	<li>Custom images size(s)</li>
	<li>gravityBoy: ajax load in a gravity form on command with js/gravityboy.js. Currently only works with one form per page.</li>
	<li>Template for curl call and save to transient</li>
	<li>Change excerpt output</li>
	<li>Change Gravity Forms failed validation message</li>
	<li>Rename <i>posts</i> to <i>News</i>, because sometimes people ask for that.</li>
	<li>View page via named template</li>
	<li>Menu output stuff</li>
</ul>

<h2>Did somebody say Google Pagespeed?</h2>
<p>Yeah, anybody that even thinks the site loaded a little slow. Like your boss, or the client's marketing manager looking for performance metrics.</p>
<ul>
	<li>Eliminate render-blocking JavaScript and CSS in above-the-fold content: Try to run all of your scripts through init.js.</li>
	<li>Eliminate render-blocking JavaScript and CSS in above-the-fold content: Split your CSS into a critical style sheet (crit.css), and then load in the rest of your styles later, like on window load (see pack.css in init.js.</li>
	<li>Prioritize visible content: Defer loading any below-the-fold or initially hidden media.</li>
	<li>Minify CSS and JS via your compiler or preprocessor.</li>
	<li>Enable compression: set gzip/compression parameters in host or .htaccess.</li>
	<li>Leverage browser caching: Define browser cache parameters in host or .htaccess.</li>
	<li>Optimize images: use minified images from the .zip that Pagespeed Insights gives you. AFAIK that's the only minification it sees as valid.</li>
	<li>Reduce server response time: get a really simple server-side caching. staruc likes <a href="https://wordpress.org/plugins/cache-enabler/" target="_blank">KeyCDN's Cache Enabler</a>.</li>
</ul>



