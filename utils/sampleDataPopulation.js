const Product = require('../models/product.models.js'); // Adjust the path as necessary
const mongoose = require('mongoose');

async function sampleDataProduct() {
    try {
    
    const count = await Product.countDocuments();
    if (count === 0){
        const sampleProducts = [
              {
          name: "MacBook Pro 14-inch",
          price: 1999,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
          description: "Powerful laptop with M2 Pro chip, perfect for professional work and creative tasks.",
          stock: 15,
          featured: true
        },
        {
          name: "iPhone 15 Pro",
          price: 999,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
          description: "Latest iPhone with advanced camera system and titanium design.",
          stock: 25,
          featured: true
        },
        {
          name: "Nike Air Max 270",
          price: 150,
          category: "Footwear",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
          description: "Comfortable running shoes with maximum air cushioning.",
          stock: 30,
          featured: false
        },
        {
          name: "Sony WH-1000XM4",
          price: 349,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
          description: "Industry-leading noise canceling wireless headphones.",
          stock: 20,
          featured: true
        },
        {
          name: "Levi's 501 Jeans",
          price: 89,
          category: "Clothing",
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
          description: "Classic straight-fit jeans made from premium denim.",
          stock: 50,
          featured: false
        },
        {
          name: "Canon EOS R5",
          price: 3899,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500",
          description: "Professional mirrorless camera with 45MP full-frame sensor.",
          stock: 8,
          featured: true
        },
        {
          name: "Adidas Ultraboost 22",
          price: 180,
          category: "Footwear",
          image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
          description: "High-performance running shoes with responsive cushioning.",
          stock: 40,
          featured: false
        },
        {
          name: "Samsung 55\" QLED TV",
          price: 1299,
          category: "Electronics",
          image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
          description: "4K QLED Smart TV with vibrant colors and smart features.",
          stock: 12,
          featured: false
        },

        ];

        await Product.insertMany(sampleProducts);
        console.log('Sample products populated successfully');
    }
        
    } catch (error) {
        console.error('Error populating sample data:', error);
        
    }
}



module.exports = sampleDataProduct;