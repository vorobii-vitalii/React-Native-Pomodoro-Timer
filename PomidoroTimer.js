import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({});

export class PomidoroTimer extends React.Component {

    constructor(props) {
        super(props);
        const end = new Date();
        end.setSeconds(end.getSeconds() + props.secs);
        this.state = {
            endTime: end,
            startTime: new Date(),
            currentTime: new Date(),
            shouldStop: false,
            shouldShowCounter: true
        }
    }

    isToggled = () => {
        return this.state.shouldShowCounter;
    };

    toggleCounter = () => {

        this.setState(prevState => ({
            shouldShowCounter: true,
        }));

        this.resetTimer();

    };

    isStopped() {
        return this.state.shouldStop;
    }

    resetTimer = () => {
        var end = new Date();
        end.setSeconds(end.getSeconds() + this.props.secs);
        this.setState(prevState => ({
            startTime: new Date(),
            currentTime: new Date(),
            endTime: end
        }))
    };

    startTimer = () => {
        this.setState(prevState => ({
            shouldStop: false
        }))
    };

    componentWillMount() {
        this.interval = setInterval(this.update, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    stopTimer = () => {
        this.setState(prevState => ({
            shouldStop: true
        }))
    };

    update = () => {
        if (this.state.shouldStop == true) {
            return;
        }
        this.setState(prevState => ({
            currentTime: new Date(prevState.currentTime.getTime() + 1000),
        }))
    };

    outOfTime() {
        return this.state.endTime > this.state.currentTime;
    }

    getFormatterData = () => {
        var t = Date.parse(this.state.endTime) - Date.parse(this.state.currentTime);
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        return {
            'total': t,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    shouldUpdateTimer = () => {
        const shouldUpdate = this.isStopped() || this.outOfTime();
        return shouldUpdate;
    };

    render() {
        var currentData = this.getFormatterData();

        if (this.isToggled() && currentData.total >= 0) {
            return (
                <View style={styles.main}>
                    <View style={styles.button}>
                        <Button type="solid" color="red" onPress={this.startTimer} title="Start"/>
                    </View>
                    <View style={styles.button}>
                        <Button type="solid" color="red" onPress={this.stopTimer} title="Stop"/>
                    </View>
                    <View style={styles.button}>
                        <Button type="solid" color="red" onPress={this.resetTimer} title="Reset"/>
                    </View>
                    <Text style={styles.text}>{currentData.minutes} minutes and {currentData.seconds} seconds
                        left...</Text>
                </View>
            )
        } else {
            return (
                <View>

                </View>
            )
        }

    }

}