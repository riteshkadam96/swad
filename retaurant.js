// Format price range for display
function formatPriceRange(range) {
    return range.repeat(range.length);
}

// Format rating with stars
function formatRating(rating) {
    return `
      <div class="rating">
          <span class="rating-number">${rating}</span>
          <span class="stars">
              ${getStars(rating)}
          </span>
      </div>
  `;
}

// Generate star icons based on rating
function getStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Format distance for display
function formatDistance(distance) {
    return `${distance} km`;
}

// Populate restaurant table with data
function populateTable(data) {
    const tableBody = document.getElementById("restaurantTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    if (data.length === 0) {
        document.querySelector('.no-results').style.display = 'block';
        document.querySelector('.restaurant-grid').style.display = 'none';
    } else {
        document.querySelector('.no-results').style.display = 'none';
        document.querySelector('.restaurant-grid').style.display = 'block';
    }

    data.forEach((restaurant) => {
                const row = document.createElement("tr");
                row.innerHTML = `
          <td>
              <div class="restaurant-name">
                  <span>${restaurant.name}</span>
                  ${restaurant.cuisine && `<span class="cuisine-tag">${restaurant.cuisine}</span>`}
              </div>
          </td>
          <td class="price-column">${formatPriceRange(restaurant.priceRange)}</td>
          <td>${restaurant.cuisine}</td>
          <td>${formatDistance(restaurant.distance)}</td>
          <td>${formatRating(restaurant.rating)}</td>
      `;
      
      // Add click event to show more details
      row.addEventListener('click', () => showRestaurantDetails(restaurant));
      tableBody.appendChild(row);
  });

  // Update results count
  updateResultsCount(data.length);
}

// Show restaurant details
function showRestaurantDetails(restaurant) {
  // Create modal content
  const modalContent = `
      <div class="restaurant-detail-modal">
          <h2>${restaurant.name}</h2>
          <div class="detail-grid">
              <div class="detail-item">
                  <i class="fas fa-tag"></i>
                  <span>${formatPriceRange(restaurant.priceRange)}</span>
              </div>
              <div class="detail-item">
                  <i class="fas fa-utensils"></i>
                  <span>${restaurant.cuisine}</span>
              </div>
              <div class="detail-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>${formatDistance(restaurant.distance)}</span>
              </div>
              <div class="detail-item">
                  <i class="fas fa-star"></i>
                  <span>${restaurant.rating}</span>
              </div>
          </div>
      </div>
  `;

  // Show modal (you'll need to implement modal functionality)
  // For now, we'll use alert
  alert(`Selected Restaurant: ${restaurant.name}`);
}

// Filter restaurants based on all criteria
function filterRestaurants() {
  const priceRange = document.querySelectorAll(".filter-select")[0].value;
  const cuisine = document.querySelectorAll(".filter-select")[1].value;
  const distance = parseInt(document.querySelectorAll(".filter-select")[2].value) || Infinity;
  const rating = parseFloat(document.querySelectorAll(".filter-select")[3].value) || 0;
  const searchQuery = document.querySelector(".search-input").value.toLowerCase();

  const filtered = restaurants.filter((restaurant) => {
      const matchesPrice = priceRange === "All Prices" || restaurant.priceRange === priceRange;
      const matchesCuisine = cuisine === "All Cuisine" || restaurant.cuisine === cuisine;
      const matchesDistance = distance === Infinity || restaurant.distance <= distance;
      const matchesRating = rating === 0 || restaurant.rating >= rating;
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery) || 
                          restaurant.cuisine.toLowerCase().includes(searchQuery);

      return matchesPrice && matchesCuisine && matchesDistance && matchesRating && matchesSearch;
  });

  populateTable(filtered);
}

// Quick filter functionality
function initializeQuickFilters() {
  document.querySelectorAll('.quick-filter').forEach(filter => {
      filter.addEventListener('click', function() {
          // Remove active class from all filters
          document.querySelectorAll('.quick-filter').forEach(f => f.classList.remove('active'));
          // Add active class to clicked filter
          this.classList.add('active');

          const cuisine = this.getAttribute('data-cuisine');
          const cuisineSelect = document.querySelectorAll(".filter-select")[1];
          
          if (cuisine === 'All') {
              cuisineSelect.value = 'All Cuisine';
          } else {
              cuisineSelect.value = cuisine;
          }
          
          filterRestaurants();
      });
  });
}

// Search functionality
function initializeSearch() {
  const searchInput = document.querySelector(".search-input");
  const searchClear = document.querySelector(".search-clear");

  searchInput.addEventListener('input', () => {
      searchClear.style.display = searchInput.value ? 'block' : 'none';
      filterRestaurants();
  });

  searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchClear.style.display = 'none';
      filterRestaurants();
  });
}

