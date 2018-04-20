jQuery(function($)
{
	if($('.waypoint_form'))
		$('.waypoint_form').waypoint(function(direction) {

			gForm_initAll();
			this.destroy();
		}, {
			offset: '120%'
		});


	$('.gravity_init').on('click', function() {
		gForm_initAll();
	});


	if($('input[name="autoform"]').length) {
		var autoForm = $('input[name="autoform"]');

		if(autoForm.val() == 'true')
			$('.gravity_init').click();


	}


	function gForm_rendered() {


	}

	function gForm_initAll() {

		gravityformsJs.onload = function() {
			gravityBoy_init();
		}
		document.body.appendChild(jsonJs);
		document.body.appendChild(placeholdersJs);
		document.body.appendChild(maskedInputJs);
		document.body.appendChild(gravityformsJs);
	} 

	//Main ajax function
	function gravityBoy_init()
	{
		var ajax_url = ajax_gravityboy_params.ajax_url;
		var post_id = ajax_gravityboy_params.post_id;
		var form_id = $('#gravity_contact').data('form-id');

		$.ajax({
			type: 'GET',
			url: ajax_url,
			//dataType:"json",
			data: {
				action: 'gravityboy',
				post_id: post_id,
				form_id: form_id,
			},
			beforeSend: function ()
			{
				console.log('form_id ' + form_id);
			},
			success: function(data)
			{

				$('#gravity_contact').html(data);
		
				gForm_rendered();

				$(document).on('gform_post_render', function(){
					gForm_rendered();
				});

			},
			complete: function(data)
			{
				
			},
			error: function()
			{	
				console.log('that\'s not how this works. that\'s not how any of this works.');
			}
		});				
	}
	
});