const express = require('express')
const app = express()

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml');
const fileupload = require('express-fileupload')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())
app.use(fileupload())


let courses = [
    {
        id: "11",
        name: "Learn ReactJs",
        price: 299
    },

    {
        id: "12",
        name: "Learn Node JS",
        price: 499
    },

    {
        id: "13",
        name: "Learn Spring Boot",
        price: 399
    },

    {
        id: "14",
        name: "Learn Ruby On rails",
        price: 299
    },
]
app.get("/", (req, res)=> {
    res.send("Hello Roshan");
})
app.get("/api/v1/roshan", (req, res)=> {
    res.send("hello from Roshan shambharkar DOCS");
})

app.get("/api/v1/roshanobject", (req, res)=> {
    res.send({id: "55", name: "Learn Backend", price:9999});
})

app.get("/api/v1/roshancourses", (req, res)=> {
    res.send(courses);
})

app.get("/api/v1/mycourses/:courseId", (req, res)=> {
    const mycourses = courses.find(course => course.id === req.params.courseId)
    res.send(mycourses)
})

app.post("/api/v1/addCourse", (req, res)=> {
    console.log(req.body);
    courses.push(req.body);
    res.send(true)
})


app.get("/api/v1/courseequery", (req, res)=> {
    let location = req.query.location
    let device = req.query.device;

    res.send({location, device})
})

app.post("/api/v1/courseupload", (req, res)=> {
    console.log(req.header)
    const file = req.files.file
    let path = __dirname + "/images/" + Date.now() + ".jpg"

    file.mv(path, (err)=> {
        res.send(true)
    })
})


app.listen(4000, ()=> console.log(`Server is running at port 4000...`));