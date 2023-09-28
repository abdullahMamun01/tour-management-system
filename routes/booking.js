const { getBooking } = require("../controller/bookingController")
const {authenticate} = require("../middleware/authenticate")
const router = require("express").Router()



router.get("/:tourID",authenticate , getBooking)


module.exports = router