const { getTours, postTour, getTourById, patchTourById, deleteTourById, deleteImageByUrl } = require("../controller/tourController")

const router = require("express").Router()



router.get("/" , getTours )

router.post("/" , postTour)
router.patch("/:tourID" , patchTourById)
router.get("/:tourID" , getTourById)
router.delete("/:tourID" , deleteTourById)
router.delete("/:tourID/images" , deleteImageByUrl)

module.exports = router