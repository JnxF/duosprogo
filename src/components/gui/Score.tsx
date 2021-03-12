import { Box, Flex, VStack } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { Center, CircularProgressLabel } from "@chakra-ui/react";
import React from "react";

export function Score({ right, wrong }: { right: number, wrong: number }) {
    let total = right + wrong;
    if (total === 0) total = 0.01
    const percentRight = 100 * (right / total);
    const percentWrong = 100 * (wrong / total);

    return <Flex direction={["row", "row", "column"]}>
        <Counter totals={total} percent={percentRight} color="green.400" label={right} text="Korrekte svar" />
        <Counter totals={total} percent={percentWrong} color="red.400" label={wrong} text="Forkerte svar" />
    </Flex >
}

function Counter({ totals, percent, label, color, text }: { totals: number, percent: number, label: number, color: string, text: string }) {
    const c = (totals < 0.5) ? "gray.300" : color;
    return (
        <Box flex={1} p={5} borderWidth="2px" alignContent="center" borderRadius="lg" w={["auto", "auto", "200px"]} mb={4}>
            <VStack>
                <CircularProgress size="100px" value={percent} color={c}>
                    <CircularProgressLabel color={c} className="score" fontSize="4xl" fontWeight="bold">{label}</CircularProgressLabel>
                </CircularProgress>
                <Center mt={4} fontWeight="bold" color={c} as="h4">{text}</Center>
            </VStack>
        </Box>
    )
}
