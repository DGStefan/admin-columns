<?php

namespace AC\Helper;

use DateTime;
use DateTimeZone;

class Date {

	/**
	 * @param string $date
	 *
	 * @return int|false
	 */
	public function strtotime( $date ) {
		if ( empty( $date ) || in_array( $date, array( '0000-00-00 00:00:00', '0000-00-00', '00:00:00' ) ) || ! is_scalar( $date ) ) {
			return false;
		}

		// some plugins store dates in a jquery timestamp format, format is in ms since The Epoch.
		// See http://api.jqueryui.com/datepicker/#utility-formatDate
		if ( is_numeric( $date ) ) {
			$length = strlen( trim( $date ) );

			// Dates before / around September 8th, 2001 are saved as 9 numbers * 1000 resulting in 12 numbers to store the time.
			// Dates after September 8th are saved as 10 numbers * 1000, resulting in 13 numbers.
			// For example the ACF Date and Time Picker uses this format.
			// credits: Ben C
			if ( 12 === $length || 13 === $length ) {
				$date = round( $date / 1000 ); // remove the ms
			}

			// Date format: yyyymmdd ( often used by ACF ) must start with 19xx or 20xx and is 8 long
			// in theory a numeric string of 8 can also be a unix timestamp; no conversion would be needed
			if ( 8 === $length && ( strpos( $date, '20' ) === 0 || strpos( $date, '19' ) === 0 ) ) {
				$date = strtotime( $date );
			}
		} else {
			$date = strtotime( $date );
		}

		return $date;
	}

	/**
	 * @param string $date
	 * @param string $format
	 *
	 * @return int|false
	 */
	public function get_timestamp_from_format( $date, $format ) {
		if ( ! $date ) {
			return false;
		}

		// Already a timestamp
		if ( 'U' === $format ) {
			return $date;
		}

		return ( DateTime::createFromFormat( $format, $date ) )->format( 'U' );
	}

	/**
	 * @param string $date           PHP Date format
	 * @param string $display_format Date display format
	 *
	 * @return string Formatted date
	 * @since 1.3.1
	 */
	public function date( $date, $display_format = '' ) {
		$timestamp = $this->strtotime( $date );

		return $this->date_by_timestamp( $timestamp, $display_format );
	}

	/**
	 * @param        $timestamp
	 * @param string $display_format Date display format
	 *
	 * @return string Formatted date
	 * @since 3.0
	 */
	public function date_by_timestamp( $timestamp, $display_format = '' ) {
		if ( ! $timestamp ) {
			return false;
		}

		switch ( $display_format ) {

			case 'wp_date' :
				$display_format = get_option( 'date_format' );

				break;
			case 'wp_date_time' :
				$display_format = get_option( 'date_format' ) . ' ' . get_option( 'time_format' );

				break;
		}

		// Get date format from the General Settings
		if ( ! $display_format ) {
			$display_format = get_option( 'date_format' );
		}

		// Fallback in case the date format from General Settings is empty
		if ( ! $display_format ) {
			$display_format = 'F j, Y';
		}

		return $this->format_date( $display_format, $timestamp );
	}

	public function format_date( $format, $time = null, $timezone = null ) {
		if ( function_exists( 'wp_date' ) ) {
			if ( ! $timezone ) {
				$timezone = new DateTimeZone( date_default_timezone_get() );
			}

			return wp_date( $format, $time, $timezone );
		}

		return date_i18n( $format, $time );
	}

	/**
	 * @param string $date
	 * @param string $format
	 *
	 * @return string Formatted time
	 * @since 1.3.1
	 */
	public function time( $date, $format = '' ) {
		$timestamp = ac_helper()->date->strtotime( $date );

		if ( ! $format ) {
			$format = get_option( 'time_format' );
		}

		if ( ! $timestamp ) {
			return false;
		}

		return $this->format_date( $format, $timestamp );
	}

	/**
	 * Translate a jQuery date format to the PHP date format
	 *
	 * @param string $format jQuery date format
	 *
	 * @return string PHP date format
	 * @since 1.1
	 */
	public function parse_jquery_dateformat( $format ) {
		$replace = array(
			'^dd^d' => 'j',
			'dd'    => 'd',
			'DD'    => 'l',
			'o'     => 'z',
			'MM'    => 'F',
			'^mm^m' => 'n',
			'mm'    => 'm',
			'yy'    => 'Y',
		);

		$replace_from = array();
		$replace_to = array();

		foreach ( $replace as $from => $to ) {
			$replace_from[] = '/' . $from . '/';
			$replace_to[] = $to;
		}

		return preg_replace( $replace_from, $replace_to, $format );
	}

}