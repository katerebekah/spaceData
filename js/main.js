/// <reference path="../typings/jquery/jquery.d.ts"/>
'use strict';

$(document).ready(
	getData());

var dataArray = [];

//get data from marsweather (use saved JSON for now)
function getData() {
	$.ajax({
		method: 'GET',
		url: 'js/spaceData.json',
		success: function (data) {
			for (var i = 0; i < data.length; i++) {
				dataArray.push(data[i]);
			}
			console.log(dataArray.length);
			dataVisualize();
		}
	});
};


var height = 1000;
var width = 1000;
var padding = 50;
var rust = "#94300d";
var y = 525;
var angle = -180;
var yangle = -180;
var angleInc = 360/160;
var setX = function(data) {
	var x = 525 + Math.sin(angle) * (data*-3.4);
	angle = angle + angleInc;
	console.log(angle)
	return x;
};

var setY = function(data){
	var y = 525 + Math.cos(yangle) * (data*-3.4);
	yangle = yangle + angleInc;
		return y;
	};

function dataVisualize() {
	//create SVG with a height of 500px and width of 1000px (padding of 50 px)
	var svgContainer = d3.select('#main').append('svg')
		.attr("height",(height + padding))
		.attr("width",(width + padding))
			.style('background-color', 'black');
		


	var infoCircle = svgContainer.append('g')


	var tickLines = infoCircle.selectAll('line').data(dataArray).enter().append('line')
		.attr('x1',(height + padding) / 2)
		.attr('y1',(width + padding) / 2)
		
	//update the lines to fan around circle
		.attr('x2', function(d){return setX(d.min_temp_fahrenheit);})
		.attr('y2', function(d){return setY(d.min_temp_fahrenheit);})
		.style('stroke', 'skyBlue')



	var currentConditions = svgContainer.append('g')
	//create on circle in the middle of the SVG in rust color to represent Mars
	var Mars = currentConditions.append('circle')
		.attr("cy",((height + padding) / 2))
		.attr("cx",((width + padding) / 2))
		.attr("r",(height / 8))
		.style("fill", rust)
	//add text to Mars to display the most current weather data (using json object array[0])
	var curText = currentConditions.append("text")
		.attr("dx",((width / 2) - (height / 25)))
		.attr("dy",((height / 2) - (height / 20)))
		.text("Mars")
		.attr("font-family", "courier")
		.attr("font-size", "48px")
		.attr("fill", "white")
		.attr("stroke", "black")

};