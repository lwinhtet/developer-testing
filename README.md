# Real Estate Property Search Feature

## Overview

This project is a real estate property search feature built using Next.js, MySQL, and GraphQL. The application allows users to filter properties based on sale or rent, price range, number of bedrooms, and area. It is designed to handle a large number of properties (10,000, 100,000, and 1,000,000) to test query performance. The listing page displays the project name, short title, price, bedroom count, area, short description, and an image gallery that works with both mouse interactions on PCs and swipe gestures on mobile devices. The goal is to achieve a score of 95 or higher on Google Insight.

## Features

- **Static Site Generation (SSG) with revalidation**: Ensures a fast initial load for users by pre-rendering pages at build time and revalidating them as needed.
- **Divided Data Load**: Separates data for sale and rent properties to optimize performance.
- **Search Functionality**: Users can filter properties based on:
  - Sale or Rent
  - Price Range
  - Number of Bedrooms
  - Area
- **Query String Parsing**: Allows for dynamic filtering based on the URL query parameters.
- **Image Gallery**: Supports mouse interaction on PCs and swipe gestures on mobile devices.

## Setup

### Prerequisites

- Node.js
- Docker
- Docker Compose
- MySQL

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/lwinhtet/developer-testing.git
   cd developer-testing
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=mysql://root:password@mysql:3306/real_estate
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/api/graphql
   ```

4. **Run the application:**

   ```sh
   docker-compose up --build
   ```

5. **Create Tables:**

   ```sh
   docker-compose exec nextjs npx prisma migrate dev
   ```

6. **Generate fake data:**
   Create a script to generate fake data with count(10000) and run it:
   ```sh
   docker-compose exec nextjs npx prisma db seed -- --count 10000
   ```
