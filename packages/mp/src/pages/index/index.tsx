import { Component } from 'react';
import { Text, View } from '@tarojs/components';
import './index.scss';

export default class Index extends Component {
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <View className="index">
                <Text>Hello world!</Text>
            </View>
        );
    }
}
