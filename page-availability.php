<?php
/*
* Template Name: Availability
*/


if($_GET['refresh'] == '1')
	do_shortcode('[rentcafe]');

get_header();


$sql = $wpdb->prepare("SELECT *
	FROM rentcafe_apartmentavailability AS rc
	ORDER BY `FloorPlanName`
	", ARRAY_A);

$rc_units = $wpdb->get_results( $wpdb->prepare( $sql, ARRAY_A ) );

$jp_sql = $wpdb->prepare("SELECT *
	FROM rentcafe_floorplan AS rc
	ORDER BY `FloorPlanName`
	", ARRAY_A);

$rc_allplans = $wpdb->get_results( $wpdb->prepare( $jp_sql, ARRAY_A ) );


$rct = 1;
$rc_studios = array();
$rc_units_sorted = array();
$plan_arrays = array();
$beds = array();
$plan_ids = array();
$goto_plan = '';
$table_html = '';
$last_fetch = 0;
$wp_plans = array();
$first_dates = array();


// sort by rent func
function cmp_rent($a, $b)
{
    if ($a->MinimumRent == $b->MinimumRent) {
        return 0;
    }
    return ($a->MinimumRent < $b->MinimumRent) ? -1 : 1;
}

// sort by date func
function cmp_date($a, $b)
{
    if ($a->AvailableDate == $b->AvailableDate) {
        return 0;
    }
    return (strtotime($a->AvailableDate) < strtotime($b->AvailableDate)) ? -1 : 1;
}

// check for plan URL, add input for auto-run check in js
if($_GET['plan']) {
	$goto_plan = sanitize_text_field($_GET['plan']);
	echo '<input type="hidden" id="goto_plan" name="goto_plan" value="'.$goto_plan.'">';
}


// move studios to the front
foreach ($rc_allplans as $key => $plan) {
	$name = $plan->FloorplanName;
	$last_fetch = $plan->timegot;

	$this_plan = $rc_allplans[$key];
	if(strpos($name, 'Studio') > -1) {

		$rc_studios[] = $this_plan;
		unset($rc_allplans[$key]);
	}	
}
$rc_allplans = array_merge($rc_studios, $rc_allplans);

// array of plan id's
foreach ($rc_allplans as $key => $plan) {
	$plan_ids[] = $plan->FloorplanId;
}


// put allplans into $plan_arrays, even if they have no units, get beds
foreach ($rc_allplans as $key => $plan) {
	$this_planid = $plan->FloorplanId;
	$plan_arrays[$this_planid]['plan'] = $plan;

	$beds[] = $plan->Beds;
}

// split units into arrays per plan
foreach ($rc_units as $key => $unit) {
	$this_planid = $unit->FloorplanId;

	if(in_array($unit->FloorplanId, $plan_ids)) {
		$plan_arrays[$this_planid]['units'][] = $unit;
	} else {
		$plan_arrays[$this_planid]['units'] = array();
	}
}



$args = array(
	'post_type'   => 'plan',
	'post_status' => 'publish',
	'posts_per_page'         => -1,
	'posts_per_archive_page' => 10,
	'nopaging'               => true,
	'paged'                  => false,
);

$plan_query = new WP_Query( $args );
if ( $plan_query->have_posts() ) :
	while ( $plan_query->have_posts() ) :
		$plan_query->the_post();

		$wp_plans[] = get_the_title();
		$wp_plans_ids[] = get_the_id();

	endwhile;
	else:
endif;
wp_reset_postdata();
wp_reset_query();




// output loop
foreach ($plan_arrays as $ukey => $plans) {

	$wp_id = 0;

	if(in_array($ukey, $wp_plans) < 0) {
		continue;
	} else { // not in CMS
		$this_key = array_search($ukey, $wp_plans);
		$wp_id = $wp_plans_ids[$this_key];
	}
		
	$rows_html = '';
	$first_av = $first_avdate = '';
	$starting_rent = '';
	$view_plan_text = '';

	$rmin = intval($plans['plan']->MinimumRent);
	$rmax = intval($plans['plan']->MaximumRent);

	$ftmin = intval($plans['plan']->MinimumSQFT);
	$ftmax =intval($plans['plan']->MaximumSQFT);

	$beds_qt = intval($plans['plan']->Beds);
	$baths_qt = intval($plans['plan']->Baths);
	$this_plan = $plans['plan']->FloorplanName;
	$plan_sqft = $plans['plan']->MinimumSQFT;

	$goto_class = '';
	$view_text = 'View';
	
	$ppop = '';
	$pimg = get_field('image', $wp_id);
	if(!empty($pimg) && $wp_id > 0) {
		$ppop = 'data-fancybox href="'.$pimg['sizes']['large'].'"';
	}


	if($plans['plan']->FloorplanImageURL) {
		$img_src = $plans['plan']->FloorplanImageURL;
		$view_plan_text = '<a href="'.$img_src.'" class="view_plan_popup">See Floor&nbsp;Plan&nbsp;&rsaquo;</a>';
	}


	// sq ft range
	if($ftmin != $ftmax && $ftmax > $ftmin) {
		$plan_sqft = $ftmin .'&nbsp;ft-'. $ftmax.'&nbsp;ft<sup>2</sup>';
	} elseif($ftmin > 0) {
		$plan_sqft = $ftmin.'&nbsp;ft<sup>2</sup>';
	}

	// rent range
	if($rmin != $rmax && $rmax > $rmin) {
		$starting_rent = '$'.$rmin .'-$'. $rmax;
	} elseif($rmin > 0) {
		$starting_rent = '$'.$rmin;
	} else {
		$starting_rent = 'Call For Pricing';
	}


	// get first av date
	if(!empty($plans['units'])) {
	usort($plans['units'], "cmp_date");

		// get date of first available unit in plan
		if($plans['units'][0]) {
			$first_av = $first_avdate = $plans['units'][0]->AvailableDate;
			$first_dates[] = $first_avdate;
		}
	}


	// then sort by rent
	if(!empty($plans['units']))
	usort($plans['units'], "cmp_rent");

	$rct = 1;

	$unit_ct = count($plans['units']);


	//goto plan
	if($this_plan === $goto_plan) {
		$goto_class = ' plan_selected ps_init';
		$view_text = 'Hide';
	}


	if($unit_ct < 1) {
		$unit_ct = 'Call for availability';
	} else {
		$unit_ct = '<a class="plan_link revlink brown" href="#'.$ukey.'" data-planid="'.$ukey.'"><span class="viewnum--no"></span><span class="numnum">'.$unit_ct.'</span> Available&nbsp;&nbsp;<i class="far fa-angle-down"></i></a>';
	}

	$has_special = '';

	if(!empty($plans['units']))
	foreach ($plans['units'] as $key => $unit) {

		$spex = '';
		
		$unit_rmin = intval($unit->MinimumRent);
		$unit_rmax = intval($unit->MaximumRent);
		

		
		$this_sqft = $unit->SQFT.'&nbsp;ft<sup>2</sup>';


		// rent range
		if($unit_rmin != $unit_rmax && $unit_rmax > $unit_rmin) {
			$rent = '$'.$unit_rmin .'-$'. $unit_rmax;
		} elseif($rmin > 0) {
			$rent = '$'.$unit_rmin;
		} else {
			$rent = 'Call For Pricing';
		}
		$link = '<a href="'.get_permalink().'?regarding-unit='.urlencode($unit->ApartmentName).'"class="gray2 revlink"><b>Request Info&nbsp;&raquo;</b></a><br>';
		$link .= '<a href="'.$unit->ApplyOnlineURL.'" target="_blank" class="red revlink"><b>Apply&nbsp;&raquo;</b></a>';

		$spex = $unit->Specials;
		if($spex) {
			$spex = explode('^', $spex);
			$spex = '<ul class="specials_ul"><li>' . implode('</li><li>', $spex) . '</li></ul>';

			$has_special = '<i class="fas fa-usd-circle"></i>';
		}



		$rows_html .= '<div class="av_row av_row_unit pure-g gutters_1" data-rmin="'.$unit_rmin.'" data-rmax="'.$unit_rmax.'" data-beds="'.$unit->Beds.'" data-date="'.$unit->AvailableDate.'"><div class="pure-u-md-1-6 av_col av_name">'.$unit->ApartmentName.'</div><div class="pure-u-md-1-6 av_col"></div><div class="pure-u-md-1-12 av_col av_sqft">'.$this_sqft.'</div><div class="pure-u-md-1-6 av_col av_price">'.$rent.'</div><div class="pure-u-md-1-6 av_col av_spec">'.$spex.'</div><div class="pure-u-md-1-4 av_col av_link">'.$unit->AvailableDate.'<br>'.$link.'</div></div>';


		$rct++;

	} // foreach unit



	// add plan row, container row for units
	$table_html .= '<div class="av_row av_row_plan pure-g gutters_1 '.$goto_class.'" data-planid="'.$ukey.'" data-beds="'.$beds_qt.'" data-rmin="'.$rmin.'" data-rmax="'.$rmax.'" data-date="'.$first_av.'" data-name="'.$this_plan.'"><a class="pure-u-md-1-6 av_col av_name" '.$ppop.'><i class="fal fa-file-alt"></i>&nbsp;'.$this_plan.'</a><div class="pure-u-md-1-6 av_col">'.$beds_qt.' bed / '.$baths_qt.' bath</div><div class="pure-u-md-1-12 av_col av_sqft">'.$plan_sqft.'</div><div class="pure-u-md-1-6 av_col av_price">'.$starting_rent.'</div><div class="pure-u-md-1-6 av_col av_spec">'.$has_special.'</div><div class="pure-u-md-1-4 av_col av_link">'.$unit_ct.'</div></div><div class="av_row av_row_units" data-planid="'.$ukey.'" data-beds="'.$beds_qt.'">' . $rows_html . '</div>';


} // foreach plan


// beds filter


$beds_html = '';
if(!empty($beds)) {
	$beds = array_unique($beds);
	foreach ($beds as $key => $bed) {

		$bed_id = $bed;
		$bed_label = $bed . ' Bedroom';

		if($bed == '0') {
			$bed_id = 'studio';
			$bed_label = 'Studio';

		}

		$beds_html .= '<option value="'.$bed_id.'">'.$bed_label.'</option>';
	}
	$beds_html = '<option value="">Beds</option>'.$beds_html;
	$beds_html = '<div class="form"><select name="avBeds" id="avBeds">'.$beds_html.'</select></div>';

}


$attrs = $head_classes = '';
$img = get_field('head_image');
if(!empty($img)) {
	$img_srcset = wp_get_attachment_image_srcset( $img['id'], 'xxl' );
	$img_sizes = wp_get_attachment_image_sizes( $img['id'], 'xxl' ); 

	if(get_field('background'))
		$attrs = 'style="background-color:'.get_field('background').';"';

	if(get_field('tiled') > 0)
		$head_classes .= 'splash_bg ulay';

	$head_html = '<div class="block rel vpad" '.$attrs.'><div class="'.$head_classes.' object_fit layer1 abs"></div><div class="centerm container white rel layer3"><div class="pure-g"><div class="pure-u-lg-1-6"></div><div class="pure-u-lg-2-3">'.apply_filters('the_content',get_the_content()).'</div></div></div></div>';
}

if(!empty($first_dates)) {
	
	$first_dates = array_unique($first_dates, SORT_REGULAR);
	natsort($first_dates);

	$first_date = $first_dates[0];

	echo '<input type="hidden" id="firstDate" value="'.$first_date.'">';
}


echo $head_html;

?>

<div class="hero_block rel block blue layer1">
	<img src="" alt="" class="layer1 object_fit">
	<div class="layer3 rel">
		
	</div>
</div>
<div class="the_rest rel layer3 block bone3">



	<div class="container centerm">
		<div class="big_card upset rel layer3">
			<div class="pure-g">
				<div class="pure-u-md-1-12"></div>
				<div class="pure-u-md-5-6">
					<div class="container block white">
						<form action="" id="api_form" class="api_form pure-g gutters_1 rightt block white vpad ">
							<div class="pure-u-sm-1-24 pure-u-lg-1-1"></div>
							<div class="pure-u-sm-23-24 pure-u-lg-1-5 av_col leftt"><div class="gray1 h3">Filter</div><div class="spacer20"></div></div>
							<div class="pure-u-md-1-3 pure-u-lg-1-5 leftt"></div>
							<div class="pure-u-md-1-3 pure-u-lg-1-5 leftt"></div>
							<div class="pure-u-md-1-6 pure-u-lg-1-6 leftt"></div>
							<div class="pure-u-md-1-6 pure-u-lg-3-24"></div>

							<div class="pure-u-sm-1-24 pure-u-lg-1-1"></div>
							<div class="pure-u-md-1-4 pure-u-lg-1-5 av_col leftt "><?php echo $beds_html; ?></div>
							<div class="pure-u-md-1-4 pure-u-lg-1-5 av_col leftt">
								<div class="rent_range form">
									<select class="" name="maxRent" id="maxRent">
										<option value="999999">Max Price</option>
										<option value="2000">$2000</option>
										<option value="2500">$2500</option>
										<option value="3000">$3000</option>
										<option value="3500">$3500</option>
										<option value="4000">$4000</option>
									</select>
								</div>
							</div>
							<div class="pure-u-md-1-4 pure-u-lg-1-5 av_col leftt">
								<div class="av_date form nice-select">
									<input type="text" class="date_picker form" name="avDate" id="avDate" placeholder="Move-in date">
								</div>
							</div>
							<div class="pure-u-md-1-5 pure-u-lg-1-6 av_col centert ctl">
								<input class="button red block w100" type="submit" value="Submit" />
							</div>
							<div class="pure-u-lg-3-24 av_col"></div>
						</form>
					</div>
				</div>
				<div class="pure-u-md-1-12"></div>
			</div>
		</div><!-- big card -->
		<div class="av_table">

			<div class="pure-g">
				<div class="pure-u-md-1-12"></div>
				<div class="pure-u-md-5-6 oflo">
					<div class="av_header av_row pure-g gutters_1 leftt">
						<div class="h5 pure-u-md-1-6 av_col av_name">Plan</div>
						<div class="h5 pure-u-md-1-6 av_col av_type">Type</div>
						<div class="h5 pure-u-md-1-12 av_col av_sqft">Size</div>
						<div class="h5 pure-u-md-1-6 av_col av_price">Price</div>
						<div class="h5 pure-u-md-1-6 av_col av_date">Special</div>
						<div class="h5 pure-u-md-1-4 av_col av_link">Availability</div>
					</div>
					<?php echo $table_html ?>
				</div>
			</div>

		</div>

		<?php 
		if($last_fetch) {


			echo "<p class=\"hidden av_col\"><small>Plans and availability updated {$last_fetch} CDT.</small></p>";
		}
			
		 ?>
		<?php //var_dump($plan_arrays); ?>
	</div>
	<div class="spacer50"></div>
</div>
<?php get_template_part('part','infopane'); ?>

<?php get_footer();?>
