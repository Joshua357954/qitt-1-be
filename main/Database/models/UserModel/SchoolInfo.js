

module.exports = (sequelize,Datatypes) => {

	const schoolInfo = sequelize.define('SchoolInfo',{

		schoolName:{
			type:Datatypes.STRING,
			allowNull:true
		},
		country:{
			type:Datatypes.STRING,
			allowNull:true
		},
		year:{
			type:Datatypes.INTEGER,
			allowNull:true
		},
		faculty:{
			type:Datatypes.STRING,
			allowNull:true
		},
		course:{
			type:Datatypes.STRING,
			allowNull:true
		},
		degree:{
			type:Datatypes.STRING,
			allowNull:true
		},
		matriculationNumber:{
			type:Datatypes.STRING,
			allowNull:true
		}

	})


	return schoolInfo

}


// module.exports = (sequelize,Datatypes) => {

// 	const _ = sequelize.define('_',{

// 	})


// 	return _

// }