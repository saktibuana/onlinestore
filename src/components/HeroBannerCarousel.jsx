import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gtm } from '../services/gtm';
import { analytics } from '../services/analytics';

const BannerSection = styled.section`
  max-width: 1200px;
  margin: 16px auto 20px;
  padding: 0 16px;
  position: relative;
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
`;

const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.4s ease-in-out;
  transform: translateX(-${(props) => props.currentSlide * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  height: 280px;
  background: ${(props) => props.bgGradient};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 64px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 24px;
    height: 220px;
  }
`;

const BannerContent = styled.div`
  max-width: 520px;
  z-index: 2;

  h2 {
    font-size: 32px;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.25;
    margin-bottom: 12px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);

    @media (max-width: 768px) {
      font-size: 22px;
    }
  }

  p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 24px;
    font-weight: 500;
  }
`;

const ActionButton = styled.a`
  display: inline-block;
  background-color: #FFFFFF;
  color: #03AC0E;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 28px;
  border-radius: 999px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    color: #02980C;
  }
`;

const MascotIllustration = styled.div`
  position: relative;
  width: 320px;
  height: 240px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.15));
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;

  .cloud {
    position: absolute;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 999px;
  }

  .c1 { width: 140px; height: 40px; top: 20px; left: 10%; }
  .c2 { width: 200px; height: 50px; top: 40px; right: 25%; }
  .hill {
    position: absolute;
    bottom: -60px;
    right: -40px;
    width: 440px;
    height: 200px;
    background: #68D391;
    border-radius: 50%;
    opacity: 0.8;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.85);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #212121;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  transition: all 0.2s;

  &:hover {
    background: #FFFFFF;
    color: #03AC0E;
    transform: translateY(-50%) scale(1.05);
  }

  &.prev { left: 12px; }
  &.next { right: 12px; }
`;

const DotsIndicator = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`;

const Dot = styled.button`
  width: ${(props) => (props.active ? '24px' : '8px')};
  height: 8px;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => (props.active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)')};
  cursor: pointer;
  transition: all 0.3s;
`;

const bannerSlides = [
  {
    id: 'promo-asyik',
    title: 'Mau transaksi lebih hemat?',
    subtitle: 'Cek promo asyik Tokopedia!',
    ctaText: 'Cek Sekarang',
    link: '/search.html?promo=hemat-asyik',
    bgGradient: 'linear-gradient(105deg, #1DA1F2 0%, #00B4D8 45%, #48CAE4 100%)'
  },
  {
    id: 'tokopedia-wib',
    title: 'Waktu Indonesia Belanja (WIB)',
    subtitle: 'Diskon kilat hingga 90% + Bebas Ongkir se-Indonesia!',
    ctaText: 'Belanja WIB',
    link: '/search.html?promo=wib',
    bgGradient: 'linear-gradient(105deg, #03AC0E 0%, #00C853 50%, #64DD17 100%)'
  },
  {
    id: 'traktir-hari-ini',
    title: 'Kejutan Traktir Tokopedia',
    subtitle: 'Kupon cashback ekstra 100% dan hadiah jutaan rupiah!',
    ctaText: 'Klaim Kupon',
    link: '/search.html?promo=traktir',
    bgGradient: 'linear-gradient(105deg, #FF6F00 0%, #FF9100 50%, #FFAB40 100%)'
  }
];

export default function HeroBannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleCtaClick = (slide) => {
    gtm.pushEvent('banner_click', {
      banner_id: slide.id,
      banner_title: slide.title,
      banner_cta: slide.ctaText
    });
    analytics.logEvent('select_promotion', {
      promotion_id: slide.id,
      promotion_name: slide.title
    });
  };

  return (
    <BannerSection>
      <CarouselWrapper>
        <SlideContainer currentSlide={currentSlide}>
          {bannerSlides.map((slide, idx) => (
            <Slide key={slide.id} bgGradient={slide.bgGradient}>
              <BackgroundElements>
                <div className="cloud c1" />
                <div className="cloud c2" />
                <div className="hill" />
              </BackgroundElements>

              <BannerContent>
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <ActionButton
                  href={slide.link}
                  onClick={() => handleCtaClick(slide)}
                >
                  {slide.ctaText}
                </ActionButton>
              </BannerContent>

              <MascotIllustration>
                <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Decorative Gift Box */}
                  <rect x="50" y="110" width="90" height="90" rx="8" fill="#FA591D" />
                  <rect x="88" y="110" width="14" height="90" fill="#FFE082" />
                  <rect x="50" y="148" width="90" height="14" fill="#FFE082" />
                  <path d="M75 110C65 95 85 85 95 105C105 85 125 95 115 110" stroke="#FFE082" strokeWidth="6" fill="none"/>

                  {/* Gold Coins */}
                  <circle cx="160" cy="180" r="18" fill="#FFD700" stroke="#FFA000" strokeWidth="3" />
                  <text x="155" y="186" fontSize="16" fontWeight="bold" fill="#E65100">Rp</text>
                  <circle cx="45" cy="185" r="14" fill="#FFD700" stroke="#FFA000" strokeWidth="2.5" />

                  {/* Primary Tokopedia Owl Mascot (Toped) */}
                  <g transform="translate(170, 40)">
                    {/* Owl Body Green */}
                    <path d="M20 70C20 30 50 10 75 10C100 10 130 30 130 70V130C130 145 115 155 75 155C35 155 20 145 20 130V70Z" fill="#03AC0E"/>
                    {/* Ears/Horn Tufts */}
                    <path d="M35 25L20 5L50 20" fill="#02980C" />
                    <path d="M115 25L130 5L100 20" fill="#02980C" />
                    {/* Eyes Big White */}
                    <circle cx="55" cy="70" r="22" fill="#FFFFFF"/>
                    <circle cx="95" cy="70" r="22" fill="#FFFFFF"/>
                    {/* Iris Dark */}
                    <circle cx="58" cy="70" r="13" fill="#212121"/>
                    <circle cx="98" cy="70" r="13" fill="#212121"/>
                    {/* Sparkle White */}
                    <circle cx="62" cy="66" r="4" fill="#FFFFFF"/>
                    <circle cx="102" cy="66" r="4" fill="#FFFFFF"/>
                    {/* Orange Beak */}
                    <polygon points="75,80 67,95 83,95" fill="#FA591D"/>
                    {/* Cheeks Pink */}
                    <ellipse cx="40" cy="85" rx="8" ry="5" fill="#FF8A80" opacity="0.6"/>
                    <ellipse cx="110" cy="85" rx="8" ry="5" fill="#FF8A80" opacity="0.6"/>
                    {/* Friendly Waving Wing */}
                    <path d="M125 80C140 70 155 85 145 105C135 115 125 105 125 95" fill="#03AC0E"/>
                  </g>
                </svg>
              </MascotIllustration>
            </Slide>
          ))}
        </SlideContainer>

        <NavButton
          className="prev"
          aria-label="Slide sebelumnya"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)}
        >
          <ChevronLeft size={20} />
        </NavButton>

        <NavButton
          className="next"
          aria-label="Slide berikutnya"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
        >
          <ChevronRight size={20} />
        </NavButton>

        <DotsIndicator>
          {bannerSlides.map((_, idx) => (
            <Dot
              key={idx}
              active={currentSlide === idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ke slide ${idx + 1}`}
            />
          ))}
        </DotsIndicator>
      </CarouselWrapper>
    </BannerSection>
  );
}
