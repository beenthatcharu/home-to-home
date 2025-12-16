import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: '#1D2861' }}>
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
       <Link href="/" className="text-2xl font-bold font-headline text-primary">
  <Image
    src="https://res.cloudinary.com/ddqqlfsjp/image/upload/v1765866124/H2H_logo_f0al9f.jpg"
    alt="Bhandari Exports Logo"
    width={200}
    height={80}
    className="h-[80px] w-auto"
    priority
  />
</Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-primary-foreground hover:text-accent transition-colors">Home</Link>
          <Link href="#about" className="text-sm font-medium text-primary-foreground hover:text-accent transition-colors">About</Link>
          <Link href="#products" className="text-sm font-medium text-primary-foreground hover:text-accent transition-colors">Products</Link>
          <Link href="#contact" className="text-sm font-medium text-primary-foreground hover:text-accent transition-colors">Contact</Link>
        </nav>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <a href="#form">ENQUIRE NOW</a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
