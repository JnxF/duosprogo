import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, HStack, Spacer, Textarea } from "@chakra-ui/react";
import React from "react";
import { AnswerScore } from "../../state/AnswerScore";
import { generalState } from "../../state/state";
import { States } from "../../state/States";
import SentenceDisplayer from "../helpers/SentenceDisplayer";
import GeneralExercise from "./GeneralExercise";

export default function TranslateSentence() {
    const gameState = generalState(state => state.gameState);
    const danish = generalState(state => state.currentTranslation?.danish);
    const checkAnswer = generalState(state => state.checkAnswer);
    return (
        <GeneralExercise title="Oversæt denne sætning">
            <SentenceDisplayer isDanish={true}>{danish ?? ""}</SentenceDisplayer>
            <Textarea
                border={"2px"}
                resize="none"
                isDisabled={gameState === States.CheckingAnswer}
                data-gramm_editor="false"
                autoComplete="false"
                id="answer"
                onKeyPress={(e) => {
                    if (e.code === "Enter") {
                        checkAnswer();
                    }
                }}
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
    const answerScore = generalState(state => state.answerScore);
    const addPositive = generalState(state => state.addPositive)

    return (
        <HStack mt={5}>
            <Spacer />
            { (gameState === States.CheckingAnswer && answerScore === AnswerScore.WRONG) && <Button size="lg" colorScheme="green" onClick={addPositive}>
                Mit svar var korrekt
            </Button>}
            <Button size="lg" colorScheme="blue" onClick={gameState === States.RunningExercise ? generalState(state => state.checkAnswer) : generalState(state => state.addConditional)}>
                {gameState === States.RunningExercise ? "Tjek" : "Fortsæt"}
            </Button>
        </HStack>
    )
}

function Feedback() {
    const english = generalState(state => state.currentTranslation?.english);
    const answerScore = generalState(_ => _.answerScore);

    const right = (
        <Alert status="success" variant="subtle" mt={"8"} p={5}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Du har ret!
            </AlertTitle>
        </Alert>
    )

    const wrong = (
        <Alert status="error" variant="subtle" mt={"8"} px={5} pt={5} pb={8}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Oops!
            </AlertTitle>
            <AlertDescription ml={5}>Det rigtige svar er:
                <SentenceDisplayer isDanish={false}>{english ?? ""}</SentenceDisplayer>
            </AlertDescription>
        </Alert>
    )

    const almost = (
        <Alert status="success" variant="subtle" mt={"8"} p={5}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Du har næsten ret!
            </AlertTitle>

            <AlertDescription ml={5}>Det rigtige svar er:
                <SentenceDisplayer isDanish={false}>{english ?? ""}</SentenceDisplayer>
            </AlertDescription>
        </Alert>
    )

    switch (answerScore) {
        case AnswerScore.RIGHT:
            return right;
        case AnswerScore.WRONG:
            return wrong;
        default:
            return almost;
    }
}