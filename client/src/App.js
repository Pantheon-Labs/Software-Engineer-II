import { ChakraProvider } from "@chakra-ui/react";
import { Index as CatFacts } from "./Components/catFacts/Index";
import { Index as DogFacts } from "./Components/dogFacts/Index";
import { Index as PokeDex } from "./Components/pokeDex/Index";

function App() {
   return (
      <ChakraProvider>
         <CatFacts />
         <DogFacts />
         <PokeDex />
      </ChakraProvider>
   );
}

export default App;
