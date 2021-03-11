import { Badge, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { data } from "../../Data";

export default function SentenceDisplayer({ children, isDanish }: { children: string, isDanish: boolean }) {
    return (
        <Text fontSize="2xl" className={"sentence"}>
            {children.split(" ").map(word => {
                const toLower = word.toLowerCase();
                const objectiveWords = isDanish ? data.filter(t => t.danish.toLowerCase() === toLower).map(t => t.english)
                    : data.filter(t => t.english.toLowerCase() === toLower).map(t => t.danish);
                const objectiveWord = (objectiveWords !== []) ? objectiveWords[0] : undefined;

                if (objectiveWord) {
                    return (<>
                        <Tooltip label={objectiveWord} color='gray.50' aria-label="A tooltip">
                            <Text as="span" borderBottom="2px" borderColor={"gray.300"} pb={2}>{word}</Text>
                        </Tooltip>{' '}
                    </>)
                } else {
                    return <><Text as="span">{word}</Text>{' '}</>
                }


            })}
            <Badge variant="outline" ml="4" fontSize="0.8em" colorScheme="gray">
                {isDanish ? "DK" : "EN"}
            </Badge>
        </Text >
    )
}