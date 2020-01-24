DailyPlatformer.CostumeModel = OBJECT({
	
	preset : () => {
		return DailyPlatformer.MODEL;
	},
	
	params : () => {

		let validDataSet = {

			userId : {
				notEmpty : true,
				id : true
			},
			
			type : {
				notEmpty : true,
				size : {
					min : 1,
					max : 20
				}
			}
		};
		
		return {
			name : 'Costume',
			initData : {
			},
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				}
			}
		};
	}
});
