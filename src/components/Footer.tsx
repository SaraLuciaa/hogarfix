const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} HogarFix. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
