const express = require("express")
const server = express()

const db = require("./database/db.js")

server.use(express.static("public"))
server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (requisition, response) => {
    return response.render("index.html", {
        title: ""
    })
})

server.get("/create-point", (requisition, response) => {

    console.log(requisition.query)

    return response.render("create-point.html")
})

server.post("/savepoint", (requisition, response) => {
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);`

    const values = [
        requisition.body.image,
        requisition.body.name,
        requisition.body.address,
        requisition.body.adress2,
        requisition.body.state,
        requisition.body.city,
        requisition.body.items
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
    
        console.log("Cadastrado com sucesso")
        console.log(this)

        return response.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
    
})

server.get("/search", (requisition, response) => {

    db.all("SELECT * FROM places", function(err, rows) {
        if(err){
            return console.log(err)
        }

        const total = rows.length

        return response.render("search-results.html", { places: rows, total})
    })

})

server.listen(3000)