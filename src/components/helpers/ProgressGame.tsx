import { Progress } from "@chakra-ui/progress";
import React from "react";
import { generalState } from "../state";

export default function ProgressGame() {
    const totalTranslations = generalState(state => state.totalTranslations);
    const completedTranslations = generalState(state => state.completedTranslations);
    const percent = 100 * completedTranslations / (totalTranslations + 0.01);

    return <>
        <p>{completedTranslations} / {totalTranslations}</p>
        <Progress mb={5} size="lg" value={percent} isAnimated={true} />
    </>
}