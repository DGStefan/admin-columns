<?php
defined( 'ABSPATH' ) or die();

/**
 * @since 2.0
 */
class AC_Column_Comment_Date extends AC_Column_DefaultAbstract {

	public function __construct() {
		parent::__construct();

		$this->set_type( 'date' );
	}

	public function get_default_with() {
		return 14;
	}

}