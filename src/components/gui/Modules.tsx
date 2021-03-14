import { Box, Checkbox, Heading, Stack } from "@chakra-ui/react";
import { organizedTranslations } from "../../Data";
import { generalState } from "../../state/state";
import { GlosarModal } from "./GlosarModal";

export default function Modules() {
    // Moduls hooks
    const modulsActivated = generalState(_ => _.modulsActivated);
    const setCategory = generalState(_ => _.setCategory);
    const selectedCategories = generalState(_ => _.selectedCategories);

    return <>
        {
            Object.entries(organizedTranslations).map(([modul, categories], idx1) => {
                const selectedCategoriesOfModul = Object.entries(categories).filter(([c]) => selectedCategories.includes(c));
                const isIndeterminate = selectedCategoriesOfModul.length !== 0 && selectedCategoriesOfModul.length !== Object.entries(categories).length;
                return (
                    <Box mb="5" key={idx1}>
                        <Heading fontSize="md" mb="2">
                            <Checkbox
                                defaultChecked={true}
                                isDisabled={!modulsActivated}
                                isIndeterminate={isIndeterminate}
                                size="md"
                                ml={0}
                                value={modul}
                                onClick={(e) => {
                                    Object.entries(categories).forEach(([cat]) => {
                                        setCategory(cat, (e.target as HTMLInputElement).checked);
                                    })
                                }}
                            >
                                Modul {modul}
                            </Checkbox>
                        </Heading>
                        <Stack align={"left"} ml={1} pl={1} borderLeft={"2px"} borderColor={"gray.300"} spacing={{ sm: 0, md: 1 }}>
                            {Object.entries(categories).map(([category], idx2) =>
                                <Checkbox
                                    isDisabled={!modulsActivated}
                                    isChecked={selectedCategories.includes(category)}
                                    size="sm"
                                    pl={2}
                                    key={idx2}
                                    onChange={(e) => setCategory(
                                        category,
                                        (e.target as HTMLInputElement).checked
                                    )}
                                >
                                    {category.replace(/_/g, " ")}
                                </Checkbox>
                            )}
                        </Stack>
                    </Box>
                )
            })
        }
        <GlosarModal />
    </>
}