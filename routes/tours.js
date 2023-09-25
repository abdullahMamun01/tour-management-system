const { getTours, postTour, getTourById, patchTourById, deleteTourById } = require("../controller/tourController")

const router = require("express").Router()



router.get("/" , getTours )

router.post("/" , postTour)
router.patch("/:tourID" , patchTourById)
router.delete("/:tourID" , deleteTourById)
router.get("/:tourID" , getTourById)

module.exports = router