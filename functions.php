<?php 

// NQ
if (!is_admin()) add_action("wp_enqueue_scripts", "my_jquery_enqueue", 11);
function my_jquery_enqueue() {

    $q_string = '0.01';

    wp_deregister_script('jquery');
    wp_deregister_script( 'wp-embed' );
    wp_register_script('jquery', get_bloginfo('template_url') . "/js/vendor/jquery-3.3.1.min.js", array(), $q_string, false);
    wp_register_script('init', get_bloginfo('template_url') . "/js/init.js", array('jquery'), $q_string, true);
    wp_register_script('plugins', get_bloginfo('template_url') . "/js/plugins.js", array('jquery'), $q_string, true);
    wp_register_script('main', get_bloginfo('template_url') . "/js/main.js", array('plugins'), $q_string, true);
    
    wp_register_style( 'crit', get_template_directory_uri() . '/css/crit.css', array(), $q_string, false );


    wp_enqueue_script('jquery');
    wp_enqueue_script('init');
    wp_enqueue_style('crit');

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
add_action( 'gform_enqueue_scripts', 'dequeue_habuncha_scripts', 10, 2 );
function dequeue_habuncha_scripts( $form, $is_ajax ) {
    /*
    if ( is_front_page() || is_page('contact') ) {
        wp_dequeue_script( 'gform_gravityforms' );
        wp_dequeue_script( 'gform_json' );
        wp_dequeue_script( 'gform_placeholder' );
    }
    */
}

add_filter( 'gform_ajax_spinner_url', 'spinner_url', 10, 2 );
function spinner_url( $image_src, $form ) {
    return false;
}


// manu
add_action( 'after_setup_theme', 'register_my_menu' );
function register_my_menu() {
  register_nav_menu( 'main', 'Main Menu' );
}

// image sizes
if ( function_exists( 'add_theme_support' ) ) {
    add_theme_support( 'post-thumbnails' );
    add_image_size( 'xl', 1400, 9999, false ); // e.g. 172px width, 220px height; false = soft crop; true = hard crop
    add_image_size( 'xxl', 2000, 9999, false );
}




function ajax_gravityBoy() {

    $query_data = $_GET;
    $form_id = ($query_data['form_id']) ? $query_data['form_id'] : false;
    $grav_html = '';

    $grav_html .= gravity_form( $form_id, false, false, false, null, true, null, false );
    echo $grav_html;
    die();
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



/*
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
        $item_output .= '</a>';        

        $item_output .= $args->after;

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
}
*/
/*
// put this in your template nav call
$walker = new Menu_With_Description; 
'walker'          => $walker
*/
