import React, { useEffect, useState } from "react";
import Favorites from "./Favorites";
import axios from "axios";

import {
   AspectRatio,
   Badge,
   Box,
   Button,
   ButtonGroup,
   Center,
   IconButton,
   Image,
   Table,
   TableCaption,
   Tbody,
   Td,
   Tfoot,
   Th,
   Thead,
   Tr,
   VStack,
} from "@chakra-ui/react";

export const Index = () => {
   const [pokeDex, setPokeDex] = useState({
      image: null,
      name: "",
      weight: 0,
      height: 0,
      base_experience: 0,
      abilities: [],
   });
   const [offSet, setOffSet] = useState(1);

   const handleOffSet = (e) => {
      setTimeout(() => {
         if (e.target.name === "Next") {
            setOffSet(offSet + 1);
         } else if (e.target.name === "Back" && offSet > 1) {
            setOffSet(offSet - 1);
         }
      }, 100);
   };

   useEffect(() => {
      const getPokeDex = async () => {
         try {
            const request = await axios
               .get(`http://localhost:4000/pokeDex?offset=${offSet}`)
               .then((response) => {
                  console.log(response);
                  const {
                     name,
                     weight,
                     sprites,
                     height,
                     base_experience,
                     abilities,
                  } = response.data;
                  setPokeDex({
                     image: sprites.front_default,
                     name: name,
                     weight: weight,
                     height: height,
                     base_experience: base_experience,
                     abilities: abilities,
                  });
               })
               .catch((error) => {
                  console.log(error);
               });
         } catch (e) {
            console.log(e);
         }
      };
      getPokeDex();
   }, [offSet]);

   return (
      <div>
         <Box>
            <AspectRatio maxW="100%" ratio={4 / 3}>
               <Image
                  objectFit="cover"
                  src={pokeDex.image}
                  alt={pokeDex.name}
               />
            </AspectRatio>
            <Box p="6">
               <Table variant="striped" colorScheme="teal">
                  <Tbody>
                     <Tr>
                        <Td>Name</Td>
                        <Td>{pokeDex.name.toUpperCase()}</Td>
                     </Tr>
                     <Tr>
                        <Td>Weight</Td>
                        <Td>{pokeDex.weight}</Td>
                     </Tr>
                     <Tr>
                        <Td>Height</Td>
                        <Td>{pokeDex.height} ft.</Td>
                     </Tr>
                     <Tr>
                        <Td>Base EXP</Td>
                        <Td>{pokeDex.base_experience}</Td>
                     </Tr>
                     <Tr>
                        <Td>Abilities</Td>
                        <Td>
                           {pokeDex.abilities
                              .map((i) => i.ability.name)
                              .join(", ")
                              .toUpperCase()}
                        </Td>
                     </Tr>
                  </Tbody>
               </Table>
            </Box>

            <VStack mt="4" mb="4">
               <ButtonGroup width="100%">
                  <Button
                     width="100%"
                     size="lg"
                     colorScheme="blue"
                     name="Back"
                     disabled={offSet > 1 ? false : true}
                     onClick={(e) => handleOffSet(e)}
                  >
                     Back
                  </Button>
                  <Button
                     width="100%"
                     size="lg"
                     colorScheme="blue"
                     name="Next"
                     onClick={(e) => handleOffSet(e)}
                  >
                     Next
                  </Button>
               </ButtonGroup>
               <Favorites name={pokeDex.name} />
            </VStack>
         </Box>
      </div>
   );
};
