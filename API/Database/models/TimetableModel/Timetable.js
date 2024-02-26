

module.exports = (sequelize,Datatypes) => {

	const timetable = sequelize.define('Timetable',{
		course:{
			type:Datatypes.STRING,
			allowNull:true
		},
		year:{
			type:Datatypes.INTEGER,
			allowNull:true
		}

	})


	return timetable
}