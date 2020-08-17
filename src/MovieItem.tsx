import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableHighlight,
    Alert,
    Platform,
} from 'react-native';

export interface MovieItemState {
    mtime: string;
    title: string;
    digest: string;
    imgsrc: string;
    url: string;
    source: string;
}

export interface MovieItemProps {
    data: MovieItemState;
}
export default class MovieItem extends Component<
    MovieItemProps,
    MovieItemState
> {
    constructor(props: MovieItemProps) {
        super(props);
        if (this.props != null && this.props.data != null) {
            this.state = this.props.data;
        }
    }
    onClick() {
        Alert.alert(
            'Tips',
            this.state.title +
                '\n系统版本：' +
                Platform.OS +
                ' ' +
                Platform.Version
        );
    }
    render() {
        let img = null;
        if (this.state.imgsrc !== null && this.state.imgsrc !== '') {
            img = (
                <Image
                    source={{uri: this.state.imgsrc}}
                    style={styles.thumbnail}
                    resizeMode={'cover'}
                />
            );
        }
        if (this.state != null) {
            return (
                <TouchableHighlight
                    onPress={() => this.onClick()}
                    style={styles.btn}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <View style={styles.content}>
                            {img}
                            <View style={styles.rightContainer}>
                                <Text style={styles.year}>
                                    {this.state.digest}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return <></>;
        }
    }
}
const styles = StyleSheet.create({
    btn: {
        marginBottom: 10,
    },
    container: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    thumbnail: {
        width: 150,
        height: 75,
        marginEnd: 15,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
    },
    year: {},
});
