const { Sequelize, DataTypes } = require('sequelize')
const config = require('./config.js')

// Load Sequelize Config
const sequelize = new Sequelize(config)

const db = {}

db.sequelize = sequelize
db.DataTypes = DataTypes

// Profile
db.User = require('./models/UserModel/User.js')(sequelize,DataTypes)
db.SchoolInfo = require('./models/UserModel/SchoolInfo.js')(sequelize,DataTypes)
db.Badge = require('./models/UserModel/badges.js')(sequelize,DataTypes)

// Timetable
db.Timetable = require('./models/TimetableModel/Timetable.js')(sequelize,DataTypes)
db.Day = require('./models/TimetableModel/Day.js')(sequelize,DataTypes)
db.Class = require('./models/TimetableModel/class.js')(sequelize,DataTypes)

// Post 
db.Post = require('./models/PostModel/post.js')(sequelize,DataTypes)
db.Reaction = require('./models/PostModel/reaction.js')(sequelize,DataTypes)

// Notification
db.Notification = require("./models/NotificationModel/notification.js")(sequelize,DataTypes)

// Materials 
db.Material = require('./models/MaterialsModel/materials.js')(sequelize,DataTypes)

// Forum 
db.Forum = require('./models/ForumModel/forum.js')(sequelize,DataTypes)
db.Reply = require('./models/ForumModel/replys.js')(sequelize,DataTypes)
db.Participant = require('./models/ForumModel/participant.js')(sequelize,DataTypes)


// Relationships / x /


// User - Profile / x /
db.User.hasOne(db.SchoolInfo)
db.SchoolInfo.belongsTo(db.User)

db.User.hasMany(db.Badge)
db.Badge.belongsTo(db.User)

db.User.hasMany(db.Notification)
db.Notification.belongsTo(db.User)


// Timetable / x /
db.Timetable.hasMany(db.Day)
db.Day.belongsTo(db.Timetable)

db.Day.hasMany(db.Class)
db.Class.belongsTo(db.Day)

// Post
db.Post.hasMany(db.Reaction)
db.Reaction.belongsTo(db.Post)

// // Materials
// db.Material.hasMany(db.Reaction)
// db.Reaction.belongsTo(db.Material)

db.Material.hasMany(db.User)


// Forum
db.Forum.hasMany(db.Reply)
db.Reply.belongsTo(db.Forum)

db.Forum.hasMany(db.Participant)
db.Participant.belongsTo(db.Forum)

module.exports = db 

require('./seed.js')