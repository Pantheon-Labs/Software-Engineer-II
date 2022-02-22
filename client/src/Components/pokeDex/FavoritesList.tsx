import { useEffect, MouseEvent  } from "react";
import axios from "axios";
import {
   List,
   Box,
   OrderedList,
   HStack,
   Heading,
   Center,
   Grid,
   GridItem,
} from "@chakra-ui/react";
import { ToastHook } from "../utils/ToastHook";

import { CloseButton } from "@chakra-ui/react";

interface FavoritesListProps {
   favoritesList: {
      name: string, 
      favorites_id: string
   }[],
   updateFavoritesList: React.Dispatch<React.SetStateAction<any>>,
}

const FavoritesList = (props: FavoritesListProps) => {
   const { favoritesList, updateFavoritesList } = props;
   const [toast, newToast] = ToastHook();

   const selectBtn = async (e: MouseEvent) => {
      let id = (e.currentTarget as HTMLInputElement).id
      try {
         return await axios
            .delete(`http://localhost:4000/pokeDexFavorites?id=${id}`)
            .then((response) => {
               updateFavoritesList(response.data.rows);
               newToast({ title: "Success", description: "Pokemon deleted from favorites", status: "success"})
            })
            .catch((e) => {
               if (e.response.status === 500) {
                  newToast({ title: "Request Error", description: e.response.data, status: "error"})
               }
         });
      } catch {
         newToast({ title: "Network Disconnected", description: "Unable to delete Pokemon from favorites.", status: "warning"})
      }
   };

   useEffect(() => {
      const getPokeDexFavorites = async () => {
         await axios
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
                                       onClick={(e: React.MouseEvent<HTMLInputElement>) => selectBtn(e)}
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
