const express = require("express");
const mongoose = require("mongoose");
const Product = require('./models/productModel');
const app = express();

const uri = `mongodb+srv://heinhtetaung:<password>@dbapi.1ps4siw.mongodb.net/?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
    res.send("Hello API");
});

// Insert new product
app.post("/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (e) {
        res.send(500).json({ message: e.message });
    }
})

// Get all products
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Get product by id
app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Update a product
app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Delete a product 
app.delete("/products/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        };
        res.status(200).json(product);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
})


mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3333, () => {
            console.log(`Server is running at port 3333`);
        });
    })
    .catch(e => console.log(e));
