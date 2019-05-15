jQuery(function($)
{
	var running = 0
	$('.gravity_init').click(function() {
		if(running < 1) {
			gForm_initAll();
			running = 1;
		}
			

		//$('.gravity_init').off(); // only once
	});


	if($('input[name="autoform"]').length) {
		var autoForm = $('input[name="autoform"]');

		if(autoForm.val() == 'true')
			$('.gravity_init').click();
	}

	//$('.gravity_init').click();

	function checkInputs(input) {
		var parent = input.parent().prev('label');

		if(parent.hasClass('label_focus') && input.val() == "") {
			input.parent().prev('label').removeClass('label_focus');
		} else if(!input.val() == "") {
			input.parent().prev('label').addClass('label_focus');
		}				
	}

	function coolHolders() {
		$('.gfield [name^="input"]').on('focusin', function() {
		  $(this).parent().prev('label').addClass('label_focus');
		});
		$('.gfield [name^="input"]').on('focusout input change keyup', function() {
			var gInput = $(this);
			checkInputs(gInput);
		});
	}


	function gForm_rendered() {
		console.log('rendered');
		$('.ginput_container_select select').niceSelect();
		coolHolders();

		var textGfield = $('.gfield.textarea');
		$('.nice-select').click(function() {

			if($(this).hasClass('open')) {
				textGfield.removeClass('bye');
			} else {
				textGfield.addClass('bye');
			}
		});

		$('.gfield [name^="input"]').each(function() {
			var gInput = $(this);
			checkInputs(gInput);
		});

	}

	function gForm_completed() {
		var vipButton = $('a[href="#vip"]');
		vipButton.on('click', function(vip) {
			vip.preventDefault();

			if($('.form_bar').hasClass('active')) {

				$('.form_wrap .gfield').each(function() {
					var thisField = $(this);
					if(thisField.find('input, select, textarea').val() == 0) {
						console.log(thisField);
						thisField.removeClass('cmon');
						setTimeout(function() {
							thisField.addClass('cmon');
						}, 150);
					}


				});

			} else {
				$('.form_bar').click();
			}
		});
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
				//console.log('form_id ' + form_id);
				$(document).on('gform_post_render', function(){
					gForm_rendered();
				});

				$(document).on('gform_confirmation_loaded', function(event, formId) {

					//console.log('form '+formId+' submitted successfully');
					$('.form_intro, .form_finish').addClass('active');

				});


			},
			success: function(data)
			{

				$('#gravity_contact').html(data);
		
				//gForm_rendered();



			},
			complete: function(data)
			{
				gForm_completed();
			},
			error: function()
			{	
				console.log('that\'s not how this works. that\'s not how any of this works.');
			}
		});				
	}
	
});