import { Box, ChakraProvider, Container, Flex, theme } from "@chakra-ui/react";
import * as React from "react";
import { generalState } from "../state/state";
import './App.scss';
import Footer from "./gui/Footer";
import Header from "./gui/Header";
import Modules from "./gui/Modules";
import { Score } from "./gui/Score";
import Main from "./Main";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* Header */}
      <Header />

      {/* Main */}
      <Flex pl={20} pr={20} pb={10} align={"flex-start"}>
        {/* Left */}
        <Box p={5} borderWidth="2px" borderRadius="lg" w={250}>
          <Modules />
        </Box>

        {/* Center */}
        <Container maxW="container.sm">
          <Main />
        </Container>

        {/* Right */}
        <Box>
          <Score
            right={generalState(state => state.correctAnswers)}
            wrong={generalState(state => state.wrongAnswers)}
          />
        </Box>

      </Flex>

      {/* Footer */}
      <Footer />
    </ChakraProvider>
  )
}