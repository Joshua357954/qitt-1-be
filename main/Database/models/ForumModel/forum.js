

module.exports = (sequelize,DataTypes) => {

	const forum = sequelize.define("Forum",{

		creatorId: {type: DataTypes.INTEGER},

		title: { type:DataTypes.STRING },

		discription: { type:DataTypes.STRING },

		tags:{
			type:DataTypes.STRING,
			allowNull:true
		}

	})

	return forum
}