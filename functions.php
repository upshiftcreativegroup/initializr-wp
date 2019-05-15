<?php 

// NQ
if (!is_admin()) add_action("wp_enqueue_scripts", "my_jquery_enqueue", 11);
function my_jquery_enqueue() {

    $q_string = '1.8';

    wp_deregister_script('jquery');
    wp_deregister_script( 'wp-embed' );
    wp_register_script('jquery', get_bloginfo('template_url') . "/js/vendor/jquery-3.3.1.min.js", array(), $q_string, false);
    wp_register_script('init', get_bloginfo('template_url') . "/js/init.js", array('jquery', 'ffo'), $q_string, true);
    wp_register_script('plugins', get_bloginfo('template_url') . "/js/plugins.js", array('jquery'), $q_string, true);
    wp_register_script('main', get_bloginfo('template_url') . "/js/main.js", array('plugins'), $q_string, true);

    wp_register_script('ffo', get_bloginfo('template_url') . "/js/vendor/fontfaceobserver.js", array(), $q_string, true);
    wp_register_script('flatpickr', get_bloginfo('template_url') . "/js/vendor/flatpickr.min.js", array(), $q_string, true);
    wp_register_style( 'crit', get_template_directory_uri() . '/css/crit.css', array(), $q_string, false );

    wp_register_style( 'flatpickr', get_template_directory_uri() . '/css/flatpickr.min.css', array(), $q_string, false );
    wp_register_style( 'fancybox', get_template_directory_uri() . '/css/jquery.fancybox.min.css', array(), $q_string, false );


    if(is_page_template('page-availability.php') || is_page_template('plans.php') || is_page_template('single-plan.php') || is_singular(array('plan'))) {
        wp_enqueue_script('flatpickr');
        wp_enqueue_script( 'init', null, array( 'jquery','flatpickr' ));
         wp_enqueue_style('flatpickr');
    } else {
        wp_enqueue_script( 'init');
    }
    
    wp_enqueue_script('ffo');
    wp_enqueue_script('jquery');
    wp_enqueue_style('crit');
    
    if(is_page_template('gallery.php') || is_page_template('page-availability.php')) {
        wp_enqueue_style('fancybox');
    }
   

    wp_localize_script("init",
        "site",
        array(
            "home_url"      => home_url(),
            "theme_path"    => get_bloginfo('template_url'),
            "plugins_path"  => plugins_url(),
            "qstring"       => $q_string
        )
    );

    wp_localize_script( 'init', 'ajax_gravityboy_params', array(
        'ajax_url' => admin_url( 'admin-ajax.php' ),
        'post_id'  => get_the_id()

    ) );



}

// admin styles
function load_custom_wp_admin_style() {
    $q_string = '0.01';
    wp_register_style( 'custom_wp_admin_css', get_template_directory_uri() . '/css/admin.css', false, $q_string );
    //wp_enqueue_style( 'custom_wp_admin_css' );

    wp_register_script( 'custom_wp_admin_js', get_template_directory_uri() . '/js/admin.js', false, $q_string );
    //wp_enqueue_script( 'custom_wp_admin_js' );
}


add_action( 'admin_enqueue_scripts', 'load_custom_wp_admin_style' );

add_action('wp_ajax_gravityboy', 'ajax_gravityboy');
add_action('wp_ajax_nopriv_gravityboy', 'ajax_gravityboy');

// bye emoji
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' ); 


// dequeue gravityforms scripts.
//add_action( 'gform_enqueue_scripts', 'dequeue_habuncha_scripts', 10, 2 );
function dequeue_habuncha_scripts( $form, $is_ajax ) {
    if ( is_front_page() || is_page('contact') ) {
        wp_dequeue_script( 'gform_gravityforms' );
        wp_dequeue_script( 'gform_json' );
        wp_dequeue_script( 'gform_placeholder' );
    }
}

