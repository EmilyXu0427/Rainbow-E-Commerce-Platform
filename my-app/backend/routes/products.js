const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const ProductAttribute = require("../models/ProductAttribute");
const ProductAttributePrice = require("../models/ProductAttributePrice");
const Category = require("../models/Category");
const CategoryProduct = require("../models/CategoryProduct");


//GET products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get products by category name 
// url: products/category/book 
// url: products/category/skincare 
// url: products/category/clothing 
router.get("/category/:name", async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Params:", req.params);

  try {
    const categoryName = req.params.name;
    //find the category_id by categoryname
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({error: "Category not found"});
    }

    //find products by category_id
    const links = await CategoryProduct.find({ categoryId: category._id});

    const productIds = links.map(link => link.productId);

    // get all products with all those IDs
    const products = await Product.find({ _id: { $in: productIds }});
    res.json(products);

  } catch(err) {
    console.error("Error fetching products by category name:", err);
    res.status(500).json({ error: "Internal Server Error"});
  }
})

// search for products
router.get("/search/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const splitKeywordList = keyword.trim().split(/\s+/); // split the word and remove the white space

    // const productMatch = splitKeywordList.map(term => ({
    //   $or: [
    //     { name: { $regex: term, $options: "i"}},
    //     { description: { $regex:term, $options: "i"}}
    //     ]
    // }))

    // const products = await Product.find({ $and: productMatch });
    const matchConditions = splitKeywordList.map(term => ({
      $or: [
        { name: { $regex: term, $options: "i" } },
        { description: { $regex: term, $options: "i" } },
        { "attributes.values": { $regex: term, $options: "i" } },
        { "categories.name": { $regex: term, $options: "i" } }
      ]
    }));

    const products = await Product.aggregate([
      {
        $lookup: {
          from: "productattributes",
          localField: "_id",
          foreignField: "productId",
          as: "attributes"
        }
      },
      {
        $lookup: {
          from: "categoryproducts",
          localField: "_id",
          foreignField: "productId",
          as: "categoryLinks"
        }
      },

      {
        $unwind: {
          path: "$categoryLinks",
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $lookup: {
          from: "categories",
          localField: "categoryLinks.categoryId",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          image: { $first: "$image" },
          price: { $first: "$price" },
          attributes: { $first: "$attributes" },
          categories: { $addToSet: "$category" }
        }
      },

      {
        $match: {
          $and: matchConditions
        }
      }
    ]);
    res.json(products);
  } catch (error) {
    console.error("Fail to search:", error);
    return res.status(500).json({ error: "Internal Server Error"});
  }
})
// POST new product
router.post("/new", async(req, res) => {
  try{
    const {
      name, 
      image,
      description,
      price,
      category,
      attributeName,
      variants // { value, price }
    } = req.body;

    // guard: cannot add the product with same name
    const productFound = await Product.findOne({ name: name});
    if (productFound) {
      return res.status(400).json({ message: "Product Already exist"});
    }

    const product = new Product({ name, image, description, price });
    await product.save();

    const cat = await Category.findOne({ name: category });
    if (!cat) return res.status(400).json({ message: "Category does not exists"});
    // add product to category table
    await new CategoryProduct({categoryId: cat._id, productId: product._id}).save();

    // if attributes not null
    if(attributeName && variants && variants.length > 0) {
      const attr = new ProductAttribute({
        productId: product._id,
        name: attributeName,
        values: variants.map((v) => v.value),
      });
    
      await attr.save();

      for (const v of variants) {
        await new ProductAttributePrice({
          productId: product._id,
          variant: v.value,
          price: v.price,
        }).save();
      }
    }
    res.status(201).json({ message: "New product created"})
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({message:"Internal server error"});
  }
});

// Get product by ID also extract and attribute prices if they have variant
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(req.params.id);
    const attributes = await ProductAttribute.find({ productId});
    const prices = await ProductAttributePrice.find({productId});

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      ...product.toObject(), // product attributes can be flatten and called directly with name
      attributes,
      variantPrices: prices
    });
  } catch (err) {
    console.error("Error fetching product by id:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete product and related data in categoryproducts, productattributes and productattributeprices
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const deletedProduct = await Product.findByIdAndDelete(id);
		if (!deletedProduct) {
			return res.status(404).json({ error: "Product not found" });
		}

		await ProductAttribute.deleteMany({ productId: id });
    await ProductAttributePrice.deleteMany({ productId: id });
		await CategoryProduct.deleteMany({ productId: id });
		

		res.json({ message: "Product and related data deleted successfully" });

	} catch (err) {
		console.error("Error deleting product:", err);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
