const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  uniqueId:String,
  userName:String,
    devloperType:String,
    devloperAwards:Array,
    socialMediaLinks:{
      gitHub:String,
      linkedin:String,
      instagram:String
    },
    workExperience:String,
    skills:Array,
    framWords:Array,
    hobbies:Array,
    experience:Number,
    completeProjects:Number,
    companiesWork:Number,
    workExperienceWithClient :String,
    userEmail:String
});

module.exports = mongoose.model("traveluserinfo", productSchema);
