import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const cardHover: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.05, rotate: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const pageFlipLeft: Variants = {
  enter: {
    rotateY: [-90, 0],
    opacity: [0, 1],
    transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: {
    rotateY: [0, -90],
    opacity: [1, 0],
    transition: { duration: 0.6, ease: 'easeIn' },
  },
};

export const pageFlipRight: Variants = {
  enter: {
    rotateY: [90, 0],
    opacity: [0, 1],
    transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: {
    rotateY: [0, 90],
    opacity: [1, 0],
    transition: { duration: 0.6, ease: 'easeIn' },
  },
};

export const floatVariant: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
  },
};

export const bookOpenVariant: Variants = {
  closed: { rotateY: 0, x: 0 },
  opening: {
    rotateY: -180,
    x: '-25%',
    transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] },
  },
};

export const slideUp: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } },
  exit: { y: '-100%', opacity: 0, transition: { duration: 0.6, ease: 'easeIn' } },
};
