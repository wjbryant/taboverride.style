/*! taboverride.style v0.1.0-dev | https://github.com/wjbryant/taboverride.style
Copyright (c) 2013 Bill Bryant | http://opensource.org/licenses/mit */

/*global exports, require, define, tabOverride */

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

    // checks if an element has the specified CSS class
    function hasClass(elem, cssClass) {
        return (new RegExp('(?:^|\\s)' + cssClass + '(?:\\s|$)')).test(elem.className);
    }

    // add a class to an element
    function addClass(elem, cssClass) {
        if (!hasClass(elem, cssClass)) {
            elem.className += (elem.className ? ' ' : '') + cssClass;
        }
    }

    // remove a class from an element
    function removeClass(elem, cssClass) {
        elem.className = elem.className.replace(
            new RegExp('(?:^|\\s)' + cssClass + '(?=\\s|$)', 'g'),
            ''
        );
    }

    // replace the tabOverride class on an element with a new one
    function replaceClass(elem, newClassName) {
        elem.className = elem.className.replace(
            new RegExp('(?=^|\\s)' + className + '(?=\\s|$)', 'g'),
            newClassName
        );
    }

    // loop through all textareas and update them to the new class
    // if no new class name is specified, remove the class
    function updateClasses(newClassName) {
        var textareas = document.getElementsByTagName('textarea'),
            i,
            len = textareas.length,
            editClass,
            cssClass;

        if (newClassName) {
            editClass = replaceClass;
            cssClass = newClassName;
        } else {
            editClass = removeClass;
            cssClass = className;
        }

        for (i = 0; i < len; i += 1) {
            editClass(textareas[i], cssClass);
        }
    }

    // add or remove the class
    function toggleClass(elem, add) {
        (add ? addClass : removeClass)(elem, className);
    }

    // add or remove the class if the extension is enabled
    function toggleClassIfEnabled(elem, add) {
        if (style) {
            toggleClass(elem, add);
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
            if (newClassName && typeof newClassName === 'string') {
                updateClasses(newClassName);
                className = newClassName;
            }
        } else {
            return className;
        }
    };

    tabOverride.style.toggleClass = toggleClass;
    tabOverride.style.toggleClassIfEnabled = toggleClassIfEnabled;
    tabOverride.style.updateClasses = updateClasses;

    // add the extension to Tab Override (hook into the set method)
    tabOverride.addExtension(toggleClassIfEnabled);

    // wrap the addListeners and removeListeners utility methods
    // This will only affect extensions, since Tab Override only adds and
    // removes listeners from inside the set method and doesn't use these
    // utility methods directly.
    tabOverride.utils.addListeners = function (elem) {
        toggleClassIfEnabled(elem, true);
        addListeners(elem);
    };
    tabOverride.utils.removeListeners = function (elem) {
        toggleClassIfEnabled(elem, false);
        removeListeners(elem);
    };
}));
