const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const ProductAttributePrice = require("../models/ProductAttributePrice");

// GET carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find({ isActive: true }); //only return active carts
    res.json(carts);
  } catch (err) {
    console.error("Error fetching carts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a specific cart by ID
router.get('/:cartId', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (err) {
    console.error("Error fetching cart by ID:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST cart
router.post("/", async (req, res) => {
  try {
    const cart = new Cart({item: []});
    await cart.save(); // save cart item to mongoDB
    res.status(201).json({ cartId: cart._id });
  } catch (error) {
    console.error("Fail to create cart:", error);
    res.status(500).json({ error: "Internal Server Error"});
  }
})

router.post("/:cartId/add", async (req, res) => {
  const { cartId } = req.params;
  const { productId, variant, quantity } = req.body;

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let priceToUse = product.price;

    if (variant) {
      console.log("Looking for variant price:", variant);

      const variantPrice = await ProductAttributePrice.findOne({
        productId,
        variant,
      });

      if (variantPrice) {
        console.log("Found variant price:", variantPrice.price);
        priceToUse = variantPrice.price;
      } else {
        console.warn("Variant price not found. Using base price.");
      }
    } else {
      console.log("No variant specified. Using base price:", priceToUse);
    }

    // Check for duplicate item (product + variant match)
    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.variant === variant
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, variant, quantity, price: priceToUse });
    }

    await cart.save();
    res.json({ items: cart.items });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ajust the cart item quantity
// Note: adjust the quantity is using put not post
router.put("/:cartId/adjust", async (req, res) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      console.log("Cart not found.");
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      console.log("Product not found in cart.");
      return res.status(404).json({ message: "Product not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    res.json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /cart/:cartId/remove/:productId
router.delete("/:cartId/remove/:productId", async (req, res) => {
  const { cartId, productId } = req.params;

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Filter out the item to remove it
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json({ items: cart.items });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;