import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, List, Box, OrderedList, ListItem } from "@chakra-ui/react";

const FavoritesList = () => {
   const [favoritesList, updateFavoritesList] = useState([]);
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
                  {favoritesList.map((i) => {
                     return <ListItem key={i.favorites_id}>{i.name}</ListItem>;
                  })}
               </OrderedList>
            </List>
         </Box>
      </div>
   );
};

export default FavoritesList;
