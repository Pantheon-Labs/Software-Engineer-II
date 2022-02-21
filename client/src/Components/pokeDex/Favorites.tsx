import axios from "axios";
import { Button } from "@chakra-ui/react";

interface FavoritesProps {
   updateFavoritesList: React.Dispatch<React.SetStateAction<string>>,
   name: string
}

export const Favorites = (props: FavoritesProps) => {
   const { updateFavoritesList, name } = props;
   const handleFavorite = () => {
      const postPokiDexFavorite = async () => {
         try {
            await axios
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
