DailyPlatformer.UserModel = OBJECT({
	
	preset : () => {
		return DailyPlatformer.MODEL;
	},
	
	params : () => {

		let validDataSet = {
			
			nickname : {
				notEmpty : true,
				size : {
					min : 1,
					max : 20
				}
			},
			
			gold : {
				notEmpty : true,
				integer : true
			},
			
			costumeType : {
				notEmpty : true,
				size : {
					min : 1,
					max : 20
				}
			}
		};
		
		return {
			name : 'User',
			initData : {
				gold : 0,
				costumeType : 'Costume1'
			},
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				}
			}
		};
	}
});
