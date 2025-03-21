# Latin American Game Store Web Scraper

A comprehensive web scraping tool designed to extract game information for the IP Protection & Security Department from over 60 Latin American digital game store websites. This project demonstrates advanced web scraping techniques using Node.js, with data extraction from multiple sources and export to Excel format.

## Features

- **Multi-site Scraping**: Extracts data from 60+ Latin American digital game store websites
- **Category Filtering**: Specialized scraping for different game categories (Nintendo, PC, Xbox, etc.)
- **Pagination Handling**: Automatically navigates through multiple pages of results
- **Data Export**: Exports all scraped data to a structured Excel workbook
- **Error Handling**: Robust error handling to ensure continuous operation

## Technologies Used

- **Node.js**: JavaScript runtime
- **Axios**: HTTP client for making requests
- **Cheerio**: Fast and flexible implementation of jQuery for server-side DOM parsing
- **ExcelJS**: Excel workbook generation library

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/latam-game-store-scraper.git
   cd latam-game-store-scraper
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

1. To run the full scraper (all websites):
   ```javascript
   // Uncomment the following line in app.js
   // start();
   ```

2. To test a specific website:
   ```javascript
   // Uncomment the following line in app.js
   // test();
   ```

3. Run the script:
   ```
   node app.js
   ```

4. The results will be exported to `webscrape.xlsx` in the project root directory.

## Project Structure

- **Scrape Class**: Main class for handling website scraping operations
- **Specialized Methods**:
  - `getSubsites()`: Extracts all subsites from a main website
  - `getTodoSubsites()`: Extracts subsites containing "TODO" in their title
  - `getNintendoSubsites()`: Extracts Nintendo Switch related subsites
  - `getPCSubsites()`: Extracts PC game related subsites
  - `getXboxSubsites()`: Extracts Xbox related subsites
  - `getPages()`: Handles pagination for a given site
- **Helper Functions**:
  - `getNextPage()`: Extracts the URL for the next page
  - `getGameTitles()`: Extracts game titles from a page
  - `getGameLinks()`: Extracts game links from a page
  - `createWB()`: Creates an Excel workbook with the scraped data

## Websites Covered

The scraper covers 60+ websites including:
- bastergames.com
- edigitalmail.com
- fivergamerchile.com
- gamecode.pe
- gameonperu.com
- gamestorechile.com
- And many more across Latin America