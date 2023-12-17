const fs = require('node:fs/promises');
const path = require('node:path');

const contactsPath = path.join(__dirname, '../db/contacts.json')


exports.writeContactsToDb = async (array) => {
    await fs.writeFile(contactsPath, JSON.stringify(array));
}