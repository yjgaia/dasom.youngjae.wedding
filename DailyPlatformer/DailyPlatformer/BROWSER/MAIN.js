DailyPlatformer.MAIN = METHOD({

	run : (params) => {
		
		let style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = 'input[type="range"]::-webkit-slider-thumb { width:30px; height:30px; } * { user-select:none; -webkit-user-select:none; -webkit-tap-highlight-color:transparent; }';
		document.getElementsByTagName('head')[0].appendChild(style);
		
		ADD_FONT({
			name : 'Nanum Gothic',
			style : 'normal',
			weight : 800,
			ttf : DailyPlatformer.R('Font/NanumGothic-ExtraBold.ttf')
		});
		
		DailyPlatformer.MATCH_VIEW({
			uri : '',
			target : DailyPlatformer.Game
		});
	}
});
