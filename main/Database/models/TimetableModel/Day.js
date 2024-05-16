
module.exports = (sequelize,Datatypes) => {

	const day = sequelize.define('Day',{
		
		dayName:{
			type:Datatypes.STRING,
			allowNull:true
		}

	})


	return day

}