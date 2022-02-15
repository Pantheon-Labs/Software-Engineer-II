import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@chakra-ui/react";

export const Index = () => {
   const [pokeDex, setPokeDex] = useState([]);
   const [offSet, setOffSet] = useState(1);

   function handleOffSet(e) {
      if (e.target.name === "Next") {
         setOffSet(offSet + 1);
      } else if (e.target.name === "Back" && offSet > 1) {
         setOffSet(offSet - 1);
      }
   }

   useEffect(() => {
      const getPokeDex = async () => {
         try {
            const request = await axios
               .get(`http://localhost:4000/pokeDex?offset=${offSet}`)
               .then((response) => {
                  const { name, weight, sprites } = response.data;
                  setPokeDex({
                     name: name,
                     weight: weight,
                     sprites: sprites.front_default,
                  });
               })
               .catch((error) => {
                  console.log(error);
               });
         } catch (e) {
            console.log(e);
         }
      };
      getPokeDex();
   }, [offSet]);
   console.log(pokeDex);
   return (
      <div>
         <h1>Pokedex</h1>
         <div>{pokeDex.name}</div>
         <div>{pokeDex.weight}</div>
         <img src={pokeDex.sprites} />
         <div></div>
         <Button
            colorScheme="blue"
            name="Back"
            disabled={offSet > 1 ? false : true}
            onClick={(e) => handleOffSet(e)}
         >
            Back
         </Button>
         <Button
            colorScheme="blue"
            name="Next"
            onClick={(e) => handleOffSet(e)}
         >
            Next
         </Button>
         {offSet}
      </div>
   );
};
