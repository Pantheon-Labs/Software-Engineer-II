import { Box, Button, ButtonGroup, Center } from "@chakra-ui/react";
import { useState } from "react";
import { Index as CatFacts } from "./catFacts/Index";
import { Index as DogFacts } from "./dogFacts/Index";

export const Index = () => {
   const [factChoice, setFactChoice] = useState("Dog");

   const changeChoice = (e) => {
      setFactChoice(e.target.name);
   };
   return (
      <div>
         <Center>
            <Box
               maxW="sm"
               borderWidth="1px"
               borderRadius="lg"
               overflow="hidden"
               mt="4"
            >
               <div>
                  <Center>
                     <ButtonGroup>
                        <Button
                           size="md"
                           colorScheme="blue"
                           name="Dog"
                           onClick={(e) => changeChoice(e)}
                        >
                           Dog
                        </Button>
                        <Button
                           size="md"
                           colorScheme="blue"
                           name="Cat"
                           onClick={(e) => changeChoice(e)}
                        >
                           Cat
                        </Button>
                     </ButtonGroup>
                  </Center>
               </div>

               <div>
                  <Center>
                     {factChoice === "Dog" ? <DogFacts /> : <CatFacts />}
                  </Center>
               </div>
            </Box>
         </Center>
      </div>
   );
};
