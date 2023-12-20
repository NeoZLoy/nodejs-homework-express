const fs = require('node:fs/promises');
const path = require('node:path');
const uuid = require('uuid')

const {getAllContacts} = require('../helpers/getContacts');
const { createContactValidator, updateContactValidator } = require('../helpers/contactValidator');

const contactsPath = path.join(__dirname, '../db/contacts.json')
const listContacts =  async (req, res, next) => {
try {
    const contacts = await getAllContacts()
    console.log(res.status)
    res.status(200).json({
        msg: 'Success',
        contacts: contacts,
    })
} catch (error) {
    next(error)
}
};

const getContactById = async (req, res, next) => {
    try {
        const contacts = await getAllContacts()
        const { contactId } = req.params
        const searchedContact = contacts.find(contact => contact.id === contactId)

        res.status(200).json({
            msg: 'Success',
            contact: searchedContact,
        })
    } catch (error) {
        next(error)
    }
}

const createContact = async (req, res, next) => {
    try { 
        const {value, error} = createContactValidator(req.body)

        if(error){
            res.status(400).json({
                msg: 'missing required name field'
            })
        }

        const {name, email, phone} = value

        const newContact = {
            id: uuid.v4(),
            name,
            phone,
            email,
        }
        const contacts = await getAllContacts()

        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        res.status(201).json({
            msg: 'Contact created',
            contact: newContact,
        })

    } catch (error) {
        next (error)
    }
}



// Update Contact

const updateContact = async (req, res, next) => {
 try {

    const {value, error} = updateContactValidator(req.body)

        if(error){
            res.status(400).json({
                msg: 'missing required name field'
            })
        }

    const contacts = await getAllContacts();
    const index = contacts.findIndex((item) => item.id === req.params.contactId);
    const contactToUpdate = contacts.find(contact => contact.id === req.params.contactId)

    if (index === -1) {
        return null;
      }

    contacts[index] = { ...contactToUpdate, ...value };

    fs.writeFile(contactsPath, JSON.stringify(contacts))

    res.status(201).json({
        msg: 'Contact updated',
        contact: contacts[index],
    })
 } catch (error) {
    next(error)
 }
}

// Remove Contact

const removeContact = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();
        const contactToRemove = contacts.find(contact => contact.id === req.params.contactId)
        const updatedContactList = contacts.filter(contact => contact.id !== contactToRemove.id)

        await fs.writeFile(contactsPath, JSON.stringify(updatedContactList))

        res.status(200).json({
            msg: 'Contact removed',
            contact: contactToRemove,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {contactsPath, listContacts, getContactById, createContact, updateContact, removeContact }