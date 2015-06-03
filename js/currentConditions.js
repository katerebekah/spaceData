(function () {

	var currentConditions = {};
	function getData(url) {
		$.ajax({
			method: 'GET',
			url: url,
			dataType: 'jsonp',
			success: function (data) {
				currentConditions = data.report;
				console.log(currentConditions);
				updateConditionsSVG(currentConditions);
			}
		});
	}
	function updateConditionsSVG(data){
		$('#tempHigh').html('  High: ' + data.max_temp_fahrenheit + '&deg;');
		$('#tempLow').html('Low: ' + data.min_temp_fahrenheit + '&deg;');
		$('#recordedDate').html('Sol Date: ' + data.sol + ' (Earth Date: ' + data.terrestrial_date + ')');
	}
	
	var url = 'http://marsweather.ingenology.com/v1/latest/?format=jsonp'
	getData(url);

})();
