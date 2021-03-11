import { Alert, AlertIcon, AlertTitle, Button, HStack, Spacer, Textarea } from "@chakra-ui/react";
import React from "react";
import { generalState } from "../../state/state";
import { States } from "../../state/States";
import SentenceDisplayer from "../helpers/SentenceDisplayer";
import GeneralExercise from "./GeneralExercise";

export default function TranslateSentence() {
    const gameState = generalState(state => state.gameState);
    const danish = generalState(state => state.currentTranslation?.danish);

    return (
        <GeneralExercise title="Oversæt denne sætning">
            <SentenceDisplayer isDanish={true}>{danish ?? ""}</SentenceDisplayer>
            <Textarea
                border={"2px"}
                resize="none"
                isDisabled={gameState === States.CheckingAnswer}
                data-gramm_editor="false"
                autoComplete="false"
                autoFocus
                fontSize="xl"
                mt={8}
            />
            <NextStep />
            {gameState === States.CheckingAnswer && <Feedback />}
        </GeneralExercise>
    )
}

function NextStep() {
    const gameState = generalState(state => state.gameState);

    return (
        <HStack mt={5}>
            <Spacer />
            <Button size="lg" colorScheme="blue" onClick={gameState === States.RunningExercise ? generalState(state => state.checkAnswer) : generalState(state => state.addPositive)}>
                {gameState === States.RunningExercise ? "Tjek" : "Fortsæt"}
            </Button>
        </HStack>
    )
}

function Feedback() {
    return (
        <Alert status="success" variant="subtle" mt={"8"} p={5}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Du er ret!
            </AlertTitle>
        </Alert>
    )

    /* const incorrectAlert = (
        <Alert status="error" variant="subtle" mt={"8"} px={5} pt={5} pb={8}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Oops!
            </AlertTitle>
            <AlertDescription ml={5}>Det rigtige svar er:
                <SentenceDisplayer isDanish={false}>{english ?? ""}</SentenceDisplayer>
            </AlertDescription>
        </Alert>
    ) */
}