import React from 'react'

const Checkbox = ({
  disabled = false,
  checked = false,
  label,
  onChange,
  ...restProps
}) => {
  return (
    <label style={{ fontSize: '1.4rem' }}>
      <input 
        type='checkbox'
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...restProps}
      />{" "}
      {label}
    </label>
  )
}

export default Checkbox