var Area = {
　　createNew : function () {
	　　var area = {};
　　　	area.cCoordinateX = 0;
　　　	area.cCoordinateY = 0;
		area.rectWidth = 0;
　　　　//area.draw = function () {
		//	alert("喵喵喵");
		//};
		area.init = function(cCoordinateX, cCoordinateY, rectWidth) {
			area.cCoordinateX = cCoordinateX;
　　　		area.cCoordinateY = cCoordinateY;
			area.rectWidth = rectWidth;
		}
　　　　return area;
	}
};