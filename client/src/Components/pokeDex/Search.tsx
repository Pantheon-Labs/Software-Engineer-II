import { useEffect, useState, MouseEvent } from "react";
import axios from "axios";
import { Heading, List, ListItem } from "@chakra-ui/react";
import { ToastHook } from "../utils/ToastHook";

interface SearchProps {
   offSet: number,
   setOffSet: React.Dispatch<React.SetStateAction<number>>,
}

interface IpokeList {
   name: string
 }

const Search = (props: SearchProps) => {
   const { offSet, setOffSet } = props;
   const [pokeList, setPokeList] = useState<IpokeList[]>([]);
   const [toast, newToast] = ToastHook();
   
   const choosePokemon = (e: MouseEvent) => {
      setOffSet(parseInt(e.currentTarget.id));
   };

   useEffect(() => {
      const searchPokeDex = async () => {
         try {return await axios
            .get(`http://localhost:4000/pokeDex/all`)
            .then((response) => {
               setPokeList(response.data.results);
               newToast({ title: "Success", description: "Fetched Pokemon list", status: "success"})
            })
            .catch((e) => {
               if (e.response.status === 500) {
                  newToast({ title: "Request Error", description: e.response.data, status: "error"})
               }
            });
         } catch {
            newToast({ title: "Network Disconnected", description: "Unable to request Pokemon list", status: "warning"})
         }
      };

      searchPokeDex();
   }, []);

   return (
      <div>
         <Heading>Search</Heading>
         <List as="ol" styleType="decimal" overflowY="scroll" maxH="60vh">
            {pokeList.map((i, key: number) => (
               <ListItem
                  p="2"
                  key={key}
                  id={(key + 1).toString()}
                  _hover={{
                     background: "white",
                     color: "teal.500",
                  }}
                  onClick={(e) => choosePokemon(e)}
               >
                  {i.name.toUpperCase()}
               </ListItem>
            ))}
         </List>
      </div>
   );
};

export default Search;
