// Typing effect for the hero section
let typingEffect = new Typed("#text", {
    strings: ["Swad Sutra", "Swadish Food", "BudgetPlaces"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1000
});

// Quick filter functionality
document.querySelectorAll('.quick-filter').forEach(filter => {
    filter.addEventListener('click', function() {
        const cuisine = this.getAttribute('data-cuisine');
        const cuisineSelect = document.querySelectorAll(".filter-select")[1];

        // Update the cuisine dropdown
        cuisineSelect.value = cuisine;

        // Trigger the filter
        filterRestaurants();
    });
});

// Scroll to search functionality
document.querySelector('.scroll-to-search').addEventListener('click', function() {
    document.getElementById('search-section').scrollIntoView({
        behavior: 'smooth'
    });
});

// Update results count
function updateResultsCount(count) {
    document.querySelector('.results-count').textContent = `${count} restaurants found`;
}

// Enhanced filter restaurants function (to be added to restaurant.js)
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
        const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery);

        return matchesPrice && matchesCuisine && matchesDistance && matchesRating && matchesSearch;
    });

    populateTable(filtered);
    updateResultsCount(filtered.length);

    // Show/hide no results message
    const noResults = document.querySelector('.no-results');
    noResults.style.display = filtered.length === 0 ? 'block' : 'none';
}