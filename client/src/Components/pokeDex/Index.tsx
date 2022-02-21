import { useEffect, useState, MouseEvent } from "react";
import Favorites from "./Favorites";
import axios from "axios";

import {
   AspectRatio,
   Badge,
   Box,
   Button,
   ButtonGroup,
   Center,
   Heading,
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

interface IndexProps {
   favoritesList: Array<string>,
   updateFavoritesList: React.Dispatch<React.SetStateAction<any>>,
   offSet: number,
   setOffSet: React.Dispatch<React.SetStateAction<number>>,
}

interface IpokeDex {
   image: null,
   name: string, 
   weight: number,
   height: number,
   base_experience: number,
   abilities: {
      ability: {
         name: string
      },
   }[],
   types: {
      type: {
         name: string
      }
   }[]
}

export const Index = (props: IndexProps) => {
   const { offSet, setOffSet, favoritesList, updateFavoritesList } = props;
   const [pokeDex, setPokeDex] = useState<IpokeDex>({
      image: null,
      name: "",
      weight: 0,
      height: 0,
      base_experience: 0,
      abilities: [],
      types: [],
   });

   const handleOffSet = (e: MouseEvent) => {
      let btnName = (e.target as HTMLInputElement).name;
      setTimeout(() => {
         if (btnName === "Next") {
            setOffSet(offSet + 1);
         } else if (btnName === "Back" && offSet > 1) {
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
                  const {
                     name,
                     weight,
                     sprites,
                     height,
                     base_experience,
                     abilities,
                     types,
                  } = response.data;
                  setPokeDex({
                     image: sprites.front_default,
                     name: name,
                     weight: weight,
                     height: height,
                     base_experience: base_experience,
                     abilities: abilities,
                     types: types,
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
         <Box display="flex" flexDirection="column">
            <Center>
               <Heading>{pokeDex.name.toUpperCase()}</Heading>
            </Center>
            <AspectRatio maxW="100%" ratio={4 / 3}>
               <Image
                  objectFit="cover"
                  src={pokeDex.image}
                  alt={pokeDex.name}
               />
            </AspectRatio>
            <Box>
               {pokeDex.types.map((i, index) => (
                  <Badge
                     mr="2"
                     mb="2"
                     variant={index % 2 ? "outline" : "solid"}
                     key={index}
                  >
                     {i.type.name}
                  </Badge>
               ))}
               <Table variant="striped" colorScheme="teal">
                  <Tbody>
                     <Tr>
                        <Td>Abilities</Td>
                        <Td>
                           {pokeDex.abilities
                              .map((i) => i.ability.name)
                              .join(", ")
                              .toUpperCase()}
                        </Td>
                     </Tr>
                     <Tr>
                        <Td>Weight</Td>
                        <Td>{pokeDex.weight} lbs.</Td>
                     </Tr>
                     <Tr>
                        <Td>Height</Td>
                        <Td>{pokeDex.height} ft.</Td>
                     </Tr>

                     <Tr>
                        <Td>Base EXP</Td>
                        <Td>{pokeDex.base_experience}</Td>
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
                     onClick={(e: React.MouseEvent<HTMLInputElement>) => handleOffSet(e)}
                  >
                     Back
                  </Button>
                  <Button
                     width="100%"
                     size="lg"
                     colorScheme="blue"
                     name="Next"
                     onClick={(e: React.MouseEvent<HTMLInputElement>) => handleOffSet(e)}
                  >
                     Next
                  </Button>
               </ButtonGroup>
               <Favorites
                  name={pokeDex.name}
                  favoritesList={favoritesList}
                  updateFavoritesList={updateFavoritesList}
               />
            </VStack>
         </Box>
      </div>
   );
};
