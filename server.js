const fs = require('fs')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const pathProductionFiles = './dist'

if (!fs.existsSync(pathProductionFiles)) {
  throw new Error(`The production folder "${pathProductionFiles}" was not not found, maybe try a npm build before ?`)
}

app.use('/', express.static(pathProductionFiles))

app.listen(port, () => { console.log(`Server is running on port ${port}`)})
