/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>
'use strict';

var dataS = [];

$.ajax({
	method: 'GET',
	url: 'js/spaceData.json',
	success: function (data) {
		for (var i = 0; i < data.length; i++) {
			dataS.push({ Sol: data[i].sol, max: data[i].max_temp_fahrenheit, min: data[i].min_temp_fahrenheit });
		}
		dataVisualize(dataS);
	}
});

var dataVisualize = function (data) {
	//data massage for Max Temps
			
	var dataArray = data.sort(function (a, b) { return a.Sol - b.Sol }).reverse();
	var margin = {
		top: 50, right: 30, bottom: 30, left: 40
	};
	var height = 500 - margin.top - margin.bottom;
	var width = 960 - margin.left - margin.right;

	var boxSide = Math.floor(Math.sqrt((height * width) / dataArray.length));
	var boxTop = Math.floor(width / boxSide);

	var colorScale = d3.scale.linear()
		.domain(d3.extent(dataArray.map(function (d) { return d.max; })))
		.range(["steelBlue", 'lightYellow'])
		.interpolate(d3.interpolateLab);
	var x = function (i) {
		if (i === 0) {
			return 0;
		}
		return ((i % boxTop) * boxSide);
	};
	var y = function (i) {
		return (Math.floor(i / boxTop)) * boxSide;
	};

 var formatFunc = function(d, i){
	        return {
                title: 'This is My Tool Tip for ' + d.Sol + ' Sol',
                items: [
                    { title: 'Maximum Temperature', value: d.max},
                    { title: 'Minimum Temperature', value: d.min}
                ],
				distance: 20
            };
        };


	var chart = d3.select('#chart5').append('svg')
		.attr("width", width + margin.left + margin.right)
		.attr("height",(((Math.ceil(dataArray.length / boxTop)) * boxSide) + margin.top + margin.bottom))
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	var box = chart.selectAll(".box")
		.data(dataArray)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function (d, i) { return x(i) })
		.attr("y", function (d, i) { return y(i) })
		.attr("height", boxSide - 5)
		.attr("width", boxSide - 5)
		.style('fill', function (d) { return colorScale(d['max']); }) // color scale
		.style('stroke', 'rgba(0,0,0,.4)')
		.style('stroke-width', '1')
		.call(d3.kodama.tooltip().format(formatFunc))
//		.on('mousemove', function(d, i){
//        	var subData = getDataAtPosition(d3.mouse(this));
//        	d3.kodama.format(formatFunc).show(subData); 
//    	});

};

