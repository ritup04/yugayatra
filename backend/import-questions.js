// import-questions.js
// Script to import questions from questions/*.json into MongoDB

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Question from './models/Question.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yugayatra';
const QUESTIONS_DIR = path.join(process.cwd(), 'questions');

async function importQuestions() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const files = fs.readdirSync(QUESTIONS_DIR).filter(f => f.endsWith('.json'));
    let totalImported = 0;

    for (const file of files) {
      const filePath = path.join(QUESTIONS_DIR, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      if (!Array.isArray(data)) {
        console.warn(`File ${file} does not contain an array. Skipping.`);
        continue;
      }
      // Optionally, add a category field if not present
      const category = file.replace('.json', '').replace('_', ' ');
      const questions = data.map(q => ({
        ...q,
        category: q.category || category
      }));
      const result = await Question.insertMany(questions, { ordered: false }).catch(e => {
        if (e.writeErrors) {
          console.warn(`${e.writeErrors.length} duplicate or invalid entries in ${file}`);
          return { insertedCount: e.result?.nInserted || 0 };
        } else {
          throw e;
        }
      });
      const count = result.insertedCount || (result.length ? result.length : 0);
      totalImported += count;
      console.log(`Imported ${count} questions from ${file}`);
    }
    console.log(`\nImport complete. Total questions imported: ${totalImported}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error importing questions:', err);
    process.exit(1);
  }
}

importQuestions(); 