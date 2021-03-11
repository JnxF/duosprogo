import {
    IconButton,
    IconButtonProps
} from "@chakra-ui/react"
import * as React from "react"
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa"
import { generalState } from "../state"

type AudioSwitcherProps = Omit<IconButtonProps, "aria-label">

export const AudioSwitcher: React.FC<AudioSwitcherProps> = (props) => {
    const toggleVolume = generalState(state => state.toggleVolume);
    const volumeActivated = generalState(state => state.volumeActivated);

    return (
        <IconButton
            size="md"
            fontSize="lg"
            variant="outline"
            colorScheme="gray"
            border={"2px"}
            marginLeft="2"
            icon={volumeActivated ? <FaVolumeUp /> : <FaVolumeMute />}
            onClick={toggleVolume}
            aria-label={"Switch volume"}
            {...props}
        />
    )
}
