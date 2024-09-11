import express, { Request, Response } from "express";
import path from "path";

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));

app.get('/', async (request: Request, response: Response) => {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await res.json();
        response.render("index", { pokemons: data.results });
    } catch (error) {
        response.status(500).send("Erro ao buscar dados da API");
    }
});

app.get('/pokemon/:name', async (request: Request, response: Response) => {
    const pokemonName = request.params.name;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (res.ok) {
            const data = await res.json();
            response.render("pokemon", { pokemon: data });
        } else {
            response.status(404).send("Pokémon não encontrado");
        }
    } catch (error) {
        response.status(500).send("Erro ao buscar dados da API");
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
