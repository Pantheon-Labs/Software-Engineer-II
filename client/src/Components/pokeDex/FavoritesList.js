import React, { useEffect, useState } from "react";
import axios from "axios";
import {
   Button,
   List,
   Box,
   OrderedList,
   ListItem,
   IconButton,
   HStack,
   Heading,
   Center,
   Grid,
   GridItem,
} from "@chakra-ui/react";

import { CloseButton } from "@chakra-ui/react";

const FavoritesList = (props) => {
   const { favoritesList, updateFavoritesList } = props;

   const selectBtn = async (e) => {
      let id = e.currentTarget.id;
      try {
         const request = await axios
            .delete(`http://localhost:4000/pokeDexFavorites?id=${id}`)
            .then((response) => {
               updateFavoritesList(response.data.rows);
            })
            .catch((error) => {
               console.log(error);
            });
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      const getPokeDexFavorites = async () => {
         const request = await axios
            .get(`http://localhost:4000/pokeDexFavorites`)
            .then(
               (response) => {
                  updateFavoritesList(response.data.rows);
               },
               (error) => {
                  console.log(error);
               }
            );
      };
      getPokeDexFavorites();
   }, [updateFavoritesList]);

   return (
      <div>
         <Box display="flex" flexDirection="column">
            <Center>
               <Heading>Favorites</Heading>
            </Center>

            <List overflowY="scroll" maxH="60vh">
               <OrderedList>
                  {favoritesList.map((i, key) => {
                     return (
                        <div key={key}>
                           <HStack>
                              <Grid
                                 templateColumns="repeat(5, 1fr)"
                                 width="100%"
                                 bg="rgba(0, 0, 0, 0.2)"
                                 mb="1"
                                 display="flex"
                                 justifyContent="space-between"
                                 p="1"
                              >
                                 <GridItem colSpan={3} h="10">
                                    {i.name}
                                 </GridItem>
                                 <GridItem colStart={4} colEnd={6} h="10">
                                    <CloseButton
                                       id={i.favorites_id}
                                       onClick={(e) => selectBtn(e)}
                                    />
                                 </GridItem>
                              </Grid>
                           </HStack>
                        </div>
                     );
                  })}
               </OrderedList>
            </List>
         </Box>
      </div>
   );
};

export default FavoritesList;
