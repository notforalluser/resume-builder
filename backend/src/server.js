import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDB } from './utils/db.js';

dotenv.config();

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => console.log(`Resume SaaS API running on ${port}`));
});
