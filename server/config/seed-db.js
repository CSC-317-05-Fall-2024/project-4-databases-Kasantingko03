import { pool } from './database.js';

const dropTables = async () => {
    try {
        await pool.query(`DROP TABLE IF EXISTS reviews;`);
        await pool.query(`DROP TABLE IF EXISTS restaurants;`);
    } catch (error) {
        console.error('Error dropping tables:', error);
    }
};

const createTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS restaurants (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                photo TEXT NOT NULL
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
                rating INTEGER NOT NULL,
                content TEXT NOT NULL
            );
        `);
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

const insertData = async () => {
    try {
        const restaurantResult = await pool.query(`
            INSERT INTO restaurants (name, phone, address, photo) VALUES
            ('Pokemon Cafe Tokyo Nihonbashi', '+81 3-6262-3439', 'Chuo City, Japan', '/images/restaurant1.jpeg'),

            ('Yakitori Abe', '+81 3-5422-9834', 'Miyuki House 1F, Kamiosaki 3-3-4, Shinagawa, Japan', '/images/restaurant2.jpeg'),

            ('New Matsuzaka Roppongi', '+81 50-5494-6202', '6 Chome−2−6 GEMS Roppongi 7F, Minato City, Japan', '/images/restaurant3.jpeg'),

            ('Ichiran Ramen', '+81 50-1808-2529', '3 Chome−34−11 Peace Bldg., B1F, Shinjuku City, Japan', '/images/restaurant4.jpeg'),

            ('Uobei Goulabe', '+81 3-3462-0241', '2 Chome−29−11 Central Bldg. 6, Shibuya City, Japan', '/images/restaurant5.jpeg'),

            ('Zauo Fishing Restaurant', '+81 6-6212-5882', '1 Chome−1−13 Sotetsu Grand Frésa, B1F, Osaka, Japan', '/images/restaurant6.jpeg'),

            ('Nakatanidou', '+81 742-23-0141', 'Higashimuki Shopping Street, Nara, Japan', '/images/restaurant7.webp'),

            ('Sushi no Midori Shibuya', '+81 3-5458-0002', '1 Chome−12−3 Mark City East, 4F, Shibuya City, Japan', '/images/restaurant8.jpeg'),

            ('Asakusa Gyukatsu (Beef Cutlet)', '+81 50-1722-0596', '2 Chome−17−10 雷門上村ビル B1F, Taito City, Tokyo, Japan', '/images/restaurant9.jpeg')

            RETURNING id;
        `);

        const restaurantIds = restaurantResult.rows;

        // Add reviews
        // Add reviews
await pool.query(
    `INSERT INTO reviews (restaurant_id, rating, content) VALUES
    (${restaurantIds[0].id}, 5, 'Amazing experience!'),
    (${restaurantIds[0].id}, 4, 'Food was delicious!'),
    (${restaurantIds[1].id}, 5, 'Highly recommend!'),
    (${restaurantIds[2].id}, 3, 'Good, but a bit expensive.'),
    (${restaurantIds[3].id}, 2, 'Not worth the hype.'),
    (${restaurantIds[3].id}, 5, 'The ramen was phenomenal!'),
    (${restaurantIds[4].id}, 5, 'Best sushi I have ever had!'),
    (${restaurantIds[5].id}, 3, 'Unique experience with the fishing theme.'),
    (${restaurantIds[5].id}, 5, 'Absolutely loved the fresh catch!'),
    (${restaurantIds[6].id}, 4, 'Interesting mochi-pounding demonstration.'),
    (${restaurantIds[7].id}, 4, 'Busy but worth the wait.')
    ;`
);


        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
};

setup();
