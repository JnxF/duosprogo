import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Alert, AlertIcon, AlertTitle, Button, Heading, HStack, Spacer, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"
import { generalState } from "../../state/state"
import GeneralExercise from "./GeneralExercise"

export default function Summary() {
    let wrongAnswers = generalState(_ => _.wrongAnswers)
    let feedback = (
        <Alert status="success" variant="solid" >
            <AlertIcon />
            <AlertTitle fontSize="lg">
                Wow!
            </AlertTitle>
            Du lavede ingen fejl. Alle tiders!
        </Alert>
    )

    if (wrongAnswers) {
        feedback = <>
            <Heading size="md">Forkerte oversættelser</Heading>
            <Text my={3}>
                Du lavede kun { } forkerte oversættelser.
                Her er de. Kopier dem i din notesbog for at styrke læringen.
            </Text>
            <Table size="sm" mt={3} mb={7} variant="striped" colorScheme="blackAlpha">
                <Thead>
                    <Tr>
                        <Th>Dansk</Th>
                        <Th>Engelsk</Th>
                        <Th>Kategori</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {generalState(_ => _.wrongTranslations).map(translation => (
                        <Tr>
                            <Td>{translation.danish}</Td>
                            <Td >{translation.english}</Td>
                            <Td>{translation.category.replace(/_/g, " ")}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    }

    return (
        <GeneralExercise title="🎉 Tillykke!">
            <Text fontSize="xl" mb={5}>
                Du er færdig med øvelsen. Nu ved du lidt mere dansk!
            </Text>
            {feedback}
            <HStack mt={8}>
                <Spacer />
                <Button size="md" colorScheme="blue" rightIcon={<ArrowForwardIcon />} onClick={generalState(_ => _.reset)} className={"nextStep"}>Starte igen</Button>
            </HStack>
        </GeneralExercise>
    )
}