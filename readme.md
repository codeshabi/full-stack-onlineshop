# Full-Stack Online Shop

A modern e-commerce website built with Express.js, EJS templating, and Bootstrap 5. This project implements a complete online shopping experience with product listings, categories, search functionality, and a responsive design.

## 🚀 Features

- **Product Management**
  - Product listings with search and filtering
  - Detailed product views
  - Category-based navigation
  - Stock management
  - Featured products showcase

- **User Interface**
  - Responsive Bootstrap 5 design
  - Clean and modern UI
  - Mobile-friendly layout
  - Dynamic content loading
  - Interactive product cards

- **Search & Filter**
  - Product search functionality
  - Category filtering
  - Price sorting (low to high, high to low)
  - Name sorting (A-Z)

## 🛠️ Technologies Used

- **Backend**
  - Express.js
  - Node.js
  - EJS (Embedded JavaScript templates)

- **Frontend**
  - HTML5
  - CSS3
  - Bootstrap 5
  - Font Awesome icons

- **Database**
  - MongoDB (assumed from project structure)

## 📂 Project Structure

```
full-stack-onlineshop/
├── db/
│   └── db.js
├── models/
│   └── product.models.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── routes/
│   └── index.js
├── utils/
│   └── sampleDataPopulation.js
├── views/
│   ├── error.ejs
│   ├── index.ejs
│   ├── layout.ejs
│   ├── product-detail.ejs
│   └── products.ejs
├── server.js
└── package.json
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd full-stack-onlineshop
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if using pnpm
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the server**
   ```bash
   npm start
   # or
   node server.js
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 💡 Key Features Explained

### Product Listings
- Grid-based product display
- Product cards with images, prices, and descriptions
- Stock status indicators
- Quick view options

### Product Details
- Comprehensive product information
- High-resolution product images
- Related products suggestions
- Stock availability status
- Add to cart functionality

### Search and Filtering
- Real-time search functionality
- Category-based filtering
- Multiple sorting options
- Price range filtering

## 🔒 Security Features

- XSS Protection through EJS escape characters
- Input sanitization
- Secure data rendering
- Protected dynamic content

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Bootstrap team for the excellent UI framework
- Express.js community
- Node.js community
