/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>
'use strict';

(function () {
	var dataS = [];

	$.ajax({
		method: 'GET',
		url: 'js/spaceData.json',
		success: function (data) {
			for (var i = 0; i < data.length; i++) {
				dataS.push({ Sol: data[i].sol, max: data[i].max_temp_fahrenheit });
			}
			dataVisualize(dataS);
		}
	});

	var dataVisualize = function (data, update) {
		//data massage for Max Temps
		var dataArray = [];
		data.sort(function (a, b) { return a.max - b.max }).reverse();
		dataArray.push(data[0]);
		for (var q = 1; dataArray.length < 25; q++) {
			if (data[q].max !== data[(q - 1)].max) {
				dataArray.push(data[q]);
			}
		}
		dataArray.sort(function (a, b) { return a.Sol - b.Sol }).reverse();



		var margin = { top: 50, right: 30, bottom: 30, left: 40 },
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1, 1)
			.domain(dataArray.map(function (d) { return d.Sol; }));

		var y = d3.scale.linear()
			.range([height, 0])
			.domain([0, d3.max(dataArray, function (d) { return d.max; })])


		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");

		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function (d) {
			return "" + d.max + " &deg;F on Sol " + d.Sol;
		});


		var chart = d3.select("#chart4")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		chart.call(tip);
		chart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
			.attr("x", 0)
			.attr('y', 15)
			.style("text-anchor", "start")
			.text("Sol Date");


		chart.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Maximum Temperature");

		var halp = chart.selectAll(".bar")
			.data(dataArray)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function (d) { return x(d.Sol); })
			.attr("y", function (d) { return y(d.max); })
			.attr("height", 0)
			.attr("width", 0)
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)
		halp.transition().attr("height", function (d) { return height - y(d.max); })
			.attr("width", x.rangeBand())
			.delay(function (d, i) { return i * 12; });


		function type(d) {
			d.max = +d.max; // coerce to number
			return d;
		}


	};


})();

