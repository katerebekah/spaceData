var dataArray = [];
var main = $('#main');
function getData(url) {
	$.ajax({
  	method: 'GET',
  	url: url,
  	dataType: 'jsonp',
  	success: function(data) {

    	for (var i = 0; i < data.results.length; i++){
    		dataArray.push(data.results[i]);
    	}
		dataArray.sort(function(a, b){return a.sol - b.sol});
		var json = JSON.stringify(dataArray);
		
		main.text(json);
		console.log(dataArray.length);
		
  	}
	});
}

function createJSONArray (){
 getData('http://marsweather.ingenology.com/v1/archive/?format=jsonp');

for (var i = 2; i < 35; i++) {
	var url = 'http://marsweather.ingenology.com/v1/archive/?page=' + i + '&format=jsonp';
	getData(url); }
}

createJSONArray();

