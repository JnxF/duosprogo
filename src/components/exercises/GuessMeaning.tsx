import { Alert, Box, Button, HStack, Spacer } from "@chakra-ui/react";
import { generalState } from "../../state/state";
import { States } from "../../state/States";
import SentenceDisplayer from "../helpers/SentenceDisplayer";
import GeneralExercise from "./GeneralExercise";

export default function GuessMeaning() {
    const state = generalState(_ => _.gameState);
    const danish = generalState(_ => _.currentTranslation?.danish);

    return (
        <GeneralExercise title="Forstår du det?">
            <SentenceDisplayer isDanish={true}>{danish ?? ""}</SentenceDisplayer>
            {state === States.RunningExercise && <ShowAnswerButton />}
            {state === States.CheckingAnswer && <RightOrWrong />}
        </GeneralExercise >
    )
}

function ShowAnswerButton() {
    const checkAnswer = generalState(_ => _.checkAnswerGuessMeaning);

    return (
        <HStack mt={8}>
            <Spacer />
            <Button size="md" colorScheme="blue" onClick={checkAnswer} className={"nextStep"}>Vis</Button>
        </HStack>
    )
}

function RightOrWrong() {
    const english = generalState(_ => _.currentTranslation?.english);
    const addNegative = generalState(_ => _.addNegative);
    const addPositive = generalState(_ => _.addPositive);

    return (
        <Box>
            <Alert status="info" variant="subtle" mt={"4"} p={5}>
                <SentenceDisplayer isDanish={false}>{english ?? ""}</SentenceDisplayer>
            </Alert>
            <HStack mt={8}>
                <Spacer />
                <Button size="md" colorScheme="red" onClick={addNegative}>Jeg gjorde ikke</Button>
                <Button size="md" colorScheme="green" onClick={addPositive} className={"nextStep"}>Jeg gjorde</Button>
            </HStack>
        </Box>
    )
}