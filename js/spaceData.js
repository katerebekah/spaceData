/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>
'use strict';

(function () {
	var dataArray = [];
	function getData() {
		$.ajax({
			method: 'GET',
			url: 'js/spaceData.json',
			success: function (data) {
				for (var i = 0; i < data.length; i++) {
					dataArray.push({ "Sol Date": data[i].sol, "Minimum Temperature": data[i].min_temp_fahrenheit, "Maximum Temperature": data[i].max_temp_fahrenheit, "Atmospheric Pressure": data[i].pressure });
				}
				dataVisualize(dataArray);
			}
		});
	};

	getData();
	
	//add a var	
	var pc1;


	// linear color scale
	var brown_to_orange = d3.scale.linear()
		.domain([321, 990])
		.range(["brown", "orange"])
		.interpolate(d3.interpolateLab);

	var dataVisualize = function (dataArray) {

		pc1 = d3.parcoords()("#chart1")
			.data(dataArray)
			.composite("darken")
			.color(function (d) { return brown_to_orange(d['Sol Date']); })  // quantitative color scale
			.alpha(0.15)
			.render()
			.brushMode("1D-axes")  // enable brushing
			.interactive()  // command line mode
			
		var explore_count = 0;
		var exploring = {};
		var explore_start = false;

		pc1.svg
			.selectAll(".dimension")
			.style("cursor", "pointer")
			.on("click", function (d) {
			exploring[d] = d in exploring ? false : true;
			event.preventDefault();
			if (exploring[d]) d3.timer(explore(d, explore_count));
		});

		function explore(dimension, count) {
			if (!explore_start) {
				explore_start = true;
				d3.timer(pc1.brush);
			}
			var speed = (Math.round(Math.random()) ? 1 : -1) * (Math.random() + 0.5);
			return function (t) {
				if (!exploring[dimension]) return true;
				var domain = pc1.yscale[dimension].domain();
				var width = (domain[1] - domain[0]) / 4;

				var center = width * 1.5 * (1 + Math.sin(speed * t / 1200)) + domain[0];

				pc1.yscale[dimension].brush.extent([
					d3.max([center - width * 0.01, domain[0] - width / 400]),
					d3.min([center + width * 1.01, domain[1] + width / 100])
				])(pc1.g()
					.filter(function (d) {
					return d == dimension;
				})
					);
			};
		};

	};

})();