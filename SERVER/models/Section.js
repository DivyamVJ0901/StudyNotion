const mongoose = require('mongoose')

const section = new mongoose.Schema({
  sectionName: {
    type: String
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref : "SubSection"
    }
  ]
})

module.exports = mongoose.model('Section', section)
