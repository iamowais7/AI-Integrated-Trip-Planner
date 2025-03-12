import axios from "axios";

const BASE_URL = "https://api.unsplash.com/search/photos";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY, // Store API Key in .env
    per_page: 1, // Get only one image
    orientation: "landscape",
  },
};

export const GetPlaceImage = (query) =>
  axios.get(BASE_URL, { ...config, params: { ...config.params, query } });