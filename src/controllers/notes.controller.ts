import Note from "../models/Note.models";
import { Request, Response } from "express";

// @desc Get all the notes of user
// @route GET /api/v1/notes
// @access Private
export const getNotes = async (req: Request, res: Response) => {
  try {
    //const notes = await Note.find();

    const notes = await Note.find({ user_id: req.user.id });

    return res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc Add note
// @route POST /api/v1/notes
// @access Private
export const addNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const { subject, author, text } = req.body;

    const note = await Note.create({ user_id: id, subject, author, text });
    return res.status(201).json({
      success: true,
      data: note,
    });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val: any) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc Delete note
// @route DELETE /api/v1/notes/:id
// @access Private
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        error: "No note found",
      });
    }

    await note.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
