const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const series = [
    { title: "Breaking Bad", rating: 9.5, genre: "Dráma" },
    { title: "Stranger Things", rating: 8.7, genre: "Sci-fi, Horror, Thriller" },
    { title: "The Crown", rating: 8.6, genre: "Történelmi, Dráma" },
    { title: "Black Mirror", rating: 8.8, genre: "Sci-fi, Antológia" },
    { title: "The Mandalorian", rating: 8.8, genre: "Sci-fi, Akció, Kaland" },
    { title: "Fleabag", rating: 8.7, genre: "Vígjáték, Dráma" },
    { title: "Mindhunter", rating: 8.6, genre: "Bűnügyi, Dráma, Thriller" },
    { title: "Chernobyl", rating: 9.4, genre: "Dokumentum, Dráma, Történelmi" },
    { title: "Game of Thrones", rating: 9.3, genre: "Fantasy, Dráma, Kaland" },
    { title: "The Witcher", rating: 8.2, genre: "Akció, Kaland, Fantasy" },
    { title: "Narcos", rating: 8.8, genre: "Bűnügyi, Dráma, Thriller" },
    { title: "The Office", rating: 8.9, genre: "Vígjáték" },
    { title: "Sherlock", rating: 9.1, genre: "Bűnügyi, Dráma, Misztikus" },
    { title: "The Simpsons", rating: 8.7, genre: "Animáció, Vígjáték" },
    { title: "Friends", rating: 8.9, genre: "Vígjáték, Romantikus" },
    { title: "Westworld", rating: 8.6, genre: "Dráma, Sci-fi, Western" },
    { title: "Stranger Things", rating: 8.7, genre: "Sci-fi, Horror, Thriller" },
    { title: "Money Heist", rating: 8.3, genre: "Akció, Bűnügyi, Dráma" },
    { title: "The Big Bang Theory", rating: 8.1, genre: "Vígjáték" },
    { title: "Ozark", rating: 8.4, genre: "Bűnügyi, Dráma, Thriller" },
    { title: "The Umbrella Academy", rating: 8.0, genre: "Akció, Dráma, Fantasy" },
    { title: "The Sopranos", rating: 9.2, genre: "Bűnügyi, Dráma" },
    { title: "Fargo", rating: 8.9, genre: "Bűnügyi, Dráma, Thriller" },
    { title: "Rick and Morty", rating: 9.2, genre: "Animáció, Kaland, Sci-fi" },
    { title: "The Haunting of Hill House", rating: 8.6, genre: "Dráma, Horror, Misztikus" },
    { title: "Daredevil", rating: 8.6, genre: "Akció, Bűnügyi, Dráma" },
    { title: "Black Panther", rating: 9.0, genre: "Akció, Kaland, Sci-fi" },
    { title: "The Boys", rating: 8.7, genre: "Akció, Dráma, Sci-fi" },
    { title: "Breaking Bad", rating: 9.5, genre: "Dráma" },
    { title: "BoJack Horseman", rating: 8.7, genre: "Animáció, Dráma, Vígjáték" },
    { title: "The Witcher", rating: 8.2, genre: "Akció, Kaland, Fantasy" }
];

app.get('/api/series', (req, res) => {
    res.json(series);
});

app.get('/api/series/:id', (req, res) => {
    const seriesId = parseInt(req.params.id);
    if (series[seriesId]) {
        res.json(series[seriesId]);
    } else {
        res.json({ error: "Sorozat nem található" });
    }
});

app.get('/api/categories', (req, res) => {
    const allGenres = series.reduce((genres, item) => genres.concat(item.genre.split(', ')), []);
    const uniqueGenres = Array.from(new Set(allGenres));
    res.json(uniqueGenres);
});

app.get('/api/category/:category', (req, res) => {
    const selectedCategory = req.params.category;
    const filteredSeries = series.filter(item => item.genre.includes(selectedCategory));
    res.json(filteredSeries);
});

app.get('/api/top3', (req, res) => {
    const sortedSeries = series.slice().sort((a, b) => b.rating - a.rating);
    const top3Series = sortedSeries.slice(0, 3);
    res.json(top3Series);
});

app.get('*', (req, res) => {
    res.json("Hello Sorozatfan! Érvényes URL-t használj!");
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
