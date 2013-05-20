# taboverride.style

Style extension for [Tab Override](https://github.com/wjbryant/taboverride) 4.0+

This extension adds a `tabOverride` CSS class to textarea elements when Tab Override is enabled.

## Usage

When using delegated events with the jQuery plugin, the class is applied to the
container element. Therefore, to account for both behaviors, CSS selectors
should be written similar to the following:

```
textarea.tabOverride,
.tabOverride textarea {
    /* rules */
}
```

The `focus` psuedo class is used in the example, but is not supported by IE 6 or 7.

```
.tabOverride:focus {
    /* rules */
}
```

### Enable/Disable

The extension is enabled by default.

```javascript
// get the current setting
var styleEnabled = tabOverride.style();
```

```javascript
// enable the extension
tabOverride.style(true);
```

```javascript
// disable the extension
tabOverride.style(false);
```

Disabling the style extension will stop classes from being added and
removed, but won't remove any classes that were previously added.

### Utility Functions

```javascript
var cssClassName = tabOverride.style.className();

// tabOverride is the default class name
tabOverride.style.className('tabOverride');
```

```javascript
var textarea = document.getElementById('txt');

// add class
tabOverride.style.toggleClass(textarea, true);

// remove class
tabOverride.style.toggleClass(textarea, false);
```

This function will not add multiple classes to an element.