
// Initialize data in localStorage if it doesn't exist
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([]));
}
if (!localStorage.getItem('studios')) {
  // Add two sample studios
  const sampleStudios = [
    
  ];
  localStorage.setItem('studios', JSON.stringify(sampleStudios));
  console.log('Sample studios added to localStorage:', sampleStudios); // Debugging
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
  console.log('Studios fetched:', studios); // Debugging

  const studioList = document.getElementById('studio-list');
  if (!studioList) {
    console.error('studio-list element not found!'); // Debugging
    return;
  }

  studioList.innerHTML = studios.map(studio => `
    <div class="studio-card">
      <h3>${studio.name}</h3>
      <p>${studio.address}</p>
      <p>Rent: $${studio.rent}/hr</p>
      <p>Availability: ${studio.availability ? 'Available' : 'Not Available'}</p>
      <button onclick="addToFavorites(${studio.id})">Add to Favorites</button>
      <button onclick="bookStudio(${studio.id})">Book</button>
    </div>
  `).join('');
}
















 // Login Form Submission
document.getElementById('login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const users = getUsers();
  const user = users.find(user => user.email === email);

  if (user) {
    setCurrentUser(user); // Store the logged-in user
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
    const phone = document.getElementById('signup-phone').value;
    const role = document.getElementById('signup-role').value;
  
    const users = getUsers();
    const userExists = users.some(user => user.email === email);
  
    if (userExists) {
      alert('User already exists. Please log in.');
      return;
    }
  
    const newUser = { name, email, phone, role };
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




















 // Add Studio
function addStudio(event) {
  event.preventDefault();

  const name = document.getElementById('studio-name').value;
  const address = document.getElementById('studio-address').value;
  const area = document.getElementById('studio-area').value;
  const type = document.getElementById('studio-type').value;
  const capacity = document.getElementById('studio-capacity').value;
  const parking = document.getElementById('studio-parking').checked;
  const publicTransport = document.getElementById('studio-public-transport').checked;
  const availability = document.getElementById('studio-availability').checked;
  const rentalTerm = document.getElementById('studio-rental-term').value;
  const rent = document.getElementById('studio-rent').value;
  const owner = getCurrentUser().email; // Get the logged-in owner's email

  const newStudio = {
    id: Date.now(), // Unique ID for the studio
    name,
    address,
    area: parseInt(area),
    type,
    capacity: parseInt(capacity),
    parking,
    publicTransport,
    availability,
    rentalTerm,
    rent: parseInt(rent),
    owner
  };

  const studios = getStudios();
  studios.push(newStudio);
  setStudios(studios);

  console.log('New Studio Added:', newStudio); // Debugging
  console.log('Updated Studios:', studios); // Debugging

  alert('Studio added successfully!');
  renderOwnedStudios(); // Re-render the owned studios list
}










let editingStudioId = null; // Track the studio being edited

// Edit Studio
function editStudio(id) {
  const studios = getStudios();
  const studio = studios.find(studio => studio.id === id);

  if (studio) {
    // Populate the edit form with the studio's current details
    document.getElementById('edit-studio-name').value = studio.name;
    document.getElementById('edit-studio-address').value = studio.address;
    document.getElementById('edit-studio-area').value = studio.area;
    document.getElementById('edit-studio-type').value = studio.type;
    document.getElementById('edit-studio-capacity').value = studio.capacity;
    document.getElementById('edit-studio-parking').checked = studio.parking;
    document.getElementById('edit-studio-public-transport').checked = studio.publicTransport;
    document.getElementById('edit-studio-availability').checked = studio.availability;
    document.getElementById('edit-studio-rental-term').value = studio.rentalTerm;
    document.getElementById('edit-studio-rent').value = studio.rent;

    // Show the edit form
    document.getElementById('edit-form').style.display = 'block';

    // Track the studio being edited
    editingStudioId = id;
  }
}

// Update Studio
function updateStudio(event) {
  event.preventDefault();

  const name = document.getElementById('edit-studio-name').value;
  const address = document.getElementById('edit-studio-address').value;
  const area = document.getElementById('edit-studio-area').value;
  const type = document.getElementById('edit-studio-type').value;
  const capacity = document.getElementById('edit-studio-capacity').value;
  const parking = document.getElementById('edit-studio-parking').checked;
  const publicTransport = document.getElementById('edit-studio-public-transport').checked;
  const availability = document.getElementById('edit-studio-availability').checked;
  const rentalTerm = document.getElementById('edit-studio-rental-term').value;
  const rent = document.getElementById('edit-studio-rent').value;

  const studios = getStudios();
  const studioIndex = studios.findIndex(studio => studio.id === editingStudioId);

  if (studioIndex !== -1) {
    // Update the studio details
    studios[studioIndex].name = name;
    studios[studioIndex].address = address;
    studios[studioIndex].area = parseInt(area);
    studios[studioIndex].type = type;
    studios[studioIndex].capacity = parseInt(capacity);
    studios[studioIndex].parking = parking;
    studios[studioIndex].publicTransport = publicTransport;
    studios[studioIndex].availability = availability;
    studios[studioIndex].rentalTerm = rentalTerm;
    studios[studioIndex].rent = parseInt(rent);

    // Save the updated studios array to localStorage
    setStudios(studios);

    // Hide the edit form
    document.getElementById('edit-form').style.display = 'none';

    // Re-render the owned studios list
    renderOwnedStudios();

    // Re-render the studios on the homepage (if open)
    if (window.location.pathname.endsWith('index.html')) {
      renderStudios();
    }

    alert('Studio updated successfully!');
  } else {
    alert('Studio not found.');
  }
}














  
  // Profile Form Submission
  document.getElementById('profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const phone = document.getElementById('profile-phone').value;
  
    const users = getUsers();
    const currentUser = getCurrentUser();
    const userIndex = users.findIndex(user => user.email === currentUser.email);
  
    if (userIndex !== -1) {
      users[userIndex].name = name;
      users[userIndex].email = email;
      users[userIndex].phone = phone;
      setUsers(users);
      setCurrentUser(users[userIndex]); // Update current user session
      alert('Profile updated successfully!');
    } else {
      alert('User not found.');
    }
  });



















// Cancel Edit
function cancelEdit() {
  document.getElementById('edit-form').style.display = 'none';
  editingStudioId = null; // Reset the editing studio ID
}









  
  // Render Studios on Homepage
function renderStudios() {
  const studios = getStudios();
  console.log('Studios fetched:', studios); // Debugging

  const studioList = document.getElementById('studio-list');
  if (!studioList) {
    console.error('studio-list element not found!'); // Debugging
    return;
  }

  studioList.innerHTML = studios.map(studio => `
    <div class="studio-card">
      <h3>${studio.name}</h3>
      <p>Address: ${studio.address}</p>
      <p>Area: ${studio.area} sqm</p>
      <p>Type: ${studio.type}</p>
      <p>Capacity: ${studio.capacity} people</p>
      <p>Parking: ${studio.parking ? 'Yes' : 'No'}</p>
      <p>Public Transport: ${studio.publicTransport ? 'Yes' : 'No'}</p>
      <p>Availability: ${studio.availability ? 'Available' : 'Not Available'}</p>
      <p>Rental Term: ${studio.rentalTerm}</p>
      <p>rent: $${studio.rent} per ${studio.rentalTerm}</p>
      <button onclick="addToFavorites(${studio.id})">Add to Favorites</button>
      <button onclick="bookStudio(${studio.id})">Book</button>
    </div>
  `).join('');
}

// Render Owned Studios
function renderOwnedStudios() {
  const ownerEmail = getCurrentUser().email; // Get the logged-in owner's email
  const studios = getStudios().filter(studio => studio.owner === ownerEmail);

  const studioList = document.getElementById('owned-studios');
  studioList.innerHTML = studios.map(studio => `
    <div class="studio-card">
      <h3>${studio.name}</h3>
      <p>Address: ${studio.address}</p>
      <p>Area: ${studio.area} sqm</p>
      <p>Type: ${studio.type}</p>
      <p>Capacity: ${studio.capacity} people</p>
      <p>Parking: ${studio.parking ? 'Yes' : 'No'}</p>
      <p>Public Transport: ${studio.publicTransport ? 'Yes' : 'No'}</p>
      <p>Availability: ${studio.availability ? 'Available' : 'Not Available'}</p>
      <p>Rental Term: ${studio.rentalTerm}</p>
      <p>rent: $${studio.rent} per ${studio.rentalTerm}</p>
      <button onclick="editStudio(${studio.id})">Edit</button>
      <button onclick="deleteStudio(${studio.id})">Delete</button>
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
  // Remove Booking
function removeBooking(bookingId) {
  const bookings = getBookings();
  const updatedBookings = bookings.filter(booking => booking.studioId !== bookingId);
  setBookings(updatedBookings);
  renderBookings(); // Re-render the bookings list
  alert('Booking removed successfully!');
}
  














  
  // Book Studio
  // Book Studio
  function bookStudio(id) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert('Please log in to book a studio.');
      window.location.href = 'login.html';
      return;
    }
  
    console.log('Current User:', currentUser); // Debugging
  
    const studio = getStudios().find(studio => studio.id === id);
    if (studio) {
      console.log('Studio Found:', studio); // Debugging
  
      const owner = getUsers().find(user => user.email === studio.owner);
      if (owner) {
        console.log('Owner Found:', owner); // Debugging
        alert(`Contact Owner:\nName: ${owner.name}\nEmail: ${owner.email}\nPhone: ${owner.phone}`);
      } else {
        console.error('Owner not found for studio:', studio); // Debugging
        alert('Owner information not found.');
        return;
      }
  
      const bookings = getBookings();
      bookings.push({ studioId: id, renterEmail: currentUser.email });
      setBookings(bookings);
      console.log('Updated Bookings:', bookings); // Debugging
      alert('Booking successful!');
    } else {
      console.error('Studio not found with ID:', id); // Debugging
      alert('Studio not found.');
    }
  }







// Delete Studio
function deleteStudio(id) {
  const studios = getStudios();
  const updatedStudios = studios.filter(studio => studio.id !== id);
  setStudios(updatedStudios);

  console.log('Studio Deleted:', id); // Debugging
  console.log('Updated Studios:', updatedStudios); // Debugging

  // Re-render the owned studios list
  renderOwnedStudios();

  // Re-render the studios on the homepage (if open)
  if (window.location.pathname.endsWith('index.html')) {
    renderStudios();
  }

  alert('Studio deleted successfully!');
}








// Filter Studios
function filterStudios() {
  const studios = getStudios();

  // Get filter values
  const availabilityFilter = document.getElementById('filter-availability').value;
  const rentMin = document.getElementById('filter-rent-min').value;
  const rentMax = document.getElementById('filter-rent-max').value;
  const parkingFilter = document.getElementById('filter-parking').value;
  const publicTransportFilter = document.getElementById('filter-public-transport').value;

  // Apply filters
  const filteredStudios = studios.filter(studio => {
    // Availability filter
    if (availabilityFilter === 'available' && !studio.availability) return false;
    if (availabilityFilter === 'not-available' && studio.availability) return false;

    // rent range filter
    if (rentMin && studio.rent < parseFloat(rentMin)) return false;
    if (rentMax && studio.rent > parseFloat(rentMax)) return false;

    // Parking filter
    if (parkingFilter === 'yes' && !studio.parking) return false;
    if (parkingFilter === 'no' && studio.parking) return false;

    // Public transport filter
    if (publicTransportFilter === 'yes' && !studio.publicTransport) return false;
    if (publicTransportFilter === 'no' && studio.publicTransport) return false;

    return true;
  });

  // Render filtered studios
  renderFilteredStudios(filteredStudios);
}

// Render Filtered Studios
function renderFilteredStudios(filteredStudios) {
  const studioList = document.getElementById('studio-list');
  studioList.innerHTML = filteredStudios.map(studio => `
    <div class="studio-card">
      <h3>${studio.name}</h3>
      <p>${studio.address}</p>
      <p>Rent: $${studio.rent}/hr</p>
      <p>Availability: ${studio.availability ? 'Available' : 'Not Available'}</p>
      <button onclick="addToFavorites(${studio.id})">Add to Favorites</button>
      <button onclick="bookStudio(${studio.id})">Book</button>
    </div>
  `).join('');
}

// Clear Filters
function clearFilters() {
  document.getElementById('filter-availability').value = 'all';
  document.getElementById('filter-rent-min').value = '';
  document.getElementById('filter-rent-max').value = '';
  document.getElementById('filter-parking').value = 'all';
  document.getElementById('filter-public-transport').value = 'all';

  // Render all studios
  renderStudios();
}

// Attach filter form submission
document.getElementById('filter-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  filterStudios();
});
















  
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
  // Render Bookings
function renderBookings() {
  const bookings = getBookings();
  const studios = getStudios();
  const bookingsList = document.getElementById('bookings-list');

  if (bookings.length === 0) {
    bookingsList.innerHTML = '<p>No bookings found.</p>';
  } else {
    bookingsList.innerHTML = bookings.map(booking => {
      const studio = studios.find(studio => studio.id === booking.studioId);
      const owner = getUsers().find(user => user.email === studio.owner);
      return `
        <div class="booking-card">
          <h3>${studio.name}</h3>
          <p>${studio.address}</p>
          <p>Rent: $${studio.rent}/hr</p>
          <p>Owner: ${owner.name} (${owner.email})</p>
          <button onclick="removeBooking(${studio.id})">Remove Booking</button>
        </div>
      `;
    }).join('');
  }
}



function toggleFilterSection() {
  const filterSection = document.getElementById('filter-section');
  if (filterSection.style.display === 'none' || filterSection.style.display === '') {
    filterSection.style.display = 'block';
  } else {
    filterSection.style.display = 'none';
  }
}

// Open Filter Modal
function openFilterModal() {
  const modal = document.getElementById('filter-modal');
  modal.style.display = 'block';
}

// Close Filter Modal
function closeFilterModal() {
  const modal = document.getElementById('filter-modal');
  modal.style.display = 'none';
}

// Close modal if user clicks outside of it
window.onclick = function (event) {
  const modal = document.getElementById('filter-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};






  
  // Logout
  document.getElementById('logout')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });