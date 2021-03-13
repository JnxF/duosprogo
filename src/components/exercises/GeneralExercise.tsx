import { Box, Heading } from "@chakra-ui/react";

export default function GeneralExercise({ children, title }: { children: any, title: string }) {
    return (
        <>
            <Heading size="lg" mb={3}>
                {title}
            </Heading>

            <Box>{children}</Box>
        </>
    )
}