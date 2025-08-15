import React, { useState } from 'react';
import "../../styles/add-new-product.css";
import axios from "axios";
import { fetchProducts } from "../../redux/Shopping/shopping-actions";
import { useDispatch } from "react-redux";
import { api } from "../../api"

const categories = ["skincare", "clothing", "book"];

const AddNewProduct = () => {
    const [form, setForm] = useState({
        name: "",
        description:"",
        image:"",
        price:"",
        category:"",
        attributeName:"",
        variants: [{ value: "", price:""}]
    });

    const dispatch= useDispatch();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value});
    };

    const handleVariantChange = (index, key, value) => {
        const updated = [... form.variants];
        updated[index][key] = value;
        setForm({ ...form, variants: updated});
    };

    const addVariant = () => {
        setForm({ ...form, variants: [...form.variants, {value:"", price:""}]});
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault(); //prevent page reload on form submission
    //     onsubmit(form); // send form to backend to create new product
    // }

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        try {
            // const res = await fetch("/products/new", {
            // method: "POST",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(form),
            // });
            const res = await api.post("/products/new", form); 

            if (res.status === 200 || res.status === 201) {
            dispatch(fetchProducts());
            alert("Product created successfully!");
            //reset form
            setForm({
                name: "",
                description: "",
                image: "",
                price: "",
                category: "",
                attributeName: "",
                variants: [{ value: "", price: "" }],
            });
            } else {
            const err = await res.json();
            alert("Error: " + err.message);
            }
        } catch (err) {
            console.error("Failed to create product:", err);
            const message = err.response?.data?.message || "Something went wrong.";
            alert("Error: " + message);
        }
    };

  return (
    <div className='add-new-product'>
        <h1>Create New Product</h1>
        <form onSubmit={handleSubmit}>
             <label>Product Name</label>
            <input name ="name" value={form.name} onChange={handleChange} placeholder='Product Name' required />
             <label>Product Image</label>
            <input name ="image" value={form.image} onChange={handleChange} placeholder="Image File Name" required />
             <label>Product Description</label>
            <input name ="description" value={form.description} onChange={handleChange} placeholder="Product Description" required />
             <label>Product Base Price ($)</label>
            <input name ="price" value={form.price} onChange={handleChange} placeholder="Product Base Price" required />
             <label>Product Category</label>
            <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((c) =>(
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
             <label>Product Attribute Name (optional)</label>
            <input name="attributeName" value={form.attributeName} onChange={handleChange} placeholder="Attribute Name (eg Color)"/>
            {form.attributeName && (
                <>
                    <h3>Variants</h3>
                    {form.variants.map((variant, idx) => (
                    <div key={idx}>
                        <input
                        placeholder="Variant"
                        value={variant.value}
                        onChange={(e) => handleVariantChange(idx, "value", e.target.value)}
                        />
                        <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(idx, "price", e.target.value)}
                        />
                    </div>
                    ))}
                    <button type="button" onClick={addVariant}>Add Variant</button>
                </>  
            )}
            <br/>
            <button type="submit">Create Product</button>      
        </form> 
    </div>
  )
}

export default AddNewProduct;
