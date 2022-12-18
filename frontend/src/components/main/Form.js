import React from "react";
import {InputNumber} from 'primereact/inputnumber';
import {Button} from "belle";
import store from "../../app/store";

function CoordinatesForm(props) {
    const submit = () => {
        let information = {
            "login": store.getState().login,
            "x": props.x_form,
            "y": props.y_form,
            "r": props.r_form
        };
        let body = [];
        for (const inf in information) {
            body.push(inf + "=" + information[inf]);
        }
        console.log(body);
        body = "?" + body.join("&");
        if (props.validate()) {
            fetch("http://localhost:8080/point" + body, {
                method: "POST"
            }).then(response => response.text().then(text => {
                console.log(JSON.parse(text));
                props.setChecks(JSON.parse(text));
                //props.showChecks();
            }))
        }
    }

    return (
        <div>
            <form id="form">
                <div className="nums-field">
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setX(-5)}>-5</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setX(-4)}>-4</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setX(-3)}>-3</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setX(-2)}>-2</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setX(-1)}>-1</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setX(0)}>0</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setX(1)}>1</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setX(2)}>2</Button>
                <Button className="form_button" type="button" onClick={(e) => props.setX(3)}>3</Button>
                </div>
                <div className="nums-field">
                <InputNumber placeholder="Введите Y(-5 .. 3)" value={props.y_form} onValueChange={(e) => props.setY(e.value)} mode="decimal"
                             min={-5} max={3}
                             minFractionDigits={0} maxFractionDigits={3} />
                             <br/>
                </div>
                <div className="nums-field">
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setR(-5)}>-5</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setR(-4)}>-4</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setR(-3)}>-3</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setR(-2)}>-2</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setR(-1)}>-1</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setR(0)}>0</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setR(1)}>1</Button>
                <Button style={{marginRight: "1px"}} className="form_button" type="button" onClick={(e) => props.setR(2)}>2</Button>
                <Button className="form_button" type="button" onClick={(e) => props.setR(3)}>3</Button>
                
                </div>
                <div className="nums-field">
                <Button primary type="button" onClick={submit} icon="pi">OK</Button>
                </div>
            </form>
        </div>
    )
}

export default CoordinatesForm
