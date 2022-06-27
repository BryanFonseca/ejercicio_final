import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);
  const [hasError, setHasError] = useState(false); // este puede ser inferido

  // when sending a post request this assumes you expect json
  const sendRequest = async (options) => {
    try {
      setServerErrorMessage(null);
      setHasError(false);
      setIsLoading(true);
      const rawData = await fetch(options.url, {
        method: options.method ? options.method : "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: options.Authorization ? options.Authorization : null,
        },
        body:
          options.method.toUpperCase() !== "GET"
            ? JSON.stringify({
                ...options.body,
              })
            : null,
      });

      let syncHasError = false;
      if (!rawData.ok) {
        syncHasError = true;
        setHasError(true);
      }

      // el api nunca regresa un json vacío, es seguro trabajar con la data
      const data = await rawData.json();
      setIsLoading(false);

      if (syncHasError) {
        // el API garantiza que los errores contendrán un mensaje en la propiedad error del json retornado
        setServerErrorMessage(data.error);
        throw new Error(data.error);
      }

      return data;
    } catch (err) {
      setIsLoading(false);
      throw new Error(err.message);
    }
  };

  return { isLoading, serverErrorMessage, sendRequest, hasError };
};

export default useHttp;

// sendRequest retorna una promesa, esta se rechaza si la petición tiene un estado de
// error y su razón de rechazo es el mensaje de error retornado por el servidor
