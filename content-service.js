// Import the 'fs' module for interacting with the file system
const fs = require("fs");
const { parse } = require("path");

// Arrays to store categories and articles data loaded from JSON files
let categories = [];
let articles = [];


// Function to initialize data by loading categories and articles from JSON files
function initialize() {
  return new Promise((resolve, reject) => {
    // Read the categories data from categories.json file
    fs.readFile("./data/categories.json", "utf8", (err, cat) => {
      if (err) return reject(err); // Reject the promise if an error occurs during file read
      categories = JSON.parse(cat); // Parse and store categories data

      // Nested readFile for articles.json
      fs.readFile("./data/articles.json", "utf8", (err, art) => {
        if (err) return reject(err); // Reject the promise if an error occurs during file read
        articles = JSON.parse(art); // Parse and store articles data

        resolve(); // Initialization complete
      });
    });
  });
}

// Function to add a new article
function addArticle(articleData) {
  return new Promise((resolve, reject) => {
    if (!articleData.title || !articleData.content || !articleData.category) {
      return reject("Missing required article data");
    }

    articleData.published = articleData.published ? true : false;
    articleData.id = articles.length + 1; // Set ID to the current length + 1

    // Set the postDate for the article (use current date if not provided)
    articleData.postDate = articleData.postDate || new Date().toISOString(); // Use current date if not provided

    articles.push(articleData); // Add the article to the articles array

    // Optionally save the articles data back to the file system
    fs.writeFile("./data/articles.json", JSON.stringify(articles, null, 2), (err) => {
      if (err) return reject("Error saving article data");
      resolve(articleData); // Return the added article
    });
  });
}

// Function to get articles by category
function getArticlesByCategory(category) {
  return new Promise((resolve, reject) => {
    const filteredArticles = articles.filter(
      (article) => article.category == parseInt(category)
    );
    if (filteredArticles.length > 0) resolve(filteredArticles);
    else reject("No articles found for the given category");
  });
}

// Function to get all articles
function getAllArticles() {
  return new Promise((resolve, reject) => {
    resolve(articles);
  });
}

// Function to get articles by a minimum date
function getArticlesByMinDate(minDateStr) {
  return new Promise((resolve, reject) => {
    const minDate = new Date(minDateStr);
    const filteredArticles = articles.filter(
      (article) => new Date(article.postDate) >= minDate
    );
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
  return Promise.resolve(categories); // Return the categories array as a resolved promise
}

// Function to get all articles (returning all articles)
function getArticles() {
  return Promise.resolve(articles); // Return the articles array as a resolved promise
}

// Export the functions as an object to make them available to other files
module.exports = {
  initialize,
  getAllArticles,
  getCategories,
  getArticles,
  addArticle,
  getArticlesByCategory,
  getArticlesByMinDate,
  getArticleById,
};
