// Import the Express library
const express = require("express");

// Import other necessary libraries
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Import EJS as the view engine
const ejs = require("ejs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dexmgropy",
  api_key: "269573191974962",
  api_secret: "Ef-1jBn7kdls2-dfzmjPPFiCyhU",
  secure: true,
});

// Initialize the Express app
const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");

// Initialize multer for handling file uploads
const upload = multer();

// Import the 'path' module to handle file paths
const path = require("path");

// Import the custom data handling module
const contentService = require("./content-service");

// Set the HTTP port to an environment variable or default to 3838
const HTTP_PORT = process.env.PORT || 3838;

// Serve static files from the "public" directory (e.g., CSS, JS files, images)
app.use(express.static("public"));

// Middleware to parse incoming requests with JSON payloads
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Route for the root path, redirecting to the "/about" page
app.get("/", (req, res) => {
  res.redirect("/about");
});

// Route for the "/about" page, rendering the about view
app.get("/about", (req, res) => {
  res.render("about");
});

// Route for the "/categories" endpoint, returning categories in JSON format
app.get("/categories", (req, res) => {
  contentService.getCategories()
    .then((data) => {
      res.render("categories", { categories: data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

// Route for articles, with filtering by category or date
app.get("/articles", (req, res) => {
  if (req.query.category) {
    contentService.getArticlesByCategory(req.query.category)
      .then((articles) => {
        res.render("articles", { articles });
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
  } else if (req.query.minDate) {
    contentService.getArticlesByMinDate(req.query.minDate)
      .then((articles) => {
        res.render("articles", { articles });
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
  } else {
    contentService.getAllArticles()
      .then((articles) => {
        res.render("articles", { articles });
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
  }
});

// Route for displaying a single article
app.get("/article/:id", (req, res) => {
  contentService.getArticleById(req.params.id)
    .then((article) => {
      if (!article.published) {
        res.status(404).send("Article not published");
      } else {
        res.render("article", { article });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// Route for the "/articles/add" page, rendering the addArticle view with categories
app.get("/articles/add", (req, res) => {
  contentService.getCategories()
    .then((categories) => {
      res.render("addarticle", { categories }); // Pass categories to the view
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to fetch categories" });
    });
});

// Route to handle article form submission with image upload
app.post("/articles/add", upload.single("featureImage"), (req, res) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          { folder: "articles" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function uploadToCloudinary(req) {
      let result = await streamUpload(req);
      return result.url;
    }

    uploadToCloudinary(req)
      .then((imageUrl) => {
        processArticle(imageUrl);
      })
      .catch((err) => {
        res.status(500).json({ message: "Image upload failed", error: err });
      });
  } else {
    processArticle("");
  }

  function processArticle(imageUrl) {
    const articleData = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      published: req.body.published === "on",
      featureImage: imageUrl || "",
      author: req.body.author,  // Add author to article data
      postDate: new Date().toISOString(),
    };

    contentService.addArticle(articleData)
      .then(() => res.redirect("/articles"))
      .catch((err) =>
        res.status(500).json({ message: "Failed to add article", error: err })
      );
  }
});

// Initialize the data in the storeData module, then start the server
contentService.initialize()
  .then(() => {
    app.listen(HTTP_PORT);
    console.log("server listening @ http://localhost:" + HTTP_PORT);
  })
  .catch((err) => {
    console.error("Failed to initialize data: ", err);
  });

// Export the Express app instance (useful for testing or external usage)
module.exports = app;
