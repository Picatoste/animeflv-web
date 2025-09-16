import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home → lista de animes en emisión
app.get("/", async (req, res) => {
  const response = await fetch("https://animeflv.ahmedrangel.com/api/list/animes-on-air");
  const result = await response.json();
  const animes = result.data; // array de animes
  res.render("index", { animes });
});

// Página de anime → lista de capítulos
app.get("/anime/:slug", async (req, res) => {
  const { slug } = req.params; // esto viene de la URL
  const response = await fetch(`https://animeflv.ahmedrangel.com/api/anime/${slug}`);
  const result = await response.json();
  const anime = result.data;
  
  res.render("anime", { anime, slug }); // ✅ pasamos slug explícitamente
});

// Página de episodio → fuentes
app.get("/anime/:slug/episode/:number", async (req, res) => {
  const { slug, number } = req.params;
  const episodeSlug = `${slug}-${number}`; // concatena slug + número
  const response = await fetch(`https://animeflv.ahmedrangel.com/api/anime/episode/${episodeSlug}`);
  const result = await response.json();
  const episode = result.data;
  res.render("episode", { episode });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
