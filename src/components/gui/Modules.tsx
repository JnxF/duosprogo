import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Checkbox, Heading, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import React from "react";
import { organizedTranslations } from "../../Data";
import { generalState } from "../../state/state";

export default function Modules() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const activated = generalState(_ => _.modulsActivated);
    const toggleCategory = generalState(_ => _.toggleCategory);
    const selectedCategories = generalState(_ => _.selectedCategories);

    return <>
        {Object.entries(organizedTranslations).map(([modul, categories]) => (
            <Box mb="5" key={modul}>
                <Heading fontSize="md" mb="2">Modul {modul}</Heading>
                <Stack align={"left"} pl={{ xs: 2, md: 3 }} borderLeft={"2px"} borderColor={"gray.300"} spacing={{ sm: 0, md: 1 }}>
                    {Object.entries(categories).map(([category]) =>
                        <Checkbox
                            isDisabled={!activated}
                            size="sm"
                            pl={2}
                            key={category}
                            {...selectedCategories.includes(category) ? { "defaultIsChecked": true } : undefined}
                            onChange={(e) => toggleCategory(category)}
                        >
                            {category.replace(/_/g, " ")}
                        </Checkbox>
                    )}
                </Stack>
            </Box>
        ))
        }
        <Button size="sm" onClick={onOpen} rightIcon={<ArrowForwardIcon />} colorScheme="blue" variant="outline">Viser glosar</Button>
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
                    <Text mb={5}>
                        Glosaret for denne app er hentet fra Forlaget Synopes bøger{" "}
                        <Link color="blue.600" href="http://synope.dk/paa-vej-til-dansk.htm" isExternal>På vej til dansk <ExternalLinkIcon mx="2px" /></Link> (modul 1, eller DU 3.1) og{" "}
                        <Link color="blue.600" href="http://synope.dk/videre-mod-dansk.htm" isExternal>Videre mod dansk <ExternalLinkIcon mx="2px" /></Link> (modul 2, eller DU 3.2).
                    </Text>
                    <Accordion allowToggle>
                        {Object.entries(organizedTranslations).map(([modul, categories]) =>
                            <AccordionItem key={modul}>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        <Heading size="md">Modul {modul}</Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4} ml={5}>
                                    {Object.entries(categories).map(([category, translations]) =>
                                        <Box key={category}>
                                            <Heading size="sm">
                                                {category.replace(/_/g, " ")}
                                                <Badge ml={3} variant="solid" colorScheme="blue">{translations.length}</Badge>
                                            </Heading>
                                            <Table size="sm" mt={3} mb={7} variant="striped" colorScheme="blackAlpha">
                                                <Tbody>
                                                    {translations.map(translation => (
                                                        <Tr key={translation.danish + translation.english}>
                                                            <Td key={translation.danish} w={"50%"}>{translation.danish}</Td>
                                                            <Td key={translation.english} w={"50%"}>{translation.english}</Td>
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
    )
}