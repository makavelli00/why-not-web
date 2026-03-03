import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, Instagram, Heart } from 'lucide-react';

// Reemplazo del logo para que replique la imagen adjunta (Cuadrado redondeado, amarillo, texto negro superpuesto)
const Logo = ({ className }) => (
  <div className={`flex flex-col items-center justify-center bg-[#FFCE11] text-[#111111] font-display rounded-[25%] border-[3px] md:border-[4px] border-[#111111] shadow-lg overflow-hidden ${className}`}>
    <span className="leading-[0.8] tracking-wider mt-1" style={{ WebkitTextStroke: '0.06em currentColor' }}>WHY</span>
    <span className="leading-[0.8] tracking-wider mb-1" style={{ WebkitTextStroke: '0.06em currentColor' }}>NOT</span>
  </div>
);

// Menu Data - Copiado exactamente de la carta de Why Not
const menuData = {
  entrantes: {
    title: 'entrantes',
    items: [
      {
        name: 'NACHO LIBRE',
        price: '10.50€',
        description: 'A tope de nachos, queso, guacamole, chili con carne, sour cream y jalapeños.',
        image: 'https://images.unsplash.com/photo-1556172558-7f8b9ab2413f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWNobyUyMGNoaXBzJTIwY2hlZXNlJTIwbWV4aWNhbnxlbnwxfHx8fDE3NzIzNzEzNTF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'AROS DE CEBOLLA',
        price: '5.00€',
        description: 'Aros de cebolla a la cerveza con salsa ranchera',
        image: 'https://images.unsplash.com/photo-1766589152198-38630c391dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmlvbiUyMHJpbmdzJTIwZnJpZWQlMjBhcHBldGl6ZXJ8ZW58MXx8fHwxNzcyMzcwNjg1fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'JALAPEÑOS RELLENOS',
        price: '6.00€',
        description: 'Jalapeños rellenos de cheddar, fritos',
        image: 'https://images.unsplash.com/photo-1760047550367-3d72fa3053c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWxhcGVubyUyMHBvcHBlcnMlMjBmcmllZHxlbnwxfHx8fDE3NzIzNzEzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'FINGERS DE POLLO',
        price: '5.50€',
        description: 'Fingers de pollo con salsa ranchera',
        image: 'https://images.unsplash.com/photo-1627662236294-a169e5464871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbnVnZ2V0cyUyMGNyaXNweXxlbnwxfHx8fDE3NzIzMzU2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'TEQUE-ÑOTS',
        price: '6.00€',
        description: 'Tequeños de hojaldre rellenos de queso con mermelada de arándanos',
        image: 'https://images.unsplash.com/photo-1627662236294-a169e5464871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbnVnZ2V0cyUyMGNyaXNweXxlbnwxfHx8fDE3NzIzMzU2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'ALITAS MEXICANAS',
        price: '6.00€',
        description: 'Alitas de pollo fritas con especias mexicanas, salsa de mango y chile',
        image: 'https://images.unsplash.com/photo-1627662236294-a169e5464871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbnVnZ2V0cyUyMGNyaXNweXxlbnwxfHx8fDE3NzIzMzU2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        isNew: true
      },
      {
        name: 'CROQ & CHEESE',
        price: '5.90€',
        description: 'Croquetas rellenas de macarrones con queso',
        image: 'https://images.unsplash.com/photo-1627662236294-a169e5464871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbnVnZ2V0cyUyMGNyaXNweXxlbnwxfHx8fDE3NzIzMzU2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'SAMOSAS DE POLLO',
        price: '5.90€',
        description: 'Empanadillas en masa fina de pollo al curry con mayonesa Why Not',
        image: 'https://images.unsplash.com/photo-1627662236294-a169e5464871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbnVnZ2V0cyUyMGNyaXNweXxlbnwxfHx8fDE3NzIzMzU2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'SUPREMAS SURMANAS',
        price: '5.50€',
        description: 'Piezas de pollo rebozado al estilo sureño con curry mango',
        image: 'https://images.unsplash.com/photo-1627662236294-a169e5464871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbnVnZ2V0cyUyMGNyaXNweXxlbnwxfHx8fDE3NzIzMzU2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ]
  },
  patatas: {
    title: 'patatas',
    items: [
      {
        name: 'PATATAS 4 SALSAS',
        price: '6.50€',
        description: 'A tope de patatas naturales, ranchera, ketchup, mostaza-miel, baconasse',
        image: 'https://images.unsplash.com/photo-1734774797087-b6435057a15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmVuY2glMjBmcmllcyUyMGdvbGRlbnxlbnwxfHx8fDE3NzIzNzA2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'PATATAS AL CURRY',
        price: '6.00€',
        description: 'A tope de patatas naturales, con nuestro curry orgánico especial y aceite de coco orgánico V.E.',
        image: 'https://images.unsplash.com/photo-1734774797087-b6435057a15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmVuY2glMjBmcmllcyUyMGdvbGRlbnxlbnwxfHx8fDE3NzIzNzA2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'BONIATO SWEET',
        price: '6.50€',
        description: 'Boniato frito con sweet mayo',
        image: 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMHBvdGF0byUyMGZyaWVzfGVufDF8fHx8MTc3MjM3MTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'PATATAS CON QUESO',
        price: '7.00€',
        description: 'Patatas naturales, queso cheddar y edam',
        image: 'https://images.unsplash.com/photo-1734774797087-b6435057a15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmVuY2glMjBmcmllcyUyMGdvbGRlbnxlbnwxfHx8fDE3NzIzNzA2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'PATATAS WHY NOT',
        price: '9.50€',
        description: 'Patatas naturales (not congeladas), queso cheddar, edam, bacon y pulled pork',
        image: 'https://images.unsplash.com/photo-1734774797087-b6435057a15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmlzcHklMjBmcmVuY2glMjBmcmllcyUyMGdvbGRlbnxlbnwxfHx8fDE3NzIzNzA2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'BONIATO WHY NOT',
        price: '9.90€',
        description: 'Boniato natural, queso cheddar, edam, bacon y pulled pork',
        image: 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMHBvdGF0byUyMGZyaWVzfGVufDF8fHx8MTc3MjM3MTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ]
  },
  burgers: {
    title: 'burgers',
    note: 'Todas nuestras burgers incluyen patatas y salsa',
    items: [
      {
        name: 'WHY NOT BURGER',
        price: '9.60€',
        description: 'Brioche, ternera, bacon, queso, tomate, lechuga, mayonesa Why Not',
        image: 'https://images.unsplash.com/photo-1766589220952-206ab9818977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwY2hlZXNlJTIwYmFjb258ZW58MXx8fHwxNzcyMzcwNjgzfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'PARK CHEESE',
        price: '9.90€',
        description: 'Brioche, ternera, cheddar, edam, mac & cheese, cebolla caramelizada, mayonesa Why Not',
        image: 'https://images.unsplash.com/photo-1678110707493-8d05425137ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFzaCUyMGJ1cmdlciUyMGdyaWxsZWQlMjBjaGVlc2V8ZW58MXx8fHwxNzcyMzcxMzUyfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'PARKBACOA',
        price: '9.90€',
        description: 'Brioche, ternera, bacon, cheddar, aros de cebolla, salsa barbacoa SBR',
        image: 'https://images.unsplash.com/photo-1766589220952-206ab9818977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwY2hlZXNlJTIwYmFjb258ZW58MXx8fHwxNzcyMzcwNjgzfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'GOHOME BURGER',
        price: '10.90€',
        description: 'Brioche con semillas, ternera, cheddar, bacon, huevo, tomate, lechuga, mayonesa de trufa',
        image: 'https://images.unsplash.com/photo-1766589221195-34da47a852c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3VibGUlMjBjaGVlc2VidXJnZXIlMjBtZWx0ZWR8ZW58MXx8fHwxNzcyMzcxMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'CHICKEN MC FLY',
        price: '8.90€',
        description: 'Brioche con semillas, crispy chicken, cheddar, tomate, lechuga, mayonesa Why Not',
        image: 'https://images.unsplash.com/photo-1760533536738-f0965fd52354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwYnVyZ2VyJTIwY3Jpc3B5fGVufDF8fHx8MTc3MjM2OTI2Mnww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'PULLED PARK',
        price: '9.50€',
        description: 'Brioche, ternera, cheddar, pulled pork, cebolla frita, salsa barbacoa',
        image: 'https://images.unsplash.com/photo-1766589220952-206ab9818977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwY2hlZXNlJTIwYmFjb258ZW58MXx8fHwxNzcyMzcwNjgzfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'CANGREBURGER',
        price: '5.90€',
        description: 'Brioche, ternera 90g, cheddar',
        image: 'https://images.unsplash.com/photo-1631887809358-df83fb1b49dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwaGFtYnVyZ2VyJTIwbGV0dHVjZSUyMHRvbWF0b3xlbnwxfHx8fDE3NzIzNzA2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'CENTOLLOBURGER',
        price: '6.90€',
        description: 'Brioche, ternera 120g, cheddar',
        image: 'https://images.unsplash.com/photo-1631887809358-df83fb1b49dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwaGFtYnVyZ2VyJTIwbGV0dHVjZSUyMHRvbWF0b3xlbnwxfHx8fDE3NzIzNzA2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'GRAN KAHUNA',
        price: '13.50€',
        description: 'Brioche semillas, doble burger, piña, doble queso, bacon, tomate, lechuga, mayonesa Why Not',
        image: 'https://images.unsplash.com/photo-1766589221195-34da47a852c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3VibGUlMjBjaGVlc2VidXJnZXIlMjBtZWx0ZWR8ZW58MXx8fHwxNzcyMzcxMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        isSpecial: true
      },
      {
        name: 'LA LLORONA',
        price: '10.90€',
        description: 'Brioche semillas, ternera, cheddar, chili con carne, guacamole, nachos y habanero',
        image: 'https://images.unsplash.com/photo-1678110707493-8d05425137ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFzaCUyMGJ1cmdlciUyMGdyaWxsZWQlMjBjaGVlc2V8ZW58MXx8fHwxNzcyMzcxMzUyfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'SMOKEY BURGER',
        price: '9.80€',
        description: 'Brioche, ternera, bacon, queso ahumado, aros de cebolla, barbacoa',
        image: 'https://images.unsplash.com/photo-1766589220952-206ab9818977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwY2hlZXNlJTIwYmFjb258ZW58MXx8fHwxNzcyMzcwNjgzfDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ]
  },
  smash: {
    title: 'smash burgers',
    note: 'Técnica smash para costra perfecta',
    items: [
      {
        name: 'SMASH BRO',
        price: '11.90€',
        description: 'Brioche semillas, doble smash burger, doble queso, bacon, lechuga, cebolla caramelizada',
        image: 'https://images.unsplash.com/photo-1678110707493-8d05425137ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFzaCUyMGJ1cmdlciUyMGdyaWxsZWQlMjBjaGVlc2V8ZW58MXx8fHwxNzcyMzcxMzUyfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'SANJUA KING SMASH',
        price: '11.90€',
        description: 'Brioche semillas, doble smash burger, doble queso, aros de cebolla, tomate, lechuga, mayonesa Why Not',
        image: 'https://images.unsplash.com/photo-1678110707493-8d05425137ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFzaCUyMGJ1cmdlciUyMGdyaWxsZWQlMjBjaGVlc2V8ZW58MXx8fHwxNzcyMzcxMzUyfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'HE-MAN SMASH',
        price: '14.90€',
        description: 'Brioche semillas, cuádruple smash burger, cuádruple queso, bacon, aros de cebolla, tomate, lechuga, mayonesa Why Not',
        image: 'https://images.unsplash.com/photo-1766589221195-34da47a852c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3VibGUlMjBjaGVlc2VidXJnZXIlMjBtZWx0ZWR8ZW58MXx8fHwxNzcyMzcxMzU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        isSpecial: true
      },
      {
        name: 'BUBI SMASH',
        price: '12.90€',
        description: 'Brioche, doble smash burger, doble cheddar, doble queso ahumado, bacon, cebolla frita, baconesa',
        image: 'https://images.unsplash.com/photo-1678110707493-8d05425137ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFzaCUyMGJ1cmdlciUyMGdyaWxsZWQlMjBjaGVlc2V8ZW58MXx8fHwxNzcyMzcxMzUyfDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ]
  },
  vegana: {
    title: 'Why Not Vegan',
    note: '100% Plant-Based y mucho sabor',
    items: [
      {
        name: 'CHARLY BURGUER',
        price: '10.40€',
        description: 'Pan vegano, Heura burguer, queso vegano, tomate, lechuga, veganesa BBQ',
        image: 'https://images.unsplash.com/photo-1594212691516-46670b1b11ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        isNew: true
      },
      {
        name: 'NOT CHICKEN MCFLY',
        price: '10.40€',
        description: 'Pan vegano, NotChicken burguer, queso vegano, tomate, lechuga, vegan sweet mayo',
        image: 'https://images.unsplash.com/photo-1620589125156-fd5028c5e05b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      },
      {
        name: 'NACHO VEGANO',
        price: '11.50€',
        description: 'A tope de nachos, queso vegano, guacamole, sour cream y jalapeños',
        image: 'https://images.unsplash.com/photo-1556172558-7f8b9ab2413f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      },
      {
        name: 'PATATAS CON QUESO VEGANO',
        price: '7.50€',
        description: 'Patatas naturales, queso vegano tipo Monterrey',
        image: 'https://images.unsplash.com/photo-1734774797087-b6435057a15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      },
      {
        name: 'NOTGGETS',
        price: '6.50€',
        description: 'Nuggets de NotPollo con vegan mayo y patatas',
        image: 'https://images.unsplash.com/photo-1562967914-01efa7e87832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      },
      {
        name: 'PATATAS AL CURRY',
        price: '6.00€',
        description: 'A tope de patatas naturales, con nuestro curry orgánico especial y aceite de coco orgánico V.E.',
        image: 'https://images.unsplash.com/photo-1734774797087-b6435057a15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      },
      {
        name: 'BONIATO SWEET',
        price: '6.50€',
        description: 'Boniato frito con vegan sweet mayo',
        image: 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      },
      {
        name: 'AROS DE CEBOLLA',
        price: '5.00€',
        description: 'Aros de cebolla a la cerveza con ketchup',
        image: 'https://images.unsplash.com/photo-1766589152198-38630c391dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      }
    ]
  },
  postres: {
    title: 'and cake',
    items: [
      {
        name: 'TARTAS',
        price: '4.50€',
        description: 'Abuela, Red Velvet, Kinder, Limón, según nos coja el día',
        image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NzIzMzc0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'TARTAS DE QUESO',
        price: '4.80€',
        description: 'Pistacho, Lotus, Conguitos, Pantera... siempre innovando',
        image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NzIzMzc0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'COOKIES ARTESANAS',
        price: '3.20€',
        description: 'Classic, Ferrero, KitKat, Praliné',
        image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NzIzMzc0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'COOKIES CLÁSICAS',
        price: '2.50€',
        description: 'Chips de choco o lacasitos',
        image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NzIzMzc0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'DONUT GLASEADO',
        price: '1.50€',
        description: 'Tal como su nombre indica',
        image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NzIzMzc0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ]
  }
};

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('burgers');

  // EFECTO PARA SEO LOCAL (Inyecta datos estructurados y etiquetas meta)
  useEffect(() => {
    // Título y Meta Descripción dinámicos
    document.title = "Why Not Burger & Cake | Las mejores Smash Burgers en Jerez";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Disfruta de las mejores smash burgers, opciones veganas y tartas caseras en Jerez de la Frontera. Visítanos en Av. de la Cruz Roja, 12.";

    // Schema.org para Google (LocalBusiness/Restaurant)
    let scriptSEO = document.querySelector('#seo-schema');
    if (!scriptSEO) {
      scriptSEO = document.createElement('script');
      scriptSEO.id = 'seo-schema';
      scriptSEO.type = 'application/ld+json';
      document.head.appendChild(scriptSEO);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Why Not Burger & Cake",
      "image": "https://images.unsplash.com/photo-1766589220952-206ab9818977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "url": window.location.href,
      "telephone": "+34689069133",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. de la Cruz Roja, 12",
        "addressLocality": "Jerez de la Frontera",
        "postalCode": "11407",
        "addressRegion": "Cádiz",
        "addressCountry": "ES"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.691745,
        "longitude": -6.131718
      },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "17:00", "closes": "23:30" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "17:00", "closes": "00:30" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday", "Saturday"], "opens": "12:30", "closes": "00:30" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "12:30", "closes": "00:00" }
      ],
      "servesCuisine": ["Hamburguesas", "Smash Burgers", "Vegana", "Postres", "Tartas"],
      "priceRange": "€€",
      "sameAs": [
        "https://www.instagram.com/whynotburgercake/?hl=es"
      ]
    };

    scriptSEO.textContent = JSON.stringify(schemaData);
  }, []);

  // Función para obtener los colores de cada categoría dinámica
  const getTheme = (catKey) => {
    if (catKey === 'vegana') return {
      bg: 'bg-[#84CC16]', border: 'border-[#84CC16]', text: 'text-[#84CC16]',
      shadow: 'shadow-[0_0_15px_rgba(132,204,22,0.3)]',
      hoverBorder: 'hover:border-[#84CC16]', hoverText: 'hover:text-[#84CC16]',
      hoverShadow: 'hover:shadow-[#84CC16]/10'
    };
    if (catKey === 'postres') return {
      bg: 'bg-[#F9A8D4]', border: 'border-[#F9A8D4]', text: 'text-[#F9A8D4]',
      shadow: 'shadow-[0_0_15px_rgba(249,168,212,0.3)]',
      hoverBorder: 'hover:border-[#F9A8D4]', hoverText: 'hover:text-[#F9A8D4]',
      hoverShadow: 'hover:shadow-[#F9A8D4]/10'
    };
    // Por defecto (Why Not Yellow)
    return {
      bg: 'bg-[#FFCE11]', border: 'border-[#FFCE11]', text: 'text-[#FFCE11]',
      shadow: 'shadow-[0_0_15px_rgba(255,206,17,0.3)]',
      hoverBorder: 'hover:border-[#FFCE11]', hoverText: 'hover:text-[#FFCE11]',
      hoverShadow: 'hover:shadow-[#FFCE11]/10'
    };
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#FFC20E] selection:text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@700&family=Roboto:wght@300;400;500;700;900&display=swap');
        
        .font-display {
          font-family: 'Bebas Neue', cursive;
          letter-spacing: 0.05em;
        }
        
        .font-body {
          font-family: 'Roboto', sans-serif;
        }

        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-[#FFC20E]/20 z-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10 md:w-12 md:h-12 text-[1.1rem] md:text-xl" />
              <div>
                <div className="font-display text-xl md:text-2xl text-white leading-none">WHY NOT</div>
                <div className="text-[#FFCE11] text-xs uppercase tracking-widest">Burger & Cake</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('filosofia')}
                className="text-white hover:text-[#FFC20E] transition-colors font-body uppercase text-sm tracking-wider"
              >
                Filosofía
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-white hover:text-[#FFC20E] transition-colors font-body uppercase text-sm tracking-wider"
              >
                Menú
              </button>
              <button
                onClick={() => scrollToSection('location')}
                className="text-white hover:text-[#FFC20E] transition-colors font-body uppercase text-sm tracking-wider"
              >
                Ubicación
              </button>
              <a
                href="https://wa.me/34689069133"
                target="_blank"
                rel="noopener noreferrer"
                title="Reserva tu mesa por WhatsApp"
                aria-label="Reservar mesa mediante WhatsApp"
                className="flex items-center gap-2 px-6 py-2 bg-transparent border border-[#FFCE11] text-[#FFCE11] font-body font-medium hover:bg-[#FFCE11] hover:text-black transition-colors uppercase text-sm tracking-wider rounded-sm"
              >
                Reservar
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#FFC20E]/20">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection('filosofia')}
                  className="text-left text-white hover:text-[#FFC20E] transition-colors font-body uppercase text-sm tracking-wider"
                >
                  Filosofía
                </button>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="text-left text-white hover:text-[#FFC20E] transition-colors font-body uppercase text-sm tracking-wider"
                >
                  Menú
                </button>
                <button
                  onClick={() => scrollToSection('location')}
                  className="text-left text-white hover:text-[#FFC20E] transition-colors font-body uppercase text-sm tracking-wider"
                >
                  Ubicación
                </button>
                <a
                  href="https://wa.me/34689069133"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Reservar mesa mediante WhatsApp"
                  className="flex items-center justify-center gap-2 px-6 py-3 mt-2 border border-[#FFCE11] text-[#FFCE11] w-full font-body font-medium uppercase text-sm tracking-wider rounded-sm"
                >
                  Reservar
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 md:pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1766589220952-206ab9818977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwY2hlZXNlJTIwYmFjb258ZW58MXx8fHwxNzcyMzcwNjgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Fondo espectacular de Why Not Burger - Las mejores Smash Burgers y comida vegana en Jerez de la Frontera"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-12">
          <h1 className="flex flex-col items-center">
            <Logo className="w-28 h-28 md:w-36 md:h-36 text-5xl md:text-6xl mb-8 shadow-2xl" />
            <span className="font-display text-6xl md:text-7xl lg:text-8xl mb-6 text-white tracking-wide">
              BURGER <span className="text-[#FFCE11]">&</span> CAKE
            </span>
          </h1>
          <p className="font-body text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
            Las mejores smash burgers de Jerez de la Frontera. Carne premium, opciones 100% plant-based y tartas artesanas que te harán volver.
          </p>
          <button
            onClick={() => scrollToSection('menu')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFCE11] text-black font-body font-bold hover:bg-[#e5b80f] transition-all transform hover:scale-105 uppercase tracking-wider rounded-sm shadow-lg shadow-[#FFCE11]/20"
          >
            Ver Carta
          </button>
        </div>
      </section>

      {/* Filosofía Section */}
      <section id="filosofia" className="py-20 md:py-32 bg-black border-t border-neutral-900">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">

            {/* Texto */}
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-body font-bold text-white mb-2 tracking-tight">
                Alma de Barrio,
              </h2>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-body font-bold text-[#FFCE11] italic mb-8 tracking-tight">
                Corazón Gourmet.
              </h2>

              <div className="space-y-6 text-gray-400 font-body text-lg md:text-xl leading-relaxed mb-12 font-light">
                <p>
                  En <strong className="text-white font-medium">Why Not</strong> reivindicamos el orgullo de ser tu hamburguesería de confianza. Ese rincón de Jerez de la Frontera donde el trato es cercano, de tú a tú, y donde vienes a disfrutar sin prisas.
                </p>
                <p>
                  Nuestra obsesión es sencilla: ofrecerte las mejores <strong className="text-white font-medium">Smash Burgers</strong>, con esa costra crujiente y jugosa que nos define, y terminar siempre con una de nuestras famosas <strong className="text-white font-medium">tartas caseras</strong>. Porque aquí cocinamos para vecinos y amigos, y eso se nota en cada bocado.
                </p>
              </div>

              {/* Estadísticas */}
              <div className="flex justify-center gap-12 md:gap-24 border-t border-neutral-800 pt-8">
                <div>
                  <div className="text-3xl md:text-4xl font-display text-white mb-2">300+</div>
                  <div className="text-xs md:text-sm font-body text-gray-500 uppercase tracking-widest flex justify-center items-center gap-1 font-medium">
                    RESEÑAS 4.7 <span className="text-[#FFCE11] text-lg leading-none mb-1">★</span>
                  </div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-display text-white mb-2">100%</div>
                  <div className="text-xs md:text-sm font-body text-gray-500 uppercase tracking-widest font-medium">
                    ARTESANAL
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 md:py-24 bg-black border-t border-neutral-900">
        <div className="container mx-auto px-4 md:px-6">
          <header className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-[#FFCE11] font-display text-xl md:text-2xl uppercase tracking-widest border-b-2 border-[#FFCE11] pb-1">Nuestra Carta</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl mb-4 text-white mt-4">WHY NOT MENU</h2>
            <p className="font-body text-gray-400 max-w-2xl mx-auto font-light">
              Explora nuestra selección de burgers, entrantes y postres artesanos
            </p>
          </header>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
            {Object.entries(menuData).map(([key, category]) => {
              const theme = getTheme(key);

              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-6 py-3 font-display text-lg md:text-xl uppercase tracking-wider transition-all border-2 rounded-sm ${activeCategory === key
                      ? `${theme.bg} text-black ${theme.border} ${theme.shadow}`
                      : `bg-black text-gray-400 border-neutral-800 ${theme.hoverBorder} ${theme.hoverText}`
                    }`}
                >
                  {category.title}
                </button>
              );
            })}
          </div>

          {/* Category Note */}
          {menuData[activeCategory].note && (
            <div className="text-center mb-8">
              <p className={`inline-block px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-sm font-body uppercase tracking-wider text-sm ${getTheme(activeCategory).text}`}>
                {menuData[activeCategory].note}
              </p>
            </div>
          )}

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {menuData[activeCategory].items.map((item, index) => {
              const activeTheme = getTheme(activeCategory);

              return (
                <article
                  key={index}
                  className={`group relative bg-neutral-900 border-2 border-neutral-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl ${activeTheme.hoverBorder} ${activeTheme.hoverShadow}`}
                >
                  {/* Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-neutral-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent"></div>

                    {/* Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {item.isNew && (
                        <div className={`px-3 py-1 text-black font-display text-xs uppercase tracking-wider rounded-sm shadow-md ${activeTheme.bg}`}>
                          Nuevo!
                        </div>
                      )}
                      {item.isSpecial && (
                        <div className="px-3 py-1 bg-white text-black font-display text-xs uppercase tracking-wider rounded-sm shadow-md">
                          Special
                        </div>
                      )}
                    </div>

                    {/* Title and Price Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-end justify-between gap-4">
                        <h3 className="font-display text-2xl md:text-3xl text-white leading-none">
                          {item.name}
                        </h3>
                        <span className={`font-display text-2xl md:text-3xl bg-black/60 px-2 py-1 rounded backdrop-blur-sm ${activeTheme.text}`}>
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-5 bg-neutral-900">
                    <p className="font-body text-sm text-gray-400 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ambiente Section */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] border-t border-neutral-900">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 rounded-full border border-[#FFCE11] flex items-center justify-center text-[#FFCE11]">
              <Heart className="w-7 h-7" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 font-serif font-bold tracking-tight">
            Ambiente Urbano & Familiar
          </h2>
          <p className="font-body text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            Why Not es más que un restaurante; es un espacio vibrante para todos. Con
            una terraza perfecta en el Barrio de San Joaquín para las tardes y noches de Jerez,
            contamos con un <strong className="text-white font-medium">parque para niños</strong> justo al lado, ideal para que disfrutes con
            la familia mientras saboreas nuestras burgers.
          </p>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 md:py-24 bg-neutral-900 relative border-t border-neutral-800">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <header className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-[#FFCE11] font-display text-xl md:text-2xl uppercase tracking-widest border-b-2 border-[#FFCE11] pb-1">Visítanos</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-white mt-4">Encuéntranos</h2>
          </header>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a
              href="https://maps.app.goo.gl/xzvBHTUhvFeU4Ks19"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver ubicación en Google Maps"
              className="text-center p-8 bg-black rounded-lg border border-neutral-800 hover:border-[#FFCE11] transition-colors group block"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFCE11]/10 text-[#FFCE11] mb-6 rounded-full group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl text-white mb-3 uppercase tracking-wide">Dirección</h3>
              <address className="font-body text-gray-400 font-light not-italic">
                Plaza de Nicaragua, 7, local 2<br />
                11407 Jerez de la Frontera, Cádiz
              </address>
            </a>

            <div className="text-center p-8 bg-black rounded-lg border border-neutral-800 hover:border-[#FFCE11] transition-colors group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFCE11]/10 text-[#FFCE11] mb-6 rounded-full group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl text-white mb-3 uppercase tracking-wide">Horario</h3>
              <p className="font-body text-gray-400 font-light text-sm leading-relaxed">
                Lun - Mar: Cerrado<br />
                Mié: 17:00 - 23:30<br />
                Jue: 17:00 - 00:30<br />
                Vie - Sáb: 12:30 - 00:30<br />
                Dom: 12:30 - 00:00
              </p>
            </div>

            <div className="text-center p-8 bg-black rounded-lg border border-neutral-800 hover:border-[#FFCE11] transition-colors group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFCE11]/10 text-[#FFCE11] mb-6 rounded-full group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl text-white mb-3 uppercase tracking-wide">Contacto</h3>
              <address className="font-body text-gray-400 font-light not-italic flex flex-col gap-1">
                <a href="tel:+34689069133" className="hover:text-[#FFCE11] transition-colors">Tel: +34 689 069 133</a>
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-neutral-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Logo className="w-10 h-10 text-[1.1rem]" />
                <div>
                  <div className="font-display text-xl text-white tracking-wide leading-none">WHY NOT</div>
                  <div className="text-[#FFCE11] text-xs uppercase tracking-widest mt-1">Burger & Cake</div>
                </div>
              </div>
              <p className="font-body text-gray-400 leading-relaxed max-w-sm font-light">
                Las mejores smash burgers y tartas artesanas de Jerez de la Frontera. Calidad suprema y opciones veganas en cada bocado.
              </p>
            </div>

            <div>
              <h4 className="font-display text-xl text-white mb-6 uppercase tracking-wider">Enlaces Rápidos</h4>
              <nav className="space-y-3" aria-label="Navegación del pie de página">
                <button
                  onClick={() => scrollToSection('filosofia')}
                  className="block font-body text-gray-400 hover:text-[#FFCE11] transition-colors uppercase text-sm tracking-wide"
                >
                  Filosofía
                </button>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="block font-body text-gray-400 hover:text-[#FFCE11] transition-colors uppercase text-sm tracking-wide"
                >
                  Nuestra Carta
                </button>
                <button
                  onClick={() => scrollToSection('location')}
                  className="block font-body text-gray-400 hover:text-[#FFCE11] transition-colors uppercase text-sm tracking-wide"
                >
                  Ubicación y Horarios
                </button>
              </nav>
            </div>

            <div>
              <h4 className="font-display text-xl text-white mb-6 uppercase tracking-wider">Síguenos</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/whynotburgercake/?hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Síguenos en Instagram"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-gray-400 hover:text-black hover:bg-[#FFCE11] transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 text-center md:flex md:justify-between md:items-center">
            <p className="font-body text-gray-500 text-sm mb-4 md:mb-0">
              © 2026 Why Not Burger & Cake. Todos los derechos reservados.
            </p>
            <div className="flex justify-center gap-4 text-sm font-body text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default App;