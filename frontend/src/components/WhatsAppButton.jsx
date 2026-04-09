function WhatsAppButton() {
  // Reemplaza con tu número real de WhatsApp (formato internacional sin +)
  const numero = '56948876478';
  const mensaje = encodeURIComponent('Hola, me gustaría agendar un lavado con Volcán Wash Móvil');
  const url = `https://wa.me/${numero}?text=${mensaje}`;

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="32" height="32" fill="currentColor">
          <path d="M16.004 0C7.164 0 0 7.163 0 16.004c0 2.822.736 5.577 2.137 8.006L.074 32l8.194-2.048A15.94 15.94 0 0016.004 32C24.836 32 32 24.836 32 16.004 32 7.163 24.836 0 16.004 0zm0 29.29a13.24 13.24 0 01-7.108-2.062l-.51-.303-4.862 1.215 1.236-4.749-.332-.527A13.2 13.2 0 012.71 16.004c0-7.332 5.962-13.294 13.294-13.294 7.331 0 13.286 5.962 13.286 13.294 0 7.332-5.955 13.286-13.286 13.286zm7.293-9.953c-.4-.2-2.367-1.168-2.734-1.301-.367-.134-.634-.2-.9.2-.268.4-1.035 1.301-1.269 1.568-.233.267-.467.3-.867.1-.4-.2-1.688-.622-3.216-1.984-1.188-1.06-1.99-2.37-2.224-2.77-.233-.4-.025-.616.175-.815.18-.18.4-.467.601-.701.2-.233.267-.4.4-.667.134-.267.067-.5-.033-.701-.1-.2-.9-2.168-1.234-2.968-.325-.78-.655-.675-.9-.687l-.767-.013c-.267 0-.7.1-1.067.5s-1.4 1.368-1.4 3.336 1.434 3.87 1.634 4.137c.2.267 2.822 4.31 6.838 6.044.955.413 1.7.659 2.282.844.959.305 1.832.262 2.522.159.77-.115 2.367-.968 2.701-1.902.333-.935.333-1.735.233-1.902-.1-.167-.367-.267-.767-.467z"/>
        </svg>
      </a>

      <style>{`
        .whatsapp-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 900;
          width: 60px;
          height: 60px;
          background: #25d366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          transition: transform 0.3s, box-shadow 0.3s;
          animation: pulse 2s ease-in-out infinite;
        }
        .whatsapp-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(37, 211, 102, 0.6);
        }

        @media (max-width: 768px) {
          .whatsapp-btn {
            width: 54px;
            height: 54px;
            bottom: 20px;
            right: 20px;
          }
          .whatsapp-btn svg {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </>
  );
}

export default WhatsAppButton;
