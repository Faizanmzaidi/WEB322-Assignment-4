# Name: Syed Faizan Mehdi Zaidi
# Student Number: 136151230
# Email: Sfmzaidi@myseneca.ca

A Node.js API that serves articles from a JSON file and allows image uploads via Cloudinary. Built with Express, ready for local development and deployment.

# Prerequisites

Node.js and npm installed.

# Installation

Install dependencies:

npm install

# Running the Server

Start the server with:

node index.js

Access the app at http://localhost:3838.

# Cloudinary

To upload images, configure the .env file with your Cloudinary credentials:


CLOUD_NAME=dexmgropy
API_KEY=269573191974962
API_SECRET=Ef-1jBn7kdls2-dfzmjPPFiCyhU

# Form Submission

Submit articles with titles, content, and images. Images are hosted on Cloudinary.
Articles will appear in the "Articles" section after submission.

# Notes

Image upload: Must upload to Cloudinary but not save the image URL in the articles.json file.
Ensure JSON field consistency: Check for case-sensitivity issues in your fields (Id, title, etc.).