const Contact = require('./schemas/contact.schema')
const User = require('./schemas/user.schema')

const getAllContacts = async (page, limit) => {
  try {
    const skip = (page - 1) * limit
    return await Contact.find().skip(skip).limit(limit)

  } catch (error) {
    throw new Error(`Error fetching contacts: ${error.message}`);
  }
}

const getContactById = async (id) => {
    return await Contact.findOne({ _id: id })
  }

const getFavoriteContacts = async() => {
  return await Contact.find().where({favorite: true})
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

  const findUserByToken = async (userData) => {
    return await User.findOne({token: userData})
  }
  


  module.exports = {
    getAllContacts, 
    getContactById,
    getFavoriteContacts,
    createContact, 
    updateContact, 
    removeContact, 
    getUsers, 
    createUser, 
    findByEmail, 
    findUserById,
    findUserByToken,
  }