const fs = require('fs');
const path = require('path');
require('dotenv').config();

const targetPath = path.join(__dirname, '../src/environments/environment.prod.ts');

const envConfigFile = `export const environment = {
  production: true,
  strapiUrl: '${process.env.STRAPI_URL || 'https://api.bastienbories.androcode.fr'}',
  strapiApiToken: '${process.env.STRAPI_TOKEN || ''}',
  emailJS: {
    serviceID: '${process.env.SERVICE_ID || ''}',
    templateID: '${process.env.TEMPLATE_ID || ''}',
    publicKey: '${process.env.PUBLIC_KEY || ''}'
  }
};`;

fs.writeFileSync(targetPath, envConfigFile);
console.log(`Environment file generated at ${targetPath}`);
