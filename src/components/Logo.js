import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import logoImg from "../logo.png";

const LogoBox = styled.div`
  width: 40px;
  height: 40px;
`;

function Logo({ disabledLink = false }) {
  const logo = (
    <LogoBox>
      <img src={logoImg} alt="logo" width="100%" />
    </LogoBox>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
