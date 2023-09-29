const { getBooking, getApprove, getALLBook } = require("../controller/bookingController")
const {authenticate} = require("../middleware/authenticate")
const router = require("express").Router()


router.get("/" , getALLBook)
router.get("/:tourID",authenticate , getBooking)
router.get("/approve/:bookingId",authenticate , getApprove)

module.exports = router


