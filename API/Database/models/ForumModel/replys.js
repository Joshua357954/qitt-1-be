

module.exports = (sequelize,DataTypes) => {

	const reply = sequelize.define("Reply",{

		text: { type:DataTypes.STRING },
	})

	return reply
}