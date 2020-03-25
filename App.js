import React from 'react';
import {Button, StyleSheet, Text, TextInput, Vibration, View} from 'react-native';
import {InputHandler} from "./InputHandler"
import {Pomidoro} from "./Pomidoro"

const styles = StyleSheet.create({});

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            secNum: 0,
            minNum: 0
        }
    }

    setSecNum = (v) => {
        this.setState(prevState => ({
            secNum: v
        }));
    };

    setMinNum = (v) => {
        this.setState(prevState => ({
            minNum: v
        }))
    };

    getTime = () => {
        return Object.assign(this.state);
    };


    render() {
        return (
            <Pomidoro onInputChanged={this.getTime}
                      secondsInput={<InputHandler value={(v) => this.setSecNum(v)}/>}
                      minutesInput={<InputHandler value={(v) => this.setMinNum(v)}/>}/>
        )
    }
}      
