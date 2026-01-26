import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">  
        {/* Bottom */}
        <div className="footer__bottom">
          <span className="footer__copy">© {year} Mi App. Todos los derechos reservados.</span>
          <span className="footer__made">
            Espero les guste 😄
          </span>
        </div>
      </div>
    </footer>
  );
}
