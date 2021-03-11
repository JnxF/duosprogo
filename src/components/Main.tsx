import { Box } from "@chakra-ui/layout";
import React from "react";
import { ExerciseType } from "../state/ExerciseType";
import { generalState } from "../state/state";
import { States } from "../state/States";
import GuessMeaning from "./exercises/GuessMeaning";
import Jumbotron from "./exercises/Jumbotron";
import Summary from "./exercises/Summary";
import TranslateSentence from "./exercises/TranslateSentence";

export default function Main() {
    const exerciseType = generalState(state => state.exerciseType);
    const gameState = generalState(state => state.gameState);

    let content: JSX.Element = <></>;

    switch (gameState) {
        case States.Jumbotron:
            content = <Jumbotron />;
            break;
        case States.RunningExercise:
        case States.CheckingAnswer:
            content = exerciseType === ExerciseType.GuessMeaningExercise ? <GuessMeaning /> : <TranslateSentence />
            break;
        case States.FinalSummary:
            content = <Summary />
            break;
    }

    return (<>
        <Box p={8} borderWidth="2px" borderRadius="lg">
            {content}
        </Box>
    </>)
}