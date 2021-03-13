import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, HStack, Spacer, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import { AnswerScore } from "../../state/AnswerScore";
import { generalState } from "../../state/state";
import { States } from "../../state/States";
import SentenceDisplayer from "../helpers/SentenceDisplayer";
import GeneralExercise from "./GeneralExercise";

export default function TranslateSentence() {
    const gameState = generalState(_ => _.gameState);
    const danish = generalState(_ => _.currentTranslation?.danish);
    const checkAnswer = generalState(_ => _.checkAnswer);
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
                    if (e.key === "Enter") {
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
    const gameState = generalState(_ => _.gameState);
    const answerScore = generalState(_ => _.answerScore);
    const addPositive = generalState(_ => _.addPositive)

    return (
        <HStack mt={5}>
            <Spacer />
            { (gameState === States.CheckingAnswer && answerScore === AnswerScore.WRONG) && <Button size="md" colorScheme="green" onClick={addPositive}>
                Mit svar var korrekt
            </Button>}
            <Button size="md" colorScheme="blue" onClick={gameState === States.RunningExercise ? generalState(_ => _.checkAnswer) : generalState(_ => _.addConditional)}>
                {gameState === States.RunningExercise ? "Tjek" : "Fortsæt"}
            </Button>
        </HStack>
    )
}

function Feedback() {
    const english = generalState(_ => _.currentTranslation?.english);
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
        <Alert status="error" variant="subtle" mt={"8"} px={5} py={7}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Oops!
            </AlertTitle>
            <AlertDescription ml={5} mt={-3}>
                <Text mb={1}>Det rigtige svar er</Text>
                <SentenceDisplayer isDanish={false}>{english ?? ""}</SentenceDisplayer>
            </AlertDescription>
        </Alert>
    )

    const almost = (
        <Alert status="success" variant="subtle" mt={"8"} px={5} py={7}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Du har næsten ret!
            </AlertTitle>

            <AlertDescription ml={5} mt={-3}>
                <Text mb={1}>Det rigtige svar er</Text>
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