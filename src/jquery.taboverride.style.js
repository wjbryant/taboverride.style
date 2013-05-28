/*! jquery.taboverride.style v0.1.0-dev | https://github.com/wjbryant/taboverride.style
Copyright (c) 2013 Bill Bryant | http://opensource.org/licenses/mit */

/*global exports, require, define, jQuery, tabOverride */

/**
 * the global jQuery object
 *
 * @name jQuery
 * @namespace
 */

/**
 * the jQuery prototype shortcut "namespace"
 *
 * @name fn
 * @namespace
 * @memberOf jQuery
 */

// Use CommonJS or AMD if available
(function ( factory ) {
	"use strict";

	if ( typeof exports === "object" && typeof require === "function" ) {
		// Node.js/CommonJS
		factory( require( "jquery" ), require( "taboverride" ),
			require( "jquery.taboverride" ), require( "taboverride.style" ) );
	} else if ( typeof define === "function" && define.amd ) {
		// AMD - Register as an anonymous module
		// Files must be concatenated using an AMD-aware tool such as r.js
		define( [ "jquery", "taboverride", "jquery.taboverride", "taboverride.style" ], factory );
	} else {
		// No module format - Use global variables instead
		factory( jQuery, tabOverride );
	}
}(function ( $, tabOverride ) {
	"use strict";

	var $fnTabOverride = $.fn.tabOverride,
		addDelegatedListeners = $fnTabOverride.utils.addDelegatedListeners,
		removeDelegatedListeners = $fnTabOverride.utils.removeDelegatedListeners;

	$fnTabOverride.style = tabOverride.style;

	$fnTabOverride.addDelegatedExtension(function ( $container, selector, enable ) {
		var utils = $fnTabOverride.style.utils,
			editEnabledClass,
			editActiveClass;

		if ( $fnTabOverride.style() ) {
			if ( enable ) {
				editEnabledClass = utils.addEnabledClass;
				editActiveClass = utils.addActiveClass;
			} else {
				editEnabledClass = utils.removeEnabledClass;
				editActiveClass = utils.removeActiveClass;
			}

			editEnabledClass( $container[0] );
			editActiveClass( $container[0] );
		}
	});

	// compatibility with other extensions that add and remove the listeners directly
	$fnTabOverride.utils.addDelegatedListeners = function ( $container, selector ) {
		if ( $fnTabOverride.style() ) {
			$fnTabOverride.style.utils.addActiveClass( $container[0] );
		}
		addDelegatedListeners( $container, selector );
	};
	$fnTabOverride.utils.removeDelegatedListeners = function ( $container, selector ) {
		if ( $fnTabOverride.style() ) {
			$fnTabOverride.style.utils.removeActiveClass( $container[0] );
		}
		removeDelegatedListeners( $container, selector );
	};
}));
