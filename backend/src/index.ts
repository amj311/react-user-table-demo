import axios from "axios";
import express from "express";
import IUsersService from "./services/IUsersService";
import RandomUserService from "./services/RandomUserService";
import cors from "cors";

const userService: IUsersService = new RandomUserService();

const app = express();
app.use(cors());


app.get("/", async (req,res)=>{
    res.send("data");
})

app.get("/users/page/:page/perPage/:perPage", async (req,res)=>{
    let page = parseInt(req.params.page);
    let perPage = parseInt(req.params.perPage);
    if (page === NaN || perPage === NaN) {
        res.status(400).send("Invalid parameter given for page and/or perPage.")
    }
    let data = await userService.getUsersPage(page, perPage);
    res.send(data);
})


app.get("/users/:id", async (req,res)=>{
    let id = req.params.id;
    let user = await userService.getUser(id);
    if (user) res.send(user);
    else res.sendStatus(404);
})

let port = 3001;
app.listen(port, ()=>{
    "Server listening on port "+port;
})