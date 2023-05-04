import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <span>¿Qué club e’?</span> © 2023 v1.0.0 All rights reserved | developed
      by
      <FooterLink
        href="https://www.linkedin.com/in/franciscominen/"
        target="_blank"
      >
        esk4s
      </FooterLink>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  text-align: center;
  background-color: var(--dark);
  color: var(--light);
  font-family: var(--alternativeFont);
  font-size: 10px;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 4px 0;
`;

const FooterLink = styled.a`
  font-family: var(--alternativeFont);
  cursor: pointer;
  color: #3296b8;
`;
