import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import { StyledLoaderWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <StyledLoaderWrapper>
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </StyledLoaderWrapper>
  );
};
