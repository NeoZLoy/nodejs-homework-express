const service = require('../services/index.js')

const checkContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await service.getContactById(contactId)

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