add_filter( 'gform_ajax_spinner_url', 'spinner_url', 10, 2 );
function spinner_url( $image_src, $form ) {
    return false;
}


// manu
add_action( 'after_setup_theme', 'register_my_menu' );
function register_my_menu() {
  register_nav_menu( 'main', 'Main Menu' );
  register_nav_menu( 'secondary', 'Secondary Menu' );
}

// image sizes
if ( function_exists( 'add_theme_support' ) ) {
    add_theme_support( 'post-thumbnails' );
    add_image_size( 'xl', 1400, 9999, false ); // e.g. 172px width, 220px height; false = soft crop; true = hard crop
    add_image_size( 'xxl', 2000, 9999, false );
}



// wild URL's
add_action('init', 'custom_rewrite_basic');
function custom_rewrite_basic() {  
    $slug = 'gallery';
    $id = 241;
    add_rewrite_rule("^$slug\/.*$", "index.php?page_id=$id", 'top');
}

function ajax_gravityBoy() {

    $query_data = $_GET;
    $form_id = ($query_data['form_id']) ? $query_data['form_id'] : false;
    $grav_html = '';

    $grav_html .= gravity_form( $form_id, false, false, false, null, true, null, false );
    echo $grav_html;
    die();
}

function custom_excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

function new_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');



add_filter( 'wpiw_list_class', 'ig_list_class' );
function ig_list_class( $classes ) {
    $classes = "pure-g gutters_1";
    return $classes;
}

add_filter( 'wpiw_item_class', 'ig_li_class' );
function ig_li_class( $classes ) {
    $classes = "instagram-image pure-u-sm-1-1 pure-u-md-1-2 pure-u-lg-1-5";
    return $classes;
}

add_filter( 'wpiw_img_class', 'ig_img_class' );
function ig_img_class( $classes ) {
    $classes = "img";
    return $classes;
}


