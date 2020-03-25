import React from 'react';
import {Button, StyleSheet, Text, Vibration, View} from 'react-native';

import {PomidoroTimer} from "./PomidoroTimer"

const styles = StyleSheet.create({});

export class Pomidoro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            secondsInput: props.secondsInput,
            minutesInput: props.minutesInput,
            timerIsTicking: false,
        }
    }

    isTicking = () => {
        return this.state.timerIsTicking;
    };

    endTraining = () => {
        Vibration.vibrate(3);
        this.setState(prevState => ({
            timerIsTicking: false
        }));
    };

    getTimeNum = () => {
        return Number(this.props.onInputChanged().secNum) +
            ((Number(this.props.onInputChanged().minNum)) * 60);
    };

    startTraining = () => {
        if (this.getTimeNum() > 0) {
            this.setState(prevState => ({
                timerIsTicking: true
            }));
            this.timeout = setTimeout(this.endTraining, this.getTimeNum() * 1000);
        }
    };


    render() {
        if (!this.isTicking()) {
            return (
                <View>
                    <Text> Put TomatoTimer on </Text>
                    <View style={styles.input}>
                        {this.state.minutesInput}
                    </View>
                    <Text> minutes and </Text>
                    <View style={styles.input}>
                        {this.state.secondsInput}
                    </View>
                    <Text> seconds </Text>
                    <Button onPress={this.startTraining} title="Start working"/>
                </View>
            )
        } else {
            return (
                <View>
                    <PomidoroTimer secs={this.getTimeNum()}/>
                </View>
            )
        }
    }
}