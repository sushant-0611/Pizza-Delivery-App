const cron = require("node-cron");
console.log("📧 Inventory Alert Job Loaded");
const Inventory = require("../models/Inventory");

const sendEmail = require("../utils/sendEmail");



// Run every 1 hour

cron.schedule("0 * * * *", async()=>{


    try{


        const lowStockItems = await Inventory.find({

            $expr: {

                $lte: [
                    "$stock",
                    "$threshold"
                ]

            }

        });



        if(lowStockItems.length === 0){

            console.log("✅ Inventory stock is healthy");

            return;

        }




        let message = `

🍕 Pizza Delivery Inventory Alert


Low Stock Items:

`;



        lowStockItems.forEach(item=>{


            message += `

Item : ${item.name}

Type : ${item.type}

Stock : ${item.stock} ${item.unit}

Threshold : ${item.threshold}

-------------------------

`;

        });





        await sendEmail(

            process.env.EMAIL_USER,

            "⚠️ Low Inventory Alert - Pizza Delivery",

            message

        );



        console.log("🚨 Low stock email notification sent");


    }

    catch(error){


        console.log(
            "Inventory Cron Error:",
            error.message
        );


    }


});