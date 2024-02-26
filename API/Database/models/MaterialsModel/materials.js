

module.exports = (sequelize,Datatypes) => {

	const material = sequelize.define('Material',{

		name:{ type:Datatypes.STRING }, 

		documentUrl: { type:Datatypes.STRING }, 

		docType: { type:Datatypes.STRING },

		discription: { type:Datatypes.STRING },

		subject: { type:Datatypes.STRING, allowNull:true },

		materialType: { type:Datatypes.STRING, allowNull:true, defaultValue: 'study tool'  },

		year: { type:Datatypes.INTEGER },

		course: { type:Datatypes.STRING }

	})
	return material
}