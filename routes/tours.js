const { 
    getTours, 
    postTour, 
    getTourById, 
    patchTourById, 
    deleteTourById, 
    deleteImageByUrl ,
    getEnable,
    getDisable
} = require("../controller/tourController")
const { authenticate } = require("../middleware/authenticate")

const router = require("express").Router()



router.get("/",authenticate , getTours )

router.post("/" , postTour)
router.patch("/:tourID" , patchTourById)
router.get("/enable/:tourID" , getEnable)
router.get("/:tourID" , getTourById)
router.get("/disable/:tourID" , getDisable)
router.delete("/:tourID" , deleteTourById)
router.delete("/:tourID/images" , deleteImageByUrl)

module.exports = router