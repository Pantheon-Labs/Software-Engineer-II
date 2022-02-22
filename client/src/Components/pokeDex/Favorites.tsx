import axios from "axios";
import { Button, toast, useToast } from "@chakra-ui/react";
import {ToastHook} from "../utils/ToastHook"


interface FavoritesProps {
   updateFavoritesList: React.Dispatch<React.SetStateAction<string>>,
   name: string
}

export const Favorites = (props: FavoritesProps) => {
   const { updateFavoritesList, name } = props;

   const [toast, newToast] = ToastHook();

   const handleFavorite = async () => {
      try {
         await axios
         .post(`http://localhost:4000/pokeDexFavorites?name=${name}`)
         .then((response) => {
            updateFavoritesList(response.data.rows);
            newToast({ title: "Success", description: "Pokemon added to favorites", status: "success"})
         })
         .catch((e) => {
            if (e.response.status === 500) {
               newToast({ title: "Request Error", description: e.response.data, status: "error"})
               // return Toast("Request Error", e.response.status, "error")
            }
         });
      } catch {
         newToast({ title: "Network Disconnected", description: "Unable to add Pokemon to favorites.", status: "warning"})
      }
   };

   return (
      <Button variant="outline" width="100%" onClick={() => {
         handleFavorite();
         // Toast("Network Disconnection Error", "Unable to request Pokemon favorites.", "error")
         // toasty({
         //    title: "Account created.",
         //    description: "We've created your account for you.",
         //    status: "success",
         //    duration: 9000,
         //    isClosable: true,
         // })
      }}>
         Add to Favorite
      </Button>
   );
};

export default Favorites;
