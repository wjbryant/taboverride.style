/*! jquery.taboverride.style v0.1.0-dev | https://github.com/wjbryant/taboverride.style
Copyright (c) 2013 Bill Bryant | http://opensource.org/licenses/mit */

/*jslint white: true */
/*global exports, require, define, jQuery, tabOverride */

/**
 * The tabOverride jQuery plugin
 *
 * @external "jQuery.fn.tabOverride"
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
		cache = [];

	/**
	 * Adds and removes the classes on the container element for delegated events.
	 *
	 * @param {Object} $container  the jQuery object for the container element(s)
	 * @param {string} selector    the selector string for textareas in the
	 *                             container element
	 *
	 * @private
	 */
	function addStyles( $container, selector ) {
		var utils = $fnTabOverride.style.utils;
		utils.addEnabledClass( $container[ 0 ] );
		utils.addActiveClass( $container[ 0 ] );
		utils.addTabSizeCSSSelector( ".(enabledClass) " + selector );
	}

	/**
	 * Removes all CSS classes set by tabOverride.style for the specified
	 * container element and also removes the specified selector string from
	 * the tab-size CSS rule.
	 *
	 * @param {Object} $container  the jQuery object for the container element(s)
	 * @param {string} selector    the selector string for textareas in the
	 *                             container element
	 *
	 * @private
	 */
	function removeStyles( $container, selector ) {
		var utils = $fnTabOverride.style.utils;
		utils.removeEnabledClass( $container[ 0 ] );
		utils.removeActiveClass( $container[ 0 ] );
		utils.removeTabSizeCSSSelector( ".(enabledClass) " + selector );
	}

	/**
	 * Adds an item to the cache array.
	 *
	 * @param {Object} $container  the jQuery object for the container element(s)
	 * @param {string} selector    the selector string for textareas in the
	 *                             container element
	 *
	 * @private
	 */
	function addCacheItem( $container, selector ) {
		cache.push({ $container: $container, selector: selector });
	}

	/**
	 * Removes an item from the cache array.
	 *
	 * @param {Object} $container  the jQuery object for the container element(s)
	 * @param {string} selector    the selector string for textareas in the
	 *                             container element
	 *
	 * @private
	 */
	function removeCacheItem( $container, selector ) {
		var i,
			len = cache.length;

		for ( i = 0; i < len; i += 1 ) {
			if ( cache[ i ].$container === $container &&
					cache[ i ].selector === selector ) {
				cache.splice( i, 1 );
				break;
			}
		}
	}


	/**
	 * Enables or disables the style extension (default = enabled). The
	 * 'setStyle' hook is executed whenever the style extension is enabled or
	 * disabled. The extension function is passed a boolean value indicating
	 * whether the extension was enabled (true) or disabled (false). For more
	 * information regarding the style extension and its usage, please refer to
	 * the documentation for tabOverride.style.
	 *
	 * @param  {boolean}          [enable]  whether to enable the style extension
	 * @return {boolean|Function}           whether the style extension is enabled
	 *                                      or the tabOverride function
	 *
	 * @method external:"jQuery.fn.tabOverride".style
	 */
	$fnTabOverride.style = tabOverride.style;


	// add extension functions

	tabOverride.addExtension( "setDelegated", function ( $container, selector, enable ) {
		( enable ? addCacheItem : removeCacheItem )( $container, selector );

		if ( $fnTabOverride.style() ) {
			( enable ? addStyles : removeStyles )( $container, selector );
		}
	});

	// compatibility with other extensions that add and remove the listeners directly
	tabOverride.addExtension( "addDelegatedListeners", function ( $container ) {
		if ( $fnTabOverride.style() ) {
			$fnTabOverride.style.utils.addActiveClass( $container[ 0 ] );
		}
	});
	tabOverride.addExtension( "removeDelegatedListeners", function ( $container ) {
		if ( $fnTabOverride.style() ) {
			$fnTabOverride.style.utils.removeActiveClass( $container[ 0 ] );
		}
	});

	tabOverride.addExtension( "setStyle", function ( enable ) {
		var editStyles = enable ? addStyles : removeStyles;

		$.each( cache, function () {
			editStyles( this.$container, this.selector );
		});
	});
}));
