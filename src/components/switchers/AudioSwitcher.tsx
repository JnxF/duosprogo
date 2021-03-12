import {
    IconButton,
    IconButtonProps
} from "@chakra-ui/react"
import * as React from "react"
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa"
import { generalState } from "../../state/state"

type AudioSwitcherProps = Omit<IconButtonProps, "aria-label">

export const AudioSwitcher: React.FC<AudioSwitcherProps> = (props) => {
    const toggleVolume = generalState(_ => _.toggleVolume);
    const volumeActivated = generalState(_ => _.volumeActivated);

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
