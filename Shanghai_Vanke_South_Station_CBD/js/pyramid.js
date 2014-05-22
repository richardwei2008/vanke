var Pyramid = {
　　createNew : function () {
	　　var pyramid = {};
　　　	pyramid.cCoordinateX = 0;
　　　	pyramid.cCoordinateY = 0;
		pyramid.rectWidth = 0;
　　　　//pyramid.draw = function () {
		//	alert("喵喵喵");
		//};
		pyramid.init = function(cCoordinateX, cCoordinateY, rectWidth) {
			pyramid.cCoordinateX = cCoordinateX;
　　　		pyramid.cCoordinateY = cCoordinateY;
			pyramid.rectWidth = rectWidth;
		}
　　　　return pyramid;
	}
};