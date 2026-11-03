import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ChevronRight, Laptop, Shirt, Smartphone, Home, Tv, Coffee, Car, CreditCard } from 'lucide-react';

const Overlay = styled.div`
  position: fixed;
  top: 110px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 90;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #FFFFFF;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-top: 1px solid #E5E7EB;
  z-index: 100;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  min-height: 380px;
`;

const Sidebar = styled.div`
  width: 260px;
  background-color: #F8F9FA;
  border-right: 1px solid #E5E7EB;
  padding: 12px 0;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: ${(props) => (props.active ? '700' : '500')};
  color: ${(props) => (props.active ? '#03AC0E' : '#212121')};
  background-color: ${(props) => (props.active ? '#FFFFFF' : 'transparent')};
  cursor: pointer;
  transition: all 0.15s ease;

  .label-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &:hover {
    color: #03AC0E;
    background-color: #FFFFFF;
  }
`;

const SubcategoryPanel = styled.div`
  flex: 1;
  padding: 24px 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const Subgroup = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 700;
    color: #212121;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #F0F3F7;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 8px;

      a {
        font-size: 13px;
        color: #6D7588;
        text-decoration: none;
        transition: color 0.15s;

        &:hover {
          color: #03AC0E;
          font-weight: 600;
        }
      }
    }
  }
`;

const categoriesData = [
  {
    id: 'home',
    name: 'Kebutuhan Rumah',
    icon: <Home size={18} />,
    groups: [
      {
        title: 'Furnitur & Ruang Kerja',
        links: ['Meja Belajar Lipat', 'Kursi Kerja Ergonomis', 'Rak Dinding Minimalis', 'Meja Komputer Gaming']
      },
      {
        title: 'Kamar Tidur',
        links: ['Kasur Busa Lipat', 'Sprei Kasur Microtex', 'Bantal Guling Orthopedic', 'Selimut Hangat']
      },
      {
        title: 'Dapur & Masak',
        links: ['Grill Pan BBQ', 'Wajan Anti Lengket', 'Dispenser Air Elektrik', 'Set Pisau Dapur']
      }
    ]
  },
  {
    id: 'men-fashion',
    name: 'Fashion Pria',
    icon: <Shirt size={18} />,
    groups: [
      {
        title: 'Pakaian Pria',
        links: ['Kaos Distro Katun 30s', 'Celana Chino Slim Fit', 'Kemeja Polos Formal', 'Jaket Hoodie Distro']
      },
      {
        title: 'Aksesoris Pria',
        links: ['Dompet Kulit RFID', 'Kacamata Polarized UV400', 'Kaos Kaki Katun', 'Ikat Pinggang Kulit']
      },
      {
        title: 'Sepatu Pria',
        links: ['Sneakers Kasual', 'Sepatu Pantofel Pria', 'Sepatu Lari Running', 'Sandal Slop Pria']
      }
    ]
  },
  {
    id: 'electronic',
    name: 'Elektronik & Gadget',
    icon: <Tv size={18} />,
    groups: [
      {
        title: 'Audio & Musik',
        links: ['Headset Gaming RGB', 'Soundbar Bluetooth Home Theater', 'TWS Earbuds Bluetooth', 'Microphone Condenser']
      },
      {
        title: 'Gadget & Wearable',
        links: ['Smart Watch Ultra Amoled', 'Tripod HP Bluetooth', 'Powerbank Fast Charging', 'Kabel Data Type-C']
      },
      {
        title: 'Perkakas & Elektronik Rumah',
        links: ['Tool Set 46 in 1', 'Obeng Presisi Magnetik', 'Lampu Sorot LED', 'Humidifier Diffuser 500ml']
      }
    ]
  },
  {
    id: 'computers',
    name: 'Komputer & Laptop',
    icon: <Laptop size={18} />,
    groups: [
      {
        title: 'Aksesoris Komputer',
        links: ['Mechanical Keyboard RGB', 'Mouse Wireless Ergonomic', 'Mousepad Extended Desk', 'Webcam Full HD 1080p']
      },
      {
        title: 'Komponen PC',
        links: ['SSD NVMe M.2 1TB', 'RAM DDR4 16GB', 'Power Supply 650W Gold', 'Casing PC Tempered Glass']
      }
    ]
  }
];

export default function MegaMenuDropdown({ onClose }) {
  const [activeCategory, setActiveCategory] = useState(categoriesData[0].id);

  const selectedData = categoriesData.find((c) => c.id === activeCategory) || categoriesData[0];

  return (
    <>
      <Overlay onClick={onClose} />
      <DropdownWrapper>
        <ContentContainer>
          <Sidebar>
            {categoriesData.map((cat) => (
              <CategoryItem
                key={cat.id}
                active={activeCategory === cat.id}
                onMouseEnter={() => setActiveCategory(cat.id)}
              >
                <div className="label-group">
                  {cat.icon}
                  <span>{cat.name}</span>
                </div>
                <ChevronRight size={14} />
              </CategoryItem>
            ))}
          </Sidebar>

          <SubcategoryPanel>
            {selectedData.groups.map((group, idx) => (
              <Subgroup key={idx}>
                <h4>{group.title}</h4>
                <ul>
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href={`/search.html?q=${encodeURIComponent(link)}`} onClick={onClose}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </Subgroup>
            ))}
          </SubcategoryPanel>
        </ContentContainer>
      </DropdownWrapper>
    </>
  );
}
