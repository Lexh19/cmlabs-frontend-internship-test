// meal-details.js
import { fetchMealDetails } from './api.js';

const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');

// Fetch and display meal details
if (mealId) {
    fetchMealDetails(mealId)
        .then(response => {
            const meal = response.data.meals[0];
            displayMealDetails(meal);
        })
        .catch(error => console.error("Error fetching meal details:", error));
}

// Function to display meal details on the page
function displayMealDetails(meal) {
    const mealDetailsContainer = document.getElementById('meal-details');

    const mealHTML = `
        <div class="col-md-6">
            <img class="img-fluid" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="col-md-6">
            <h2 class="mt-4">${meal.strMeal}</h2>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
            <h4>Ingredients:</h4>
            <ul>
                ${getIngredientsList(meal)}
            </ul>
        </div>
    `;

    mealDetailsContainer.innerHTML = mealHTML;
}

// Function to generate a list of ingredients
function getIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredientsList += `<li>${ingredient} - ${measure}</li>`;
        }
    }
    return ingredientsList;
}
