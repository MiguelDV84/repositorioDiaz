import React, { useState, useEffect } from "react";
export default function Image({ imageName }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`../../../../../api-rest-red-social/uploads/avatars/${imageName}`);
        setImageSrc(imageModule.default);
      } catch (error) {
        console.log(error);
      }
    };

    loadImage();
  }, [imageName]);

  if (!imageSrc) {
    return <p>Cargando imagen...</p>;
  }

  return <div className="user__image"><img src={imageSrc} alt="Imagen dinámica" /></div>;
}
