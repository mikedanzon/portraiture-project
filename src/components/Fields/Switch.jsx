import React from 'react';

function Switch(props) {
  const { name, value, onChange, defaultChecked } = props;

  return (
    <label className="custom-slider">
      <input
        name={name}
        type="checkbox"
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
      <span class="custom-slider-span"></span>
    </label>
  );
}

export default Switch;
