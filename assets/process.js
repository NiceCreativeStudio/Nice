$(document).ready(function() {
    $window=$(window);
    replaceWithPaths($('svg'));
    var $tick=$("#ticker span"),
        $top= $(window).scrollTop(),
        $depth=$(document.body).offsetHeight;
    hideSVGPaths($('svg'));
    $(window).bind('scroll',function(e){
        $top= $(window).scrollTop();
        $tick.html($top);

        if($top > 0 && $top <1000){ 
                var $v1top=$('#v1').offset().top;
                
            $('#v1').css({
                "top": (200-(-$top*.1))+"px",
                "opacity":(1-($top*.001))
            })
        } 
      if($top <100000){
          var $slide2=$top;
          $('#v2').css({
                "top": (($slide2*.01))+"px"
            })
          scrollSVGPaths($('svg'),$slide2);
          
          
        }
    });
    
});

jQuery.extend( jQuery.easing,
{
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
  }
});


function SVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function hideSVGPaths(parentElement) {

    var paths = $(parentElement).find('path');

    $.each( paths, function() {
        var totalLength = this.getTotalLength();

        $(this).css({
            'stroke-dashoffset': totalLength,
            'stroke-dasharray': totalLength + ' ' + totalLength
        });
    });
}

function scrollSVGPaths(_parentElement,scroll) {
    var paths = $(_parentElement).find('path');

    $.each( paths, function(i) {

        var totalLength = this.getTotalLength();
        var appearDampener= .05;
        var singlePercent= (totalLength*0.01)*scroll;
        var singlePoint = Math.max(0, Math.min(singlePercent*appearDampener,totalLength));
        $(this).css({
            'stroke-dashoffset': totalLength-singlePoint,
            'stroke-dasharray': totalLength 
        });
      
    });
}

function replaceRectsWithPaths(parentElement) {


    var rects = $(parentElement).find('rect');

    $.each(rects, function() {

        var rectX = $(this).attr('x');
        var rectY = $(this).attr('y');

        var rectX2 = parseFloat(rectX) + parseFloat($(this).attr('width'));
        var rectY2 = parseFloat(rectY) + parseFloat($(this).attr('height'));

        var convertedPath = 'M' + rectX + ',' + rectY + ' ' + rectX2 + ',' + rectY + ' ' + rectX2 + ',' + rectY2 + ' ' + rectX + ',' + rectY2 + ' ' + rectX + ',' + rectY;


        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .insertAfter(this);

    });

    $(rects).remove();
}



function replaceLinesWithPaths(parentElement) {


    var lines = $(parentElement).find('line');

    $.each(lines, function() {

        var lineX1 = $(this).attr('x1');
        var lineY1 = $(this).attr('y1');

        var lineX2 = $(this).attr('x2');
        var lineY2 = $(this).attr('y2');

        var convertedPath = 'M' + lineX1 + ',' + lineY1 + ' ' + lineX2 + ',' + lineY2;


        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .insertAfter(this);

    });

    $(lines).remove();
}



function replaceCirclesWithPaths(parentElement) {

    var circles = $(parentElement).find('circle');

    $.each(circles, function() {

        var cX = $(this).attr('cx');
        var cY = $(this).attr('cy');
        var r = $(this).attr('r');
        var r2 = parseFloat(r * 2);

        var convertedPath = 'M' + cX + ', ' + cY + ' m' + (-r) + ', 0 ' + 'a ' + r + ', ' + r + ' 0 1,0 ' + r2 + ',0 ' + 'a ' + r + ', ' + r + ' 0 1,0 ' + (-r2) + ',0 ';

        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .insertAfter(this);

    });

    $(circles).remove();
}



function replaceEllipsesWithPaths(parentElement) {


    var ellipses = $(parentElement).find('ellipse');

    $.each(ellipses, function() {

        var cX = $(this).attr('cx');
        var cY = $(this).attr('cy');
        var rX = $(this).attr('rx');
        var rY = $(this).attr('ry');

        var convertedPath = 'M' + cX + ', ' + cY + ' m' + (-rX) + ', 0 ' + 'a ' + rX + ', ' + rY + ' 0 1,0 ' + rX*2 + ',0 ' + 'a ' + rX + ', ' + rY + ' 0 1,0 ' + (-rX*2) + ',0 ';

        $(SVG('path'))
        .attr('d', convertedPath)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .insertAfter(this);

    });

    $(ellipses).remove();
}




function replacePolygonsWithPaths(parentElement) {


    var polygons = $(parentElement).find('polygon');

    $.each(polygons, function() {

        var points = $(this).attr('points');
        var polyPoints = points.split(/[ ,]+/);
        var endPoint = polyPoints[0] + ', ' + polyPoints[1];

        $(SVG('path'))
        .attr('d', 'M' + points + ' ' + endPoint)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .insertAfter(this);

    });

    $(polygons).remove();
}




function replacePolylinesWithPaths(parentElement) {


    var polylines = $(parentElement).find('polyline');

    $.each(polylines, function() {

        var points = $(this).attr('points');

        $(SVG('path'))
        .attr('d', 'M' + points)
        .attr('fill', $(this).attr('fill'))
        .attr('stroke', $(this).attr('stroke'))
        .attr('stroke-width', $(this).attr('stroke-width'))
        .insertAfter(this);

    });

    $(polylines).remove();
}

function replaceWithPaths(parentElement) {

    replaceRectsWithPaths(parentElement);
    replaceLinesWithPaths(parentElement);
    replaceEllipsesWithPaths(parentElement);
    replaceCirclesWithPaths(parentElement);
    replacePolygonsWithPaths(parentElement);
    replacePolylinesWithPaths(parentElement);    
}