import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- SVG Icons ---
const CheckCircleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const MastercardIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="36"
    height="24"
  >
    <circle cx="8" cy="12" r="7" fill="#EA001B"></circle>
    <circle cx="16" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"></circle>
  </svg>
);

// --- Helper Components ---
const DashedLine = () => (
  <div
    className="w-full border-t-2 border-dashed border-white/10"
    aria-hidden="true"
  />
);

const Barcode = ({ value }) => {
  const hashCode = (s) => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  const seed = hashCode(value);
  const random = (s) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const bars = Array.from({ length: 60 }).map((_, index) => {
    const rand = random(seed + index);
    const width = rand > 0.7 ? 2.5 : 1.5;
    return { width };
  });

  const spacing = 1.5;
  const totalWidth = bars.reduce((acc, bar) => acc + bar.width + spacing, 0) - spacing;
  const svgWidth = 250;
  const svgHeight = 70;
  let currentX = (svgWidth - totalWidth) / 2;

  return (
    <div className="flex flex-col items-center py-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        aria-label={`Barcode for value ${value}`}
        className="fill-current text-white"
      >
        {bars.map((bar, index) => {
          const x = currentX;
          currentX += bar.width + spacing;
          return (
            <rect
              key={index}
              x={x}
              y="10"
              width={bar.width}
              height="50"
            />
          );
        })}
      </svg>
      <p className="text-sm text-white/50 tracking-[0.3em] mt-2">{value}</p>
    </div>
  );
};

const ConfettiExplosion = () => {
  const confettiCount = 100;
  const colors = ["#10b981", "#34d399", "#6ee7b7", "#059669", "#047857", "#fbbf24"];

  return (
    <>
      <style>
        {`
          @keyframes confetti-fall {
            0% {
              transform: translateY(-10vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: confettiCount }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-4"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${-20 + Math.random() * 10}%`,
              backgroundColor: colors[i % colors.length],
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `confetti-fall ${2.5 + Math.random() * 2.5}s ${Math.random() * 2}s linear forwards`,
            }}
          />
        ))}
      </div>
    </>
  );
};

// --- Main Ticket Component ---
export default function TicketConfirmation({
  ticketId = 'CMD-000000',
  amount = 0,
  date = new Date(),
  cardHolder = 'Client',
  last4Digits = '****',
  orderType = 'delivery',
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => setShowConfetti(true), 100);
    const unmountTimer = setTimeout(() => setShowConfetti(false), 6000);
    return () => {
      clearTimeout(mountTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  const formattedAmount = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount / 100);

  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date).replace(',', ' •');

  const barcodeValue = ticketId.replace(/[^0-9]/g, '') || '000000000000';

  return (
    <>
      {showConfetti && <ConfettiExplosion />}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl z-10 mx-auto"
      >
        {/* Ticket cut-out effect */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0a0a0a]" />
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0a0a0a]" />

        <div className="p-8 flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="p-3 bg-emerald-500/20 rounded-full"
          >
            <CheckCircleIcon className="w-10 h-10 text-emerald-400" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mt-4">Merci !</h1>
          <p className="text-white/60 mt-1">
            {orderType === 'delivery' 
              ? 'Votre commande est confirmée et en préparation'
              : 'Votre commande vous attend sur place'}
          </p>
        </div>

        <div className="px-8 pb-8 space-y-6">
          <DashedLine />

          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-xs text-white/40 uppercase">N° Commande</p>
              <p className="font-mono font-medium text-white">{ticketId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/40 uppercase">Montant</p>
              <p className="font-semibold text-lg text-emerald-400">{formattedAmount}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-white/40 uppercase">Date & Heure</p>
            <p className="font-medium text-white">{formattedDate}</p>
          </div>

          {last4Digits !== '****' && (
            <div className="bg-white/5 p-4 rounded-xl flex items-center space-x-4">
              <MastercardIcon />
              <div>
                <p className="font-semibold text-white">{cardHolder}</p>
                <p className="text-white/50 font-mono text-sm tracking-wider">•••• {last4Digits}</p>
              </div>
            </div>
          )}

          <DashedLine />

          <Barcode value={barcodeValue} />
        </div>
      </motion.div>
    </>
  );
}
