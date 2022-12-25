import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

  cors: {
    allowed_headers: ['Content-Type', 'Authorization'],
    exposed_headers: ['Content-Disposition'],
    max_age: 600,
  },
});


app.get("/", (req, res, next) => {
  res.send("<h1>Welcome To Portfolio Server</h1>");
});

app.listen(process.env.PORT, () =>
  console.log(
    `Server is working on PORT: ${process.env.PORT}, in ${process.env.NODE_ENV} MODE`
  )
);
