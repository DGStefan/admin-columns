<?php

namespace AC\Admin\Asset;

use AC;
use AC\Asset\Location;
use AC\Asset\Script;
use AC\DefaultColumnsRepository;
use AC\ListScreen;
use AC\ListScreenTypes;

class Columns extends Script {

	/**
	 * @var ListScreen
	 */
	private $list_screen;

	/**
	 * @var DefaultColumnsRepository
	 */
	private $default_columns;

	/**
	 * @var bool
	 */
	private $network_active;

	public function __construct(
		$handle,
		Location $location,
		DefaultColumnsRepository $default_columns,
		$network_active = false,
		ListScreen $list_screen = null
	) {
		parent::__construct( $handle, $location, [
			'jquery',
			'dashboard',
			'jquery-ui-slider',
			'jquery-ui-sortable',
			'wp-pointer',
		] );

		$this->list_screen = $list_screen;
		$this->default_columns = $default_columns;
		$this->network_active = (bool) $network_active;
	}

	private function get_list_screens() {
		return $this->network_active
			? ListScreenTypes::instance()->get_list_screens( [ 'network_only' => true ] )
			: ListScreenTypes::instance()->get_list_screens( [ 'site_only' => true ] );
	}

	public function register() {
		parent::register();

		if ( null === $this->list_screen ) {
			return;
		}

		$params = [
			'_ajax_nonce'                => wp_create_nonce( AC\Ajax\Handler::NONCE_ACTION ),
			'layout'                     => $this->list_screen->get_id(),
			// todo: remove?
			'list_screen'                => $this->list_screen->get_type(),
			'original_columns'           => [],
			'uninitialized_list_screens' => [],
			'i18n'                       => [
				'clone'  => __( '%s column is already present and can not be duplicated.', 'codepress-admin-columns' ),
				'error'  => __( 'Invalid response.', 'codepress-admin-columns' ),
				'errors' => [
					'save_settings'  => __( 'There was an error during saving the column settings.', 'codepress-admin-columns' ),
					'loading_column' => __( 'The column could not be loaded because of an unknown error', 'codepress-admin-columns' ),
				],
			],
		];

		foreach ( $this->get_list_screens() as $list_screen ) {
			if ( $this->default_columns->exists( $list_screen ) ) {
				continue;
			}

			$params['uninitialized_list_screens'][] = [
				// todo
				'screen_link' => add_query_arg( [ 'save-default-headings' => '1', 'list_screen' => $list_screen->get_id()->get_value() ], $list_screen->get_screen_link() ),
				'label'       => $list_screen->get_label(),
			];
		}

		wp_localize_script( 'ac-admin-page-columns', 'AC', $params );
	}

}