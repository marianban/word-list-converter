import React, { useRef } from 'react';
import { useVirtual } from 'react-virtual';
import './Words.css';

export const Words = (props) => {
  const { words } = props;

  const parentRef = useRef();

  const rowVirtualizer = useVirtual({
    size: words.length,
    parentRef,
    estimateSize: React.useCallback(() => 35, []),
    useObserver: React.useCallback(
      () => ({ height: 35 * words.length, width: 500 }),
      [words.length]
    ),
  });

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: `500px`,
          width: '500px',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => (
            <div
              role="listitem"
              key={`row-${virtualRow.index}`}
              className={
                virtualRow.index % 2
                  ? 'list-item list-item--odd'
                  : 'list-item list-item--even'
              }
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {words[virtualRow.index]}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
