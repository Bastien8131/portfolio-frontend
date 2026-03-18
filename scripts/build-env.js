const fs = require('fs');
const path = require('path');
require('dotenv').config();

const targetPath = path.join(__dirname, '../src/environments/environment.prod.ts');

// Vérification stricte : on refuse de builder sans les variables critiques
const requiredVars = ['STRAPI_URL', 'STRAPI_TOKEN'];
const missing = requiredVars.filter(v => !process.env[v]);
if (missing.length > 0) {
  console.error(`❌ Variables d'environnement manquantes : ${missing.join(', ')}`);
  process.exit(1);
}

const envConfigFile = `export const environment = {
  production: true,
  strapiUrl: '${process.env.STRAPI_URL}',
  strapiApiToken: '${process.env.STRAPI_TOKEN}',
  emailJS: {
    serviceID: '${process.env.SERVICE_ID || ''}',
    templateID: '${process.env.TEMPLATE_ID || ''}',
    publicKey: '${process.env.PUBLIC_KEY || ''}'
  }
};`;

fs.writeFileSync(targetPath, envConfigFile);
console.log('✅ Production environment file generated');
console.log('   strapiUrl:', process.env.STRAPI_URL);
