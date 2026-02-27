import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Instagram, Sparkles, Utensils, Star, ChevronRight, Map as MapIcon, Menu, X, Info, ChevronDown, Heart, ExternalLink } from 'lucide-react';
import photoburger from './assets/Gemini_Generated_Image_2msapp2msapp2msa.png';
import photoburger2 from './assets/Gemini_Generated_Image_a61ke4a61ke4a61k.png';

// --- CONFIGURACIÓN GEMINI API ---
const apiKey = ""; 

const callGemini = async (prompt, systemInstruction = "") => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Respuesta de Google:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "El chef está pensando... inténtalo de nuevo.";
  } catch (error) {
    console.error("Error llamando a Gemini:", error);
    return "Hubo un error de conexión. Por favor, intenta más tarde.";
  }
};

// --- DATA: CARTA COMPLETA & ALÉRGENOS ---
const allergensMap = {
  GLU: { label: 'Gluten', short: 'GLU', color: 'bg-orange-200 text-orange-900' },
  CRU: { label: 'Crustáceos', short: 'CRU', color: 'bg-red-200 text-red-900' },
  HUE: { label: 'Huevos', short: 'HUE', color: 'bg-yellow-200 text-yellow-900' },
  PES: { label: 'Pescado', short: 'PES', color: 'bg-blue-200 text-blue-900' },
  CAC: { label: 'Cacahuetes', short: 'CAC', color: 'bg-amber-800 text-amber-100' },
  SOJ: { label: 'Soja', short: 'SOJ', color: 'bg-stone-300 text-stone-800' },
  LAC: { label: 'Lácteos', short: 'LAC', color: 'bg-sky-100 text-sky-800' },
  FRU: { label: 'Frutos Secos', short: 'FRU', color: 'bg-emerald-200 text-emerald-900' },
  API: { label: 'Apio', short: 'API', color: 'bg-green-200 text-green-900' },
  MOS: { label: 'Mostaza', short: 'MOS', color: 'bg-yellow-400 text-yellow-900' },
  SES: { label: 'Sésamo', short: 'SES', color: 'bg-zinc-200 text-zinc-800' },
  SUL: { label: 'Sulfitos', short: 'SUL', color: 'bg-purple-200 text-purple-900' },
  ALT: { label: 'Altramuz', short: 'ALT', color: 'bg-lime-200 text-lime-900' },
  MOL: { label: 'Moluscos', short: 'MOL', color: 'bg-indigo-200 text-indigo-900' },
};

// Helper function to create allergen objects simply
const alg = (code, sauce = false) => ({ code, sauce });

