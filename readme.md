
# News Website / Blog

A simple Node.js API that reads articles from a JSON file and returns only the published articles. Built with Express, this site is ready for local development and can be easily deployed.

## Prerequisites

Make sure you have **Node.js** and **npm** installed on your machine.

## Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run:

```bash
node index.js
```

### `index.js` Setup

The `index.js` file reads from the `articles.json` and `categories.json` file located in the `data` folder and serves API routes using Express.

### Required Packages

Install these packages if not already done via `npm install`:
```bash
npm install express
```

## Running the Server

1. After setting up the project, run the following command to start the server:
   ```bash
   node index.js
   ```

2. Open your browser to navigate to `http://localhost:3838` 


## Cloudinary

Cloudinary to host my images offsite of the web server. For reference, here are the current API keys;

Cloud Name: dexmgropy
API Key: 269573191974962
API secret: Ef-1jBn7kdls2-dfzmjPPFiCyhU
API environment: CLOUDINARY_URL=cloudinary://269573191974962:Ef-1jBn7kdls2-dfzmjPPFiCyhU@dexmgropy


@everyone , I know a lot of you like to do the assignments at the last minute, but I want to let you know it's unlikely I'm not going to be around after 6pm tonight all the way through til Monday.

Here are common questions so far that I've had;

**#1)** The assignment gives you code **EXAMPLES**, but they might not work with your code.

__Example__ if you exported your modules using module.exports = { .... }, then the functions with module.exports.functionName will not work. You will have to modify these to work with your own code.

I also found some of the code snippets are might not compile exactly as shown, you will have to debug / fix.

**#2)** Yes, you must have a form, and yes it must work / upload an image to Cloudinary. It does NOT have to save to your JSON FILE, but it most definitely must add to your ARTICLES array. 

__Example__ If I "add a new post with a new image", and then click on your "articles" tab, all of your articles WITHOUT images should show, and also the new article I added should show as well.

**#3** Depending how you setup your JSON files, the Search functions may or may not work directly. 

**Example** My JSON files had their "Id" with a capital "I" and lower case "d", but the search function looks for both lowercase letters. This means your search results won't return anything. Make sure you check your CASE as well as your NAMES when using these functions. They will be checked.

