# taboverride.style

Style extension for [Tab Override](https://github.com/wjbryant/taboverride) 4.0+

This extension adds `tabOverrideEnabled` and `tabOverrideActive` CSS classes to
textarea elements when Tab Override is enabled and active.

## Usage

When using delegated events with the jQuery plugin, the class is applied to the
container element. Therefore, to account for both behaviors, CSS selectors
should be written similar to the following:

```css
textarea.tabOverrideActive,
.tabOverrideActive textarea {
    /* declarations */
}
```

The `focus` psuedo class is used in the example, but is not supported by IE 6 or 7.

```css
.tabOverrideActive:focus {
    /* declarations */
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
tabOverride.style(true); // default
```

```javascript
// disable the extension
tabOverride.style(false);
```

### Get/Set Enabled Class

```javascript
var enabledClass = tabOverride.style.enabledClass();
```

```javascript
tabOverride.style.enabledClass('tabOverrideEnabled'); // default
```

### Get/Set Active Class

```javascript
var activeClass = tabOverride.style.activeClass();
```

```javascript
tabOverride.style.activeClass('tabOverrideActive'); // default
```

### Get/Set Hard Tab Size

```javascript
var hardTabSize = tabOverride.style.hardTabSize();
```

```javascript
tabOverride.style.hardTabSize(4); // default
```

### Add an Extension Function

```javascript
tabOverride.style.addExtension(function (enable) {
    if (enable) {
        // the style extension was enabled
    } else {
        // the style extension was disabled
    }
});
```

### Utility Functions

```javascript
var textarea = document.getElementById('txt');

tabOverride.style.utils.addEnabledClass(textarea);
tabOverride.style.utils.addActiveClass(textarea);

tabOverride.style.utils.removeEnabledClass(textarea);
tabOverride.style.utils.removeActiveClass(textarea);

// update/replace the class for all textareas
tabOverride.style.utils.updateEnabledClass('newEnabledClass');
tabOverride.style.utils.updateActiveClass('newActiveClass');

// remove the class for all textareas
tabOverride.style.utils.updateEnabledClass();
tabOverride.style.utils.updateActiveClass();

// add an extra CSS selector for the hard tab size rule
// ".(enabledClass)" and ".(activeClass)" will be replaced with the current
// enabled or active class
tabOverride.style.utils.addTabSizeCSSSelector('.(enabledClass) textarea');

// remove an extra CSS selector for the hard tab size rule
tabOverride.style.utils.removeTabSizeCSSSelector('.(enabledClass) textarea');
```

*Note: These functions will not add a class to an element more than once.*