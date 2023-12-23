const express = require('express');
const { listContacts, getContactById, createContact, updateContact, removeContact } = require('../../controllers/contacts.controller');
const { checkContactId } = require('../../middlewares/contacts.middlewares');

const router = express.Router();

router.get('/', listContacts);
router.get('/:contactId', checkContactId ,getContactById);
router.post('/', createContact);
router.delete('/:contactId',checkContactId, removeContact);
router.put('/:contactId',checkContactId, updateContact);

module.exports = router;
