import express from 'express';
import {
  getUserWords,
  getUserFavs,
  updateMyWords,
  updateMyFavs,
} from '../controllers/wordController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id/words').get(protect, admin, getUserWords);
router.route('/:id/favs').get(protect, admin, getUserFavs);
router.route('/:id/mywords').get(protect, getUserWords).put(protect, updateMyWords);
router.route('/:id/myfavs').get(protect, getUserFavs).put(protect, updateMyFavs);

export default router;
