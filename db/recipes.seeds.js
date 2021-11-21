//TO BE EDITED. ALL OF IT.



RECIPES = {
	author: "Apipie",
	name: "Autumn Cheesecake"
    ,
	taste: {
		type: Array,
		items: {
			"type": String,
			"enum": [Sweet, Salty, Sour, Bitter, Savory, Fatty]
		}
	},
	photo: {
		type: String
	},
	ingredients: [{
		type: String
	}]},
    {}


    const drones = [
        {name: "drone1", propellers: 4, maxSpeed:50},
        {name: "drone2", propellers: 6, maxSpeed:60},
        {name: "drone3", propellers: 8, maxSpeed:70}
    ]

   const mongoose = require("mongoose");
   
   const Drone = require('../models/Recipe.model')

   const MONGO_URI = process.env.MONGODB_URI
   
   const fillDatabase = async () => {
       try {
           await mongoose
           .connect(MONGO_URI, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useFindAndModify: false,
               useCreateIndex: true
             })
           console.log(`Connected to Mongo!`);
           //const deleteDrones = await Drone.deleteMany()
           Drone.create(drones)
       }
       catch (err) {
           console.error("Error connecting to mongo: ", err);
       }
       console.log("Disconnecting from the database...");
       //mongoose.disconnect(); 
   }
   fillDatabase()