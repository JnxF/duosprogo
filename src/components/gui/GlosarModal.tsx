import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Text, Tr, useDisclosure } from "@chakra-ui/react";
import { organizedTranslations } from "../../Data";

export function GlosarModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (<>
        <Button size="sm" onClick={onOpen} rightIcon={<ArrowForwardIcon />} colorScheme="blue" variant="outline">Viser glosar</Button>
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Glosar</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Accordion allowToggle>
                        {Object.entries(organizedTranslations).map(([modul, categories], idx1) => <AccordionItem key={idx1}>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    <Heading size="md">Modul {modul}</Heading>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4} ml={5}>
                                {Object.entries(categories).map(([category, translations], idx2) => <Box key={idx2}>
                                    <Heading size="sm">
                                        {category.replace(/_/g, " ")}
                                        <Badge ml={3} variant="solid" colorScheme="blue">{translations.length}</Badge>
                                    </Heading>
                                    <Table size="sm" mt={3} mb={7} variant="striped" colorScheme="blackAlpha">
                                        <Tbody>
                                            {translations.map((translation, idx) => (
                                                <Tr key={idx}>
                                                    <Td w={"50%"}>{translation.danish}</Td>
                                                    <Td w={"50%"}>{translation.english}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Box>
                                )}
                            </AccordionPanel>
                        </AccordionItem>
                        )}
                    </Accordion>
                    <Heading size={"sm"} mt={5} color={"red.600"}>Bæmark!</Heading>
                    <Text mt={1}>
                        Dette glosaret er ikke blevet gennemgået af nogen.
                        Hvis der er nogen fejl, bedes du kontakte forfatteren.
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Lukke
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>);
}
