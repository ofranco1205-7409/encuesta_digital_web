import { useState, useEffect, createContext } from "react";
import { Folio } from "../api";
import { hasExpiredToken } from "../utils";

const folioController = new Folio();

export const FolioContext = createContext();

export function FolioProvider(props) {
  const { children } = props;
  const [folio, setFolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const fToken = folioController.getFolioStorage();

      console.log("loading", loading);
      console.log("Tocken en storage", fToken);

      if (!fToken) {
        limpiaFolioStorage();
        setLoading(false);
        return;
      }
      console.log("1");
      if (hasExpiredToken(fToken)) {
        limpiaFolioStorage();
      } else {
        await setFolioCtx(fToken);
      }
      console.log("2");
      setLoading(false);
    })();
  }, []);

  const setFolioCtx = async (fToken) => {
    try {
      //Equivalente a getMe
      const response = await folioController.decode(fToken);
      console.log("decode response", response);
      setFolio(response);
    } catch (error) {
      console.error(error);
    }
  };

  const limpiaFolioStorage = () => {
    setFolio(null);
    folioController.removeFolioStorage();
  };

  const data = {
    folio,
    setFolioCtx,
    limpiaFolioStorage,
  };

  if (loading) return null;

  return <FolioContext.Provider value={data}>{children}</FolioContext.Provider>;
}
