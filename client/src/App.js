import { Box, Center, ChakraProvider, HStack } from "@chakra-ui/react";
import { Index as PokeDex } from "./Components/pokeDex/Index";
import FavoritesList from "./Components/pokeDex/FavoritesList";
import { Index as ChooseFacts } from "./Components/chooseFacts/Index";

function App() {
   return (
      <ChakraProvider>
         <Center>
            <Box maxW="xlg" borderRadius="lg" overflow="hidden">
               <HStack>
                  <Box>
                     <PokeDex />
                  </Box>
                  <Box>
                     <FavoritesList />
                  </Box>
               </HStack>
            </Box>
         </Center>

         <ChooseFacts />
      </ChakraProvider>
   );
}

export default App;
