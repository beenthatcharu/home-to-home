
const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-primary-foreground/80">
          &copy; {new Date().getFullYear()} Bhandari Marbles. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
