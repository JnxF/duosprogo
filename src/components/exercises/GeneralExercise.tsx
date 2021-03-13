import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import ProgressGame from "../helpers/ProgressGame";

export default function GeneralExercise({ children, title, showBar = true }: { children: any, title: string, showBar?: boolean }) {
    return (
        <>
            {showBar ? <ProgressGame /> : <></>}
            <Heading size="lg" mb={3}>
                {title}
            </Heading>

            <Box>{children}</Box>
        </>
    )
}