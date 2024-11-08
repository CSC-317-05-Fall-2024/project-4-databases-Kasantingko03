document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.delete-btn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      const restaurantCard = event.target.closest('.restaurant-card');
      const restaurantId = restaurantCard.getAttribute('data-id');

      try {
        // Make DELETE request to the backend
        const response = await fetch(`/api/restaurants/${restaurantId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Re-fetch the restaurant list to reflect changes
          location.reload();  // Reload the page to re-render the updated list
        } else {
          console.error('Failed to delete the restaurant');
        }
      } catch (error) {
        console.error('Error occurred during delete:', error);
      }
    });
  });
});
