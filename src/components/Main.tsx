import { Box } from "@chakra-ui/layout";
import { ExerciseType } from "../state/ExerciseType";
import { generalState } from "../state/state";
import { States } from "../state/States";
import GuessMeaning from "./exercises/GuessMeaning";
import Jumbotron from "./exercises/Jumbotron";
import Summary from "./exercises/Summary";
import TranslateSentence from "./exercises/TranslateSentence";
import ProgressGame from "./helpers/ProgressGame";

export default function Main() {
    const exerciseType = generalState(_ => _.exerciseType);
    const gameState = generalState(_ => _.gameState);

    let content: JSX.Element = <></>;

    switch (gameState) {
        case States.Jumbotron:
            content = <Jumbotron />
            break;
        case States.RunningExercise:
        case States.CheckingAnswer:
            content = exerciseType === ExerciseType.GuessMeaningExercise
                ? <><ProgressGame /><GuessMeaning /></>
                : <><ProgressGame /><TranslateSentence /></>
            break;
        case States.FinalSummary:
            content = <Summary />
            break;
    }

    return (<>
        <Box p={5} borderWidth="2px" borderRadius="lg">
            {content}
        </Box>
    </>)
}