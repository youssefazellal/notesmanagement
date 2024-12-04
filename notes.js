const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  searchNotes,
  updateNote,
  deleteNote,
  shareNote,
} = require('../controllers/notesController');


router.post('/', createNote);         
router.get('/', getNotes);             
router.get('/search', searchNotes);    
router.put('/:id', updateNote);        
router.delete('/:id', deleteNote);     
router.post('/:id/share', shareNote);  

module.exports = router;
