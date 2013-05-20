/*! taboverride.style v0.1.0-dev | https://github.com/wjbryant/taboverride.escape
Copyright (c) 2013 Bill Bryant | http://opensource.org/licenses/mit */

/*global tabOverride */

// use CommonJS or AMD if available
(function (factory) {
    'use strict';

    if (typeof exports === 'object' && typeof require === 'function') {
        // Node.js/CommonJS
        factory(require('taboverride'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD - register as an anonymous module
        // files must be concatenated using an AMD-aware tool such as r.js
        define(['taboverride'], factory);
    } else {
        // no module format - use global variable
        factory(tabOverride);
    }
}(function (tabOverride) {
    'use strict';
    
    var style = true,
        className = 'tabOverride',
        addListeners = tabOverride.utils.addListeners,
        removeListeners = tabOverride.utils.removeListeners;

    // add or remove the tabOverride class if the extension is enabled
    function toggleClass(elem, addClass) {
        var currClass = elem.className,
            hasClassRegExp = new RegExp('(?:^|\\s)' + className + '(?:\\s|$)'),
            removeClassRegExp = new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'g');

        if (style) {
            // check for class
            if (hasClassRegExp.test(currClass)) {
                if (!addClass) {
                    // remove class
                    elem.className = currClass.replace(removeClassRegExp, '');
                }
            } else if (addClass) {
                // add class
                elem.className += className;
            }
        }
    }

    // provide a method to enable/disable the extension
    tabOverride.style = function (enable) {
        if (arguments.length) {
            style = enable ? true : false;
            return this;
        }
        return style;
    };

    // get/set the className (default = tabOverride)
    tabOverride.style.className = function (newClassName) {
        if (arguments.length) {
            if (typeof newClassName === 'string') {
                className = newClassName;
            }
        } else {
            return className;
        }
    };

    tabOverride.style.toggleClass = toggleClass;

    // add the extension to Tab Override (hook into the set method)
    tabOverride.addExtension(toggleClass);

    // wrap the addListeners and removeListeners utility methods
    // This will only affect extensions, since Tab Override only adds and
    // removes listeners from inside the set method and doesn't use these
    // utility methods directly.
    tabOverride.utils.addListeners = function (elem) {
        toggleClass(elem, true);
        addListeners(elem);
    };
    tabOverride.utils.removeListeners = function (elem) {
        toggleClass(elem, false);
        removeListeners(elem);
    };
}));
