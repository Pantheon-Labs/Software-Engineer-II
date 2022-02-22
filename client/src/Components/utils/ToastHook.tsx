import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const ToastHook = () => {
    const [state, setState] = useState(undefined);
    const chakraToast = useToast();


    useEffect(() => {
      if (state) {
          const {title, description, status} = state;

          chakraToast({
              title: title,
              description: description,
              status: status,
              duration: 2000,
              isClosable: true
          })
      }
    }, [state, chakraToast])

    return [state, setState]
}