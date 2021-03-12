import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Heading, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { generalState } from "../../state/state";

export default function Jumbotron({ onClick }: any) {
    const toast = useToast();
    const startGame = generalState(_ => _.startGame);
    const nextExercise = generalState(_ => _.nextExercise);
    const selectedCategories = generalState(_ => _.selectedCategories);

    return <>
        <Heading mb={4} size="2xl" as="h1">🇩🇰 Lære dansk!</Heading>
        <Text fontSize="2xl">
            Vælg de emner til venstre, du vil øve på, og klik på knappen for at starte
        </Text>
        <Text fontSize="xl" mt="2">
            Select the topics on the left that you want to practice on and click the button to start
        </Text>
        <Button onClick={() => {
            startGame();
            if (selectedCategories.length === 0) {
                toast({
                    title: "Oops!",
                    description: "Vælg mindst én kategori.",
                    status: "error",
                    position: "top-right",
                    isClosable: true,
                })
                return;
            }
            nextExercise();
        }} rightIcon={<ArrowForwardIcon />} size="lg" colorScheme="blue" variant="solid" mt="24px">
            Start spillet
        </Button>
    </>
}