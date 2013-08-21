# tabOverride.style

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

*Note: The `focus` psuedo class is used in the example, but is not supported by IE 6 or 7.*

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

Hard tabs are enabled by setting the (soft) tab size to 0:

```javascript
// use hard tabs
tabOverride.tabSize(0)
```

```javascript
var hardTabSize = tabOverride.style.hardTabSize();
```

```javascript
tabOverride.style.hardTabSize(4); // default
```

*Note: Adjusting the hard tab size is not supported by all browsers. See
[this compatibility table](https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size#Browser_compatibility)
for more details.*

### Hooks

**setStyle** - Called when the style extension is enabled or disabled

*Parameters:*
* `enable` - whether the style extension was enabled or disabled

Example:

```javascript
tabOverride.addExtension('setStyle', function (enable) {
    if (enable) {
        // the style extension was enabled
    } else {
        // the style extension was disabled
    }
});
```

### Utility Properties

#### hardTabSizeSupported

This boolean property indicates whether changing the display size of hard tabs
is supported in the current browser. It can be accessed under the `utils`
namespace:

```javascript
tabOverride.style.utils.hardTabSizeSupported
```

### Utility Methods

```javascript
// this textarea variable is used in the following examples
var textarea = document.getElementById('txt');
```

#### addEnabledClass / addActiveClass

```javascript
tabOverride.style.utils.addEnabledClass(textarea);
tabOverride.style.utils.addActiveClass(textarea);
```

#### removeEnabledClass / removeActiveClass

```javascript
tabOverride.style.utils.removeEnabledClass(textarea);
tabOverride.style.utils.removeActiveClass(textarea);
```

#### updateEnabledClass / updateActiveClass

```javascript
// update/replace the class for all textareas
tabOverride.style.utils.updateEnabledClass('newEnabledClass');
tabOverride.style.utils.updateActiveClass('newActiveClass');
```

```javascript
// remove the class for all textareas
tabOverride.style.utils.updateEnabledClass();
tabOverride.style.utils.updateActiveClass();
```

#### addTabSizeCSSSelector

```javascript
// add an extra CSS selector for the hard tab size rule
// ".(enabledClass)" and ".(activeClass)" will be replaced with the current
// enabled or active class
tabOverride.style.utils.addTabSizeCSSSelector('.(enabledClass) textarea');
```

#### removeTabSizeCSSSelector

```javascript
// remove an extra CSS selector for the hard tab size rule
tabOverride.style.utils.removeTabSizeCSSSelector('.(enabledClass) textarea');
```

*Note: These methods will not add the same class to an element more than once.*