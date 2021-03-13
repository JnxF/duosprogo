import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Checkbox, Heading, Stack } from "@chakra-ui/react";
import { organizedTranslations } from "../../Data";
import { generalState } from "../../state/state";
import { GlosarModal } from "./GlosarModal";

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