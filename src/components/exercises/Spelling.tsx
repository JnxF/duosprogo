import { Button } from "@chakra-ui/button";
import { HStack, Spacer, Stack, Text } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AnswerScore } from "../../state/AnswerScore";
import { generalState } from "../../state/state";
import { States } from "../../state/States";
import { permuteWord } from "../../utils/permuteWord";
import shuffle from "../../utils/shuffle";
import SentenceDisplayer from "../helpers/SentenceDisplayer";
import GeneralExercise from "./GeneralExercise";

export function Spelling() {
    const formHook = useState("" as any)
    const gameState = generalState(_ => _.gameState);
    const checkAnswer = generalState(_ => _.checkAnswerSpelling)
    const addConditional = generalState(_ => _.addConditional)

    const english = generalState(_ => _.currentTranslation?.english);
    const danish = generalState(_ => _.currentTranslation?.danish) ?? "";
    const permuteRange = danish.length - 2;
    const [options, setOptions] = useState([] as string[])

    // Prevent options from changing
    useEffect(() => {
        let [good, wrong1, wrong2] = [danish, "", ""];

        // Shuffle one wrong answer once
        let trials = 0;
        do {
            wrong1 = permuteWord(danish, Math.random() * permuteRange);
            trials += 1;
        } while (wrong1 === good && trials < 30)

        // Shuffle the other wrong answer twice
        trials = 0;
        do {
            wrong2 = permuteWord(danish, Math.random() * permuteRange);
            wrong2 = permuteWord(wrong2, Math.random() * permuteRange);
            trials += 1;
        } while ([good, wrong1].includes(wrong2) && trials < 30)

        const optionCandidates = [good, wrong1, wrong2];
        shuffle(optionCandidates);
        setOptions(optionCandidates);
    }, [danish, permuteRange]);

    return (
        <GeneralExercise title="Hvad er den rigtige stavemåde?">
            <SentenceDisplayer isDanish={false}>{english ?? ""}</SentenceDisplayer>
            <TreeOptions formHook={formHook} options={options}></TreeOptions>
            <HStack mt={4}>
                <Spacer />
                <Button
                    size="md"
                    colorScheme="blue"
                    onClick={() => gameState === States.RunningExercise
                        ? checkAnswer(formHook[0] === danish)
                        : addConditional()
                    }
                    className={"nextStep"}
                >
                    {gameState === States.RunningExercise ? "Tjek" : "Fortsæt"}
                </Button>
            </HStack>
            { gameState === States.CheckingAnswer && <SpellingFeedback />}
        </GeneralExercise >
    )
}

function TreeOptions({ options, formHook }: { options: string[], formHook: any }) {
    const [selectedValue, setSelectedValue] = formHook;
    const gameState = generalState(_ => _.gameState)
    const [opt1, opt2, opt3] = options;
    return (
        <RadioGroup onChange={setSelectedValue} value={selectedValue} mt={5}>
            <Stack direction="column">
                <Radio size="lg" value={opt1} id={"radio1"} isDisabled={gameState === States.CheckingAnswer}>
                    <Text fontSize="xl">{opt1}</Text>
                </Radio>
                <Radio size="lg" value={opt2} id={"radio2"} isDisabled={gameState === States.CheckingAnswer}>
                    <Text fontSize="xl">{opt2}</Text>
                </Radio>
                <Radio size="lg" value={opt3} id={"radio3"} isDisabled={gameState === States.CheckingAnswer}>
                    <Text fontSize="xl">{opt3}</Text>
                </Radio>
            </Stack>
        </RadioGroup>
    )
}

function SpellingFeedback() {
    const danish = generalState(_ => _.currentTranslation?.danish);
    const answerScore = generalState(_ => _.answerScore);

    const right = (
        <Alert status="success" variant="subtle" mt={"4"} px={5} py={7}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Du har ret
            </AlertTitle>
            <AlertDescription ml={5}>
                <SentenceDisplayer isDanish={true}>{danish ?? ""}</SentenceDisplayer>
            </AlertDescription>
        </Alert>
    )

    const wrong = (
        <Alert status="error" variant="subtle" mt={"4"} px={5} py={7}>
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={1} mb={1} ml={5} fontSize="xl">
                Oops!
            </AlertTitle>
            <AlertDescription ml={5} mt={-3}>
                <Text mb={1}>Det rigtige svar er</Text>
                <SentenceDisplayer isDanish={true}>{danish ?? ""}</SentenceDisplayer>
            </AlertDescription>
        </Alert>
    )

    return answerScore === AnswerScore.RIGHT
        ? right
        : wrong;
}
