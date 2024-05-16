

module.exports = (sequelize,DataTypes) => {

	const notification = sequelize.define("Notification",{

		text:{
			type:DataTypes.STRING,
		}

	})

	return notification
}