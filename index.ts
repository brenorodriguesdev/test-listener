import { io } from "socket.io-client";
import axios from "axios";
import * as dotenv from 'dotenv'

dotenv.config()
const baseURL = 'http://localhost:3500'
axios.post(baseURL + '/sign-in', {
    email: process.env.EMAIL,
    password: process.env.PASSWORD
}).then((request: any) => {
    const socket = io(baseURL);

    socket.on("connect", () => {
        socket.emit('onConnect', request.accessToken)

        socket.on("notifyMessage", (message: any) => {
            console.log(message)
        })

        socket.on("notifyNewTicket", (ticket: any) => {
            console.log(ticket)
        })

        socket.on("notifyReadMessages", (messages: any) => {
            console.log(messages)
        })

        socket.on("notifyReceiveMessages", (messages: any) => {
            console.log(messages)
        })

    })
})

