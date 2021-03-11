import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Checkbox, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Tr, VStack } from "@chakra-ui/react";
import React from "react";
import { organizedTranslations } from "../../Data";
import { generalState } from "../../state/state";

export default function Modules() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const activated = generalState(state => state.modulsActivated);
    const toggleCategory = generalState(state => state.toggleCategory);

    return <>
        {Object.entries(organizedTranslations).map(([modul, categories]) => (
            <Box mb="5">
                <Heading fontSize="md" mb="2">Modul {modul}</Heading>
                <VStack align={"left"} pl={3} borderLeft={"2px"} borderColor={"gray.300"} spacing={1}>
                    {Object.entries(categories).map(([category]) =>
                        <Checkbox
                            isDisabled={!activated}
                            size="sm"
                            key={category}
                            onChange={(e) => toggleCategory(category)}
                        >
                            {category.replaceAll("_", " ")}
                        </Checkbox>
                    )}
                </VStack>
            </Box>
        ))
        }
        <Button size="sm" onClick={onOpen} rightIcon={<ArrowForwardIcon />} colorScheme="blue" isDisabled={!activated} variant="outline">Viser glosar</Button>
        <GlosarModal isOpen={isOpen} onClose={onClose} />
    </>
}

function GlosarModal({ isOpen, onClose }: any) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Glosar</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Accordion allowToggle>
                        {Object.entries(organizedTranslations).map(([modul, categories]) =>
                            <AccordionItem>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        <Heading size="md">Modul {modul}</Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4} ml={5}>
                                    {Object.entries(categories).map(([category, translations]) =>
                                        <>
                                            <Heading size="sm">
                                                {category.replaceAll("_", " ")}
                                                <Badge ml={3} variant="solid" colorScheme="blue">{translations.length}</Badge>
                                            </Heading>
                                            <Table size="sm" mt={3} mb={7} variant="striped" colorScheme="blackAlpha">
                                                <Tbody>
                                                    {translations.map(translation => (
                                                        <Tr>
                                                            <Td w={"50%"}>{translation.danish}</Td>
                                                            <Td w={"50%"}>{translation.english}</Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </>
                                    )}
                                </AccordionPanel>
                            </AccordionItem>
                        )}
                    </Accordion>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Lukke
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}