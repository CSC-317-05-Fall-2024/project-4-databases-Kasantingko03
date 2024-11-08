import { pool } from '../database.js'; 


const getRestaurants = async () => {
    try {
        const result = await pool.query('SELECT * FROM restaurants');
        return result.rows;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
};

const getRestaurant = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error(`Restaurant with id ${id} not found`);
        }
        return result.rows[0];
    } catch (error) {
        console.error(`Error fetching restaurant with id ${id}:`, error);
        throw error;
    }
};

const createRestaurant = async (newRestaurant) => {
    const { name, phone, address, photo } = newRestaurant;
    try {
        const result = await pool.query(
            'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, phone, address, photo]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating restaurant:', error);
        throw error;
    }
};

const deleteRestaurant = async (id) => {
  try {
      const result = await pool.query(
          'DELETE FROM restaurants WHERE id = $1 RETURNING *',
          [id]
      );
      if (result.rows.length === 0) {
          return { message: `Restaurant with id ${id} does not exist.` };
      }
      return result.rows[0];
  } catch (error) {
      console.error(`Error deleting restaurant with id ${id}:`, error);
      throw error;
  }
};

const getReviewsForRestaurant = async (restaurantId) => {
  try {
      const result = await pool.query(
          'SELECT * FROM reviews WHERE restaurant_id = $1',
          [restaurantId]
      );
      return result.rows;
  } catch (error) {
      console.error(`Error fetching reviews for restaurant ${restaurantId}:`, error);
      throw error;
  }
};


export { getReviewsForRestaurant, getRestaurants, getRestaurant, createRestaurant, deleteRestaurant };

