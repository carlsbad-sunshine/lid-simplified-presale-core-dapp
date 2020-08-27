import theme from '@chakra-ui/theme';

theme.colors = {
  lid: {
    brand: '#0c65EB',
    brandLight: '#1C9EF7',
    brandDark: '#074E9C',
    stroke: '#E4E4E4',
    bg: '#fff',
    bgMed: '#E5E9Ef',
    fg: '#040404',
    fgMed: '#5B5B5B',
    fgLight: '#A1A7B0',
    buttonBg: '#D8E0E7',
    buttonBgDk: '#4A4A4A'
  },
  ...theme.colors
};

theme.breakpoints = {
  sm: '650px',
  md: '900px',
  lg: '1240px',
  xl: '1920px'
};
export default theme;
