import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, HStack, Spacer, Text, Textarea } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { AnswerScore } from "../../state/AnswerScore";
import { generalState } from "../../state/state";
import { States } from "../../state/States";
import SentenceDisplayer from "../helpers/SentenceDisplayer";
import GeneralExercise from "./GeneralExercise";

export default function TranslateSentence() {
    const gameState = generalState(_ => _.gameState);
    const danish = generalState(_ => _.currentTranslation?.danish);
    const checkAnswerTranslateSentence = generalState(_ => _.checkAnswerTranslateSentence);
    const textarea = useRef(null);
    const addLetter = (letter: string) => {
        ((textarea.current)! as HTMLTextAreaElement).value += letter;
    }

    useEffect(() => {
        ((textarea.current)! as HTMLTextAreaElement).focus();
    }, [danish]);

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
                ref={textarea}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        checkAnswerTranslateSentence(textarea);
                        ((textarea.current)! as HTMLTextAreaElement).blur();
                    }
                }}
                autoFocus
                fontSize="xl"
                mt={4}
            />
            <HStack mt={2}>
                <Button p={1} size="sm" variant="outline" onClick={() => addLetter('æ')} isDisabled={gameState === States.CheckingAnswer}>æ</Button>
                <Button p={1} size="sm" variant="outline" onClick={() => addLetter('ø')} isDisabled={gameState === States.CheckingAnswer}>ø</Button>
                <Button p={1} size="sm" variant="outline" onClick={() => addLetter('å')} isDisabled={gameState === States.CheckingAnswer}>å</Button>
            </HStack>
            <NextStep textarea={textarea} />
            {gameState === States.CheckingAnswer && <TranslateSentenceFeedback />}
        </GeneralExercise>
    )
}

function NextStep({ textarea }: { textarea: React.MutableRefObject<null> }) {
    const gameState = generalState(_ => _.gameState);
    const answerScore = generalState(_ => _.answerScore);
    const addPositive = generalState(_ => _.addPositive);

    const checkAnswerTranslateSentence = generalState(_ => _.checkAnswerTranslateSentence);
    const addConditional = generalState(_ => _.addConditional);

    return (
        <HStack mt={4}>
            <Spacer />
            { (gameState === States.CheckingAnswer && answerScore === AnswerScore.WRONG) && <Button size="md" colorScheme="green" onClick={addPositive}>
                Mit svar var korrekt
            </Button>}
            <Button
                size="md"
                colorScheme="blue"
                onClick={() => {
                    if (gameState === States.RunningExercise) {
                        checkAnswerTranslateSentence(textarea);
                    }
                    else {
                        ((textarea.current)! as HTMLTextAreaElement).value = "";
                        addConditional();
                    }
                }}
                className={"nextStep"}>
                {gameState === States.RunningExercise ? "Tjek" : "Fortsæt"}
            </Button>
        </HStack>
    )
}

function TranslateSentenceFeedback() {
    const english = generalState(_ => _.currentTranslation?.english);
    const answerScore = generalState(_ => _.answerScore);

    const right = (
        <Alert status="success" variant="subtle" mt={"4"} p={5}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Du har ret!
            </AlertTitle>
        </Alert>
    )

    const wrong = (
        <Alert status="error" variant="subtle" mt={"4"} px={5} py={7}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Ups!
            </AlertTitle>
            <AlertDescription ml={5} mt={-3}>
                <Text mb={1}>Det rigtige svar er</Text>
                <SentenceDisplayer isDanish={false}>{english ?? ""}</SentenceDisplayer>
            </AlertDescription>
        </Alert>
    )

    const almost = (
        <Alert status="success" variant="subtle" mt={"4"} px={5} py={7}>
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