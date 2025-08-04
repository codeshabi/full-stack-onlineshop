// File: server.js
// This is the main server file for the online shop application.
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const authRoutes = require('./routes/auth.js'); // Adjust the path as necessary
const mongoose = require('mongoose');   
const sampleDataProduct = require('./utils/sampleDataPopulation.js');
const Product = require('./models/product.models.js'); // Adjust the path as necessary
const db = require('./db/db.js'); // Ensure this is the correct path to your db.js file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: true,

}));


// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');


sampleDataProduct();

// Home Page - Display featured products
app.get('/', async (req, res) => {
    try {
        const featuredProducts = await Product.find({ featured: true }).limit(6);
        const totalProducts = await Product.countDocuments();
        const categories = await Product.distinct('category');
        res.render('index', {
             products: featuredProducts, // Featured products
             totalProducts,
             categories,
             title: 'Online Shop - Home'
            });
    } catch (error) {
        console.error('Error fetching featured products:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Product Listing Page with Search and Filter
app.get('/products', async (req, res) => {
    try {
        const { search, category , sort } = req.query;
        let query = {};
        let sortOption = {};

        if (search) {
            query.$or = [
                { name: {$regex: search, $options: 'i' } }, // Case-insensitive search
                { description: {$regex: search, $options: 'i' } },
                { category: {$regex: search, $options: 'i' } } // Search in category as well
            ];  
        }

         if (category && category !== 'all') {
             query.category = category;
        }
       switch (sort) {
            case 'price_low':
                sortOption = {price: 1}; // Ascending order
                break;
            case 'price_high':
                sortOption = {price: -1}; // Descending order
                break;
            case 'name':
                sortOption = {name: 1}; // Ascending order by name
                break;
            default:
                sortOption = {createdAt: -1}; // Default sorting by creation date, descending
        }

        const products = await Product.find(query).sort(sortOption);
        const categories = await Product.distinct('category');
        res.render('products', {
            products,
            categories,
            currentCategory: category || 'all',
            searchQuery: search || '',
            currentsort: sort || 'newest',
            title: 'All Products - OnlineShop'
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Product Details Page
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).render( 'error', {message: 'Product not found', title: 'Error' });
        }
        const relatedProducts = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(4);
        res.render('productDetails', { 
            product,
            relatedProducts,
            title: product.name });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Search API endpoint
app.get('/api/search', async (req, res) => {
    try {
        const { q } = req;
        if (!q) {
        return res.json({ message: 'Query parameter "q" is required' });
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: query.q, $options: 'i' } },
                { category : { $regex: query.q, $options: 'i' } }
            ]
        }).limit(5).select('name your category');
        res.json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// catergory api endpoint
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/register', authRoutes , (req, res) => {
    res.render('register', { title: 'Register' });
});

app.get('/api/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
//  Error handling for undefined routes

app.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found', title: 'Error' });
});


app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).render('error', { message: 'Internal Server Error', title: 'Error' });
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
