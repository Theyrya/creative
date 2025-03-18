
// Initialize data in localStorage if it doesn't exist
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([]));
}
if (!localStorage.getItem('studios')) {
  // Add two sample studios
  const sampleStudios = [
    {
      id: 1,
      name: "Studio A",
      address: "123 Main St",
      rent: 50,
      owner: "owner1@example.com",
      availability: true,
      parking: true,
      publicTransport: true
    },
    {
      id: 2,
      name: "Studio B",
      address: "456 Elm St",
      rent: 60,
      owner: "owner2@example.com",
      availability: true,
      parking: false,
      publicTransport: true
    }
  ];
  localStorage.setItem('studios', JSON.stringify(sampleStudios));
}
if (!localStorage.getItem('favorites')) {
  localStorage.setItem('favorites', JSON.stringify([]));
}
if (!localStorage.getItem('bookings')) {
  localStorage.setItem('bookings', JSON.stringify([]));
}

// Helper functions to get and set data
const getUsers = () => JSON.parse(localStorage.getItem('users'));
const setUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

const getStudios = () => JSON.parse(localStorage.getItem('studios'));
const setStudios = (studios) => localStorage.setItem('studios', JSON.stringify(studios));

const getFavorites = () => JSON.parse(localStorage.getItem('favorites'));
const setFavorites = (favorites) => localStorage.setItem('favorites', JSON.stringify(favorites));

const getBookings = () => JSON.parse(localStorage.getItem('bookings'));
const setBookings = (bookings) => localStorage.setItem('bookings', JSON.stringify(bookings));

const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));
const setCurrentUser = (user) => localStorage.setItem('currentUser', JSON.stringify(user));

// Render Studios on Homepage
function renderStudios() {
  const studios = getStudios();
  const studioList = document.getElementById('studio-list');
  studioList.innerHTML = studios.map(studio => `
    <div class="studio-card">
      <h3>${studio.name}</h3>
      <p>${studio.address}</p>
      <p>Rent: $${studio.rent}/hr</p>
      <button onclick="addToFavorites(${studio.id})">Add to Favorites</button>
      <button onclick="bookStudio(${studio.id})">Book</button>
    </div>
  `).join('');
}
if (!localStorage.getItem('studios')) {
    const sampleStudios = [
      {
        id: 1,
        name: "Studio A",
        address: "123 Main St",
        rent: 50,
        owner: "owner1@example.com",
        availability: true,
        parking: true,
        publicTransport: true
      },
      {
        id: 2,
        name: "Studio B",
        address: "456 Elm St",
        rent: 60,
        owner: "owner2@example.com",
        availability: true,
        parking: false,
        publicTransport: true
      }
    ];
    localStorage.setItem('studios', JSON.stringify(sampleStudios));
    console.log('Sample studios added to localStorage:', sampleStudios); // Debugging
  }

















  // Login Form Submission
  document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const users = getUsers();
    const user = users.find(user => user.email === email);
  
    if (user) {
      setCurrentUser(user); // Set current user session
      alert('Login successful!');
      if (user.role === 'owner') {
        window.location.href = 'owner-dashboard.html';
      } else {
        window.location.href = 'index.html';
      }
    } else {
      alert('User not found. Please sign up.');
    }
  });















  
  // Signup Form Submission
  document.getElementById('signup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const role = document.getElementById('signup-role').value;
  
    const users = getUsers();
    const userExists = users.some(user => user.email === email);
  
    if (userExists) {
      alert('User already exists. Please log in.');
      return;
    }
  
    const newUser = { name, email, role };
    users.push(newUser);
    setUsers(users);
    setCurrentUser(newUser); // Set current user session
  
    alert('Signup successful!');
    if (role === 'owner') {
      window.location.href = 'owner-dashboard.html';
    } else {
      window.location.href = 'index.html';
    }
  });


















  
  // Profile Form Submission
  document.getElementById('profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
  
    const users = getUsers();
    const currentUser = getCurrentUser();
    const userIndex = users.findIndex(user => user.email === currentUser.email);
  
    if (userIndex !== -1) {
      users[userIndex].name = name;
      users[userIndex].email = email;
      setUsers(users);
      setCurrentUser(users[userIndex]); // Update current user session
      alert('Profile updated successfully!');
    } else {
      alert('User not found.');
    }
  });




















  
  // Render Studios on Homepage
  function renderStudios() {
    const studios = getStudios();
    const studioList = document.getElementById('studio-list');
    studioList.innerHTML = studios.map(studio => `
      <div class="studio-card">
        <h3>${studio.name}</h3>
        <p>${studio.address}</p>
        <p>Rent: $${studio.rent}/hr</p>
        <button onclick="addToFavorites(${studio.id})">Add to Favorites</button>
        <button onclick="bookStudio(${studio.id})">Book</button>
      </div>
    `).join('');
  }
  












  // Add to Favorites
  function addToFavorites(id) {
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      setFavorites(favorites);
      alert('Added to favorites!');
    } else {
      alert('This studio is already in your favorites.');
    }
    console.log('Updated Favorites:', favorites); // Debugging
  }function renderFavorites() {
    const favorites = getFavorites();
    const studios = getStudios();
    console.log('Favorites:', favorites); // Debugging
    console.log('Studios:', studios); // Debugging
  
    const favoritesList = document.getElementById('favorites-list');
    const favoriteStudios = studios.filter(studio => favorites.includes(studio.id));
  
    if (favoriteStudios.length === 0) {
      favoritesList.innerHTML = '<p>No favorites added yet.</p>';
    } else {
      favoritesList.innerHTML = favoriteStudios.map(studio => `
        <div class="studio-card">
          <h3>${studio.name}</h3>
          <p>${studio.address}</p>
          <p>Rent: $${studio.rent}/hr</p>
          <button onclick="removeFromFavorites(${studio.id})">Remove from Favorites</button>
        </div>
      `).join('');
    }
  }
  
  // Remove from Favorites
  function removeFromFavorites(id) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(favId => favId !== id);
    setFavorites(updatedFavorites);
    renderFavorites(); // Re-render the favorites list
    alert('Removed from favorites!');
  }
  














  
  // Book Studio
  function bookStudio(id) {
    const studio = getStudios().find(studio => studio.id === id);
    if (studio) {
      const owner = getUsers().find(user => user.email === studio.owner);
      alert(`Contact Owner:\nName: ${owner.name}\nEmail: ${owner.email}`);
      const bookings = getBookings();
      bookings.push({ studioId: id, renterEmail: getCurrentUser().email });
      setBookings(bookings);
    }
  }

















  
  // Render Favorites
  function renderFavorites() {
    const favorites = getFavorites();
    const studios = getStudios().filter(studio => favorites.includes(studio.id));
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = studios.map(studio => `
      <div class="studio-card">
        <h3>${studio.name}</h3>
        <p>${studio.address}</p>
        <p>Rent: $${studio.rent}/hr</p>
      </div>
    `).join('');
  }
  




















  // Render Bookings
  function renderBookings() {
    const bookings = getBookings();
    const studios = getStudios();
    const bookingsList = document.getElementById('bookings-list');
    bookingsList.innerHTML = bookings.map(booking => {
      const studio = studios.find(studio => studio.id === booking.studioId);
      const owner = getUsers().find(user => user.email === studio.owner);
      return `
        <div class="booking-card">
          <h3>${studio.name}</h3>
          <p>${studio.address}</p>
          <p>Rent: $${studio.rent}/hr</p>
          <p>Owner: ${owner.name} (${owner.email})</p>
        </div>
      `;
    }).join('');
  }










  
  // Logout
  document.getElementById('logout')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });