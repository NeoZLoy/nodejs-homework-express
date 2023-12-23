const { getAllContacts } = require("../helpers/getContacts")

const checkContactId = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    const contact = contacts.find(contact => contact.id === req.params.contactId);

    if(!contact){
        res.status(404).json({
            msg: 'Not found'
        })
    }
    next()
    req.contact = contact;
  } catch (error) {
    next(error)
  }
}


module.exports = {checkContactId, }