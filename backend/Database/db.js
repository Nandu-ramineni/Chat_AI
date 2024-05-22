import mongoose from 'mongoose'
export const Connection = async (URI) => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.log(error);
    }
}