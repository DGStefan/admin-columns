<?php
defined( 'ABSPATH' ) or die();

/**
 * Column displaying information about the author of a post, such as the
 * author's display name, user ID and email address.
 *
 * @since 2.0
 */
class AC_Column_Post_LastModifiedAuthor extends CPAC_Column {

	public function init() {
		parent::init();

		$this->properties['type']	 			= 'column-last_modified_author';
		$this->properties['label']	 			= __( 'Last Modified Author', 'codepress-admin-columns' );
		$this->properties['is_cloneable']		= true;
	}

	public function get_value( $post_id ) {
		$value = '';
		if ( $user_id = $this->get_raw_value( $post_id ) ) {
			$value = $this->get_user_formatted( $user_id );
		}

		return $value;
	}

	public function get_raw_value( $post_id ) {
		return get_post_meta( $post_id, '_edit_last', true );
	}

	public function display_settings() {
		$this->display_field_user_format();
	}

}