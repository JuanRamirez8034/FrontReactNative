/**
 * Componente del useTogglePasswordVisibility
 */
import { useState } from "react";

/**
 * Funcion principal del useTogglePasswordVisibility (para ocultar contraseña)
 */
export const useTogglePasswordVisibility = () => {
  /**
   * Declaración de los estados
   */
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("ojoTachado");

  /**
   * Función para cambiarle el estado al ojito
   */
  const handlePasswordVisibility = (valor = false) => {
    if (rightIcon === "ojoTachado") {
      setRightIcon("ojoNormal");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "ojoNormal") {
      setRightIcon("ojoTachado");
      setPasswordVisibility(!passwordVisibility);
    }

    if (valor === true) {
      setPasswordVisibility(true);
    }
  };

  /**
   * Return del componente
   */
  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};
