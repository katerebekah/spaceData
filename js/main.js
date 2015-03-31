'use strict';

$(document).ready(
  getData);

var dataArray = [];

function getData() {
	$.ajax({
  	method: 'GET',
  	url: 'js/spaceData.json',
  	success: function(data) {
		dataVisualize();
  	}
	});
}

//get data from marsweather after 4/1/2013

function dataVisualize(){
  d3.select('#main').append('svg')
  .attr("height", "500px")
  .attr("width", "500px")
	.selectAll("circle").data(dataArray).enter().append("circle")
		.attr("cx", function(d) { return d.x;})
		.attr("cy", function(d) { return d.y;})
		.attr("r", 100);
}