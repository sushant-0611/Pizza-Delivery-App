const express = require("express");

const router = express.Router();

const {

    addPizza,
    getPizzas,
    getPizzaById,
    updatePizza,
    deletePizza

} = require("../controllers/pizzaController");

router.post("/", addPizza);

router.get("/", getPizzas);

router.get("/:id", getPizzaById);

router.put("/:id", updatePizza);

router.delete("/:id", deletePizza);

module.exports = router;