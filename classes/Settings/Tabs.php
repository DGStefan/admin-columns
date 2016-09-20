<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class AC_Settings_Tabs {

	/**
	 * @var array
	 */
	private $tabs;

	/**
	 * Reference that points to default tab
	 *
	 * @var string
	 */
	private $default_slug;

	public function __construct() {
		$this->tabs = array();
	}

	/**
	 * @param AC_Settings_TabAbstract $tab
	 */
	public function register_tab( AC_Settings_TabAbstract $tab ) {
		$this->tabs[ $tab->get_slug() ] = $tab;

		if ( $tab->is_default() ) {
			$this->default_slug = $tab->get_slug();
		}
	}

	/**
	 * @param $slug
	 *
	 * @return AC_Settings_TabAbstract|false
	 */
	public function get_tab( $slug ) {
		$tab = false;

		if ( isset( $this->tabs[ $slug ] ) ) {
			$tab = $this->tabs[ $slug ];
		}

		return $tab;
	}

	/**
	 * @return string
	 */
	public function get_current_slug() {
		$slug = filter_input( INPUT_GET, 'tab' );

		if ( ! $slug && $this->default_slug ) {
			$slug = $this->default_slug;
		}

		return $slug;
	}

	public function display() { ?>
		<div id="cpac" class="wrap">
			<h2 class="nav-tab-wrapper cpac-nav-tab-wrapper">
				<?php

				$active_slug = $this->get_current_slug();

				foreach ( $this->tabs as $slug => $tab ) {
					$active = $slug == $active_slug ? ' nav-tab-active' : '';

					printf(
						'<a href="%s" class="nav-tab%s">%s</a>',
						esc_url( AC()->settings()->get_link( $slug ) ),
						$active,
						esc_html( $tab->get_label() )
					);
				}

				?>
			</h2>

			<?php

			do_action( 'cpac_messages' );

			do_action( 'cac/settings/after_menu' );

			if ( $tab = $this->get_tab( $active_slug ) ) {
				$tab->display();
			}

			?>
		</div>

		<?php
	}

}