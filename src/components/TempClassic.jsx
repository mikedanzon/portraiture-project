import React from 'react';

function TempClassic(props) {
  return (
    <div className="temp-classic">
      <div className="classic-top">
        <div
          className="classic-background-top"
          style={{
            background: `url(${props.background})`,
          }}
        >
          <div className="classic-border">
            <div className="classic-border-inside">
              <div className="classic-top-logo">Logo Studio</div>
              <div className="classic-top-studio">Studio Name</div>
              <div className="classic-top-name">Client Name</div>
              <div className="classic-top-date">Client Date</div>
              <div className="classic-top-open">
                <button>Open</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TempClassic;
