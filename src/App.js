import { useState } from 'react';
import { numLetterPairs, apiWordsUrl } from './constants.mjs';
import { Words } from './Words';
import { Spinner } from './Spinner';
import { useGet } from './hooks';
import './App.css';

function App() {
  const [value, setValue] = useState('');

  const handleOnChange = (event) => {
    const nextValue = event.target.value;
    const validLetters = nextValue
      .split('')
      .filter((l) => numLetterPairs[l])
      .join('');
    setValue(validLetters);
  };

  const {
    data: words,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGet(`${apiWordsUrl}/${value}`, []);

  return (
    <main className="app">
      <label>
        Number:
        <input
          type="text"
          value={value}
          onChange={handleOnChange}
          placeholder="Type your number"
          inputMode="numeric"
          // fails on server for more than 15
          // fails with out of memory for more than 11 on client
          maxLength="11"
        ></input>
      </label>
      <div>
        {isLoading && <Spinner />}
        {isSuccess && <Words words={words} />}
        {isError && error}
      </div>
    </main>
  );
}

export default App;
