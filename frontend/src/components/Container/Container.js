import React from 'react';
import './Container.scss';

export const Container = ({ children, step }) => {

  return (
    <div className="container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className={step === "verify-2fa" ? "center center-2fa" : "center"}>{children}</div>
    </div>
  );
};
