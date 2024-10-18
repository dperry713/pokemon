# Pokémon API Integration Project

## Project Overview

This project is a web application that integrates with the [PokeAPI](https://pokeapi.co/), providing users with an immersive experience into the world of Pokémon. The application allows users to search for Pokémon, view detailed information, and explore Pokémon by types.

The project was built using **HTML**, **CSS**, **Bootstrap**, and **JavaScript**, with dynamic content fetched from the **PokeAPI**.

## Features

- **Homepage**: A landing page with links to search Pokémon and explore Pokémon types.
- **Pokémon Search**: Users can search for any Pokémon by its name or ID. The result includes basic information like the Pokémon’s image, type, abilities, height, and weight.
- **Pokémon Details**: A detailed page that displays comprehensive information about a specific Pokémon, including base stats.
- **Pokémon Types** (Bonus Feature): A categorized page where users can explore Pokémon based on their types, such as Grass, Fire, Water, etc.

## Project Structure

```plaintext
pokeapi-integration/
│
├── index.html               # Homepage
├── search.html              # Pokémon search page
├── details.html             # Pokémon details page
├── types.html               # Pokémon types page
│
├── css/
│   ├── styles.css           # Custom CSS for the entire site
│
├── js/
│   ├── search.js            # JavaScript to handle search logic
│   ├── details.js           # JavaScript for fetching and displaying Pokémon details
│   ├── types.js             # JavaScript for handling Pokémon type categorization
│
├── img/                     # Folder for images (Pokémon icons, etc.)
│
├── README.md                # Project documentation
└── assets/
    └── bootstrap/           # Bootstrap files (or use CDN in HTML)
git clone https://github.com/yourusername/pokeapi-integration.git
cd pokeapi-integration
open index.html
