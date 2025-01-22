import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonTemplate = ({ text, onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>{text}</button>
    </StyledWrapper>
  );
};

ButtonTemplate.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const StyledWrapper = styled.div`
  button {
    --color: #A594FD;
    font-family: inherit;
    display: inline-block;
    width: 8em;
    height: 2.8em;
    line-height: 2.5em;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 2px solid var(--color);
    transition: color 0.5s;
    z-index: 1;
    font-size: 17px;
    border-radius: 6px;
    font-weight: 500;
    color: #ffffff;
  }

  button:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 50%;
  }

  button:hover {
    color: #000000;
  }

  button:before {
    top: 100%;
    left: 100%;
    transition: all 0.7s;
  }

  button:hover:before {
    top: -30px;
    left: -30px;
  }

  button:active:before {
    background: #A594FD;
    transition: background 0s;
  }
`;

export default ButtonTemplate;