const router = require("express").Router()
const tours = require("./tours")

router.use("/api/v1/tour" ,tours )



module.exports = router