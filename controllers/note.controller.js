const { errorResponse, successResponse } = require('../lib/response.handler');
const noteService = require('../service/note.service');
const CustomError = require('../lib/custom.error');

//Fetching
const getNote = async (req, res) => {
  try {
    let searchFlag;

    //Filtering Logic
    if(req.params.noteId !== null && req.params.noteId != undefined){
      searchFlag = "noteId";
      payload = req.params.noteId;
    }else if(req.query.title != null){
      searchFlag = "title";
      payload = req.query.title
    }

    const note = await noteService.getSingleNote(searchFlag,payload);
    if(!note){
      throw new CustomError("note_not_found",404,"Note Not Found");
    }
    successResponse(res, 'Note Successfully Fetched', note );

  } catch (err) {
    errorResponse(res, 'Note Could Not Be Fetched', err);
  }
}

//Creation
const createNote = async (req, res, err) => {
  try {
    const note = await noteService.createNewNote(req.body);
    successResponse(res, 'Note Successfully Created', note);

  } catch (err) {
    errorResponse(res, 'Note Creation Failed', err);
  }
}



//Updation
const updateNote = async (req, res) => {
  try {
    const note = await noteService.updateSingleNote(req);
    successResponse(res, 'Note Successfully Updated', note);
  } catch (err) {
    errorResponse(res, 'Note Updation Failed', err);
  }
}

//Deletion
const deleteNote = async(req, res) => {
  try {
    const note = await noteService.deleteSingleNote(req);
    successResponse(res, 'Note Successfully Updated', note);
  } catch (err) {
    errorResponse(res, 'Note Deletion Failed', err);
  }
}



module.exports = {
  createNote,
  getNote,
  updateNote,
  deleteNote,
}
