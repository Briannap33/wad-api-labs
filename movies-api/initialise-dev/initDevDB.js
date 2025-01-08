import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import movies from './movies';
import User from '../api/users/userModel';
import Movie from '../api/movies/movieModel';

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }
    await mongoose.connect(process.env.MONGO_DB);
    // Drop collections
    await User.collection.drop().catch(err => console.log(`Error dropping User collection: ${err.message}`));
    await Movie.collection.drop().catch(err => console.log(`Error dropping Movie collection: ${err.message}`));
    await User.create(users);
    await Movie.create(movies);
    console.log('Database initialised');
    console.log(`${users.length} users loaded`);
    console.log(`${movies.length} movies loaded`);
    await mongoose.disconnect();
}

main();
