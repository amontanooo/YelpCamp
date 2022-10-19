const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '635010e5e660d5b1233de84c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti eaque molestias et a. Doloribus repellat iure deserunt sunt hic explicabo suscipit adipisci vero, voluptates, dolores, modi quia voluptatibus quae aliquid.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dsk9ufpx5/image/upload/v1664836694/YelpCamp/dkmehwkqfwh3zroydnfc.jpg',
                    filename: 'YelpCamp/dkmehwkqfwh3zroydnfc',
                },
                {
                    url: 'https://res.cloudinary.com/dsk9ufpx5/image/upload/v1664836694/YelpCamp/jxdyaeeni7stvqowdm95.png',
                    filename: 'YelpCamp/jxdyaeeni7stvqowdm95',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
