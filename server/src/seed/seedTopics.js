import { connectDb } from '../config/db.js';
import env from '../config/env.js';
import Topic from '../models/Topic.js';

const seedData = [
  {
    title: 'Reducing Household Carbon Footprint',
    category: 'Climate',
    content: 'Use public transport, reduce energy consumption, and switch to renewables where possible.'
  },
  {
    title: 'Protecting Pollinators',
    category: 'Wildlife',
    content: 'Plant native flowers, avoid pesticides, and preserve natural habitats for bees and butterflies.'
  },
  {
    title: 'Plastic Waste Management',
    category: 'Pollution',
    content: 'Reduce single-use plastics, segregate waste, and support recycling initiatives.'
  }
];

const seed = async () => {
  await connectDb(env.mongodbUri);
  await Topic.deleteMany({});
  await Topic.insertMany(seedData);
  // eslint-disable-next-line no-console
  console.log('Topics seeded successfully');
  process.exit(0);
};

seed();
