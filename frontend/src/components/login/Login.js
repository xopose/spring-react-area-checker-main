import React, {useState} from "react";
import store from "../../app/store";
import {InputText} from "primereact/inputtext";
import { Message } from 'primereact/message';
import {Messages} from 'primereact/messages';
import 'primeicons/primeicons.css';
import "./login.css"

const belle = require('belle');
const Button = belle.Button;

let MessageInstance;

function Login() {

    const signIn = e => {
        let information = {
            "login": username, "password": password
        };
        let body = [];
        for (const inf in information) {
            body.push(inf + "=" + information[inf]);
        }
        console.log(body);
        body = "?" + body.join("&");
        fetch("http://localhost:8080/login" + body, {
            method: "POST"
        }).then(response => response.json().then(json => {
                if (response.ok) {
                    console.log(json)
                    console.log(json.login)
                    store.dispatch({type: "change", value: json.login});
                } else {
                    let errortext = json.error;
                    Message.show({severity: 'error', summary: errortext, sticky: true});
                }
            }
        ))
    }

    const signUp = e => {
        let information = {
            "login": username, "password": password
        };
        let body = [];
        for (const inf in information) {
            body.push(inf + "=" + information[inf]);
        }
        console.log(body);
        body = "?" + body.join("&");
        fetch("http://localhost:8080/register" + body, {
            method: "POST"
        }).then(response => response.json().then(json => {
            if (response.ok) {
                MessageInstance.show({severity: 'success', summary: 'Successful Registration'});
                console.log(json)
                console.log(json.login)
            } else {
                let errortext = json.error;
                
                MessageInstance.show({severity: 'error', summary: errortext});
            }
        }))
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="login_form">
            <form style={{
                fontFamily: "monospace",
                fontWeight: "bolder",
                fontSize: "170%",
                color: "#1e154a",
            }}>
                <div className="log-field">
                <InputText type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                </div>
                <div className="log-field">
                <InputText type="password" id="password" value={password} placeholder="Password"
                           onChange={(e) => setPassword(e.target.value)}/>
                
                </div>
                <Button primary className="button1" type="button" onClick={signUp}>Регистрация</Button>
                <Button primary className="button" type="button" onClick={signIn}>Вход</Button>
                <Messages ref={(el) => MessageInstance = el}/>
            </form>
        </div>
    )
}


export default Login