import React, { useEffect, useState } from "react";
import axios from "axios";

export const Index = () => {
   const [dogFact, setDogFact] = useState("");

   useEffect(() => {
      const getDogFact = async () => {
         try {
            const request = await axios
               .get("http://localhost:4000/dogFacts")
               .then((response) => {
                  setDogFact(response.data);
               })
               .catch((error) => {
                  console.log(error);
               });
         } catch (e) {
            console.log(e);
         }
      };
      getDogFact();
   }, []);
   return (
      <div>
         <h1>{dogFact}</h1>
      </div>
   );
};
