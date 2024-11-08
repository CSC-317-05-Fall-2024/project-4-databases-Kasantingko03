const handleSubmit = async (event) => {
    event.preventDefault(); 

    // Extract fields from the form, and
    // send a request to create a new restaurant
    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const address = document.querySelector('#address').value;
    const photo = document.querySelector('#photo').value;

    // Create a new restaurant object
    const newRestaurant = { name, phone, address, photo };
    try {
        // Send a POST request to the backend to create the restaurant
        const response = await fetch('/api/restaurants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRestaurant),
        });

        if (response.ok) {
            // Redirect to the restaurants page after successful creation
            window.location.href = '/restaurants';
        } else {
            console.error('Failed to create a new restaurant');
        }
    } catch (error) {
        console.error('Error occurred during submission:', error);
    }
};


document.addEventListener('DOMContentLoaded', () => {
 
    // Add event listener to the form for submit events
    const form = document.querySelector('#new-restaurant-form');
    form.addEventListener('submit', handleSubmit);

});
