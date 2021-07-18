import { Navigation } from "react-native-navigation"

import { ImageInterface } from "../../interfaces/image"

interface Props extends ImageInterface {
    componentId: string
}

export const openImageHandler = (props: Props) => {
    Navigation.push<ImageInterface>(props.componentId, {
        component: {
            name: "Image",
            passProps: {
                ...props
            },
            options: {
                animations: {
                    push: {
                        sharedElementTransitions: [
                            {
                                fromId: props.id.toString(),
                                toId: props.id.toString()
                            }
                        ]
                    }
                }
            }
        }
    })
}