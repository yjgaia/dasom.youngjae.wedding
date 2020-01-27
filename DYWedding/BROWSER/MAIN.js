DYWedding.MAIN = METHOD({
	
	run : () => {

		DIV({
			
			c : [
				DYWedding.Home(),
				DYWedding.Invitation(),
				DYWedding.Gallery(),
				DYWedding.Map(),
				DYWedding.Game()
			]
			
		}).appendTo(BODY);
		
		Kakao.init('e676de846520395b3f998af409d62351');
	}
});
