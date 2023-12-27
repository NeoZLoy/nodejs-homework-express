const express = require('express');
const { listContacts, getContactById, createContact, updateContact, removeContact } = require('../../controllers/contacts.controller');
const { checkContactId } = require('../../middlewares/contacts.middlewares');
const { checkToken } = require('../../middlewares/user.middlewares');

const router = express.Router();

router.get('/',checkToken, listContacts);
router.get('/:contactId',checkToken, checkContactId ,getContactById);
router.post('/', checkToken, createContact);
router.delete('/:contactId', checkToken, checkContactId, removeContact);
router.put('/:contactId', checkToken, checkContactId, updateContact);

module.exports = router;
