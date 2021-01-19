import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group

const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
};

class Choices extends React.Component {
    state = {
        value: 1,
    }

    onChange = (e) => {
        console.log("checked ", e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        return (
            <RadioGroup onChange={this.onChange} value={this.state.value}>
                <Radio style={radioStyle} value={1}>
                    Option A
                </Radio>
                <Radio style={radioStyle} value={2}>
                    Option B
                </Radio>
                <Radio style={radioStyle} value={3}>
                    Option C
                </Radio>
            </RadioGroup>
        )
    }
}