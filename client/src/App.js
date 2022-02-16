import {
   Box,
   Center,
   ChakraProvider,
   Container,
   Heading,
   HStack,
   SimpleGrid,
} from "@chakra-ui/react";
import { Index as PokeDex } from "./Components/pokeDex/Index";
import FavoritesList from "./Components/pokeDex/FavoritesList";
import { Index as ChooseFacts } from "./Components/chooseFacts/Index";

function App() {
   return (
      <ChakraProvider>
         <Box
            bgGradient={[
               "linear(to-tr, teal.300, yellow.400)",
               "linear(to-t, blue.200, teal.500)",
               "linear(to-b, orange.100, purple.300)",
            ]}
            minH="100vh"
            minV="100vw"
         >
            <Container maxW="container.xl">
               <Heading>Pokidex</Heading>
               <SimpleGrid columns={3} spacing={20}>
                  <Box
                     bgColor="rgba(131, 142, 57, 0.14)"
                     borderTopRadius="lg"
                     p="10"
                  >
                     <PokeDex />
                  </Box>

                  <Box
                     bgColor="rgba(131, 142, 57, 0.14)"
                     borderTopRadius="lg"
                     p="10"
                  >
                     <FavoritesList />
                  </Box>
               </SimpleGrid>
               {/* <ChooseFacts /> */}
            </Container>
         </Box>
      </ChakraProvider>
   );
}

export default App;
