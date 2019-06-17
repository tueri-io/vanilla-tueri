# vanilla-tueri
Integrate Tueri.io with Vanilla Javascript

## Installation

```html
<script src='https://cdn.jsdelivr.net/gh/tueriapp/vanilla-tueri@<latest-version>/dist/tueri.min.js'></script>
```

> Be sure to change `<latest-version>` for the [current release version](https://github.com/tueri-io/vanilla-tueri/releases) ie. 1.0.6

## Usage

Change `<img src='...' />` to `<img tueri-src='...' />`

```html
<!-- change src -->
<img src="https://cdn.tueri.io/..." alt="Alternate Text"/>

<!-- to tueri-src -->
<img tueri-src="https://cdn.tueri.io/..." alt="Alternate Text/>
```

Tueri automatically detects the dimensions of the parent element, then generates and returns your image in exactly the right dimensions to fill the parent element.
