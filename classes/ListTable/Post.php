<?php

namespace AC\ListTable;

use AC\ListTable;
use WP_Posts_List_Table;

class Post implements ListTable {

	/**
	 * @var WP_Posts_List_Table
	 */
	private $table;

	public function __construct( WP_Posts_List_Table $table ) {
		$this->table = $table;
	}

	public function get_column_value( $column, $id ) {
		ob_start();
		$this->table->column_default( get_post( $id ), $column );

		return ob_get_clean();
	}

}