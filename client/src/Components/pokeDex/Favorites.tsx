import { useEffect, useState, MouseEvent } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";

interface FavoritesProps {
   favoritesList: Array<String>,
   updateFavoritesList: React.Dispatch<React.SetStateAction<string>>,
   name: String
}

export const Favorites = (props: FavoritesProps) => {
   const { favoritesList, updateFavoritesList, name } = props;
   const handleFavorite = (e: MouseEvent) => {
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
