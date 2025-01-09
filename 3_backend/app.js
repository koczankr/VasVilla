const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // A JSON típusú kérések kezeléséhez

const ingatlanok = require('./ingatlanok.json');

const kategoriak = {
    1: "Ház",
    2: "Lakás",
    3: "Építési telek",
    4: "Garázs",
    5: "Mezőgazdasági terület",
    6: "Ipari ingatlan"
  };
  
  app.get('/api/ingatlan', (req, res) => {
    const ingatlanokKategoriaval = ingatlanok.map(ingatlan => ({
      ...ingatlan,
      kategoria: kategoriak[ingatlan.kategoria]
    }));
    res.json(ingatlanokKategoriaval);
  });

  app.post('/api/ingatlan', (req, res) => {
    const { kategoria, leiras, ar, tehermentes } = req.body;
    if (!kategoria || !leiras || ar === undefined || tehermentes === undefined) {
      return res.status(400).send("Hiányos adatok.");
    }
  
    const ujId = ingatlanok[ingatlanok.length - 1]._id + 1;
    const ujIngatlan = { _id: ujId, kategoria, leiras, ar, tehermentes };
    ingatlanok.push(ujIngatlan);
  
    res.status(201).json({ Id: ujId });
  });

  app.delete('/api/ingatlan/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = ingatlanok.findIndex(ingatlan => ingatlan._id === id);
    if (index === -1) {
      return res.status(404).send("Az ingatlan nem létezik.");
    }
  
    ingatlanok.splice(index, 1);
    res.status(204).send();
  });
  
app.listen(port, () => {
  console.log(`Az alkalmazás fut: http://localhost:${port}`);
});