function ajax_sampleApiCall() {
    //delete_transient( 'weatherboy' );

    // Do we have this information in our transients already?
    $transient = get_transient( 'weatherboy' );

    // Yep!  Just return it and we're done.
    if( !empty( $transient ) ) {
        // The function will return here every time after the first time it is run, until the transient expires.
        $output = $transient;
        $output->is_transient = 1;

    } else {

        $c_error = 0;
        $api_arr = array();
        $api_url = 'https://api.sampleURL.com/apiCall?key=youGetIt';
        $ch = curl_init();
        // set URL to download
        curl_setopt($ch, CURLOPT_URL, $api_url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $pre_output = curl_exec($ch);
        // close the curl resource, and free system resources

        if(curl_error($ch)) {
            echo '<!-- error:' . curl_error($ch) . '-->';
            $c_error = 1;
        }
        curl_close($ch);

        if($c_error == 0) {
            $output = json_decode($pre_output);
            set_transient( 'apiStuff', $output, 5 * 60 ); // 5 mins
        }

        $output->is_transient = 0;
    }
    
    $output = json_decode(json_encode($output), true);
    print json_encode($output);
    die();
}

/*
//change the default validation message.
add_filter( 'gform_validation_message', 'change_message', 10, 2 );
function change_message( $message, $form ) {
    return "<div class='validation_error h2 gold'>Please complete all fields marked with an asterisk \"*\"</div>";
}
*/

/*
// rename posts to news, because.
function revcon_change_post_label() {
    global $menu;
    global $submenu;
    $menu[5][0] = 'News';
    $submenu['edit.php'][5][0] = 'News';
    $submenu['edit.php'][10][0] = 'Add News';
    $submenu['edit.php'][16][0] = 'News Tags';
    echo '';
}
function revcon_change_post_object() {
    global $wp_post_types;
    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'News';
    $labels->singular_name = 'News';
    $labels->add_new = 'Add News';
    $labels->add_new_item = 'Add News';
    $labels->edit_item = 'Edit News';
    $labels->new_item = 'News';
    $labels->view_item = 'View News';
    $labels->search_items = 'Search News';
    $labels->not_found = 'No News found';
    $labels->not_found_in_trash = 'No News found in Trash';
    $labels->all_items = 'All News';
    $labels->menu_name = 'News';
    $labels->name_admin_bar = 'News';
}
 
add_action( 'admin_menu', 'revcon_change_post_label' );
add_action( 'init', 'revcon_change_post_object' );
*/


/*
// View page via specific template
function add_print_query_vars($vars) {
    $new_vars = array('print_recipe'); // this query variable will show up in your url, so make it unique.
    $vars = $new_vars + $vars;
    return $vars;
}
add_filter('query_vars', 'add_print_query_vars');
add_action("template_redirect", 'my_template_redirect_2322');

function my_template_redirect_2322()
{
    global $wp;
    global $wp_query;
    if (isset($wp->query_vars["print_recipe"])) 
    {
        include(TEMPLATEPATH . '/recipe-printer.php'); // this is your spec template.
        die();

    }
}
*/

add_filter( 'manage_plan_posts_columns', 'smashing_filter_posts_columns' );
function smashing_filter_posts_columns( $columns ) {

    $columns = array(
      'title' => __( 'Floor Plan ID' ),
      'plan_name' => __( 'Name', 'smashing' ),
      'author' => __( 'Author' ),
      'date' => __( 'Date' ),
      
    );
    $columns['plan_name'] = __( 'Name', 'smashing' );
    return $columns;
}
add_action( 'manage_plan_posts_custom_column', 'smashing_posts_column', 10, 2);
function smashing_posts_column( $column, $post_id ) {

  if ( 'plan_name' === $column ) {
    echo get_post_meta( $post_id, 'plan_name', true );

  }
}
add_filter( 'manage_edit-plan_sortable_columns', 'smashing_posts_sortable_columns');
function smashing_posts_sortable_columns( $columns ) {
  $columns['plan_name'] = 'plan_name';
  return $columns;
}
add_action( 'pre_get_posts', 'smashing_posts_orderby' );
function smashing_posts_orderby( $query ) {
  if( ! is_admin() || ! $query->is_main_query() ) {
    return;
  }

  if ( 'plan_name' === $query->get( 'orderby') ) {
    $query->set( 'orderby', 'meta_value' );
    $query->set( 'meta_key', 'plan_name' );
    $query->set( 'meta_type', 'CHAR' );
  }
}





add_action( 'gform_after_submission', 'post_to_third_party', 10, 2 );
function post_to_third_party( $entry, $form ) {

    $rc_forms = array(1, 2);
    $phone = '';
    $apt = '';
    $unit = '';

    if(in_array($form['id'], $rc_forms)) {

        foreach ( $form['fields'] as $field ) {

            $type = $field['type'];
            $label = $field['label'];

            if($type == 'phone') {
                if ( is_array( $inputs ) ) {
                    foreach ( $inputs as $input ) {
                        $phone = rgar( $entry, (string) $input['id'] );
                    }
                } else {
                    $phone = rgar( $entry, (string) $field->id );
                }
                $phone = preg_replace('/\D+/', '', $phone);
            }


            if($label == 'I\'m interested in') {
                $apt = rgar( $entry, (string) $field->id );

                if($apt)
                    $apt = 'Interested in '. $apt .' apartments. ';

            } elseif($label == 'Apartment number') {
                $unit = rgar( $entry, (string) $field->id );

                $unit = 'Unit '.$unit. '. ';
            }

        }


        $body = array(
            'requestType'       => 'lead',
            'firstName'         => rgar($entry, '1'),
            'lastName'          => rgar($entry, '2'),
            'email'             => rgar($entry, '7'),
            'phone'             => $phone,
            'message'           => rawurlencode($apt.$unit.rgar($entry, '5')),
            'propertyCode'      => 'p0887244',
            'username'          => 'apileads@berkshire.com',
            'password'          => 'berkshireapi',
            'source'            => 'property website',
            'secondarySource'   => '',
            'addr1'             => '1555 Ellinwood Ave',
            'addr2'             => '',
            'city'              => 'Des Plaines',
            'state'             => 'IL',
            'ZIPCode'           => '60016'
        );



        $post_url = '';
        $post_url = 'https://api.rentcafe.com/rentcafeapi.aspx';
        /*
        $add_info = '';
        $hear_about = '';
        // values from the "hear about" field are collected from an array, then transposed into XML
        $field_id = 1;
        $field = RGFormsModel::get_field( $form["id"], $field_id );
        $hearabouts = is_object( $field ) ? $field->get_value_export( $entry ) : '';
        
        $hearabouts = explode(', ', $hearabouts);
        if($hearabouts[0] != '') {
            foreach ($hearabouts as $ha) {
                $hear_about .= '<value>'.$ha.'</value>';
            }
        } else { // if the user didn't select any interest fields, sign them up into these
        }
        */

        // this is for logging
        GFCommon::log_debug( 'gform_after_submission: body => ' . print_r( $body, true ) );
        $request = new WP_Http();
        $response = $request->post( $post_url, array( 'body' => $body, 'timeout' => 15 ) );
        GFCommon::log_debug( 'gform_after_submission: response => ' . print_r( $response, true ) );
    }
}









// comprehensive menu output
class Menu_With_Description extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
        global $wp_query;
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
        
        $class_names = $value = '';
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
        $class_names = ' class="' . esc_attr( $class_names ) . '"';
        $output .= $indent . '<li id="menu-item-'. $item->ID . '"' . $value . $class_names .'>';
        $attributes = ! empty( $item->attr_title ) ? ' title="' . esc_attr( $item->attr_title ) .'"' : '';
        $attributes .= ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) .'"' : '';
        $attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr( $item->xfn ) .'"' : '';
        $attributes .= ! empty( $item->url ) ? ' href="' . esc_attr( $item->url ) .'"' : '';
        $item_output = $args->before;
        $item_output .= '<a'. $attributes .'>';
        $item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
        if($item->description)
            $item_output .= '<div class="nav_desc p2">'. esc_attr( $item->description ) .'</div>';
        $item_output .= '</a>';        
        $item_output .= $args->after;
        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
}
/*
// put this in your template nav call
$walker = new Menu_With_Description; 
'walker'          => $walker
*/


