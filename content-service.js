// Import the 'fs' module for interacting with the file system
const fs = require("fs");

// Arrays to store categories and articles data loaded from JSON files
let categories = [];
let articles = [];

// Function to initialize data by loading categories and articles from JSON files
function initialize() {
  return new Promise((resolve, reject) => {
    // Read the categories data from categories.json file
    fs.readFile("./data/categories.json", "utf8", (err, cat) => {
      if (err) return reject("Failed to load categories: " + err); // Reject with an error message
      try {
        categories = JSON.parse(cat); // Parse and store categories data
      } catch (parseError) {
        return reject("Invalid JSON in categories file: " + parseError);
      }

      // Nested readFile for articles.json
      fs.readFile("./data/articles.json", "utf8", (err, art) => {
        if (err) return reject("Failed to load articles: " + err); // Reject with an error message
        try {
          articles = JSON.parse(art); // Parse and store articles data
        } catch (parseError) {
          return reject("Invalid JSON in articles file: " + parseError);
        }

        resolve(); // Initialization complete
      });
    });
  });
}

// Function to add a new article
function addArticle(articleData) {
  return new Promise((resolve, reject) => {
    // Validate the required fields
    if (!articleData.title || !articleData.content || !articleData.category) {
      return reject("Missing required article data (title, content, or category)");
    }

    // Prepare article data with default values
    articleData.published = !!articleData.published; // Convert to boolean
    articleData.id = articles.length > 0 ? articles[articles.length - 1].id + 1 : 1; // Set ID incrementally
    articleData.postDate = articleData.postDate || new Date().toISOString(); // Use current date if not provided

    // Add the article to the articles array
    articles.push(articleData);

    // Save the updated articles data back to the JSON file
    fs.writeFile("./data/articles.json", JSON.stringify(articles, null, 2), (err) => {
      if (err) return reject("Error saving article data: " + err); // Reject with an error message
      resolve(articleData); // Return the added article
    });
  });
}

// Function to get articles by category
function getArticlesByCategory(category) {
  return new Promise((resolve, reject) => {
    const filteredArticles = articles.filter((article) => article.category == category);
    if (filteredArticles.length > 0) resolve(filteredArticles);
    else reject("No articles found for the given category");
  });
}

// Function to get all articles
function getAllArticles() {
  return new Promise((resolve) => {
    resolve(articles); // Return all articles
  });
}

// Function to get articles by a minimum date
function getArticlesByMinDate(minDateStr) {
  return new Promise((resolve, reject) => {
    const minDate = new Date(minDateStr);
    const filteredArticles = articles.filter((article) => new Date(article.postDate) >= minDate);
    if (filteredArticles.length > 0) resolve(filteredArticles);
    else reject("No articles found from the given date");
  });
}

// Function to get a specific article by ID
function getArticleById(Id) {
  return new Promise((resolve, reject) => {
    const foundArticle = articles.find((article) => article.id == parseInt(Id));
    if (foundArticle) resolve(foundArticle);
    else reject("Article not found");
  });
}

// Function to get only published articles
function getPublishedArticles() {
  return Promise.resolve(articles.filter((article) => article.published)); // Return only published articles
}

// Function to get all categories
function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length > 0) resolve(categories);
    else reject("No categories available");
  });
}

// Export the functions as an object to make them available to other files
module.exports = {
  initialize,
  getAllArticles,
  getCategories,
  addArticle,
  getArticlesByCategory,
  getArticlesByMinDate,
  getArticleById,
  getPublishedArticles,
};
