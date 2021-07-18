import React, { FunctionComponent } from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import RNExitApp from 'react-native-kill-app';
import { Navigation } from 'react-native-navigation';
import { Colors } from '../../constants/colors';
import { MARGIN, PADDING } from '../../constants/styles';
import CustomText from '../../ui/text/text';

const { width } = Dimensions.get('window');

const WIDTH = width * 0.8;

export interface AlertOverlayProps {
    title: string,
    message: string
}

interface ShowAlertProps {
    title?: string,
    message: string
}

export const showAlert: (params: ShowAlertProps) => void = ({ title = "Error", message }) => {
    Navigation.showOverlay<AlertOverlayProps>({
        component: {
            name: "Alert",
            passProps: {
                title: title ? title : "Error",
                message: message ? message : "Unexpected Error occured!"
            }
        }
    })
}

const AlertOverlay: FunctionComponent<AlertOverlayProps> = ({
    title,
    message
}) => {
    const buttonHandler = () => {
        RNExitApp.exitApp();
    }

    return <View
        style={styles.wrapper}
    >
        <View style={styles.backdrop} />
        <View style={styles.container}>
            <CustomText
                style={styles.title}
                size="h4"
            >{title}</CustomText>
            <CustomText style={styles.message} size="h4">{message}</CustomText>
            <View style={styles.button}>
                <Button title="Exit" onPress={buttonHandler} />
            </View>
        </View>
    </View>
}

export default AlertOverlay;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.black,
        opacity: 0.5
    },
    container: {
        width: WIDTH,
        backgroundColor: Colors.white,
        padding: PADDING
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: PADDING,
        color: Colors.red
    },
    message: {
        textAlign: "center"
    },
    button: {
        marginTop: MARGIN
    }
})