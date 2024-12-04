const noteService = require('../services/noteService');
const nodemailer = require('nodemailer');

const createNote = async (req, res) => {
  try {
    const note = await noteService.createNote(req.body);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

const getNotes = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, tag, deleted } = req.query;
    const notes = await noteService.getNotes(page, pageSize, tag, deleted);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

const searchNotes = async (req, res) => {
  try {
    const { query } = req.query;
    const notes = await noteService.searchNotes(query);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search notes' });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await noteService.updateNote(id, req.body);
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await noteService.deleteNote(id);
    res.json(deletedNote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};

const shareNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const note = await noteService.getNoteById(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Shared Note: ${note.title}`,
      text: note.content,
    });

    res.json({ message: 'Note shared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to share note' });
  }
};

module.exports = {
  createNote,
  getNotes,
  searchNotes,
  updateNote,
  deleteNote,
  shareNote,
};
