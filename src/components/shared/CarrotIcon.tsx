import SvgIcon from '@mui/material/SvgIcon';

const CarrotIcon = () => {
  return (
    <SvgIcon sx={{ color: "white", height: "65px", width: "65px" }} >
      <path d="M 17 9 L 12 14 L 7 9 L 6 10 l 6 6 l 6 -6 Z" />
    </SvgIcon>
  );
}

export default CarrotIcon;


// width of actually 2.12
//       <path d="M 16.96 8.96 L 12 13.88 L 7.06 8.96 L 6 10 l 6 6 l 6 -6 Z" />

// width of 2
// <path d="M 17 9 L 12 14 L 7 9 L 6 10 l 6 6 l 6 -6 Z" />

// width of 1
// <path d="M 17.5 9.5 L 12 15 L 6.5 9.5 L 6 10 l 6 6 l 6 -6 Z" />