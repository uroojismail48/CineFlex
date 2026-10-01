#  CineFlex

A full-featured movie & TV discovery web app built with **React**, **Redux Toolkit**, and the **TMDB API** — browse trending movies, explore genres and countries, discover series, bookmark favorites, and dive into detailed movie/show pages, all wrapped in a smooth, animated UI.

> *Lights. Camera. Discover.*

🔗 **Live Demo:** cine-flex-iota.vercel.app
📂 **Repo:** github.com/uroojismail48/cineflex

---

##  Features

### Discovery
- **Hero Carousel** — Auto-playing showcase of trending movies with backdrop images, overview, popularity, and release info
- **New / Upcoming Movies** — Search, genre filtering, and pagination powered by RTK Query
- **Series** — Browse popular TV series with search, genre filtering, and pagination
- **Explore (By Genre / By Country / 18+)** — Tabbed browsing across 15 genres, 8 countries, and mature content
- **Genre Detail Page** — Click a genre to see both movies and series for it on one page, matched across movie and TV genre lists
- **Genre Hover Preview** — Hover over a genre to preview related movies in a floating panel (cached per genre)
- **Curated Collections** — Dedicated sections for Marvel (MCU) and Harry Potter franchises

### Detail Pages
- **Movie & Series Detail Pages** — Full backdrop hero, cast list, director info, genres, ratings, and trailer link
- **Similar Titles** — Recommendations pulled from the same API call (`append_to_response`)
- **Expandable Description** — "View More" toggle for long overviews (line-clamp truncation)
- **View More on Recommendations** — Expands beyond the first 7 similar titles on demand

### User Features
- **Authentication** — Sign in / sign up via Clerk
- **Bookmarks / Wishlist** — Centralized bookmark state via Redux Toolkit, persisted to `localStorage`, reusable across every page through a single `Bookedmarked` component
- **Watch Trailer** — Fetches and opens the official YouTube trailer for a title
- **Coming Soon / Released Badges** — Dynamic release-date comparison to flag upcoming titles

### Engineering
- **Redux Toolkit + RTK Query** — Centralized state for bookmarks and API data fetching with built-in loading/error states and caching
- **Debounced Search** — 500ms debounce to cut down redundant API calls while typing
- **Skeleton Loading** — `react-loading-skeleton` placeholders instead of blank screens during fetches
- **React Router** — Multi-page routing with dynamic routes (`/movie/:movieId`, `/series/:seriesId`, `/genre/:genreName`) and a custom 404 page
- **Continuous Scrolling Carousels** — Smooth, infinite-loop marquees built with Swiper.js and custom CSS animations
- **Responsive Navigation** — Mobile-friendly collapsible navbar

---

##  Tech Stack

| Category | Tech |
|---|---|
| Frontend | React |
| State Management | Redux Toolkit, RTK Query |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| Authentication | Clerk |
| Carousels | Swiper.js (React) |
| Loading UI | react-loading-skeleton |
| Icons | Remix Icon (`@remixicon/react`) |
| Data Source | [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) |
| Build Tool | Vite |

---


## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Main.jsx
│   ├── Cards.jsx
│   ├── Vd.jsx
│   ├── Genres.jsx
│   ├── Footer.jsx
│   ├── TrailerBtn.jsx
│   └── Bookedmarked.jsx
├── pages/
│   ├── NewMovies.jsx
│   ├── AllGenres.jsx
│   ├── GenreDetail.jsx
│   ├── Series.jsx
│   ├── MovieDetail.jsx
│   ├── SeriesDetails.jsx
│   ├── Wishlist.jsx
│   └── NotFound.jsx
├── redux/
│   ├── store.js
│   ├── BookmarkSlice.js
│   └── FetchMovie.js
├── assets/
└── App.jsx
```

---

##  API Reference

CineFlex pulls data from several TMDB endpoints, including:

- `/movie/popular`, `/movie/upcoming` — trending and upcoming movies
- `/discover/movie`, `/discover/tv` — filtered by genre, company, or country
- `/search/movie`, `/search/tv` — search by title
- `/genre/movie/list`, `/genre/tv/list` — genre lists
- `/collection/{id}` — movie franchises (e.g. MCU, Harry Potter)
- `/tv/popular` — TV series discovery
- `/movie/{id}`, `/tv/{id}` (with `append_to_response=videos,credits,similar`) — full detail pages in a single call

---

##  License

This project is for educational/personal use. Movie data and images are provided by [TMDB](https://www.themoviedb.org/), but this product is not endorsed or certified by TMDB.

---

##  Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the API
- [Swiper.js](https://swiperjs.com/) for carousel functionality
- [Remix Icon](https://remixicon.com/) for icons
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Clerk](https://clerk.com) for authentication

---

## 👤 Author

**Urooj Ismail**
Frontend Developer | [GitHub](https://github.com/uroojismail48) | [Portfolio](https://urooj-ismail-portfolio.vercel.app)
