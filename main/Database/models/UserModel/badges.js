

module.exports = (sequelize,Datatypes) => {

	const badge = sequelize.define('Badge',{

		badgeName:{
			type:Datatypes.STRING,
			allowNull:true
		},

	})


	return badge

}