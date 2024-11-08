import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from '../data/restaurants.js';

const router = express.Router();

// Get all restaurants
router.get('/restaurants', (req, res) => {
    try {
        const restaurants = getRestaurants();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a restaurant by ID
router.get('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const restaurant = getRestaurant(id);
        if (restaurant) {
            res.status(200).json(restaurant);
        } else {
            res.status(404).json({ message: `Restaurant with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new restaurant
router.post('/restaurants', (req, res) => {
    const newRestaurant = req.body;
    try {
        const restaurant = createRestaurant(newRestaurant);
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a restaurant by ID
router.delete('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const deletedRestaurant = deleteRestaurant(id);
      res.status(200).json(deletedRestaurant);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  

export default router;