const menuData = {
  entrantes: {
    title: "Entrantes",
    theme: { headerBg: "bg-[#FFC20E]", titleColor: "text-[#e64a19]" },
    items: [
      { name: "Nacho Libre", price: "10.50€", desc: "A tope de nachos, queso, guacamole, chili con carne, sour cream y jalapeños.", allergens: [alg("LAC")] },
      { name: "Aros de Cebolla", price: "5.00€", desc: "Aros de cebolla a la cerveza con salsa ranchera.", allergens: [alg("GLU"), alg("SOJ", true), alg("LAC", true)] },
      { name: "Jalapeños Rellenos", price: "6.00€", desc: "Jalapeños rellenos de cheddar, fritos.", allergens: [alg("GLU"), alg("SOJ"), alg("LAC")] },
      { name: "Fingers de Pollo", price: "5.50€", desc: "Fingers de pollo con salsa ranchera.", allergens: [alg("GLU")] },
      { name: "Teque-Ñots", price: "6.00€", desc: "Tequeños de hojaldre rellenos de queso con mermelada de arándanos.", allergens: [alg("GLU"), alg("LAC"), alg("HUE")] },
      { name: "Alitas Mexicanas", price: "6.00€", desc: "Alitas de pollo fritas con especias mexicanas, salsa de mango y chile.", allergens: [], isNew: true },
      { name: "Croq & Cheese", price: "5.90€", desc: "Croquetas rellenas de macarrones con queso.", allergens: [alg("GLU"), alg("LAC")] },
      { name: "Samosas de Pollo", price: "5.90€", desc: "Empanadillas en masa fina de pollo al curry con mayonesa Why Not.", allergens: [alg("GLU"), alg("HUE")] },
      { name: "Supremas Surmanas", price: "5.50€", desc: "Piezas de pollo rebozado al estilo sureño con curry mango.", allergens: [alg("GLU"), alg("API"), alg("LAC", true), alg("MOS", true)]},
    ]
  },
  patatas: {
    title: "Patatas",
    theme: { headerBg: "bg-[#FFC20E]", titleColor: "text-[#e64a19]" },
    items: [
      { name: "Patatas 4 Salsas", price: "6.50€", desc: "A tope de patatas naturales, ranchera, ketchup, mostaza-miel, baconasse.", allergens: [alg("HUE", true), alg("SOJ", true), alg("LAC", true), alg("API", true), alg("MOS", true)] },
      { name: "Patatas al Curry", price: "6.00€", desc: "Patatas naturales con nuestro curry orgánico especial y aceite de coco orgánico V.E.", allergens: [alg("HUE", true), alg("API"), alg("MOS")] },
      { name: "Boniato Sweet", price: "6.50€", desc: "Boniato frito con sweet mayo.", allergens: [alg("HUE", true)] },
      { name: "Patatas con Queso", price: "7.00€", desc: "Patatas naturales, queso cheddar y edam.", allergens: [alg("LAC")] },
      { name: "Patatas Why Not", price: "9.50€", desc: "Patatas naturales (not congeladas), queso cheddar, edam, bacon y pulled pork.", allergens: [alg("SOJ"), alg("LAC")] },
      { name: "Boniato Why Not", price: "9.90€", desc: "Boniato natural, queso cheddar, edam, bacon y pulled pork.", allergens: [alg("SOJ"), alg("LAC")] },
    ]
  },
  burgers: {
    title: "Burgers",
    note: "Todas nuestras burgers incluyen patatas y salsa.",
    theme: { headerBg: "bg-[#FFC20E]", titleColor: "text-[#e64a19]" },
    items: [
      { name: "Why Not Burger", price: "9.60€", desc: "Brioche, ternera, bacon, queso, tomate, lechuga, mayonesa Why Not.", allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC")] },
      { name: "Park Cheese", price: "9.90€", desc: <>Brioche, ternera, cheddar, edam, <span className="text-[#FFD700] font-bold text-[1.1em]">mac & cheese</span>, cebolla caramelizada, mayonesa Why Not.</>, allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC")] },
      { name: "Parkbacoa", price: "9.90€", desc: "Brioche, ternera, bacon, cheddar, aros de cebolla, salsa barbacoa SBR.", allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC"), alg("MOS")] },
      { name: "GoHome Burger", price: "10.90€", desc: "Brioche con semillas, ternera, cheddar, bacon, huevo, tomate, lechuga, mayonesa de trufa.", allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC"), alg("SES")] },
      { name: "Chicken Mc Fly", price: "8.90€", desc: "Brioche con semillas, crispy chicken, cheddar, tomate, lechuga, mayonesa Why Not.", allergens: [alg("GLU"), alg("HUE"), alg("LAC"), alg("API"), alg("SES")] },
      { name: "Pulled Park", price: "9.50€", desc: "Brioche, ternera, cheddar, pulled pork, cebolla frita, salsa barbacoa.", allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC")] },
      { name: "Cangreburger", price: "5.90€", desc: "Brioche, ternera 90g, cheddar.", allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC")] },
      { name: "Centolloburger", price: "6.90€", desc: "Brioche, ternera 120g, cheddar.", allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC"), alg("CRU"), alg("PES")] },
      { 
        name: "Gran Kahuna", 
        price: "13.50€", 
        desc: <>Brioche semillas, doble burger, <span className="text-[#FFD700] font-bold text-[1.1em]">piña</span>, doble queso, bacon, tomate, lechuga, mayonesa Why Not.</>, 
        allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC")],
        isKahuna: true
      },
      { name: "La Llorona", price: "10.90€", desc: "Brioche semillas, ternera, cheddar, chili con carne, guacamole, nachos y habanero.", allergens: [alg("GLU"), alg("LAC")] },
      { name: "Smokey Burger", price: "9.80€", desc: "Brioche, ternera, bacon, queso ahumado, aros de cebolla, barbacoa.", allergens: [alg("GLU"), alg("LAC"), alg("SOJ")] },
    ]
  },
  smash: {
    title: "Smash Burgers",
    note: "Técnica smash para costra perfecta.",
    theme: { headerBg: "bg-[#FFC20E]", titleColor: "text-[#e64a19]" },
    items: [
      { name: "Smash Bro", price: "11.90€", desc: "Brioche semillas, doble smash burger, doble queso, bacon, lechuga, cebolla caramelizada.", allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC")] },
      { name: "Sanjua King Smash", price: "11.90€", desc: "Brioche semillas, doble smash burger, doble queso, aros de cebolla, tomate, lechuga, mayonesa Why Not.", allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC")] },
      { name: "He-Man Smash", price: "14.90€", desc: <>Brioche semillas, <span className="text-[#FFD700] font-bold text-[1.1em]">cuádruple</span> smash burger, <span className="text-[#FFD700] font-bold text-[1.1em]">cuádruple</span> queso, bacon, aros de cebolla, tomate, lechuga, mayonesa Why Not.</>, allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC")] },
      { name: "Bubi Smash", price: "12.90€", desc: "Brioche, doble smash burger, doble cheddar, doble queso ahumado, bacon, cebolla frita, baconesa.", allergens: [alg("GLU"), alg("HUE"), alg("SOJ"), alg("LAC")] },
    ]
  },
  vegan: {
    title: "Why Not Vegan",
    theme: { headerBg: "bg-[#76BC21]", titleColor: "text-[#76BC21]" },
    items: [
      { name: "Charly Burger", price: "10.40€", desc: "Pan vegano, Heura burger, queso vegano, tomate, lechuga, veganesa BBQ.", allergens: [alg("GLU"), alg("MOS")] },
      { name: "Not Chicken McFly", price: "10.40€", desc: "Pan vegano, NotChicken burger, queso vegano, tomate, lechuga, vegan sweet mayo.", allergens: [alg("GLU"), alg("SOJ")] },
      { isHeader: true, title: "Entrantes", theme: { headerBg: "bg-[#76BC21]", titleColor: "text-[#1a1a1a]" } },
      { name: "Patatas al Curry", price: "6.00€", desc: "A tope de patatas naturales, con nuestro curry orgánico especial y aceite de coco orgánico V.E.", allergens: [alg("API"), alg("MOS")] },
      { name: "Boniato Sweet", price: "6.50€", desc: "Boniato frito con vegan sweet mayo.", allergens: [] },
      { name: "Nacho Vegano", price: "11.50€", desc: "A tope de nachos, queso vegano, guacamole, sour cream y jalapeños.", allergens: [] },
      { name: "Notggets", price: "6.50€", desc: "Nuggets de NotPollo con vegan mayo y patatas.", allergens: [alg("GLU"), alg("SOJ")] },
      { name: "Patatas con Queso Vegano", price: "7.50€", desc: "Patatas naturales, queso vegano tipo monterrey.", allergens: [] },
      { name: "Aros de Cebolla", price: "5.00€", desc: "Aros de cebolla a la cerveza con ketchup.", allergens: [alg("GLU"), alg("API", true)] },
    ]
  },
  postres: {
    title: "And Cake",
    theme: { headerBg: "bg-[#FFC20E]", titleColor: "text-[#F472B6]" },
    items: [
      { name: "Tartas", price: "4.50€", desc: "Abuela, Red Velvet, Kinder, Limón, según nos coja el día.", allergens: [] },
      { name: "Tartas de Queso", price: "4.80€", desc: "Pistacho, Lotus, Conguitos, Pantera... siempre innovando.", allergens: [] },
      { name: "Cookies Artesanas", price: "3.20€", desc: "Classic, Ferrero, KitKat, Praliné.", allergens: [] },
      { name: "Cookies Clásicas", price: "2.50€", desc: "Chips de choco o lacasitos.", allergens: [] },
      { name: "Donut Glaseado", price: "1.50€", desc: "Tal como su nombre indica.", allergens: [] },
    ]
  }
};

const powerUps = [
  { name: "Veganiza tu Burger", price: "2.00€", desc: "Cambia carne por Heura o Not-Chicken" },
  { name: "Chickeniza tu Burger", price: "1.00€", desc: "Cambia carne por Crispy Chicken" },
  { name: "A mi me daban dos", price: "2.90€", desc: "Carne extra 120g" },
  { name: "Grosso Modo", price: "1.50€", desc: "Agranda carne 120g a 180g" },
  { name: "Doble Grosso", price: "6.00€", desc: "Agranda a 180g + carne extra 180g" },
  { name: "Smash Tower", price: "4.80€", desc: "Añade 2 capas de smash y queso" },
];

const modifiers = [
  { name: "Extra Queso", price: "0.80€" },
  { name: "Queso Ahumado", price: "1.00€" },
  { name: "Ceb. Caramelizada", price: "1.00€" },
  { name: "Extra Bacon", price: "1.00€" },
  { name: "Aros Cebolla", price: "1.00€" },
  { name: "Extra Huevo", price: "1.00€" },
  { name: "Extra Salsa", price: "1.00€" },
  { name: "Extra Habanero", price: "0.80€" },
];

const googleReviews = [
  { name: "Alejandro Muñoz", time: "hace 2 semanas", stars: 5, text: "Las mejores smash de Jerez sin duda. La carne tiene un sabor increíble y las patatas son caseras de verdad. El sitio tiene un rollo muy guapo." },
  { name: "Lucía Rodríguez", time: "hace 1 mes", stars: 5, text: "El sitio es súper chulo y el trato de 10. Recomiendo dejar sitio para la tarta de queso de Lotus, ¡es otro nivel!" },
  { name: "Javi García", time: "hace 3 días", stars: 5, text: "Brutal. Pedimos la Park Cheese y la Smash Bro. La costra de la carne es perfecta. Volveremos seguro." },
  { name: "Marta Sánchez", time: "hace 2 meses", stars: 4, text: "Opciones veganas muy top, no es la típica hamburguesa vegetal insípida. El servicio un poco lento porque estaba lleno, pero merece la pena." }
];

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('entrantes');
  
  // AI States
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const [sommelierInput, setSommelierInput] = useState('');
  const [sommelierResponse, setSommelierResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  
  const [excuse, setExcuse] = useState('');
  const [isGeneratingExcuse, setIsGeneratingExcuse] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setActiveCategory(categoryId);
    }
  };

  const handleAskSommelier = async () => {
    if (!sommelierInput.trim()) return;
    
    setIsThinking(true);
    setSommelierResponse('');
    
    const systemPrompt = `Eres el "Sommelier Virtual" de Why Not Burger en Jerez. Tu personalidad es urbana, premium, un poco "canalla" pero muy profesional gastronómicamente. Tu objetivo es recomendar UNA burger y UN acompañamiento (o postre) del siguiente menú basándote en lo que el usuario quiere: ${JSON.stringify(menuData)}. 
    Reglas: 1. Responde de forma breve (máx 3 frases). 2. Usa un tono persuasivo. 3. Si el usuario dice algo raro, haz una broma elegante. 4. Usa algún emoji. 5. Menciona el nombre exacto del plato en negrita.`;

    const response = await callGemini(sommelierInput, systemPrompt);
    setSommelierResponse(response);
    setIsThinking(false);
  };

  const generateExcuse = async () => {
    setIsGeneratingExcuse(true);
    const systemPrompt = `Genera una excusa corta, ingeniosa y filosófica (estilo "Why Not?") para comerse una hamburguesa hoy y saltarse la dieta. Tono: Sofisticado, irónico, hedonista. Máximo 15 palabras.`;
    const response = await callGemini("Dame una excusa nueva", systemPrompt);
    setExcuse(response);
    setIsGeneratingExcuse(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-amber-500 selection:text-black">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Anton&display=swap');
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
          .font-condensed { font-family: 'Anton', sans-serif; }
          
          .glass-nav {
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
          
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          <a href="#" className="flex items-center gap-3 z-50 relative group">
            <div className="relative w-12 h-12 bg-[#FFD700] rounded-lg shadow-lg flex flex-col items-center justify-center select-none transform group-hover:scale-105 transition-transform duration-300 overflow-hidden gap-0.5">
               <div className="font-condensed text-black text-[1.3rem] leading-[0.8] tracking-tighter pt-0.5">WHY</div>
               <div className="font-condensed text-black text-[1.3rem] leading-[0.8] tracking-tighter pb-0.5">NOT</div>
            </div>
            <div className="flex flex-col opacity-90 group-hover:opacity-100 transition-opacity">
              <span className="text-xl font-serif font-bold tracking-wide text-white leading-none">WHY NOT</span>
              <span className="text-[0.6rem] tracking-[0.25em] text-[#FFD700] uppercase leading-none mt-1 font-semibold">Burger & Cake</span>
            </div>
          </a>

          <div className="hidden md:flex space-x-8 items-center text-sm tracking-widest uppercase font-medium">
            {['Filosofía', 'Menú', 'Experiencia', 'Ubicación'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                className="hover:text-[#FFD700] transition-colors duration-300"
              >
                {item}
              </button>
            ))}
            <a 
              href="https://wa.me/34689069133?text=Hola!%20Me%20gustaría%20hacer%20una%20reserva%20en%20Why%20Not."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all duration-300 rounded-sm font-medium"
            >
              Reservar
            </a>
          </div>

          <button onClick={toggleMenu} className="md:hidden text-white z-50 focus:outline-none">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-neutral-950 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          {['Filosofía', 'Menú', 'Experiencia', 'Ubicación'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className="text-2xl font-serif text-white hover:text-[#FFD700]"
            >
              {item}
            </button>
          ))}
          <a 
            href="https://wa.me/34689069133?text=Hola!%20Me%20gustaría%20hacer%20una%20reserva%20en%20Why%20Not."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#FFD700] text-black font-medium mt-4 rounded-sm text-center w-64"
          >
            Reservar por WhatsApp
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2598&auto=format&fit=crop" 
            alt="Smash burger gourmet con iluminación dramática" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="block text-[#FFD700] tracking-[0.2em] text-sm uppercase mb-4">Jerez de la Frontera</span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
            Smash Burgers <br/>
            <span className="italic font-light text-neutral-300 text-3xl sm:text-4xl md:text-6xl lg:text-7xl">con Carácter</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Artesanía, fuego y sabor en el corazón de Jerez. Una experiencia gastronómica donde el street food se eleva a nivel gourmet.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center flex-wrap">
            <button 
              onClick={() => scrollToSection('menu')}
              className="px-8 py-4 bg-[#FFD700] text-black font-semibold hover:bg-white transition-colors duration-300 min-w-[200px]"
            >
              Ver Carta
            </button>
            <a 
              href="tel:689069133"
              className="px-8 py-4 bg-transparent border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all duration-300 min-w-[200px] flex items-center justify-center gap-2 font-semibold"
            >
              <Phone size={18} /> Llamar ahora
            </a>
          </div>
        </div>
      </header>

      {/* AI Sommelier Modal */}
      {isSommelierOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSommelierOpen(false)}></div>
          <div className="bg-neutral-900 border border-[#FFD700]/30 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative z-10 animate-fade-in-up">
            <div className="bg-black/50 p-6 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FFD700]/10 rounded-lg">
                  <Sparkles size={24} className="text-[#FFD700]" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Sommelier Why Not ✨</h3>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest">Powered by Gemini AI</p>
                </div>
              </div>
              <button onClick={() => setIsSommelierOpen(false)} className="text-neutral-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {sommelierResponse ? (
                <div className="bg-neutral-800/50 p-6 rounded-lg border border-white/5 mb-6">
                  <p className="text-lg leading-relaxed text-white font-medium">{sommelierResponse}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-400 mb-2">¿Indeciso? Cuéntame qué te apetece.</p>
                  <p className="text-sm text-neutral-600 italic">"Quiero algo picante", "Tengo mucha hambre", "Sorpréndeme"</p>
                </div>
              )}
              <div className="relative mt-4">
                <input 
                  type="text" 
                  value={sommelierInput}
                  onChange={(e) => setSommelierInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskSommelier()}
                  placeholder="Ej: Tengo un día de perros y necesito queso..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 pr-12 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                />
                <button 
                  onClick={handleAskSommelier}
                  disabled={isThinking}
                  className="absolute right-2 top-2 p-2 bg-[#FFD700] text-black rounded-md hover:bg-amber-400 transition-colors disabled:opacity-50"
                >
                  {isThinking ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Philosophy Section */}
      <section id="filosofia" className="py-16 md:py-24 bg-neutral-950 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute -top-10 -left-10 w-24 h-24 border-t border-l border-[#FFD700]/30"></div>
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 md:mb-8 tracking-tight">
                Alma de Barrio,<br/>
                <span className="text-[#FFD700] font-serif italic">Corazón Gourmet.</span>
              </h2>
              <p className="text-neutral-400 mb-6 leading-relaxed text-lg font-sans font-light">
                En <strong className="text-white font-medium">Why Not</strong> reivindicamos el orgullo de ser tu hamburguesería de confianza. Ese rincón de Jerez donde el trato es cercano, de tú a tú, y donde vienes a disfrutar sin prisas.
              </p>
              <p className="text-neutral-400 mb-8 leading-relaxed text-lg font-sans font-light">
                Nuestra obsesión es sencilla: ofrecerte las mejores <strong className="text-white font-medium">Smash Burgers</strong>, con esa costra crujiente y jugosa que nos define, y terminar siempre con una de nuestras famosas <strong className="text-white font-medium">tartas caseras</strong>. Porque aquí cocinamos para vecinos y amigos, y eso se nota en cada bocado.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-8 border-t border-white/10 pt-8">
                <div>
                  <h4 className="text-white font-serif text-xl mb-2">300+</h4>
                  <p className="text-neutral-500 text-sm uppercase tracking-wider font-sans">Reseñas 4.7 <Star size={12} className="inline text-[#FFD700]"/></p>
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl mb-2">100%</h4>
                  <p className="text-neutral-500 text-sm uppercase tracking-wider font-sans">Artesanal</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
              <img src={photoburger} alt="Burgers Why Not" className="rounded-2xl h-64 w-full object-cover shadow-lg" />
              <img src={photoburger2} alt="Local Why Not" className="rounded-2xl h-64 w-full object-cover mt-8 shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* FULL MENU SECTION */}
      <section id="menu" className="py-12 md:py-20 bg-black px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-[#f7d117] font-oswald tracking-[0.3em] text-sm uppercase">Nuestra Carta</span>
            <h2 className="text-5xl md:text-8xl font-stencil text-white mt-4">WHY NOT MENU</h2>
          </div>

          <div className="mb-10 p-1 bg-gradient-to-r from-transparent via-[#f7d117]/30 to-transparent">
            <div className="bg-[#1a1a1a] p-4 text-center flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-[#f7d117]">
                <Sparkles size={20} />
                <span className="font-condensed text-2xl tracking-wide uppercase">¿No sabes qué elegir?</span>
              </div>
              <button 
                onClick={() => setIsSommelierOpen(true)}
                className="text-sm font-oswald uppercase tracking-widest underline decoration-[#f7d117] hover:text-[#f7d117] transition-colors"
              >
                Pregúntale a nuestro Sommelier Virtual
              </button>
            </div>
          </div>

          {/* Quick Navigation (Sticky Header) */}
          <div className="sticky top-20 z-40 bg-[#1a1a1a]/95 backdrop-blur py-4 mb-8 border-y border-neutral-800 -mx-4 px-4 md:-mx-6 md:px-6">
            <div className="flex overflow-x-auto space-x-2 md:space-x-4 justify-start md:justify-center scrollbar-hide">
              {Object.keys(menuData).map((key) => (
                <button
                  key={key}
                  onClick={() => scrollToCategory(key)}
                  className={`px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-lg font-condensed tracking-wider transition-all duration-300 whitespace-nowrap border uppercase
                    ${activeCategory === key 
                      ? 'bg-[#f7d117] text-[#1a1a1a] border-[#f7d117]' 
                      : 'text-neutral-400 border-neutral-700 hover:text-white hover:border-neutral-500 bg-black'}`}
                >
                  {key === 'postres' ? 'AND CAKE' : menuData[key].title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Content */}
          <div className="space-y-24">
            {Object.keys(menuData).map((key) => (
              <div key={key} id={key} className="scroll-mt-48 animate-fade-in">
                
                {/* TÍTULO PRINCIPAL DE LA CATEGORÍA */}
                <div className="flex justify-center mb-16 relative">
                  <div className={`relative px-6 py-3 md:px-10 md:py-4 ${menuData[key].theme.headerBg} text-[#1a1a1a] font-stencil font-bold text-3xl md:text-5xl uppercase tracking-widest transform -rotate-2 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] md:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] border-2 md:border-4 border-[#1a1a1a]`}>
                    {menuData[key].title}
                    <div className="absolute inset-2 border-2 border-dashed border-[#1a1a1a]/40 pointer-events-none"></div>
                  </div>
                  {menuData[key].note && (
                    <p className="absolute -bottom-8 text-[#f7d117] font-oswald text-sm uppercase tracking-widest opacity-80 text-center w-full">{menuData[key].note}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-12">
                  {menuData[key].items.map((item, index) => {
                    
                    {/* SUBTÍTULOS (Ej: Entrantes dentro de Vegano) */}
                    if (item.isHeader) {
                      return (
                        <div key={index} className="col-span-1 md:col-span-2 flex justify-center py-6 md:py-8 mt-2 md:mt-4">
                          <div className={`relative px-6 py-2 md:px-8 md:py-3 ${item.theme ? item.theme.headerBg : menuData[key].theme.headerBg} text-[#1a1a1a] font-stencil font-bold text-xl md:text-3xl tracking-widest uppercase transform rotate-1 border-2 border-[#1a1a1a]`}>
                            {item.title}
                            <div className="absolute inset-1 border border-dashed border-[#1a1a1a]/40 pointer-events-none"></div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={index} className="group relative">
                        <div className="absolute -left-4 top-4 bottom-0 w-px bg-neutral-800/50 group-hover:bg-[#f07d22]/50 transition-colors"></div>
                        
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className={`text-xl md:text-3xl font-condensed tracking-wide uppercase flex items-center gap-2 md:gap-3 ${item.isKahuna ? 'text-[#FFD700]' : menuData[key].theme.titleColor} leading-tight`}>
                            {item.name}
                            {item.isNew && (
                              <span className="bg-[#f7d117] text-[#1a1a1a] text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 font-oswald font-bold uppercase tracking-widest animate-pulse ml-1 md:ml-2">NEW</span>
                            )}
                          </h4>
                          <span className={`${item.isKahuna ? 'text-[#FFD700]' : menuData[key].theme.titleColor} font-condensed text-xl md:text-3xl whitespace-nowrap ml-3 md:ml-4`}>{item.price}</span>
                        </div>
                        
                        <p className={`item-description font-oswald text-xs md:text-base uppercase tracking-wider mt-1 md:mt-0 ${item.isKahuna ? 'text-neutral-200' : 'text-neutral-400'}`}>
                          {item.desc}
                        </p>
                        
                        {/* Alérgenos del plato */}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {item.allergens.map((algItem, algIdx) => {
                              const code = typeof algItem === 'string' ? algItem : algItem.code;
                              const isSauce = typeof algItem !== 'string' && algItem.sauce;
                              const algData = allergensMap[code];
                              if (!algData) return null;
                              
                              return (
                                <span 
                                  key={algIdx} 
                                  className={`inline-flex items-center gap-1 text-[10px] md:text-xs px-1.5 py-0.5 rounded font-oswald font-bold uppercase tracking-wider ${algData.color}`}
                                  title={`${algData.label}${isSauce ? ' (en salsa)' : ''}`}
                                >
                                  {algData.short}
                                  {isSauce && <span className="text-[8px] md:text-[9px] font-sans tracking-normal lowercase opacity-80 ml-1">(salsa)</span>}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Power Ups for Smash Category */}
                {key === 'smash' && (
                  <div className="mt-20 bg-[#1a1a1a] p-8 border border-neutral-800 relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FFC20E]"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FFC20E]"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FFC20E]"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FFC20E]"></div>
                    
                    <h4 className="text-xl md:text-2xl font-condensed text-white mb-6 md:mb-8 text-center uppercase opacity-70 tracking-widest">
                      Personaliza tu experiencia
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                      <div>
                        {/* PEGATINA POWER UP */}
                        <div className="inline-block px-4 py-1.5 md:px-6 md:py-2 bg-[#FFC20E] text-[#1a1a1a] font-stencil font-bold text-xl md:text-2xl tracking-widest uppercase transform -rotate-1 mb-6 border-2 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                          POWER UP
                        </div>
                        <ul className="space-y-3 md:space-y-4">
                          {powerUps.map((p, i) => (
                            <li key={i} className="flex justify-between items-baseline">
                              <span className={p.name.includes("Veganiza") ? "text-[#76BC21] font-condensed text-lg md:text-xl uppercase" : "text-[#e64a19] font-condensed text-lg md:text-xl uppercase"}>
                                {p.name} <span className="text-neutral-500 text-[10px] md:text-xs block font-oswald uppercase tracking-wider mt-1">{p.desc}</span>
                              </span>
                              <span className={p.name.includes("Veganiza") ? "text-[#76BC21] font-condensed text-lg md:text-xl" : "text-[#e64a19] font-condensed text-lg md:text-xl"}>{p.price}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        {/* PEGATINA MODIFICADORES */}
                        <div className="inline-block px-4 py-1.5 md:px-6 md:py-2 bg-[#FFC20E] text-[#1a1a1a] font-stencil font-bold text-xl md:text-2xl tracking-widest uppercase transform rotate-1 mb-6 border-2 border-[#1a1a1a] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                          MODIFICADORES
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          {modifiers.map((m, i) => (
                            <li key={i} className="flex justify-between items-center text-sm bg-black p-2 md:p-3 border border-neutral-800">
                              <span className={`${m.name.includes('Habanero') ? 'text-[#FFC20E] drop-shadow-[0_0_5px_rgba(255,194,14,0.5)]' : 'text-[#e64a19]'} font-oswald uppercase text-[10px] md:text-xs`}>{m.name}</span>
                              <span className={`${m.name.includes('Habanero') ? 'text-[#FFC20E]' : 'text-[#e64a19]'} font-condensed text-base md:text-lg`}>{m.price}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Allergen Legend */}
            <div className="pt-16 border-t border-neutral-800">
              <p className="text-sm text-[#f7d117] mb-4 font-condensed tracking-widest text-center uppercase">Guía de Alérgenos</p>
              <div className="flex flex-wrap justify-center gap-3">
                {Object.entries(allergensMap).map(([code, data]) => (
                  <div key={code} className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 border border-neutral-800 rounded">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-oswald font-bold uppercase ${data.color}`}>
                      {code}
                    </span>
                    <span className="text-xs text-neutral-400 font-oswald uppercase tracking-wider">{data.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-16 md:py-24 bg-neutral-950 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-3 border border-[#FFD700]/30 rounded-full mb-6 md:mb-8">
               <Heart className="text-[#FFD700]" size={24} />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 md:mb-6">Ambiente Urbano & Familiar</h2>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
              Why Not es más que un restaurante; es un espacio vibrante para todos. Con una terraza perfecta en el Barrio de San Joaquín para las noches de Jerez, contamos con un <span className="text-white font-medium">parque para niños</span> justo al lado, ideal para que disfrutes con la familia mientras saboreas nuestras burgers.
            </p>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-16 md:py-24 bg-neutral-900 border-t border-neutral-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                   <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.424 44.599 -10.174 45.789 L -6.704 42.319 C -8.804 40.359 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                    </g>
                  </svg>
                </div>
                <span className="text-white font-bold text-xl tracking-tight">Google Reviews</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 leading-tight">Lo que dicen de nosotros</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[#FFD700] text-2xl font-bold">4.7</span>
                <div className="flex text-[#FFD700]">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <span className="text-neutral-400 text-sm ml-2">(300+ Reseñas)</span>
              </div>
            </div>
            
            <a 
              href="https://www.google.com/maps/place/Why+Not+-+Burger+%26+Cake/@36.7029589,-6.1282184,15z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white border border-white/20 px-6 py-3 rounded hover:bg-white hover:text-black transition-all group"
            >
              Ver en Google Maps <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform"/>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {googleReviews.map((review, i) => (
              <div key={i} className="bg-neutral-800 p-6 rounded-lg border border-neutral-700 hover:border-[#FFD700]/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center font-bold text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold leading-tight">{review.name}</h5>
                    <span className="text-neutral-500 text-xs">{review.time}</span>
                  </div>
                </div>
                <div className="flex text-[#FFD700] mb-3">
                  {[...Array(review.stars)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed line-clamp-4">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Footer */}
      <section id="ubicacion" className="bg-black text-white py-12 md:py-20 border-t border-neutral-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-serif mb-4 md:mb-6">Visítanos</h3>
                <p className="text-neutral-400 text-base md:text-lg mb-6">¿Listo para la mejor Burger de Jerez? <br className="hidden md:block"/>Te esperamos en nuestra terraza.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-neutral-800 p-3 rounded-full text-[#FFD700]"><MapPin size={20} /></div>
                  <div>
                    <h5 className="font-semibold text-white">Plaza de Nicaragua, 7, Local 2</h5>
                    <p className="text-neutral-500">11407 Jerez de la Frontera, Cádiz</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-neutral-800 p-3 rounded-full text-[#FFD700]"><Clock size={20} /></div>
                  <div>
                    <h5 className="font-semibold text-white">Horario</h5>
                    <div className="mt-3 space-y-3 text-sm text-neutral-400">
                      <div className="grid grid-cols-3 gap-2 border-b border-neutral-800 pb-2 mb-2">
                        <span className="text-white font-medium">Lun - Mar</span><span className="col-span-2 text-neutral-500 italic text-right">Cerrado</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 border-b border-neutral-800 pb-2 mb-2">
                         <span className="text-white font-medium">Miércoles</span>
                         <div className="col-span-2 space-y-1 text-right">
                            <div className="flex justify-between items-center"><span className="text-xs text-neutral-500">Local:</span> <span className="text-white">17:00 – 23:30</span></div>
                            <div className="flex justify-between items-center text-xs"><span className="text-[#FF8C00]">Cocina:</span> <span>20:00 – 23:00</span></div>
                         </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 border-b border-neutral-800 pb-2 mb-2">
                         <span className="text-white font-medium">Jueves</span>
                         <div className="col-span-2 space-y-1 text-right">
                            <div className="flex justify-between items-center"><span className="text-xs text-neutral-500">Local:</span> <span className="text-white">17:00 – 00:30</span></div>
                            <div className="flex justify-between items-center text-xs"><span className="text-[#FF8C00]">Cocina:</span> <span>20:00 – 23:30</span></div>
                         </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 border-b border-neutral-800 pb-2 mb-2">
                         <span className="text-white font-medium">Viernes</span>
                         <div className="col-span-2 space-y-1 text-right">
                            <div className="flex justify-between items-center"><span className="text-xs text-neutral-500">Local:</span> <span className="text-white">12:30 – 00:30</span></div>
                            <div className="flex justify-between items-start text-xs">
                              <span className="text-[#FF8C00]">Cocina:</span> 
                              <div className="flex flex-col items-end"><span>13:30 – 16:30</span><span>20:00 – 23:30</span></div>
                            </div>
                         </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 border-b border-neutral-800 pb-2 mb-2">
                         <span className="text-white font-medium">Sábado</span>
                         <div className="col-span-2 space-y-1 text-right">
                            <div className="flex justify-between items-center"><span className="text-xs text-neutral-500">Local:</span> <span className="text-white">12:30 – 00:30</span></div>
                            <div className="flex justify-between items-start text-xs">
                              <span className="text-[#FF8C00]">Cocina:</span> 
                              <div className="flex flex-col items-end"><span>13:30 – 16:30</span><span>20:30 – 00:00</span></div>
                            </div>
                         </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                         <span className="text-white font-medium">Domingo</span>
                         <div className="col-span-2 space-y-1 text-right">
                            <div className="flex justify-between items-center"><span className="text-xs text-neutral-500">Local:</span> <span className="text-white">12:30 – 00:00</span></div>
                            <div className="flex justify-between items-start text-xs">
                              <span className="text-[#FF8C00]">Cocina:</span> 
                              <div className="flex flex-col items-end"><span>13:30 – 16:30</span><span>20:00 – 23:00</span></div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-neutral-800 p-3 rounded-full text-[#FFD700]"><Phone size={20} /></div>
                  <div>
                    <h5 className="font-semibold text-white">Reservas</h5>
                    <a href="tel:689069133" className="text-[#FFD700] text-lg font-serif hover:underline">689 06 91 33</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full min-h-[300px] md:min-h-[400px] w-full bg-neutral-900 rounded-2xl relative overflow-hidden group shadow-[0_0_20px_rgba(255,215,0,0.3)] border-2 border-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2150.8245532703268!2d-6.130039854763437!3d36.70295888612673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0dc749ed3c3f9f%3A0x4d30b52338815424!2sWhy%20Not%20-%20Burger%20%26%20Cake!5e1!3m2!1ses!2ses!4v1771595784376!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Why Not Burger Jerez"
              ></iframe>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-end">
            <div>
              <p className="text-neutral-600 text-sm">© {new Date().getFullYear()} Why Not Burger & Cake. Todos los derechos reservados.</p>
              
              <div className="mt-6 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg max-w-md">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-[#FFD700]" />
                  <span className="text-xs uppercase tracking-widest text-[#FFD700]">¿Dudas? Why Not?</span>
                </div>
                <p className="text-sm text-neutral-400 min-h-[40px] italic">
                  {excuse || '¿Necesitas una excusa para pedirte esa burger? Dale al botón.'}
                </p>
                <button 
                  onClick={generateExcuse}
                  disabled={isGeneratingExcuse}
                  className="text-xs text-white border-b border-white/30 hover:text-[#FFD700] hover:border-[#FFD700] mt-2 pb-0.5 transition-colors disabled:opacity-50"
                >
                  {isGeneratingExcuse ? 'Consultando a los filósofos...' : 'Dame una razón'}
                </button>
              </div>
            </div>

            <div className="flex gap-6 mt-4 md:mt-0">
              <a 
                href="https://www.instagram.com/whynotburgercake/?hl=es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#FFD700] hover:text-[#FFD700]"
              >
                <Instagram size={16} /> @whynotburgercake
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/34689069133"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span className="absolute right-full mr-4 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          ¡Pide por WhatsApp!
        </span>
      </a>
    </div>
  );
};

export default App;