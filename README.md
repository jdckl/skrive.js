![Skrive.js](preview.gif)

# Skrive.js

Super simple ES6 module to iteratively type characters from a string into a DOM element.  

Nothing fancy, just writes the string to DOM with the given speed. There are probably a ton of other typewriter/typer packages, I've abstracted this one from my personal website and figured why not put it out there? It's very small and only does this one thing.

Tested with React, but should work with any types of DOM if you can construct **Skrive** with an _Element_.

## Usage

```js
// ...
import Skrive from 'skrive.js';

const elRef = useRef();

// After the element component mounts
const typer = new Skrive(elRef.current, {
    typeDelay: 200
    clearBeforeWriting: false
});

// Do anything, anywhere else
await typer.write('Hello world!'); // Write to the DOM element
typer.clear(); // Clear the DOM elements content

// ... (more code like assigning your ref)
```  

You could also do something like this:
```js
let finishedProcessing = false;

do {
    await typer.write('|', 100, true)
    await typer.write('/', 100, true)
    await typer.write('—', 100, true)
    await typer.write('\\', 100, true)
} while (!finishedProcessing);
```  

_And you could probably easily extend this with some CSS magic to suit your case :)_

## Methods

| Method | Description |
| --- | --- |
| **write(text:_string_, typeDelay:_number_, clearBeforeWriting:_boolean_)** | Write a given string to the DOM elements content. |
| **clear()** | Clear the contents of the DOM element. |

## Options

| Option | Description |
| --- | --- |
| **typeDelay** | The delay between writing the next character. _(default: 200)_ |
| **clearBeforeWriting** | Should the DOM elements content be cleared before writing this string to it? _(default: false)_ |

_You can also supply these options on the fly with the **write()** method_