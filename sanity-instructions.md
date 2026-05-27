# Happy Feet - Sanity CMS Setup Instructions

To fully connect your website to Sanity CMS, follow these steps to initialize your Sanity project, set up the content models (schemas), and link it to your frontend.

---

## Step 1: Initialize a New Sanity Project

Since you don't have a Sanity project or dataset yet, you can create one easily using the Sanity CLI.

1. Open your terminal and run the following command (preferably outside your frontend repository or in a parallel directory, e.g., `OneDrive/Desktop/happyfeet/happyfeet-cms`):
   ```bash
   npm create sanity@latest
   ```

2. Follow the interactive prompts:
   * **Login/Create Account**: Choose your preferred method (Google, GitHub, email).
   * **Create a new project**: Choose **Yes** to create a new project.
   * **Project name**: Enter `Happy Feet CMS` or similar.
   * **Dataset configuration**: Press enter to accept the default `production` dataset.
   * **Project path**: You can keep the default or specify a folder like `happyfeet-studio` or `cms`.
   * **Select a project template**: Choose **Clean project** or **Blog** (a clean project is recommended as we already have schemas ready).
   * **Select a package manager**: Choose `npm` or `yarn`.

---

## Step 2: Get Your Project ID and Dataset

Once Sanity finishes creating your project, it will display your project configurations in the console or inside the newly created project folder's config file (e.g. `sanity.config.js` or `sanity.json`).

Alternatively, you can find them by logging into your [Sanity Manage Dashboard](https://www.sanity.io/manage):
1. Locate your **Happy Feet CMS** project.
2. Under the project name, copy the **Project ID** (a short alphanumeric string like `a1b2c3d4`).
3. Note your **Dataset** name (usually `production`).

---

## Step 3: Configure Your Environment Variables

Open your frontend project (`Happyfeet`) and configure the `.env` (and `.env.local` for local development) file with your newly obtained credentials:

```env
# Sanity CMS Configuration
VITE_SANITY_PROJECT_ID=your_actual_project_id_here
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-03-11
```

Once these variables are set, the frontend will automatically switch from using the local static fallback files to fetching dynamic content live from your Sanity API!

---

## Step 4: Add the Schema Files to Your Sanity Studio

We have generated the required schema templates for you in this repository under:
`[sanity-schemas/](file:///c:/Users/hirra/OneDrive/Desktop/happyfeet/Happyfeet/sanity-schemas)`

To use them in your new Sanity Studio:
1. Copy the 3 schema files:
   * `category.js`
   * `pastEvent.js`
   * `publicMediaItem.js`
2. Paste them into your Sanity Studio's schemas folder (typically located at `<your-studio-folder>/schemas/` or `<your-studio-folder>/schemaTypes/`).
3. Import and add them to your schema configuration index file (usually `schemaTypes/index.js` or `schemas/schema.js`). For example:

   ```javascript
   // schemaTypes/index.js
   import category from './category'
   import pastEvent from './pastEvent'
   import publicMediaItem from './publicMediaItem'

   export const schemaTypes = [category, pastEvent, publicMediaItem]
   ```

4. Deploy your Sanity Studio or start it locally to begin adding/editing your categories, events, and media files:
   ```bash
   # Run locally:
   npm run dev

   # Deploy live:
   npm run deploy
   ```

---

## Step 5: CORS Origins Setup

To allow your website to fetch data from Sanity, you must allow your website's URL as a CORS origin in your Sanity Dashboard:
1. Go to the [Sanity Manage Dashboard](https://www.sanity.io/manage).
2. Select your project -> **API** tab.
3. Scroll to **CORS Origins** -> click **Add CORS Origin**.
4. Enter `http://localhost:5173` (for local development) and check the box **Allow credentials**.
5. When you deploy your production website (e.g., Vercel, Netlify), add your production domain here as well.
