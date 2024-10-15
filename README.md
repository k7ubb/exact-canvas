Provide a canvas element that exactly matches the screen pixels and uniform logical coordinates.

## Load from CDN
```html
<script src="https://cdn.jsdelivr.net/gh/k7ubb/exact-canvas@main/exact-canvas.js"></script>
```

## Example
```html
<div id="screen" style="width: 100%; height: 100%;"></div>
```

```javascript
const point = {x: 960, y: 540};
const exact = new ExactCanvas(document.getElementById("game"), 1920, 1080, {rotate: true});
exact.canvas.addEventListener("click", (event) => {
  const rect = event.target.getBoundingClientRect();
  [point.x, point.y] = exact.toLogicalPoint(event.clientX - rect.left, event.clientY - rect.top);
  update();
});
const update = () => {
  const ctx = exact.canvas.getContext("2d");
  ctx.clearRect(0, 0, 1920, 1080);
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(point.x - 10, point.y - 10, 20, 20);
};
exact.onResize = update;
```

## Usage

### initialize
```javascript
const exact = new ExactCanvas(element, width, height)
const exact = new ExactCanvas(element, width, height, { rotate })
```

```element``` must be block-level element. A canvas element with aspect ratio of width:height and the maximum size inscribed in ```element``` will be generated.
If ```rotate``` is ```true``` and the canvas can be larger, the canvas will be rotated 90°.

### property and methods
- ```exact.canvas```: Generated canvas element. Its context is scaled so that the overall size is width × height.
- ```exact.onResize()```: Executed when the size of ```element``` changes due to screen scaling, etc.
- ```exact.toLogicalPoint(x, y)```: Convert physical coordinates to logical coordinates. Used for drawing based on mouse coordinates.
- ```exact.toPhysicalPoint(x, y)```: Convert logical coordinates to physical coordinates. Use for ```context.isPointInPath.``` (isPointInpath is unaffected by the transformation of the context.)
