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
  const animes = result.data; // ⚡ array de animes
  res.render("index", { animes });
});

// Página de anime → lista de capítulos
app.get("/anime/:id", async (req, res) => {
  const { id } = req.params;
  const response = await fetch(`https://animeflv.ahmedrangel.com/api/anime/${id}`);
  const result = await response.json();
  const anime = result.data;
  res.render("anime", { anime });
});

// Página de episodio → fuentes
app.get("/anime/:id/episode/:ep", async (req, res) => {
  const { id, ep } = req.params;
  const response = await fetch(`https://animeflv.ahmedrangel.com/api/anime/${id}/${ep}`);
  const result = await response.json();
  const episode = result.data;
  res.render("episode", { episode });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
