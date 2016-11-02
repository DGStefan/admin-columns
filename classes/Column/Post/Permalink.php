<?php
defined( 'ABSPATH' ) or die();

/**
 * Column displaying full item permalink (including URL).
 *
 * @since 2.0
 */
class AC_Column_Post_Permalink extends AC_Column_PostAbstract {

	public function __construct() {
		$this->set_type( 'column-permalink' );
		$this->set_label( __( 'Permalink', 'codepress-admin-columns' ) );
	}

	public function get_value( $post_id ) {
		$link = $this->get_raw_value( $post_id );

		if ( 'on' == $this->get_option( 'link_to_post' ) ) {
			$link = ac_helper()->html->link( $link, $link, array( 'target' => '_blank' ) );
		}

		return $link;
	}

	public function get_raw_value( $post_id ) {
		return get_permalink( $post_id );
	}

	public function display_settings() {
		$this->field_settings->field( array(
			'type'          => 'radio',
			'name'          => 'link_to_post',
			'label'         => __( 'Link to post', 'codepress-admin-columns' ),
			'description'   => __( 'This will make the permalink clickable.', 'codepress-admin-columns' ),
			'options'       => array(
				'on'  => __( 'Yes' ),
				'off' => __( 'No' ),
			),
			'default_value' => 'off',
		) );
	}

}