add_action( 'init', 'register_cpt_plan' );
function register_cpt_plan() {
    $labels = array( 
        'name' => _x( 'Plans', 'plan' ),
        'singular_name' => _x( 'Plan', 'plan' ),
        'add_new' => _x( 'Add New Plan', 'plan' ),
        'add_new_item' => _x( 'Add New Plan', 'plan' ),
        'edit_item' => _x( 'Edit Plan', 'plan' ),
        'new_item' => _x( 'New Plan', 'plan' ),
        'view_item' => _x( 'View Plan', 'plan' ),
        'search_items' => _x( 'Search Plans', 'plan' ),
        'not_found' => _x( 'No plans found', 'plan' ),
        'not_found_in_trash' => _x( 'No plans found in Trash', 'plan' ),
        'parent_item_colon' => _x( 'Parent Plan:', 'plan' ),
        'menu_name' => _x( 'Plans', 'plan' ),
    );
    $args = array( 
        'labels' => $labels,
        'hierarchical' => false,
        
        'supports' => array( 'title', 'editor', 'excerpt', 'author', 'custom-fields', 'revisions' ),
        'taxonomies' => array(),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 20,
        //'menu_icon' => 'placeholder_icon.jpg',
        'show_in_nav_menus' => true,
        'publicly_queryable' => true,
        'exclude_from_search' => false,
        'has_archive' => false,
        'query_var' => true,
        'can_export' => true,
        'rewrite' => true,
        'capability_type' => 'post'
    );
    register_post_type( 'plan', $args );
}
