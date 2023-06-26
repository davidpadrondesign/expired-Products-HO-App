import mongoose from "mongoose";

const connectDatabase = () => {
mongoose.connect(process.env.MONGO_DB_ATLAS_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  })
    .then(() => console.log('MongoDB Connected'.yellow))
    .catch((error) => {
      console.error(`Error: ${error.message}`.red);
      process.exit(1);
    });
};


export default connectDatabase;