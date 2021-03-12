import { Progress } from "@chakra-ui/progress";
import { generalState } from "../../state/state";

export default function ProgressGame() {
    const totalTranslations = generalState(_ => _.totalTranslations);
    const completedTranslations = generalState(_ => _.completedTranslations);
    const percent = 100 * completedTranslations / (totalTranslations + 0.01);

    return (
        <Progress mb={5} size="lg" value={percent} isAnimated={true} />
    )
}