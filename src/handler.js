const { nanoid } = require("nanoid");
const notes = require("./notes");

// melihat isi data
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.find((n) => n.id === id);

  if (note !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        notes: [note],
      },
    });
    response.code(200);
    response.type("application/json");
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "gagal menampila data",
  });
  response.code(404);
  response.type("application/json");
  return response;
};

// menambahkan data
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(12);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "berhasil menambahkan catatan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    response.type("application/json");
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "catatan gagal ditambahkan",
  });
  response.code(500);
  response.type("application/json");
  return response;
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

// edit data
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "catatan berhasil diperbaharui",
    });
    response.code(200);
    response.type("application/json");
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "gagal memperbaharui catatan, id tidak ditemukan",
  });
  response.code(404);
  response.type("application/json");
  return response;
};

// delete data
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    response.type("application/json");
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus, id tidak ditemukan",
  });
  response.code(404);
  response.type("application/json");
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
