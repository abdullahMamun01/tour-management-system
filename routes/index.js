const router = require("express").Router()
const authRouter = require('./auth')
const tourRoutes = require("./tours")
const bookingRoutes = require("./booking")
router.use("/api/v1/auth" ,authRouter )
router.use("/api/v1/tour" ,tourRoutes )
router.use("/api/v1/tour/book" ,bookingRoutes )



module.exports = router