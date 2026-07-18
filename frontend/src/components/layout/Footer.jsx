import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            © {new Date().getFullYear()} Sales CRM System
        </footer>
    );
};

export default Footer;