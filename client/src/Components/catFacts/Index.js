import React, { useEffect, useState } from "react";
import axios from "axios";

export const Index = () => {
   const [catFact, setCatFact] = useState("");

   useEffect(() => {
      const getCatFact = async () => {
         try {
            await axios
               .get("http://localhost:4000/catFacts")
               .then((response) => {
                  setCatFact(response.data);
               })
               .catch((error) => {
                  console.log(error);
               });
         } catch (e) {
            console.log(e);
         }
      };
      getCatFact();
   }, []);
   return (
      <div>
         <h1>{catFact}</h1>
      </div>
   );
};
