const fs = require("fs")
const cluster = require("cluster")

const express = require("express")
const app = express()
const history = require('connect-history-api-fallback')
const pathProductionFiles = "./dist"

/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
let workers = []
const setupWorkerProcesses = () => {
  // to read number of cores on system
  let numCores = require("os").cpus().length
  console.log("Master cluster setting up " + numCores + " workers")

  // iterate on number of cores need to be utilized by an application
  // current example will utilize all of them
  for (let i = 0; i < numCores; i++) {
    // creating workers and pushing reference in an array
    // these references can be used to receive messages from workers
    workers.push(cluster.fork())

    // to receive messages from worker process
    workers[i].on("message", function(message) {
      console.log(message)
    })
  }

  // process is clustered on a core and process id is assigned
  cluster.on("online", function(worker) {
    console.log("Worker " + worker.process.pid + " is listening")
  })

  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on("exit", function(worker, code, signal) {
    console.log(
      "Worker " +
        worker.process.pid +
        " died with code: " +
        code +
        ", and signal: " +
        signal
    )
    console.log("Starting a new worker")
    cluster.fork()
    workers.push(cluster.fork())
    // to receive messages from worker process
    workers[workers.length - 1].on("message", function(message) {
      console.log(message)
    })
  })
}

/**
 * Setup server either with clustering or without it
 * @param isClusterRequired
 * @constructor
 */
const setupServer = isClusterRequired => {
  if (!fs.existsSync(pathProductionFiles)) {
    throw Error(
      `The production folder (${pathProductionFiles}) was not not found, maybe try a npm build before ?`
    )
  }

  // if it is a master process then call setting up worker process
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses()
  } else {
    // to setup server configurations and share port address for incoming requests
    setupApp()
  }
}

function setupApp() {
  const port = process.env.PORT || 3000

  app.use(history())

  app.use("/", express.static(pathProductionFiles))

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

setupServer(true)
