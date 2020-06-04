const express = require("express")
const server = express()

server.use(express.static("public"))

server.get("/", (requisition, response) => {
    response.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (requisition, response) => {
    response.sendFile(__dirname + "/views/create-point.html")
})

server.listen(3000)