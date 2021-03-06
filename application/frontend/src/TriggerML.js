
import React, { Component, Fragment } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Button } from '@material-ui/core';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

var apiBaseUrl="https://cloudanalyser.info/api";
//var apiBaseUrl = "http://129.146.192.214:8080/";
//var apiBaseUrl = "http://localhost:8080/api";

class TriggerML extends Component {


    constructor(props) {
        super(props);
        this.state = {
            model: '',
            period: '',
            userId: props.userId

        }
    }

    handleTriggerML = () => {

        // const { instance } = this.state;

        //this.props.onCreate(instance);

        var self = this;
        //   console.log("prop values handlesubmit");
     //   alert(this.props.userId);
        var payload = {
            //"name":this.state.username,
            // "emailId":this.state.password,
            // "userId":this.state.loginRole

            "model": this.state.model,
            "period": this.state.period,
            "userId": this.props.userId
        }



        axios.post(apiBaseUrl + "/trigger_ml", payload)
            .then(function (response) {
                console.log("Trigger sucessfull" + response.data);
            })
            .catch(function (error) {
                console.log(error);
            });



    }

    handleChange= (event) => {
    //    alert(event.target.value);
        this.setState({model: event.target.value});
    }

    render() {
        return (

            <MuiThemeProvider >


                <div style={{ display: 'inline-block' }}>

                    <InputLabel id="label" value="input" >ML Algorithm</InputLabel>
                    <Select labelId="label" id="select" value={this.state.model} style={{ marginRight: 10, minWidth: 100 }} onChange={this.handleChange} >
                        <MenuItem value="lr">Linear Regression</MenuItem>
                        <MenuItem value="rf">Random Forest</MenuItem>
                        <MenuItem value="arima">Arima</MenuItem>
                    </Select>

                </div>
                <TextField style={{ marginRight: 10 }}
                    hintText="Enter the number of days to forecast"
                    onChange={(event, newValue) => this.setState({ period: newValue })}
                />

                <Button variant="contained" color="primary" onClick={(event) => this.handleTriggerML(event)} >
                    Trigger
                </Button>

            </MuiThemeProvider>

        )




    }


}





export default TriggerML;
