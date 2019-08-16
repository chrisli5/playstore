const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./playstore');

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

app.get('/apps', (req, res) => {
    const { search = "", sort, genres } = req.query;
    let updatedList = apps;

    if(genres) {
        if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres.toLowerCase())) {
            return res
                .status(400)
                .send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');
        }
        updatedList = updatedList.filter(item => item.Genres
            .split(';')
            .map(i => i.toLowerCase())
            .includes(genres.toLowerCase()));
    }

    if(sort) {
        if(!['app', 'rating'].includes(sort.toLowerCase())) {
            return res
                .status(400)
                .send('Sort must be one of genre or rating');
        }
        updatedList = updatedList.sort((a, b) => {
            const formatted = capitalize(sort);
            return a[formatted] > b[formatted] ? 1 : a[formatted] < b[formatted] ? -1 : 0;
        })
    }

    res.status(200).json(updatedList);
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });
