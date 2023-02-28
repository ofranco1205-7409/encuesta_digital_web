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

      console.log("ftoken", fToken);

      if (!fToken) {
        limpiaFolioStorage();
        setLoading(false);
        return;
      }

      if (hasExpiredToken(fToken)) {
        limpiaFolioStorage();
      } else {
        await setFolioCtx(fToken);
      }

      setLoading(false);
    })();
  }, []);

  /**
   * Decodifica fToken y lo busca en DB (equivalente a login)
   * Si existe, lo guarda localmente para uso posterior
   * @param {*} fToken
   */
  const setFolioCtx = async (fToken) => {
    try {
      const response = await folioController.decode(fToken);
      console.warn("response decode(fToken)", response);
      setFolio(response);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   *Limpia folio de storage
   */
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
