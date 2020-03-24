<?php

namespace AC;

class ListScreenTypes {

	/** @var ListScreenTypes */
	private static $instance = null;

	/** @var ListScreen[] */
	private $list_screens = [];

	/**
	 * @return ListScreenTypes
	 */
	static public function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * @param ListScreen $list_screen
	 *
	 * @return $this
	 */
	public function register_list_screen( ListScreen $list_screen ) {
		$this->list_screens[] = $list_screen;

		return $this;
	}

	public function get_list_screens( array $args = [] ) {
		$list_screens = $this->list_screens;

		// todo
//		if ( isset( $args['network_only'] ) && true === $args['network_only'] ) {
//			$list_screens = $this->filter_by_network( $list_screens );
//		}
//		if ( isset( $args['site_only'] ) && true === $args['site_only'] ) {
//			$list_screens = $this->filter_by_non_network( $list_screens );
//		}

		return $list_screens;
	}

	/**
	 * @param ListScreen[] $list_screens
	 *
	 * @return ListScreen[]
	 */
	private function filter_by_network( array $list_screens ) {
		foreach ( $list_screens as $k => $list_screen ) {
			if ( ! $list_screen->is_network_only() ) {
				unset( $list_screens[ $k ] );
			}
		}

		return $list_screens;
	}

	/**
	 * @param ListScreen[] $list_screens
	 *
	 * @return ListScreen[]
	 */
	private function filter_by_non_network( array $list_screens ) {
		foreach ( $list_screens as $k => $list_screen ) {
			if ( $list_screen->is_network_only() ) {
				unset( $list_screens[ $k ] );
			}
		}

		return $list_screens;
	}

}