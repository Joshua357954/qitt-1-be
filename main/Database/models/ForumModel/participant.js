

module.exports = (sequelize,DataTypes) => {

	const participant = sequelize.define("Participant",{

		role: { 
			type:DataTypes.ENUM,
			values: ['admin','moderator','user']
		},
	})

	return participant
}