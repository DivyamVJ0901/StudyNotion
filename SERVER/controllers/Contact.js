const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')

// POST route to handle form submission
exports.Contact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body

    // Validation
    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'All details are compulsory'
      })
    }
    // Create a new contact instance
    const newContact = await ContactSchema.create({
      firstName,
      lastName,
      email,
      phone,
      message
    })

    // Save the contact to the database
    await newContact.save()

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal Server error'
    })
  }
}
