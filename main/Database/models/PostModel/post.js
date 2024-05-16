
module.exports = (sequelize,Datatypes) => {

	const post = sequelize.define('Post',{

		postType:{
			type:Datatypes.ENUM,
			values:['announcement','assignment','feed']
		},

		imageUrl:{
			type:Datatypes.STRING,
			allowNull:true
		},

		documentUrl:{
			type:Datatypes.STRING,
			allowNull:true
		},

		text:{
			type:Datatypes.STRING,
			allowNull:true
		}
	})

	return post

}