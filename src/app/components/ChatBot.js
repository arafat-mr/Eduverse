'use client';

import { BielButton } from 'biel-react';
import 'biel-search/dist/biel-search/biel-search.css';
import { defineCustomElements } from 'biel-search/loader';
import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    defineCustomElements(window);
  }, []);

  return (
    <BielButton
      project="62lrmax3rn"
      header-title="Biel.ai Chatbot"
      button-position="bottom-right"
      modal-position="sidebar-right"
      button-style="dark"
    >
      Ask AI
    </BielButton>
  );
};

export default Chatbot;
