const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();

const {

    addPizza,
    getPizzas,
    getPizzaById,
    updatePizza,
    deletePizza

} = require("../controllers/pizzaController");

router.post("/", upload.single("image"), addPizza);
router.get("/", getPizzas);

router.get("/:id", getPizzaById);

router.put("/:id", upload.single("image"), updatePizza);

router.delete("/:id", deletePizza);

module.exports = router;