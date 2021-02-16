require("dotenv").config();

const express = require("express");
const path = require('path');
const cors = require('cors');
const db = require("./db");

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(cors())
app.use(express.json())

    - app.get('/', function (req, res) {
        +app.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
    })

app.get('/api/places', async (req, res) => {
    try {
        const results = await db.query('select * from places left join (select place, count(*), trunc(avg(rating),1) as average_rating from reviews group by place) reviews on places.id = reviews.place')
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                places: results.rows
            }
        })
    } catch (err) {
        res.status(500);
    }
})

app.get('/api/places/:id', async (req, res) => {
    try {
        const place = await db.query('select * from places left join (select place, count(*), trunc(avg(rating),1) as average_rating from reviews group by place) reviews on places.id = reviews.place where id = $1', [req.params.id])
        const reviews = await db.query('select * from reviews where place = $1', [req.params.id])
        res.status(200).json({
            status: 'success',
            data: {
                place: place.rows[0],
                reviews: reviews.rows
            }
        })
    } catch (err) {
        res.status(500);
    }
})

app.post('/api/places', async (req, res) => {
    try {
        const results = await db.query('insert into places (name, location, price_level) values ($1, $2, $3) returning *', [req.body.name, req.body.location, req.body.price_level])
        res.status(201).json({
            status: 'success',
            data: {
                place: results.rows[0]
            }
        })
    } catch (err) {
        res.status(500);
    }
})

app.put('/api/places/:id', async (req, res) => {
    try {
        const results = await db.query('update places set name = $1, location = $2, price_level = $3 where id = $4 returning *', [req.body.name, req.body.location, req.body.price_level, req.params.id])
        res.status(200).json({
            status: 'success',
            data: {
                place: results.rows[0]
            }
        })
    } catch (err) {
        res.status(500);
    }
});

app.delete('/api/places/:id', async (req, res) => {
    try {
        const results = await db.query('delete from places where id = $1', [req.params.id])
        res.status(204).json({
            status: 'success',
        })
    } catch (err) {
        res.status(500);
    }
})

app.post('/api/places/:id/add-review', async (req, res) => {
    try {
        const results = await db.query('insert into reviews (place, name, rating, review) values ($1, $2, $3, $4) returning *', [req.params.id, req.body.name, req.body.rating, req.body.review])
        res.status(201).json({
            status: 'success',
            data: {
                review: results.rows[0]
            }
        })
    } catch (err) {
        res.status(500);
    }
})

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server is running and listening on port ${port}`);
})
