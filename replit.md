# Truist Bank Website

## Overview
This is a static HTML website for Truist Bank, imported from GitHub. The site showcases Truist Bank's checking, savings, lending, and financial services.

## Project Structure
- `index.html` - Main homepage (7586 lines of HTML content)
- `css/` - Stylesheets for the website
  - `homepage.css` - Homepage-specific styles
  - `component.css` - Component styles (tabs, cards, hero banners)
  - `global.css` - Global styles
  - `fonts.css` - Font definitions
  - `tables.css` - Table styles
  - `slick.css` - Carousel library styles
  - `article.css` - Article template styles
  - `custom.css` - Custom overrides and imports
- `js/` - JavaScript files for client-side functionality
  - Marketing and analytics scripts
  - OneTrust cookie consent
  - Motion Point language support
  - Adobe Launch tracking
- `fonts/` - Truist brand fonts (TTF, WOFF, WOFF2 formats)
- `images/` - Brand assets, icons, and content images

## Technology Stack
- **Frontend**: Static HTML/CSS/JavaScript
- **Server**: Express.js (Node.js) for serving static files
- **Port**: 5000 (configured for Replit webview)

## Setup Notes
- No build system required - pure static content
- Cache-Control headers disabled for development to ensure changes are visible
- Server binds to 0.0.0.0:5000 for Replit proxy compatibility

## Recent Changes
- 2025-11-01: Initial project setup for Replit environment
  - Created Express server to serve static files
  - Configured workflow to run on port 5000
  - Added .gitignore for Node.js
