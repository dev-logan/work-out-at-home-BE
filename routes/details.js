const express = require('express')
const router = express.Router()
const authorization = require('../middlewares/auth-middleware.js')
const WorkOutTime = require('../models/workOutTime')

// 운동 시간 기록
router.post('/records', authorization, async (req, res) => {
    const { userId } = res.locals.user
    const { workOutTime } = req.body
    await WorkOutTime.create({ userId, workOutTime })

    res.json({ message: '운동시간 기록 성공' })
})

// 달력 내용 전달
router.get('/myinfo/calendar', authorization, async (req, res) => {
    const { userId } = res.locals.user

    // const year = new Date().getFullYear
    // const month = new Date().getMonth
    // const lastDay = new Date()
    //해당 월의 마지막 일 넣기
    // const calendar = await WorkOutTimes.find({"date": {$gte: ISODate(year + month + "-01T00:00:00.000Z"), $lte: ISODate(year + month + "-31T00:00:00.000Z")}, {userId : user.userId}})

    let dates = await WorkOutTime.find({ userId })
    dates = Array.from(
        new Set(
            dates.map(
                (x) =>
                    `${x.doneAt.getFullYear()}-${
                        x.doneAt.getMonth() + 1
                    }-${x.doneAt.getDate()}`
            )
        )
    )

    //프론트에서 원하느 방식으로 가공해서 보내줘야 함.
    res.json({ dates })
})

module.exports = router