// Clear all filters
function clearFilters() {
  // Reset all select elements to their first option
  document.querySelectorAll(".filter-select").forEach((select) => {
      select.value = select.options[0].value;
  });

  // Clear search input
  const searchInput = document.querySelector(".search-input");
  searchInput.value = '';
  document.querySelector(".search-clear").style.display = 'none';

  // Reset quick filters
  document.querySelectorAll('.quick-filter').forEach(f => f.classList.remove('active'));
  document.querySelector('.quick-filter[data-cuisine="All"]').classList.add('active');

  // Reset the table to show all restaurants
  populateTable(restaurants);
}

// Update results count
function updateResultsCount(count) {
  const countElement = document.querySelector('.results-count');
  if (countElement) {
      countElement.textContent = `${count} restaurant${count === 1 ? '' : 's'} found`;
  }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  initializeQuickFilters();
  initializeSearch();
  
  // Add event listeners for filters
  document.querySelectorAll(".filter-select").forEach((select) => {
      select.addEventListener("change", filterRestaurants);
  });

  // Add event listener for clear filters button
  const clearButton = document.querySelector(".filter-button");
  if (clearButton) {
      clearButton.addEventListener("click", clearFilters);
  }

  // Initialize table with all restaurants
  populateTable(restaurants);
});
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all elements
    const tableBody = document.getElementById("restaurantTableBody");
    const searchInput = document.querySelector(".search-input");
    const clearButton = document.querySelector(".filter-button");
    const filterSelects = document.querySelectorAll(".filter-select");
    const quickFilters = document.querySelectorAll(".quick-filter");
    const resultsCount = document.querySelector(".results-count");
    const noResults = document.querySelector(".no-results");

    // Function to populate the table with data
    function populateTable(data) {
        tableBody.innerHTML = ""; // Clear existing rows

        data.forEach((restaurant) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <div class="restaurant-name">${restaurant.name}</div>
                </td>
                <td>
                    <div class="price-range">${restaurant.priceRange}</div>
                </td>
                <td>
                    <div class="cuisine-type">${restaurant.cuisine}</div>
                </td>
                <td>
                    <div class="distance">${restaurant.distance} km</div>
                </td>
                <td>
                    <div class="rating">
                        <span class="stars">${'★'.repeat(Math.floor(restaurant.rating))}${restaurant.rating % 1 >= 0.5 ? '½' : ''}</span>
                        <span class="rating-number">${restaurant.rating}</span>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Update results count
        updateResultsCount(data.length);

        // Show/hide no results message
        noResults.style.display = data.length === 0 ? 'flex' : 'none';
    }

    // Function to update results count
    function updateResultsCount(count) {
        resultsCount.textContent = `${count} restaurant${count !== 1 ? 's' : ''} found`;
    }

    // Function to filter restaurants
    function filterRestaurants() {
        const priceRange = filterSelects[0].value;
        const cuisine = filterSelects[1].value;
        const distance = parseInt(filterSelects[2].value) || Infinity;
        const rating = parseFloat(filterSelects[3].value) || 0;
        const searchQuery = searchInput.value.toLowerCase();

        const filtered = restaurants.filter((restaurant) => {
            const matchesPrice = priceRange === "All Prices" || restaurant.priceRange === priceRange;
            const matchesCuisine = cuisine === "All Cuisine" || restaurant.cuisine === cuisine;
            const matchesDistance = distance === Infinity || restaurant.distance <= distance;
            const matchesRating = rating === 0 || restaurant.rating >= rating;
            const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery) || 
                                restaurant.cuisine.toLowerCase().includes(searchQuery);

            return matchesPrice && matchesCuisine && matchesDistance && matchesRating && matchesSearch;
        });

        // Sort results by rating (highest first)
        filtered.sort((a, b) => b.rating - a.rating);

        populateTable(filtered);
    }

    // Event listener for search input
    searchInput.addEventListener('input', filterRestaurants);

    // Event listener for filter selects
    filterSelects.forEach(select => {
        select.addEventListener('change', filterRestaurants);
    });

    // Event listener for quick filters
    quickFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            quickFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');

            const cuisine = this.getAttribute('data-cuisine');
            filterSelects[1].value = cuisine === 'All' ? 'All Cuisine' : cuisine;
            filterRestaurants();
        });
    });

    // Event listener for clear filters button
    clearButton.addEventListener('click', function() {
        // Reset search input
        searchInput.value = '';
        
        // Reset all filter selects
        filterSelects.forEach(select => {
            select.value = select.options[0].value;
        });

        // Reset quick filters
        quickFilters.forEach(filter => filter.classList.remove('active'));
        quickFilters[0].classList.add('active'); // Set "All" as active

        // Refresh the table
        filterRestaurants();
    });

    // Initialize the table with all restaurants
    populateTable(restaurants);
});