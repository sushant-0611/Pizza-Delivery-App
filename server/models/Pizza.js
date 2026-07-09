const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    image:{
        url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },

    sizes:[
        {
            size:{
                type:String,
                enum:["Small","Medium","Large"]
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],

    // Default Toppings
    toppings:[
        String
    ],

    isCustomizable:{
        type:Boolean,
        default:true
    },

    isVeg:{
        type:Boolean,
        default:true
    },

    available:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true
});

module.exports=mongoose.model("Pizza",pizzaSchema);