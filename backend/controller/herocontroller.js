const mongoose = require('mongoose');
const dotenv = require("dotenv");
const express = require("express");


dotenv.config();

mongoose.connect(process.env.MONGODB_URL);


const heroSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = (app) => {


    app.get('/heroes', async (req, res) => {
        try {
            const heroes = await Hero.find();

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(heroes);
        } catch (err) {
            console.error('Error retrieving heroes:', err);
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Failed to retrieve heroes' });
        }
    });


    app.get('/heroes/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const hero = await Hero.findOne({ id });

            if (!hero) {
                res.setHeader('Content-Type', 'application/json');
                res.status(404).json({ error: 'Hero not found' });
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(hero);
            }
        } catch (err) {
            console.error('Error retrieving hero:', err);
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Failed to retrieve hero' });
        }
    });


    app.put('/change/:id', express.json(), async (req, res) => {
        try {
            const { id } = req.params;
            const { newName } = req.body;
            console.log(newName);
            if (!newName) {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).json({ error: 'New name is required' });
            } else {
                let heroToUpdate = await Hero.findOne({ id });

                if (!heroToUpdate) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(404).json({ error: 'Hero not found' });
                } else {
                    heroToUpdate.name = newName;

                    await heroToUpdate.save();

                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json({ message: 'Hero name updated' });
                }
            }
        } catch (err) {
            console.error('Error updating hero:', err);
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ error: 'Failed to update hero name' });
        }
    });
};
