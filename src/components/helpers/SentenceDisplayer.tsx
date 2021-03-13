import { Badge, Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { FaVolumeUp } from "react-icons/fa";
import { data } from "../../Data";

export default function SentenceDisplayer({ children, isDanish }: { children: string, isDanish: boolean }) {
    const browserSupportsSpeech = window.speechSynthesis.getVoices().some(v => v.lang === "da-DK");
    const displayTextToSpeechButton = isDanish && browserSupportsSpeech;

    return (
        <Flex fontSize="xl" className={"sentence"}>
            {displayTextToSpeechButton && <SpeechButton>{children}</SpeechButton>}
            <Box>
                <MappedText isDanish={isDanish}>{children}</MappedText>
                <Badge variant="outline" ml="1" fontSize="xs" colorScheme="gray">
                    {isDanish ? "DK" : "EN"}
                </Badge>
            </Box>
        </Flex>
    )
}

function SpeechButton({ children }: { children: string }) {
    const playSentence = () => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = children;
        msg.rate = 0.7;
        msg.lang = "da-DK";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(msg);
    };

    return <IconButton
        size="sm"
        fontSize="sm"
        variant="outline"
        colorScheme="blue"
        mr={3}
        icon={<FaVolumeUp />}
        onClick={playSentence}
        aria-label={"Play sentence"}
    />
}

function MappedText({ children, isDanish }: { children: string, isDanish: boolean }) {
    const translatedWord = (word: string) => {
        const toLower = word.toLowerCase();
        const objectiveWords = isDanish
            ? data.filter(t => t.danish.toLowerCase() === toLower).map(t => t.english)
            : data.filter(t => t.english.toLowerCase() === toLower).map(t => t.danish);
        return (objectiveWords.length !== 0) ? objectiveWords[0] : undefined;
    }

    return <Text as="span">
        {children.split(" ").map((word, idx) => {
            const tooltipHint = translatedWord(word);
            if (!tooltipHint) return <><Text as="span">{word}</Text>{' '}</>
            return (<Text as="span" key={idx}>
                <Tooltip label={tooltipHint} color='gray.50' aria-label="A tooltip">
                    <Text as="span" borderBottom="2px" borderColor={"gray.300"} pb={1}>{word}</Text>
                </Tooltip>{' '}
            </Text>)
        })}
    </Text>
}