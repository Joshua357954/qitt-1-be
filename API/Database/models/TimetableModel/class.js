
module.exports = (sequelize,Datatypes) => {

	const _class = sequelize.define('Class',{
		subject:{
			type:Datatypes.STRING,
			allowNull:true
		},
		time:{
			type:Datatypes.TIME,
			allowNull:true
		},
		venue:{
			type:Datatypes.STRING,
			allowNull:true
		}

	})

	return _class

}