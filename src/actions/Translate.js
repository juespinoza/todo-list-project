const enCodigo = "en-US";
const spCodigo = "es-ES";
const spPyCodigo = "es-PY";
const spArCodigo = "es-AR";

export const logOutLink = (lang) => {
    switch (lang.toLowerCase()){
      case enCodigo.toLowerCase():
        return 'Logout';
      case spCodigo.toLowerCase():
        return 'Desconectar';
    }
    return 'Log-out';
}

// export default logOutLink;
