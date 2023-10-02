import React, { useState } from 'react';
import {
  webViewRender,
  emit,
  useNativeMessage,
} from 'react-native-react-bridge/lib/web';
import StockfishEngine from './StockfishEngine';

const StockfishInterface = () => {
  const [data, setData] = useState<any>('');
  //const stock = new StockfishEngine();
  useNativeMessage((message: any) => {
    if (message.type === 'success') {
      setData(message.data);
    } else {
      console.log('SUP');
    }
    console.log('SUP2');
  });

  return (
    <>
      <div>{data}</div>
      <button
        onClick={() => {
          emit({ type: 'hello', data: 123 });
        }}
        style={{ height: 50, width: 50, color: 'blue' }}>
        <p style={{ color: 'red' }}>TextHere</p>
      </button>
    </>
  );
};

export default webViewRender(<StockfishInterface />);
