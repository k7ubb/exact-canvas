/*! exact-canvas v1.0.0 | MIT License | github.com/k7ubb/exact-canvas */

class ExactCanvas {
	#wrap;
	#size;
	#option;
	#div;
	#isRotated;
	
	onResize = () => {};
	
	toLogicalPoint(x, y) {
		return this.#isRotated
			? [this.#size.w * y / this.#div.offsetHeight, this.#size.h * (1 - x / this.#div.offsetWidth)]
			: [this.#size.w * x / this.#div.offsetWidth, this.#size.h * y / this.#div.offsetHeight];
	}
	
	toPhysicalPoint(x, y) {
		return this.#isRotated
			? [x * this.#div.offsetWidth * devicePixelRatio / this.#size.h, y * this.#div.offsetHeight * devicePixelRatio / this.#size.w]
			: [x * this.#div.offsetWidth * devicePixelRatio / this.#size.w, y * this.#div.offsetHeight * devicePixelRatio / this.#size.h];
	}
	
	#resize() {
		this.#isRotated = this.#option.rotate && this.#size.w > this.#size.h !== this.#wrap.clientWidth > this.#wrap.clientHeight;
		const [w_, h_] = this.#isRotated
			? [this.#size.h, this.#size.w]
			: [this.#size.w, this.#size.h];
		if (this.#wrap.clientWidth / this.#wrap.clientHeight > w_ / h_) {
			this.#div.style.width = this.#wrap.clientHeight * w_ / h_ + 'px';
			this.#div.style.height = this.#wrap.clientHeight + 'px';
			this.#div.style.top = 0;
			this.#div.style.left = (this.#wrap.clientWidth - this.#wrap.clientHeight * w_ / h_) / 2 + 'px';
		} else {
			this.#div.style.width = this.#wrap.clientWidth + 'px';
			this.#div.style.height = this.#wrap.clientWidth * h_ / w_ + 'px';
			this.#div.style.top = (this.#wrap.clientHeight - this.#wrap.clientWidth * h_ / w_) / 2 + 'px';
			this.#div.style.left = 0;
		}
		this.canvas.style.transform = this.#isRotated ? `rotate(90deg) translate(-${this.#div.offsetWidth}px)` : '';
		this.canvas.style.transformOrigin = this.#isRotated ? 'left bottom' : '';
		const [width, height] = this.#isRotated
			? [this.#div.clientHeight, this.#div.clientWidth]
			: [this.#div.clientWidth, this.#div.clientHeight];
		this.canvas.width = width * devicePixelRatio;
		this.canvas.height = height * devicePixelRatio;
		this.canvas.style.width = width + 'px';
		this.canvas.style.height = height + 'px';
		const ctx = this.canvas.getContext('2d');
		ctx.scale(width * devicePixelRatio / this.#size.w, height * devicePixelRatio / this.#size.h);
		this.onResize();
	}
	
	constructor (wrap, w, h, option = {rotate: false}) {
		this.#wrap = wrap;
		this.#size = {w, h};
		this.#option = option;
		this.canvas = document.createElement('canvas');
		this.#div = document.createElement('div');
		this.#div.style.position = 'absolute';
		this.#div.style.overflow = 'hidden';
		this.#div.append(this.canvas);
		if (getComputedStyle(this.#wrap).getPropertyValue('position') === 'static') {
			this.#wrap.style.position = 'relative';
		}
		this.#wrap.append(this.#div);
		this.#resize();
		new ResizeObserver(() => this.#resize()).observe(this.#wrap);
	}
}
