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
} from "@chakra-ui/react";

import { CloseButton } from "@chakra-ui/react";

const FavoritesList = () => {
   const [favoritesList, updateFavoritesList] = useState([]);

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
         try {
            const request = await axios
               .get(`http://localhost:4000/pokeDexFavorites`)
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
      getPokeDexFavorites();
   }, []);

   favoritesList.map((i) => {
      console.log(i.name);
   });
   return (
      <div>
         <Box>
            <h1>Favorites</h1>
            <List>
               <OrderedList>
                  {favoritesList.map((i, key) => {
                     return (
                        <div key={key}>
                           <HStack>
                              <ListItem>{i.name}</ListItem>
                              <CloseButton
                                 id={i.favorites_id}
                                 onClick={(e) => selectBtn(e)}
                              />
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
