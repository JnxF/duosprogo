import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout";
import React from "react";
import { AudioSwitcher } from "../switchers/AudioSwitcher";
import { ColorModeSwitcher } from "../switchers/ColorModeSwitcher";

export default function Header() {
    return <Flex p={5} pl={20} pr={20}>
        <Box p="2">
            <Heading size="lg" color={"gray.600"}>Duosprogo</Heading>
        </Box>
        <Spacer />
        <AudioSwitcher />
        <ColorModeSwitcher />
    </Flex>
}