import app from './app';
import config from './app/config';

import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}

main();

app.listen(config.port, () => {
  console.log(`Project app listening on port ${config.port}`);
});
