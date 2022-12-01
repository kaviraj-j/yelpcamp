const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb+srv://kaviraj-j:UdGNHdhvfYUBWx7n@cluster0.isyqon2.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    console.log('Deleted');
    for (let i = 0; i < 15; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomImage1 = Math.floor(Math.random() * 3);
        const randomImage2 = Math.floor(Math.random() * 3);
        const images = [
            {
              url: 'https://res.cloudinary.com/dj9gpeweh/image/upload/v1668265201/YelpCamp/m16bqyvanng50bonulxp.jpg',
              filename: 'YelpCamp/m16bqyvanng50bonulxp'
            },
            {
              url: 'https://res.cloudinary.com/dj9gpeweh/image/upload/v1668265208/YelpCamp/w8eabfajnhbscvrppvym.jpg',
              filename: 'YelpCamp/w8eabfajnhbscvrppvym'
            },
            {
              url: 'https://res.cloudinary.com/dj9gpeweh/image/upload/v1668265208/YelpCamp/c2txpnb5w6m671v3xce5.jpg',
              filename: 'YelpCamp/c2txpnb5w6m671v3xce5'
            }
          ]
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63735114ed56550016b84c78',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    url: images[randomImage1].url,
                    filename: images[randomImage1].filename
                },
                {
                    url: images[randomImage2].url,
                    filename: images[randomImage2].filename
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})