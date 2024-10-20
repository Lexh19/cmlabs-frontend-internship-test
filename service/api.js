// api.js
const apiBaseURL = 'https://www.themealdb.com/api/json/v1/1';

// Function to fetch all meals
function fetchAllMeals() {
    return axios.get(`${apiBaseURL}/search.php?s=`);
}

// Function to fetch categories
function fetchCategories() {
    return axios.get(`${apiBaseURL}/categories.php`);
}

// Function to fetch meals by category
function fetchMealsByCategory(category) {
    return axios.get(`${apiBaseURL}/filter.php?c=${category}`);
}

// Fetch meal details by ID
function fetchMealDetails(id) {
    return axios.get(`${apiBaseURL}/lookup.php?i=${id}`);
}

// Exporting functions
export { fetchAllMeals, fetchCategories, fetchMealsByCategory, fetchMealDetails};
