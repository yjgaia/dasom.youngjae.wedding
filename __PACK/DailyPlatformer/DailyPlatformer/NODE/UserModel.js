OVERRIDE(DailyPlatformer.UserModel, (origin) => {

	DailyPlatformer.UserModel = OBJECT({

		preset : () => {
			return origin;
		},

		init : (inner, self, params) => {

			inner.on('create', {
				
				after : (savedData, next) => {

					DailyPlatformer.CostumeModel.create({
						userId : savedData.id,
						type : 'Costume1'
					}, next);
					
					return false;
				}
			});
		}
	});
});
