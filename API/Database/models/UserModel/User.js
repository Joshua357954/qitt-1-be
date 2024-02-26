
module.exports = (sequelize,DataTypes) => {

	const user = sequelize.define('User',{

	    name: {
	      type: DataTypes.STRING,
	      allowNull: false,
	    },

	    email: {
	      type: DataTypes.STRING,
	      allowNull: false,
	      unique: true,
	    },

	    gender: {
	      type: DataTypes.STRING,
	      allowNull:true
	    },

	    picture: {
	      type: DataTypes.STRING,
	      allowNull:true
	    },

	    schoolName: {
	      type: DataTypes.STRING,
	      allowNull:true
	    },

	    course: {
	      type: DataTypes.STRING,
	      allowNull:true
	    },

	    userType: {
	      type: DataTypes.STRING,
	      allowNull:true
	    },

	    verified: {
	      type: DataTypes.BOOLEAN,
	      defaultValue: false,
	    },
	  },
		// name:{
		// 	type:Datatypes.STRING,
		// },
		// nickName:{
		// 	type:Datatypes.STRING,
		// 	allowNull:true
		// },
		// email:{
		// 	type:Datatypes.STRING,
		// },
		// profilePixUrl:{
		// 	type:Datatypes.STRING,
		// 	allowNull:true
		// },
		// bio:{
		// 	type:Datatypes.STRING,
		// 	allowNull:true
		// },
		// phone:{
		// 	type:Datatypes.STRING,
		// 	allowNull:true
		// },
		// gender:{ 
		// 	type: Datatypes.ENUM,
		// 	values: ['male','female']
		// },
		// verified:{
		// 	type:Datatypes.BOOLEAN,
		// 	defaultValue:false,
		// 	allowNull:true
		// },
		// verificationLink: {
		// 	type:Datatypes.STRING,
		// 	allowNull:true
		// },
		// monitized:{
		// 	type:Datatypes.STRING,
		// 	allowNull:true
		// },
		// monitizationBalance:{
		// 	type:Datatypes.INTEGER,
		// 	allowNull:true
		// }
		// ip address
		// notification token (from chrome)
		// 


	)

	return user
}