import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticDataPath = path.resolve(
  __dirname,
  '../src/constants',
  'buildData.json'
);

export const generateLastUpdatedAt = () => {
  const data = {
    lastUpdatedAt: new Date().getTime(),
  };
  fs.writeFileSync(staticDataPath, JSON.stringify(data, null, 2));
  console.log('Generate static build data');
};
