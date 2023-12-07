const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let series = [
    { title: "Breaking Bad", rating: 9.5, genre: "Dráma" },
    { title: "Stranger Things", rating: 8.7, genre: "Sci-fi, Horror, Thriller" },
    // ... (a többi sorozat adatai)
];

// Logolja ki a teljes sorozat tömböt a konzolra
function logSeries() {
    console.log("Teljes sorozat tömb:");
    console.log(series);
    console.log("------------------------------");
}

// CREATE: Új sorozat hozzáadása
app.post('/api/series', (req, res) => {
    const newSeries = req.body;
    series.push(newSeries);
    logSeries();
    res.json(newSeries);
});

// READ: Az összes sorozat lekérdezése
app.get('/api/series', (req, res) => {
    logSeries();
    res.json(series);
});

// READ: Egy adott sorozat lekérdezése azonosító alapján
app.get('/api/series/:id', (req, res) => {
    const seriesId = parseInt(req.params.id);
    const selectedSeries = series[seriesId];
    if (selectedSeries) {
        res.json(selectedSeries);
    } else {
        res.status(404).json({ error: "Sorozat nem található" });
    }
});

// UPDATE: Egy adott sorozat frissítése azonosító alapján
app.put('/api/series/:id', (req, res) => {
    const seriesId = parseInt(req.params.id);
    const updatedSeries = req.body;
    series[seriesId] = updatedSeries;
    logSeries();
    res.json(updatedSeries);
});

// DELETE: Egy adott sorozat törlése azonosító alapján
app.delete('/api/series/:id', (req, res) => {
    const seriesId = parseInt(req.params.id);
    const deletedSeries = series.splice(seriesId, 1);
    logSeries();
    res.json(deletedSeries[0]);
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
