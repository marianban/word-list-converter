import './Spinner.css';

export const Spinner = () => {
  const radius = 25;
  return (
    <div
      role="progressbar"
      className="spinner"
      style={{
        width: radius * 2 + 'px',
        height: radius * 2 + 'px',
      }}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <div
          className="spinner__dot"
          key={i}
          style={{
            top:
              radius + radius * Math.sin(((Math.PI * 2 - 0.6) / 8) * i) + 'px',
            left:
              radius + radius * Math.cos(((Math.PI * 2 - 0.6) / 8) * i) + 'px',
          }}
        ></div>
      ))}
    </div>
  );
};
