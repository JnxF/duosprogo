import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { generalState } from "../state";

export default function Jumbotron({ onClick }: any) {
    const startGame = generalState(state => state.startGame);
    const nextExercise = generalState(state => state.nextExercise);

    return <>
        <Heading mb={4} size="2xl" as="h1">🇩🇰 Lære dansk!</Heading>
        <Text fontSize="2xl">
            Vælg de emner til venstre, du vil øve på, og klik på knappen for at starte
        </Text>
        <Text fontSize="xl" mt="2">
            Select the topics on the left that you want to practice on and click the button to start
        </Text>
        <Button onClick={() => { startGame(); nextExercise(); }} rightIcon={<ArrowForwardIcon />} size="lg" colorScheme="blue" variant="solid" mt="24px">
            Start spillet
        </Button>
    </>
}