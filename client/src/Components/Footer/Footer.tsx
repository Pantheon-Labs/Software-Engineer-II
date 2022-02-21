import {
   Box,
   Center,
   ChakraProvider,
   Container,
   Heading,
   HStack,
   Link,
   SimpleGrid,
   Text,
} from "@chakra-ui/react";


import Maher_Halabi_Software from "../Files/Maher_Halabi_Software.pdf";

function Footer() {
   return (
      <Box mt={20} mb={12}>
         <Text fontSize="4xl" mt={12} fontWeight="bold" textAlign="center">
            Maher Halabi
         </Text>
         <Text
            fontSize="2xl"
            textAlign="center"
            maxW="800px"
            m="0 auto"
            borderBottom="1px #bbb solid"
            mt={4}
            pb={10}
         ></Text>
         <SimpleGrid columns={3} w="max-content" gap={20} m="0 auto" mt={6}>
            <Text>
               <Link href={Maher_Halabi_Software}>Resume</Link>
            </Text>
            <Text>
               <Link
                  href={"https://github.com/maherhalabi/Software-Engineer-II"}
               >
                  Github
               </Link>
            </Text>
            <Text>
               <Link href={"https://pokeapi.co/"}>Powered by PokeAPI</Link>
            </Text>
         </SimpleGrid>
      </Box>
   );
}

export default Footer;
