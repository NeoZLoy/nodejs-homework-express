const service = require('../services/index')
const { createContactValidator, updateContactValidator } = require('../helpers/contact.validator');

const listContacts =  async (req, res, next) => {
try {
    const contacts = await service.getAllContacts();
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
        const searchedContact = await service.getContactById(req.params.contactId)
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
            msg: error.details.map((detail) => detail.message),
            })
            return
        }

        const result = await service.createContact({...value})
        res.status(201).json({
            msg: 'Contact created',
            contact: result,
        })

    } catch (error) {
        next (error)
    }
}


const updateContact = async (req, res, next) => {
 try {
        
    console.log(req.body)
    const { contactId } = req.params
       
    const {value, error} = updateContactValidator(req.body);
    
    if(error){
        res.status(400).json({
        msg: error.details.map((detail) => detail.message),
        })
        return
    }
    console.log(value)
    const result = await service.updateContact(contactId, {...value})

    res.status(201).json({
        msg: 'Contact updated',
        contact: result,
    })
 } catch (error) {
    next(error)
 }
}

const updateFavorite = async (req, res, next) => {
    try {
        const { contactId } = req.params
        console.log(req.body)
        const { favorite = false } = req.body

        if(!req.body){
            res.status(400).json({
                msg: 'Missing field favorite'
            })
        }

        const result = await service.updateContact(contactId, {favorite});
        res.status(200).json({
            msg: 'Contact updated',
            contact: result,
        })
    } catch (error) {
        
    }
}

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await service.removeContact(contactId)

        res.status(200).json({
            msg: 'Contact removed',
            contact: result,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {updateFavorite, listContacts, getContactById, createContact, updateContact, removeContact }
