import { Box, Link, Text } from "@chakra-ui/layout";

export default function Footer() {
    return (
        <Box as="footer" role="contentinfo" py="6" bg={"GrayText"} px={20} width={"100%"}>
            <Text>Made by <Link href="https://fmlasaca.dev/">Francisco Martínez Lasaca</Link> with love.</Text>
        </Box>
    )
}