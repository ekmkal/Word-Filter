import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Update words list
// @route   GET /api/words/mywords
// @access  Private
const updateMyWords = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.words = req.body.words;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update favs list
// @route   GET /api/words/myfavs
// @access  Private
const updateMyFavs = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.favs = req.body.favs;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user words
// @route   GET /api/words/mywords & /api/words
// @access  Private & Admin
const getUserWords = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user.words);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user favs
// @route   GET /api/words/myfavs & /api/words/favs
// @access  Private & Admin
const getUserFavs = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user.favs);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getUserWords, getUserFavs, updateMyWords, updateMyFavs };
