const express = require('express');
const notesController = require('../controllers/note.controller');

const router = express.Router();


router.route('/')
  .post(notesController.createNote)
  .get(notesController.getNote);


router.route('/:noteId')
  .get(notesController.getNote)
  .put(notesController.updateNote)
  .delete(notesController.deleteNote);


module.exports = router;
