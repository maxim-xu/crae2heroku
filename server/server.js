import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const router = express.Router()
const staticFiles = express.static(path.join(__dirname, '../../client/build'))
router.get('/cities', (req, res) => {
  const cities = [
    { name: 'New York City', population: 12341231 },
    { name: 'Los Angeles', population: 981273981 },
    { name: 'Chicago', population: 109183091823 }
  ]
  res.json(cities)
})

app.use(router)

app.use('/*', staticFiles)

app.set('port', (process.env.PORT || 3001))

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')} `)
})
