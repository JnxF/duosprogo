import { Alert, Button, HStack, Spacer } from "@chakra-ui/react";
import React from "react";
import SentenceDisplayer from "../helpers/SentenceDisplayer";
import { generalState } from "../state";
import GeneralExercise from "./GeneralExercise";

export default function GuessMeaning() {
    const danish = generalState(state => state.currentTranslation?.english);
    const english = generalState(state => state.currentTranslation?.danish);

    return (
        <GeneralExercise title="Forstår du det?">
            <SentenceDisplayer isDanish={true}>{english ?? ""}</SentenceDisplayer>
            <HStack mt={8}>
                <Spacer />
                <Button size="lg" colorScheme="blue" onClick={generalState(state => state.checkAnswer)}>Vis</Button>
            </HStack>
            <Alert status="info" variant="subtle" mt={"8"} p={5}>
                <SentenceDisplayer isDanish={false} answer>{danish ?? ""}</SentenceDisplayer>
            </Alert>
            <HStack mt={8}>
                <Spacer />
                <Button size="lg" colorScheme="red" onClick={generalState(state => state.addNegative)}>Jeg gjorde ikke</Button>
                <Button size="lg" colorScheme="green" onClick={generalState(state => state.addPositive)}>Jeg gjorde</Button>
            </HStack>
        </GeneralExercise >
    )
}