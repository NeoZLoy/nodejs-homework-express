const express = require('express');

const { listContacts, getContactById, createContact, updateContact, removeContact, updateFavorite } = require('../../controllers/contacts.controller');
const { checkContactId, checkOwner } = require('../../middlewares/contacts.middlewares');
const { checkToken } = require('../../middlewares/user.middlewares');


const router = express.Router();

router.get('/',checkToken, listContacts);
router.get('/:contactId',checkToken, checkOwner, checkContactId ,getContactById);
router.post('/', checkToken, createContact);
router.delete('/:contactId', checkToken, checkOwner, checkContactId, removeContact);
router.put('/:contactId', checkToken, checkOwner, checkContactId, updateContact);
router.patch('/:contactId/favorite', checkToken, checkOwner, checkContactId, updateFavorite )


module.exports = router;
