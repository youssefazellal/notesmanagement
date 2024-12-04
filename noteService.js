const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createNote = async (data) => {
  return await prisma.note.create({
    data: data,
  });
};


const getNotes = async (page, pageSize, tag, deleted) => {
  const skip = (page - 1) * pageSize;

  const where = {
    ...(tag ? { tags: { has: tag } } : {}),
    ...(deleted ? { deleted: deleted === 'true' } : {}),
  };

  return await prisma.note.findMany({
    where: where,
    skip: skip,
    take: parseInt(pageSize),
    orderBy: { createdAt: 'desc' },
  });
};


const searchNotes = async (query) => {
  return await prisma.note.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
};


const updateNote = async (id, data) => {
  return await prisma.note.update({
    where: { id: parseInt(id) },
    data: data,
  });
};


const deleteNote = async (id) => {
  return await prisma.note.update({
    where: { id: parseInt(id) },
    data: { deleted: true },
  });
};


const getNoteById = async (id) => {
  return await prisma.note.findUnique({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  createNote,
  getNotes,
  searchNotes,
  updateNote,
  deleteNote,
  getNoteById,
};
