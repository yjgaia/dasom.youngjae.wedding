DYWedding.MAIN = METHOD({
	
	run : () => {

		DYWedding.MATCH_VIEW({
			uri : '',
			target : DYWedding.Home
		});

		DYWedding.MATCH_VIEW({
			uri : 'invitation',
			target : DYWedding.Invitation
		});

		DYWedding.MATCH_VIEW({
			uri : 'gallary',
			target : DYWedding.Gallery
		});

		DYWedding.MATCH_VIEW({
			uri : '',
			target : DYWedding.Home
		});

		DYWedding.MATCH_VIEW({
			uri : '',
			target : DYWedding.Home
		});
	}
});
