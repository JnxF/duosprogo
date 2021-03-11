import { Box, Link, Text } from "@chakra-ui/layout";
import React from "react";

export default function Footer() {
    return (
        <Box as="footer" role="contentinfo" py="6" bg={"GrayText"} px={20}>
            <Text>Made by <Link href="https://fmlasaca.dev/">Francisco Martínez Lasaca</Link> with love.</Text>
        </Box>
    )
}