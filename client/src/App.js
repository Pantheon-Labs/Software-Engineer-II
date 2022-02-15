import { ChakraProvider } from "@chakra-ui/react";
import { Index as PokeDex } from "./Components/pokeDex/Index";
import { Index as ChooseFacts } from "./Components/chooseFacts/Index";

function App() {
   return (
      <ChakraProvider>
         <PokeDex />
         <ChooseFacts />
      </ChakraProvider>
   );
}

export default App;
