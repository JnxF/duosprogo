import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import { AudioSwitcher } from "../switchers/AudioSwitcher";
import { ColorModeSwitcher } from "../switchers/ColorModeSwitcher";

export default function Header() {
    return <Flex p={5}>
        <Box>
            <Heading size="lg" color={"gray.600"}>Duosprogo</Heading>
        </Box>
        <Spacer />
        <AudioSwitcher />
        <ColorModeSwitcher />
    </Flex>
}