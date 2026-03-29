import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plantsData = [
  {
    category: 'Aromatic Plants',
    emoji: '🌸',
    description: "Fill your home with nature's finest fragrances",
    plants: [
      {
        name: 'Lavender',
        image: 'https://images.unsplash.com/photo-1499540633125-484965b60031?w=400&q=80',
        description: 'A calming herb with purple blooms. Aids sleep and reduces anxiety with its sweet floral scent.',
        cost: '$12.99',
      },
      {
        name: 'Jasmine',
        image: 'https://images.unsplash.com/photo-1558522195-e1201b090344?w=400&q=80',
        description: 'Intensely fragrant white flowers that perfume entire rooms. Perfect for windows and trellises.',
        cost: '$14.99',
      },
      {
        name: 'Rosemary',
        image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400&q=80',
        description: 'Mediterranean herb with pine-like aroma. Thrives in sunny spots and is great for cooking.',
        cost: '$9.99',
      },
      {
        name: 'Mint',
        image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&q=80',
        description: 'Refreshingly cool scent and fast-growing nature. Perfect for teas, cocktails, and cooking.',
        cost: '$7.99',
      },
      {
        name: 'Lemon Balm',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
        description: 'Citrus-scented leaves with calming properties. Great for teas and natural remedies.',
        cost: '$8.49',
      },
      {
        name: 'Basil',
        image: 'https://images.unsplash.com/photo-1600410809734-be2a4bc7caff?w=400&q=80',
        description: 'Sweet and peppery aroma loved in kitchens worldwide. Easy to grow on a sunny windowsill.',
        cost: '$6.99',
      },
      {
        name: 'Ylang Ylang',
        image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400&q=80',
        description: 'Exotic tropical flower with a rich, floral scent used in perfumes and aromatherapy.',
        cost: '$17.99',
      },
    ],
  },
  {
    category: 'Medicinal Plants',
    emoji: '🌿',
    description: "Ancient healers, modern benefits — nature's pharmacy at home",
    plants: [
      {
        name: 'Aloe Vera',
        image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8c76ea6?w=400&q=80',
        description: 'The ultimate healing plant. Soothes burns, moisturizes skin, and thrives on neglect.',
        cost: '$11.99',
      },
      {
        name: 'Chamomile',
        image: 'https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?w=400&q=80',
        description: 'Daisy-like flowers used for centuries to calm nerves and aid digestion. Makes soothing tea.',
        cost: '$10.99',
      },
      {
        name: 'Turmeric',
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80',
        description: 'Golden root with powerful anti-inflammatory properties. A staple in natural medicine.',
        cost: '$13.99',
      },
      {
        name: 'Echinacea',
        image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&q=80',
        description: 'Purple coneflower known for immune-boosting properties. Stunning in any garden.',
        cost: '$12.49',
      },
      {
        name: 'Calendula',
        image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc1e?w=400&q=80',
        description: 'Bright orange blooms with potent anti-inflammatory and wound-healing properties.',
        cost: '$9.49',
      },
      {
        name: 'Valerian',
        image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=400&q=80',
        description: 'Tall perennial with white flowers. Root extract used as a natural sleep aid for centuries.',
        cost: '$11.49',
      },
      {
        name: 'St. John\'s Wort',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
        description: 'Yellow flowering herb traditionally used to support mood and emotional well-being.',
        cost: '$10.49',
      },
    ],
  },
  {
    category: 'Air Purifying Plants',
    emoji: '💨',
    description: 'Turn your home into a breathing sanctuary',
    plants: [
      {
        name: 'Snake Plant',
        image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400&q=80',
        description: 'Nearly indestructible and filters toxins. One of the best plants for beginners.',
        cost: '$16.99',
      },
      {
        name: 'Peace Lily',
        image: 'https://images.unsplash.com/photo-1616690248733-9f17023a96b6?w=400&q=80',
        description: 'Elegant white blooms and powerful air-purifying abilities. Thrives in low light.',
        cost: '$18.99',
      },
      {
        name: 'Spider Plant',
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&q=80',
        description: 'Cheerful cascading foliage that removes carbon monoxide and other toxins effectively.',
        cost: '$8.99',
      },
      {
        name: 'Boston Fern',
        image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400&q=80',
        description: 'Lush tropical fern that acts as a natural humidifier. Loves moist, indirect light.',
        cost: '$15.99',
      },
      {
        name: 'Bamboo Palm',
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80',
        description: 'Elegant tropical palm that filters benzene and trichloroethylene from indoor air.',
        cost: '$24.99',
      },
      {
        name: 'Rubber Plant',
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80',
        description: 'Bold, glossy leaves absorb airborne chemicals and are easy to care for indoors.',
        cost: '$19.99',
      },
      {
        name: 'Golden Pothos',
        image: 'https://images.unsplash.com/photo-1567502493127-1f09d2aa57e5?w=400&q=80',
        description: 'Fast-growing vine that thrives in low light and effectively removes indoor pollutants.',
        cost: '$7.99',
      },
    ],
  },
  {
    category: 'Succulent & Cactus',
    emoji: '🌵',
    description: 'Resilient beauties that thrive on minimal care',
    plants: [
      {
        name: 'Echeveria',
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80',
        description: 'Rosette-shaped succulent in stunning color variations. Drought-tolerant and decorative.',
        cost: '$6.99',
      },
      {
        name: 'Jade Plant',
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80',
        description: 'Known as the "money tree". Long-lived, easy to grow, and symbolizes good fortune.',
        cost: '$14.99',
      },
      {
        name: 'Golden Barrel Cactus',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',
        description: 'Iconic globe-shaped cactus with golden spines. A striking architectural statement plant.',
        cost: '$19.99',
      },
      {
        name: 'Haworthia',
        image: 'https://images.unsplash.com/photo-1567502493127-1f09d2aa57e5?w=400&q=80',
        description: 'Compact and stylish with translucent window-like leaves. Perfect for small spaces.',
        cost: '$9.49',
      },
      {
        name: 'Aloe Aristata',
        image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8c76ea6?w=400&q=80',
        description: 'Spiky rosette with white-spotted leaves. Low maintenance and striking on a desk.',
        cost: '$8.99',
      },
      {
        name: 'Zebra Cactus',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',
        description: 'Dramatic white striping on dark green leaves. One of the most visually bold succulents.',
        cost: '$11.99',
      },
      {
        name: 'String of Pearls',
        image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&q=80',
        description: 'Cascading bead-like succulent, perfect for hanging baskets and shelves.',
        cost: '$13.49',
      },
    ],
  },
];

function ProductList({ onNavigateCart }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (plantName) => cartItems.some((item) => item.name === plantName);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="product-list">
      <div className="product-header">
        <h2 className="product-title">Our Collection</h2>
        <p className="product-subtitle">
          Each plant is grown with care and shipped to your door
        </p>
      </div>

      {plantsData.map((section) => (
        <section key={section.category} className="plant-section">
          <div className="section-header">
            <span className="section-emoji">{section.emoji}</span>
            <div>
              <h3 className="section-title">{section.category}</h3>
              <p className="section-desc">{section.description}</p>
            </div>
          </div>

          <div className="plants-grid">
            {section.plants.map((plant) => {
              const inCart = isInCart(plant.name);
              return (
                <div key={plant.name} className="plant-card">
                  <div className="plant-image-wrap">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                  </div>
                  <div className="plant-info">
                    <h4 className="plant-name">{plant.name}</h4>
                    <p className="plant-desc">{plant.description}</p>
                    <div className="plant-footer">
                      <span className="plant-cost">{plant.cost}</span>
                      <button
                        className={`add-btn ${inCart ? 'in-cart' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={inCart}
                      >
                        {inCart ? '✓ Added' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
