import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant } from './data/restaurants.js';
import apiRouter from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine and define the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the API router
app.use('/api', apiRouter);


// Render restaurant-details.ejs when accessing /restaurants/:id
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        res.render('restaurants', { restaurants });
    } catch (error) {
        res.status(500).send('Failed to load restaurants.');
    }
});



// Render attraction.html when accessing /attractions
app.get('/attractions', (req, res) => {
    console.log('Accessing /attractions route'); // Debug log
    res.sendFile(path.join(__dirname, 'public/attraction.html')); 
});

// Render new-restaurant-form.html when accessing /newRestaurant
app.get('/newRestaurant', (req, res) => {
    console.log('Accessing /newRestaurant route'); 
    res.sendFile(path.join(__dirname, 'public/new-restaurant-form.html')); 
});

app.get('/restaurants', (req, res) => {
    const restaurants = getRestaurants();
    console.log('Fetched Restaurants:', restaurants); 
    res.render('restaurants', { restaurants });
});

app.get('/restaurants/:id', async (req, res) => {
    const restaurantId = req.params.id;

    try {
        const restaurant = await getRestaurant(restaurantId); // Fetch restaurant details
        const reviews = await getReviewsForRestaurant(restaurantId); // Fetch reviews for the restaurant

        // Explicitly pass each property to the EJS template
        res.render('restaurant-details', {
            name: restaurant.name,
            address: restaurant.address,
            phone: restaurant.phone,
            photo: restaurant.photo,  // Include photo property
            reviews: reviews // Include reviews array
        });
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
        res.status(404).send('Restaurant not found');
    }
});







// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
