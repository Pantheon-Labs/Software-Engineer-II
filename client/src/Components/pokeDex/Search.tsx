import { useEffect, useState, MouseEvent } from "react";
import axios from "axios";
import { Heading, List, ListItem } from "@chakra-ui/react";

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

   const choosePokemon = (e: MouseEvent) => {
      setOffSet(parseInt(e.currentTarget.id));
   };

   useEffect(() => {
      const searchPokeDex = async () => {
         try {return await axios
            .get(`http://localhost:4000/pokeDex/all`)
            .then((response) => {
               setPokeList(response.data.results);
            })
            .catch((e) => {
               if (e.response.status === 500) {
                  return alert(e.response.data);
               }
            });
         } catch {
            alert("Network disconnected: Unable to request Pokemon list.")
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
