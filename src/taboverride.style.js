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
        enabledClass = 'tabOverrideEnabled',
        activeClass = 'tabOverrideActive',
        hardTabSize = 4,
        styleElem,
        styleSheet,
        tabSizeRule,
        extraSelectors = [],
        // this is a live collection
        textareas = document.getElementsByTagName('textarea');

    // add a class to an element
    function addClass(elem, cssClass) {
        // check if the element has the specified CSS class before adding it
        if (!(new RegExp('(?:^|\\s)' + cssClass + '(?:\\s|$)')).test(elem.className)) {
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

    // replace a class with a new one for the specified element
    function replaceClass(elem, oldClass, newClass) {
        elem.className = elem.className.replace(
            new RegExp('(^|\\s)' + oldClass + '(?=\\s|$)', 'g'),
            '$1' + newClass
        );
    }

    // add the enabled class
    function addEnabledClass(elem) {
        addClass(elem, enabledClass);
    }

    // add the active class
    function addActiveClass(elem) {
        addClass(elem, activeClass);
    }

    // remove the enabled class
    function removeEnabledClass(elem) {
        removeClass(elem, enabledClass);
    }

    // remove the active class
    function removeActiveClass(elem) {
        removeClass(elem, activeClass);
    }

    // loop through all textareas and update them to the new class
    // if no new class is specified, remove the old class
    function updateClassOnTextareas(oldClass, newClass) {
        var editClass = newClass ? replaceClass : removeClass,
            len = textareas.length,
            i;

        for (i = 0; i < len; i += 1) {
            editClass(textareas[i], oldClass, newClass);
        }
    }

    function updateEnabledClass(newClass) {
        updateClassOnTextareas(enabledClass, newClass);
    }

    function updateActiveClass(newClass) {
        updateClassOnTextareas(activeClass, newClass);
    }

    // change the tab-size CSS property value
    function updateTabSizeCSSValue(tabSize) {
        tabSizeRule.style.MozTabSize = tabSize;
        tabSizeRule.style.OTabSize = tabSize;
        tabSizeRule.style.tabSize = tabSize;
    }

    function updateTabSizeCSSRule(className, tabSize) {
        var selector = 'textarea.' + (className || enabledClass);

        if (extraSelectors.length) {
            selector += ',' + extraSelectors.join(',')
                .replace(/\.\(enabledClass\)/g, '.' +  enabledClass)
                .replace(/\.\(activeClass\)/g, '.' + activeClass);
        }

        if (styleSheet.deleteRule) {
            if (styleSheet.cssRules.length) {
                styleSheet.deleteRule(0);
            }
            styleSheet.insertRule(selector + '{}', 0);
        } else if (styleSheet.removeRule) {
            // IE
            if (styleSheet.rules.length) {
                styleSheet.removeRule(0);
            }
            styleSheet.addRule(selector, '', 0);
        }

        tabSizeRule = (styleSheet.cssRules || styleSheet.rules)[0];
        updateTabSizeCSSValue(arguments.length > 1 ? tabSize : hardTabSize);
    }

    function addTabSizeCSSSelector(newSelector) {
        extraSelectors.push(newSelector);
        updateTabSizeCSSRule();
    }

    function removeTabSizeCSSSelector(cssSelector) {
        var i,
            len = extraSelectors.length;

        for (i = 0; i < len; i += 1) {
            if (extraSelectors[i] === cssSelector) {
                extraSelectors.splice(i, 1);
                break;
            }
        }

        updateTabSizeCSSRule();
    }

    // provide a method to enable/disable the extension
    tabOverride.style = function (enable) {
        var len,
            i,
            editEnabledClass,
            editActiveClass,
            currTextarea;

        if (arguments.length) {

            tabOverride.utils.executeExtensions('setStyle', [enable]);

            if (enable) {
                editEnabledClass = addEnabledClass;
                editActiveClass = addActiveClass;
                style = true;
            } else {
                editEnabledClass = removeEnabledClass;
                editActiveClass = removeActiveClass;
                style = false;
            }

            len = textareas.length;

            for (i = 0; i < len; i += 1) {
                currTextarea = textareas[i];
                if (currTextarea.getAttribute('data-taboverride-enabled')) {
                    editEnabledClass(currTextarea);
                    editActiveClass(currTextarea);
                }
            }

            return this;
        }

        return style;
    };

    // get/set the "enabled" class name (default = tabOverrideEnabled)
    tabOverride.style.enabledClass = function (newClass) {
        if (arguments.length) {
            if (newClass && typeof newClass === 'string') {
                updateClassOnTextareas(enabledClass, newClass);
                updateTabSizeCSSRule(newClass);
                enabledClass = newClass;
            }
            return this;
        }
        return enabledClass;
    };

    // get/set the "active" class name (default = tabOverrideActive)
    tabOverride.style.activeClass = function (newClass) {
        if (arguments.length) {
            if (newClass && typeof newClass === 'string') {
                updateClassOnTextareas(activeClass, newClass);
                activeClass = newClass;
            }
            return this;
        }
        return activeClass;
    };

    // get/set the hard tab size (default = 4)
    tabOverride.style.hardTabSize = function (size) {
        if (arguments.length) {
            if (typeof size === 'number' && size > 0) {
                updateTabSizeCSSValue(size);
                hardTabSize = size;
            }
            return this;
        }
        return hardTabSize;
    };

    // public util methods
    tabOverride.style.utils = {
        addEnabledClass: addEnabledClass,
        addActiveClass: addActiveClass,
        removeEnabledClass: removeEnabledClass,
        removeActiveClass: removeActiveClass,
        updateEnabledClass: updateEnabledClass,
        updateActiveClass: updateActiveClass,
        addTabSizeCSSSelector: addTabSizeCSSSelector,
        removeTabSizeCSSSelector: removeTabSizeCSSSelector
    };


    // create a new style sheet element
    if (document.createStyleSheet) {
        // IE
        styleSheet = document.createStyleSheet();
    } else {
        // add a new style element to the page
        styleElem = document.createElement('style');
        document.getElementsByTagName('head')[0].appendChild(styleElem);
        styleSheet = styleElem.sheet || document.styleSheets[document.styleSheets - 1];
    }

    // create the CSS rule
    updateTabSizeCSSRule();


    // add the extension to Tab Override (hook into the set method)
    tabOverride.addExtension('set', function (elem, enable) {
        if (style) {
            if (enable) {
                addEnabledClass(elem);
                addActiveClass(elem);
            } else {
                removeEnabledClass(elem);
                removeActiveClass(elem);
            }
        }
    });

    // whenever the listeners are added, add the active class
    tabOverride.addExtension('addListeners', function (elem) {
        if (style) {
            addActiveClass(elem);
        }
    });

    // whenever the listeners are removed, remove the active class
    tabOverride.addExtension('removeListeners', function (elem) {
        if (style) {
            removeActiveClass(elem);
        }
    });
}));
