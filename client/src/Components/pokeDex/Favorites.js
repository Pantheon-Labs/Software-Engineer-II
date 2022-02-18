import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";

export const Favorites = (props) => {
   const { favoritesList, updateFavoritesList, name } = props;
   const handleFavorite = (e) => {
      const postPokiDexFavorite = async () => {
         try {
            const request = await axios
               .post(`http://localhost:4000/pokeDexFavorites?name=${name}`)
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
      postPokiDexFavorite();
   };

   return (
      <Button variant="outline" width="100%" onClick={handleFavorite}>
         Add to Favorite
      </Button>
   );
};

export default Favorites;
