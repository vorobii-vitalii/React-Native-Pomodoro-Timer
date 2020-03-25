import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

const styles = StyleSheet.create({});

export class InputHandler extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
    }

    componentDidUpdate() {
        this.props.value(this.state.num)
    }

    onChanged(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }
        this.setState({num: newText});

    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="Enter number"
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyle}
                    keyboardType={'numeric'}
                    onChangeText={(text) => this.onChanged(text)}
                    value={this.state.num}
                    maxLength={10}
                />
            </View>
        )
    }
}
