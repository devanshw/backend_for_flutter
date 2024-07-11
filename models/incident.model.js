const { timestamp } = require("mongodb");
const mongoose = require("mongoose");

const IncidentSchema = mongoose.Schema(
  {
    Caller: {
      type: String,
      required: [true, "Please enter caller name"],
    },

    Category:{
        type:String,
        required: [true, "Please enter category"]
    },

    

    SubCategory :{
        type:String,
        required : false
    },

    Service:{
        type:String,
        required:false
    },

    IncidentCreationChannel:{
        type:String,
        required:false
    },

    Impact: {
      type: Number,
      required: false,
    },

    Urgency:{
        type: String,
        required: false,
    },
   

    Description: {
      type: String,
      required: false,
    },
    WorkNotes: {
        type: String,
        required: false,
      },
    

    CreatedBy:{
      type:String,
      required: true,
    }
   
    
  }
);

const Incident = mongoose.model("Incident",IncidentSchema);

module.exports = Incident; 