# exact-canvas

## 概要
物理解像度と一致するCanvas要素を生成するライブラリです。\
実際のCanvas要素の大きさに関係なく、共通の論理座標で描画指定が可能です。

## 使用例
```html
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://cdn.jsdelivr.net/gh/k7ubb/exact-canvas@main/exact-canvas.js"></script>
</head>
<body>
<div id="screen" style="width: 100%; height: 100%;"></div>
<script>
const point = {x: 960, y: 540};
const exact = new ExactCanvas(document.getElementById("screen"), 1920, 1080, {rotate: true});
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
</script>
</html>
```

## 使い方

- ```width=device-widrh``` の指定が必要です。
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```
- ```element``` は幅と高さをもつ要素を指定します。アスペクト比が ```width : height``` で ```element``` に内接する最大の大きさのCanvas要素を生成します。
  ```rotate: true``` を指定すると、Canvasの大きさをより大きくできる場合に、90°回転させて表示します。
  ```javascript
  const exact = new ExactCanvas(element, width, height)
  const exact = new ExactCanvas(element, width, height, { rotate })
  ```
- ```exact.canvas``` で生成されたCanvas要素を取得します。
- ```exact.canvas.getContext('2d')``` は、Canvas要素の大きさが```width : height```となるように座標変換が行われた描画コンテキストを返します。
- ```element```のサイズが変化した場合、Canvasの大きさを再計算します。その時点での描画内容はリセットされ、```exact.onResize()```が実行されます。
- 物理座標から論理座標に変換するには、 ```exact.toLogicalPoint(x, y)``` を使用します。
- 論理座標から物理座標に変換するには、 ```exact.toPhysicalPoint(x, y)``` を使用します。
