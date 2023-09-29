const router = require("express").Router()
const authRouter = require('./auth')
const tourRoutes = require("./tours")
const bookingRoutes = require("./booking")
router.use("/api/v1/auth" ,authRouter )
router.use("/api/v1/tour/books" ,bookingRoutes )
router.use("/api/v1/tour" ,tourRoutes )




module.exports = router