import { Box, ChakraProvider, Flex, theme } from "@chakra-ui/react";
import * as React from "react";
import './App.scss';
import Footer from "./components/gui/Footer";
import Header from "./components/gui/Header";
import Modules from "./components/gui/Modules";
import { Score } from "./components/gui/Score";
import Main from "./components/Main";
import { generalState } from "./state/state";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box minHeight={"100vh"} marginBottom={"-72px"}>
        {/* Header */}
        <Header />

        {/* Main */}
        <Flex px={5} mb={10} alignItems={"flex-start"} justifyContent={"space-evenly"} direction={["column", null, "row"]}>
          {/* Left */}
          <Box order={[2, 2, 0]} minWidth={"260px"} p={5} borderWidth="2px" borderRadius="lg" width={["100%", "100%", "auto"]} mb={4}>
            <Modules />
          </Box>

          {/* Center */}
          <Box flex={1} px={{ sm: 0, md: "1rem" }} mb={4} width="100%">
            <Main />
          </Box>

          {/* Right */}
          <Box order={[-1, -1, 0]} w={["100%", "100%", "auto"]}>
            <Score
              right={generalState(_ => _.correctAnswers)}
              wrong={generalState(_ => _.wrongAnswers)}
            />
          </Box>

        </Flex>

        <Box mb={"72px"} />
      </Box>
      <Footer />


      {/* Footer */}
    </ChakraProvider>
  )
}