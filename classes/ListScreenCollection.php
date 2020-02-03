<?php

namespace AC;

use Countable;
use Iterator;

final class ListScreenCollection implements Iterator, Countable {

	/**
	 * @var ListScreen[]
	 */
	private $data;

	public function __construct( array $list_screens = [] ) {
		array_map( [ $this, 'add' ], $list_screens );
	}

	public function add( ListScreen $list_screen ) {
		$this->data[ $list_screen->get_layout_id() ] = $list_screen;
	}

	public function remove( ListScreen $list_screen ) {
		unset( $this->data[ $list_screen->get_layout_id() ] );
	}

	public function add_collection( ListScreenCollection $collection ) {
		foreach ( $collection as $list_screen ) {
			$this->add( $list_screen );
		}
	}

	public function rewind() {
		reset( $this->data );
	}

	/**
	 * @return ListScreen
	 */
	public function current() {
		return current( $this->data );
	}

	public function key() {
		return key( $this->data );
	}

	public function next() {
		return next( $this->data );
	}

	public function valid() {
		$key = $this->key();

		return ( $key !== null && $key !== false );
	}

	/**
	 * @return int
	 */
	public function count() {
		return count( $this->data );
	}

	/**
	 * @param ListScreen $list_screen
	 *
	 * @return bool
	 */
	public function contains( ListScreen $list_screen ) {
		return isset( $this->data[ $list_screen->get_layout_id() ] );
	}

}