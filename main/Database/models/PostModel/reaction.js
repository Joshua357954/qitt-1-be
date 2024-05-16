

module.exports = (sequelize,Datatypes) => {

	const reaction = sequelize.define('Reaction',{

		reactionType:{
			type:Datatypes.ENUM,
			values:['like','hate','angry','helpful','dislike']
		},

		reactorId: { type:Datatypes.INTEGER },

	})

	return reaction

}