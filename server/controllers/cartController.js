const Cart = require("../models/Cart");
const Pizza = require("../models/Pizza");

// =============================
// GET USER CART
// =============================
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id
    }).populate("items.pizza");

    if (!cart) {
      return res.json({
        success: true,
        cart: {
          items: []
        },
        totalPrice: 0
      });
    }

    const totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    res.json({
      success: true,
      cart,
      totalPrice
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// =============================
// ADD TO CART
// =============================
exports.addToCart = async (req, res) => {
  try {
    const {
      pizzaId,
      size = "Medium",
      quantity = 1
    } = req.body;

    const pizza = await Pizza.findById(pizzaId);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found"
      });
    }

    const selectedSize = pizza.sizes.find(
      item => item.size === size
    );

    if (!selectedSize) {
      return res.status(400).json({
        success: false,
        message: "Invalid pizza size"
      });
    }

    let cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: []
      });
    }

    const existingItem = cart.items.find(
      item =>
        item.pizza.toString() === pizzaId &&
        item.size === size
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
      existingItem.price = selectedSize.price;
    } else {
      cart.items.push({
        pizza: pizzaId,
        size,
        quantity: Number(quantity),
        price: selectedSize.price
      });
    }

    await cart.save();
    await cart.populate("items.pizza");

    res.json({
      success: true,
      message: "Pizza Added To Cart",
      cart
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// =============================
// ADD CUSTOM PIZZA
// =============================
exports.addCustomPizza = async (req, res) => {
  try {

    const {
      name,
      image,
      size,
      base,
      sauce,
      cheese,
      vegetables,
      quantity,
      price
    } = req.body;

    let cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: []
      });
    }

    cart.items.push({

      custom: true,

      name,

      image,

      size,

      quantity,

      price,

      base,

      sauce,

      cheese,

      vegetables

    });

    await cart.save();

    res.json({

      success: true,

      message: "Custom Pizza Added",

      cart

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message

    });

  }
};

// =============================
// UPDATE QUANTITY
// =============================
exports.updateCart = async (req, res) => {
  try {
    const {
      itemId,
      quantity
    } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }

    const cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    item.quantity = quantity;

    await cart.save();
    await cart.populate("items.pizza");

    res.json({
      success: true,
      cart
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// =============================
// UPDATE CART SIZE
// =============================
exports.updateCartSize = async (req, res) => {
  try {
    const {
      itemId,
      size
    } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    const pizza = await Pizza.findById(item.pizza);

    const selectedSize = pizza.sizes.find(
      s => s.size === size
    );

    if (!selectedSize) {
      return res.status(400).json({
        success: false,
        message: "Invalid size"
      });
    }

    item.size = size;
    item.price = selectedSize.price;

    await cart.save();
    await cart.populate("items.pizza");

    res.json({
      success: true,
      message: "Size Updated",
      cart
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// =============================
// REMOVE ITEM
// =============================
exports.removeItem = async (req,res)=>{
  try {
    const cart = await Cart.findOne({
      user:req.user.id
    });


    console.log(
      "DB ITEMS:",
      cart.items.map(item => ({
        id:item._id.toString(),
        name:item.name,
        pizza:item.pizza
      }))
    );


    const item = cart.items.id(req.params.id);

    console.log("FOUND ITEM:", item);


    if(!item){
      return res.status(404).json({
        success:false,
        message:"Item not found"
      });
    }


    cart.items.pull(req.params.id);

    await cart.save();


    res.json({
      success:true,
      message:"Removed"
    });


  } catch(err){
    console.log(err);

    res.status(500).json({
      success:false,
      message:err.message
    });
  }
}


// =============================
// CLEAR CART
// =============================
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id
    });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({
      success: true,
      message: "Cart Cleared"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};