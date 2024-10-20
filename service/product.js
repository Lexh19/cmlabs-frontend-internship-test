import { fetchAllMeals, fetchCategories, fetchMealsByCategory } from './api.js';

// Display meals on the page
function displayMeals(meals) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (!meals) return; // No meals to display

    meals.forEach(meal => {
        const productHTML = `
            <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div class="product-item">
                    <div class="position-relative bg-light overflow-hidden">
                        <img class="img-fluid w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">New</div>
                    </div>
                    <div class="text-center p-4">
                        <a class="d-block h5 mb-2" href="#">${meal.strMeal}</a>
                    </div>
                    <div class="d-flex border-top">
                        <small class="w-50 text-center border-end py-2">
                            <a class="text-body" href="food-details.html?id=${meal.idMeal}"><i class="fa fa-eye text-primary me-2"></i>View detail</a>
                        </small>
                        <small class="w-50 text-center py-2">
                            <a class="text-body" href="#"><i class="fa fa-shopping-bag text-primary me-2"></i>Add to cart</a>
                        </small>
                    </div>
                </div>
            </div>`;
        productList.innerHTML += productHTML;
    });
}

// Initial setup when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    fetchAllMeals()
        .then(response => {
            if (response.data.meals) {
                displayMeals(response.data.meals);
            } else {
                displayMeals([]); // No meals found
            }
        })
        .catch(error => console.error("Error fetching meals:", error));

    fetchCategories()
        .then(response => {
            const categoryFilter = document.getElementById('category-filter');
            response.data.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.strCategory;
                option.textContent = category.strCategory;
                categoryFilter.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching categories:", error));
});

// Event listener for category filter
document.getElementById('category-filter').addEventListener('change', function () {
    const selectedCategory = this.value;
    if (selectedCategory) {
        fetchMealsByCategory(selectedCategory)
            .then(response => {
                if (response.data.meals) {
                    displayMeals(response.data.meals);
                } else {
                    displayMeals([]); // No meals found for category
                }
            })
            .catch(error => console.error("Error fetching meals by category:", error));
    } else {
        fetchAllMeals()
            .then(response => {
                if (response.data.meals) {
                    displayMeals(response.data.meals);
                } else {
                    displayMeals([]); // No meals found
                }
            })
            .catch(error => console.error("Error fetching meals:", error));
    }
});
