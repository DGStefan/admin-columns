<?php

namespace AC\Integration;

use AC\Integration;
use AC\Screen;

final class MetaBox extends Integration {

	public function __construct() {
		parent::__construct(
			'ac-addon-metabox/ac-addon-metabox.php',
			__( 'Meta Box', 'codepress-admin-columns' ),
			'assets/images/addons/metabox.svg',
			__( 'Instantly generate columns for your Meta Box custom fields!', 'codepress-admin-columns' ),
			null,
			'metabox'
		);
	}

	public function is_plugin_active() {
		return class_exists( 'RWMB_Loader', false );
	}

	public function show_notice( Screen $screen ) {
		return $screen->get_id() === 'toplevel_page_meta-box';
	}

}