const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

router.param("id", tourController.checkId);

router
  .route('/')
  .get(tourController.getAllF1Tours)
  .post(tourController.mwCheckBodyParams, tourController.createAF1Tour)

router
  .route('/:id')
  .get(tourController.getAF1Tour)
  .patch(tourController.updateAF1Tour)
  .delete(tourController.deleteAF1Tour)

module.exports = router;