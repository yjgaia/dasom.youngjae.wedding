DYWedding.MAIN = METHOD({
	
	run : () => {

		DIV({
			
			c : [
				DYWedding.Home(),
				DYWedding.Invitation()
			]
			
		}).appendTo(BODY);
	}
});
