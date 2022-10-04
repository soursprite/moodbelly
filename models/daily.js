const mongoose = require('mongoose')

//timestamp need to choose date format to display
//userid
//username
//comment string


//bonus: number of likes

const DailySchema = new mongoose.Schema({
  meat: {
    type: Number,
    required: true,
    default: 0,
  },
  veg: {
    type: Number,
    required: true,
    default: 0,
  },
  starch: {
    type: Number,
    required: true,
    default: 0,
  },
  water: {
    type: Number,
    required: true,
    default: 0,
  },
  mood: {
    type: Number,
    required: true,
    default: 3,
  },
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  timeStamp: {
    type: String,
    required: true,
  },
  userId: {
    type:String,
    required: true
  }
})

module.exports = mongoose.model('Daily', DailySchema)
