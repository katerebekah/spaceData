/// <reference path="../typings/d3/d3.d.ts"/>
/// <reference path="../typings/jquery/jquery.d.ts"/>
'use strict';

(function () {

 
	var currentSol = {};
	function getData(url) {
		$.ajax({
			method: 'GET',
			url: url,
			dataType: 'jsonp',
			success: function (data) {
				currentSol = {Sol: data.report.sol, Sunrise: data.report.sunrise, Sunset: data.report.sunset};
				console.log(currentSol);
			}
		});
	}
	
	var url = 'http://marsweather.ingenology.com/v1/latest/?format=jsonp'
	getData(url);


  var now = new Date(d3.time.year.floor(new Date()));

  var spacetime = d3.select('#chart2');
  var width = 960,
    height = 500,
    radius = Math.min(width, height);

  var radii = {
    "sun": radius / 7,
    "marsOrbit": radius / 2.5,
    "mars": radius / 45,
    "marsMoonOrbit": radius / 25,
    "marsMoon": radius / 150,
    "mars2MoonOrbit": radius / 35,
    "mars2Moon": radius / 300
  };

  // Space
  var svg = spacetime.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Sun
  svg.append("circle")
    .attr("class", "sun")
    .attr("r", radii.sun)
    .style("fill", "rgba(255, 204, 0, 1.0)");

// Mars's orbit
  svg.append("circle")
    .attr("class", "marsOrbit")
    .attr("r", radii.marsOrbit)
    .style("fill", "none")
    .style("stroke", "rgba(255, 204, 0, 0.25)");

  // Current position of Mars in its orbit
  var marsOrbitPosition = d3.svg.arc()
    .outerRadius(radii.marsOrbit + 1)
    .innerRadius(radii.marsOrbit - 1)
    .startAngle(0)
    .endAngle(0);
  svg.append("path")
    .attr("class", "marsOrbitPosition")
    .attr("d", marsOrbitPosition)
    .style("fill", "rgba(255, 204, 0, 0.75)");

  // Mars
  svg.append("circle")
    .attr("class", "mars")
    .attr("r", radii.mars)
    .attr("transform", "translate(0," + -radii.marsOrbit + ")")
    .style("fill", "rgba(150, 50, 0, 1.0)");

 // Time of mars day
  var marsDay = d3.svg.arc()
    .outerRadius(radii.mars)
    .innerRadius(0)
    .startAngle(0)
    .endAngle(0);
  svg.append("path")
    .attr("class", "marsDay")
    .attr("d", marsDay)
    .attr("transform", "translate(0," + -radii.marsOrbit + ")")
    .style("fill", "rgba(53, 110, 195, 1.0)");

  // Moon's orbit
  svg.append("circle")
    .attr("class", "marsMoonOrbit")
    .attr("r", radii.marsMoonOrbit)
    .attr("transform", "translate(0," + -radii.marsOrbit + ")")
    .style("fill", "none")
    .style("stroke", "rgba(113, 170, 255, 0.25)");

  // Current position of the Moon in its orbit
  var marsMoonOrbitPosition = d3.svg.arc()
    .outerRadius(radii.marsMoonOrbit + 1)
    .innerRadius(radii.marsMoonOrbit - 1)
    .startAngle(0)
    .endAngle(0);
  svg.append("path")
    .attr("class", "marsMoonOrbitPosition")
    .attr("d", marsMoonOrbitPosition(now))
    .attr("transform", "translate(0," + -radii.marsOrbit + ")")
    .style("fill", "rgba(113, 170, 255, 0.75)");

  // Moon
  svg.append("circle")
    .attr("class", "marsMoon")
    .attr("r", radii.marsMoon)
    .attr("transform", "translate(0," + (-radii.marsOrbit + -radii.marsMoonOrbit) + ")")
    .style("fill", "rgba(150, 150, 150, 1.0)");


  // 2 Moon's orbit
  svg.append("circle")
    .attr("class", "mars2MoonOrbit")
    .attr("r", radii.mars2MoonOrbit)
    .attr("transform", "translate(0," + -radii.marsOrbit + ")")
    .style("fill", "none")
    .style("stroke", "rgba(113, 170, 255, 0.25)");

  // Current position of the 2 Moon in its orbit
  var mars2MoonOrbitPosition = d3.svg.arc()
    .outerRadius(radii.mars2MoonOrbit + 1)
    .innerRadius(radii.mars2MoonOrbit - 1)
    .startAngle(0)
    .endAngle(0);
  svg.append("path")
    .attr("class", "mars2MoonOrbitPosition")
    .attr("d", mars2MoonOrbitPosition(now))
    .attr("transform", "translate(0," + -radii.marsOrbit + ")")
    .style("fill", "rgba(113, 170, 255, 0.75)");

  // Mar's 2 Moon
  svg.append("circle")
    .attr("class", "mars2Moon")
    .attr("r", radii.mars2Moon)
    .attr("transform", "translate(0," + (-radii.marsOrbit + -radii.mars2MoonOrbit) + ")")
    .style("fill", "rgba(150, 150, 150, 1.0)");




  // Update the clock every second
  setInterval(function () {
    now = new Date();

    var interpolateMarsOrbitPosition = d3.interpolate(marsOrbitPosition.endAngle()(),
    (2 * Math.PI * d3.time.hours(d3.time.year.floor(now), now).length / 
    d3.time.hours(d3.time.year.floor(now), d3.time.year.ceil(now)).length));

    var interpolateMarsDay = d3.interpolate(marsDay.endAngle()(),
    (2 * Math.PI * d3.time.seconds(d3.time.day.floor(now), now).length /
     d3.time.seconds(d3.time.day.floor(now), d3.time.day.ceil(now)).length));

    var interpolateMarsMoonOrbitPosition = d3.interpolate(marsMoonOrbitPosition.endAngle()(),
    (2 * Math.PI * d3.time.hours(d3.time.month.floor(now), now).length /
     d3.time.hours(d3.time.month.floor(now), d3.time.month.ceil(now)).length));

    d3.transition().tween("orbit", function () {
      return function (t) {
        // Animate Mars orbit position
        d3.select(".marsOrbitPosition").attr("d", marsOrbitPosition.endAngle(interpolateMarsOrbitPosition(t)));

        // Transition Mars
        d3.select(".mars")
          .attr("transform", "translate(" + radii.marsOrbit * Math.sin(interpolateMarsOrbitPosition(t) -
           marsOrbitPosition.startAngle()()) + "," + -radii.marsOrbit * Math.cos(interpolateMarsOrbitPosition(t) - 
           marsOrbitPosition.startAngle()()) + ")");

        // Animate day
        // Transition day
        d3.select(".marsDay")
          .attr("d", marsDay.endAngle(interpolateMarsDay(t)))
          .attr("transform", "translate(" + radii.marsOrbit * Math.sin(interpolateMarsOrbitPosition(t) -
           marsOrbitPosition.startAngle()()) + "," + -radii.marsOrbit * Math.cos(interpolateMarsOrbitPosition(t) - 
           marsOrbitPosition.startAngle()()) + ")");
      
        // Transition Moon orbit
        d3.select(".marsMoonOrbit")
          .attr("transform", "translate(" + radii.marsOrbit * Math.sin(interpolateMarsOrbitPosition(t) - 
          marsOrbitPosition.startAngle()()) + "," + -radii.marsOrbit * Math.cos(interpolateMarsOrbitPosition(t) - 
          marsOrbitPosition.startAngle()()) + ")");

        // Animate Moon orbit position
        // Transition Moon orbit position
        d3.select(".marsMoonOrbitPosition")
          .attr("d", marsMoonOrbitPosition.endAngle(interpolateMarsMoonOrbitPosition(t)))
          .attr("transform", "translate(" + radii.marsOrbit * Math.sin(interpolateMarsOrbitPosition(t) - 
          marsOrbitPosition.startAngle()()) + "," + -radii.marsOrbit * Math.cos(interpolateMarsOrbitPosition(t) - 
          marsOrbitPosition.startAngle()()) + ")");
      
        // Transition Moon
        d3.select(".marsMoon")
          .attr("transform", "translate(" + (radii.marsOrbit * Math.sin(interpolateMarsOrbitPosition(t) - 
          marsOrbitPosition.startAngle()()) + radii.marsMoonOrbit * Math.sin(interpolateMarsMoonOrbitPosition(t) - 
          marsMoonOrbitPosition.startAngle()())) + "," + (-radii.marsOrbit * Math.cos(interpolateMarsOrbitPosition(t) - 
          marsOrbitPosition.startAngle()()) + -radii.marsMoonOrbit * Math.cos(interpolateMarsMoonOrbitPosition(t) - 
          marsMoonOrbitPosition.startAngle()())) + ")");
      };
    });
  }, 1000);

})();