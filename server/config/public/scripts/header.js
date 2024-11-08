// Add header
document.querySelector("header").innerHTML = `
  <div class="header">
    <img class="Japan-image" src="Images/Header.jpeg" alt="Japan Image">
    <p class="Header-Title">JAPAN</p>
  </div>
`;

// Add navigation bar
document.querySelector("nav").innerHTML = `
  <div class="navbar">
    <div class="Home">
      <button class="Home-Button" onclick="location.href='/'">Home</button>
    </div>
    <div class="Attractions">
      <button class="Attractions-Button" onclick="location.href='/attractions'">Attractions</button>
    </div>
    <div class="Restaurants">
      <button class="Restaurants-Button" onclick="location.href='/restaurants'">Restaurants</button>
    </div>
    <div class="newRestaurant">
      <button class="newRestaurantButton" onclick="location.href='/newRestaurant'">New Restaurant</button>
    </div>
  </div>
`;

// Add footer
document.querySelector("footer").innerHTML = `
  <div class="footer">
    <p class="contact">Contact Info: aguinto2@sfsu.edu</p>
  </div>
`;
