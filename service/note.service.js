const CustomError = require('../lib/custom.error');
const Note = require('../models/note.model');



exports.getSingleNote = async(searchFlag,payload) =>{
    try{
        if(searchFlag == "title"){
            return await Note.findOne({ title: { $regex: payload, $options: "i" },deleted_at: { $eq: null }});
        }else if(searchFlag = "id"){
            return await Note.findOne({_id:payload,deleted_at: { $eq: null }});
        }

        return null;
        
    }catch(err){
        throw err;
    }
}


exports.createNewNote = async(payload) =>{
    try{
        const {title,body} = payload;
        const newNote = new Note({
            title,
            body
        });

        await newNote.save();
        return newNote;

    }catch(err){
        throw err;
    }
}

exports.updateSingleNote = async(req) =>{
    try{
        const noteId = req.params.noteId;
        const {title,body} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(noteId,{
            title,
            body,
            updated_at:new Date()
        },{new:true})

        return updatedNote;

    }catch(err){
        throw err;
    }
}

exports.deleteSingleNote = async(req) =>{
    try{
        const noteId = req.params.noteId;
        const {title,body} = req.body;
        const deletedNote = await Note.findByIdAndUpdate(noteId,{
            deleted_at:new Date()
        },{new:true})

        return deletedNote;

    }catch(err){
        throw err;
    }
}

