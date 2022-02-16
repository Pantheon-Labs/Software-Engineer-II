import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heading, List, ListItem } from "@chakra-ui/react";

const Search = (props) => {
   const { offSet, setOffSet } = props;
   const [pokeList, setPokeList] = useState([]);
   const [pokemon, pickPokemon] = useState("");

   const choosePokemon = (e) => {
      setOffSet(e.currentTarget.id);
   };

   useEffect(() => {
      const searchPokeDex = async () => {
         try {
            const request = await axios
               .get(`http://localhost:4000/pokeDex/all`)
               .then((response) => {
                  setPokeList(response.data.results);
               })
               .catch((error) => {
                  console.log(error);
               });
         } catch (e) {
            console.log(e);
         }
      };
      searchPokeDex();
   }, []);

   return (
      <div>
         <Heading>Search</Heading>
         <List as="ol" styleType="decimal" overflowY="scroll" maxH="60vh">
            {pokeList.map((i, key) => (
               <ListItem
                  p="2"
                  name={i.name}
                  id={key + 1}
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
