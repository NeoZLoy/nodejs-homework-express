const fs = require('node:fs/promises');
const path = require('node:path');

const contactsPath = path.join(__dirname, '../db/contacts.json')


const getAllContacts = async() => {
    const contactsData = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsData)
    return contacts
}

module.exports = {getAllContacts}