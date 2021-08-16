import React from 'react';
import { GlobalStyle } from '@/styles/global-styles';
import ContainerCalendar from './container/Calendar.container';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <ContainerCalendar />
    </div>
  );
}

export default App;
