import {
   Box,
   ChakraProvider,
   Container,
   Heading,
   HStack,
   SimpleGrid,
} from "@chakra-ui/react";

import { Index as PokeDex } from "./Components/pokeDex/Index";
import FavoritesList from "./Components/pokeDex/FavoritesList";
import Search from "./Components/pokeDex/Search";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";

function App() {
   const [offSet, setOffSet] = useState(1);
   const [favoritesList, updateFavoritesList] = useState([]);
   return (
      <ChakraProvider>
         <Box
            bgGradient={[
               "linear(to-tr, teal.300, yellow.400)",
               "linear(to-t, blue.200, teal.500)",
               "linear(to-b, orange.100, purple.300)",
            ]}
            minH="100vh"
         >
            <Container maxW="container.xl">
               <Heading>Pokidex</Heading>
               <SimpleGrid columns={3} spacing={20}>
                  <Box
                     bgColor="rgba(131, 142, 57, 0.14)"
                     borderTopRadius="lg"
                     p="10"
                  >
                     <PokeDex
                        offSet={offSet}
                        setOffSet={setOffSet}
                        favoritesList={favoritesList}
                        updateFavoritesList={updateFavoritesList}
                     />
                  </Box>

                  <Box
                     bgColor="rgba(131, 142, 57, 0.14)"
                     borderTopRadius="lg"
                     p="10"
                  >
                     <FavoritesList
                        favoritesList={favoritesList}
                        updateFavoritesList={updateFavoritesList}
                     />
                  </Box>
                  <Box
                     bgColor="rgba(131, 142, 57, 0.14)"
                     borderTopRadius="lg"
                     p="10"
                  >
                     <Search offSet={offSet} setOffSet={setOffSet} />
                  </Box>
               </SimpleGrid>
            </Container>
         </Box>
         <Footer />
      </ChakraProvider>
   );
}

export default App;
