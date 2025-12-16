
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const productCategories = [
  { name: 'Outdoor Furniture', imageId: 'outdoor-furniture' },
  { name: 'Office Furniture', imageId: 'office-furniture' },
  { name: 'Living Room Furniture', imageId: 'living-room-furniture' },
  { name: 'Bedroom Furniture', imageId: 'bedroom-furniture' },
  { name: 'Dining Furniture', imageId: 'dining-furniture' },
  { name: 'Cafe & Bar', imageId: 'cafe-bar' },
];

const ProductRange = () => {
  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-semibold uppercase tracking-widest text-accent mb-2">Crafted With Love</p>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">
            Our Product Range
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category) => {
            const image = PlaceHolderImages.find(img => img.id === category.imageId);
            return (
              <div key={category.name} className="group text-center">
                <div className="overflow-hidden rounded-lg mb-4 aspect-square">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={300}
                      height={300}
                      data-ai-hint={image.imageHint}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>
                <h3 className="text-xl font-headline font-bold text-primary mb-1">{category.name}</h3>
                <Link href="#form" className="text-sm text-accent hover:underline uppercase font-semibold tracking-wider">
                  Enquire Now
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductRange;
