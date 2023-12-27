const Contact = require('./schemas/contact.schema')
const User = require('./schemas/user.schema')

const getAllContacts = async () => {
    return await Contact.find()
}

const getContactById = async (id) => {
    return await Contact.findOne({ _id: id })
  }
  
  const createContact = async (contactData) => {
    return await Contact.create(contactData)
  }
  
  const updateContact = async (id, contactData) => {
    return  await Contact.findByIdAndUpdate({ _id: id }, contactData, { new: true })
  }
  
  const removeContact = async (id) => {
    return await Contact.findByIdAndDelete({ _id: id })
  }


// ********************** USERS **************************

  const getUsers = async () => {
    return await User.find()
  }

  const createUser = async (userData) => {
    return await User.create(userData)
  }

  const findByEmail = async (userData) => {
    return await User.findOne({email:userData})
  }

  const findUserById = async (userData) => {
    return await User.findOne({_id: userData})
  }


  module.exports = {
    getAllContacts, 
    getContactById,
    createContact, 
    updateContact, 
    removeContact, 
    getUsers, 
    createUser, 
    findByEmail, 
    findUserById,

  }