<?php

require get_template_directory() . '/inc/init.php';



class Settings_Admin {
    public function __construct() {
        add_action( 'wp_enqueue_scripts', array( $this, 'add_custom_style_script' ) );
        // add_filter( 'script_loader_tag', array( $this, 'defer_js' ), 10, 2 );
    }

    public function add_custom_style_script() {
        // wp_enqueue_style( 'wa_email_marketing', get_template_directory_uri() . '/dist/css/main.css' );
        
        // wp_enqueue_script( 'wa_email_marketing-js', get_template_directory_uri() . '/dist/js/root.js', array(), false, true );
        wp_localize_script( 'wa_email_marketing-js', 'vueObject', array(
            'homeUrl'    => get_home_url(),
            'currentUri' => $_SERVER['REQUEST_URI'],
        ));

        wp_enqueue_script('map-render', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAmaslg9P1CTxK8xnDOlOZ1YDJI0Le02XU&libraries=drawing,places,geometry&v=weekly&channel=2', array(), false, false);
        wp_enqueue_script('markerclustererplus', 'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js', array(), false, true);

    }

    // public function defer_js( $tag, $handle ) {
    //     $scripts_to_defer = array( 'wa_email_marketing' );
    //     foreach ( $scripts_to_defer as $defer_script ) {
    //         if ( $defer_script === $handle ) {
    //             return str_replace( ' src', ' defer src', $tag );
    //         }
    //     }
    //     return $tag;
    // }

}
// new Settings_Admin();
wp_enqueue_script('map-render', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAmaslg9P1CTxK8xnDOlOZ1YDJI0Le02XU&libraries=drawing,places,geometry&v=weekly&channel=2', array(), false, false);