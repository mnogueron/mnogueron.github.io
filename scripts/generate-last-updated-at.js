import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderOath = path.resolve(__dirname, '../src/config');
const staticDataPath = path.resolve(folderOath, 'buildData.json');

export const generateLastUpdatedAt = () => {
  const data = {
    lastUpdatedAt: new Date().getTime(),
  };

  if (!fs.existsSync(folderOath)) {
    fs.mkdirSync(folderOath);
  }

  fs.writeFileSync(staticDataPath, JSON.stringify(data, null, 2));
  console.log('Generate static build data');
};
