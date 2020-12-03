import axios from 'axios'
// 公共函数

// 判断变量是否未定义
export function isUndefined(val){
	return val === undefined || val === null
}
// 判断变量是否定义
export function isDefined(val){
	return val !== undefined && val !== null
}
// 判断变量是否真值
export function isTrue(val){
	return val === true
}
// 判断变量是否假值
export function isFalse(val){
	return val === false
}

// 判断 DOM 元素的父元素是否包含在指定父元素数组集合中
export function hasParent(dom, parentDom) {
	parentDom = Array.isArray(parentDom) ? parentDom : [parentDom]
	while(dom) {
		if (parentDom.find(p => p === dom)) {
			return true
		} else {
			dom = dom.parentNode
		}
	}
}

// 拖拽窗体
export function drag(oDrag, handle, draggAble = true) {
	var disX = 0;
	var disY = 0;
	handle = handle || oDrag;
	handle.style.cursor = "move";
	handle.onmousedown = function (event) {
		if(!draggAble) return false
		var event = event || window.event;
		disX = event.clientX - oDrag.offsetLeft;
		disY = event.clientY - oDrag.offsetTop;
		document.onmousemove = function (event){
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
			var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
			iL <= 0 && (iL = 0);
			iT <= 0 && (iT = 0);
			iL >= maxL && (iL = maxL);
			iT >= maxT && (iT = maxT);
			oDrag.style.left = iL + "px";
			oDrag.style.top = iT + "px";
			return false
		};
		document.onmouseup = function () {
			document.onmousemove = null;
			document.onmouseup = null;
			this.releaseCapture && this.releaseCapture()
		};
		this.setCapture && this.setCapture();
		return false
	};
};
  
// 修改窗体大小函数
export function resize(oParent, handle, isLeft, isTop, lockX, lockY) {
	handle.onmousedown = function (event){
		var event = event || window.event;
		var disX = event.clientX - handle.offsetLeft;
		var disY = event.clientY - handle.offsetTop;  
		var iParentTop = oParent.offsetTop;
		var iParentLeft = oParent.offsetLeft;
		var iParentWidth = oParent.offsetWidth;
		var iParentHeight = oParent.offsetHeight;
		document.onmousemove = function (event){
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
			var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;          var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
			var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
			isLeft && (oParent.style.left = iParentLeft + iL + "px");
			isTop && (oParent.style.top = iParentTop + iT + "px");
			iW < dragMinWidth && (iW = dragMinWidth);
			iW > maxW && (iW = maxW);
			lockX || (oParent.style.width = iW + "px");
			iH < dragMinHeight && (iH = dragMinHeight);
			iH > maxH && (iH = maxH);
			lockY || (oParent.style.height = iH + "px");
			if((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;
			return false;  
		};
		document.onmouseup = function () {
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	}
};