import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, AlertTitle, Button, HStack, Spacer, Textarea } from "@chakra-ui/react";
import React from "react";
import SentenceDisplayer from "../helpers/SentenceDisplayer";
import { generalState, States } from "../state";
import GeneralExercise from "./GeneralExercise";

export default function TranslateSentence() {
    const danish = generalState(state => state.currentTranslation?.danish);

    const gameState = generalState(state => state.gameState);
    const alert = gameState === States.CheckingAnswer ? (
        <Alert status="success" variant="subtle" mt={"8"} p={5}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Du er ret!
            </AlertTitle>
        </Alert>
    ) : <></>;

    return (
        <GeneralExercise title="Oversæt denne sætning">
            <SentenceDisplayer isDanish={true}>{danish ?? ""}</SentenceDisplayer>
            <Textarea resize="none" isDisabled={gameState === States.CheckingAnswer} data-gramm_editor="false" autoComplete="false" autoFocus fontSize="xl" mt={8} />

            <HStack mt={5}>
                <Spacer />
                <Button size="lg" colorScheme="blue" onClick={gameState === States.RunningExercise ? generalState(state => state.checkAnswer) : generalState(state => state.addPositive)} rightIcon={gameState === States.CheckingAnswer ? <ArrowForwardIcon /> : undefined}>
                    {gameState === States.RunningExercise ? "Tjek" : "Fortsæt"}
                </Button>
            </HStack>
            {alert}
        </GeneralExercise>
    )
}