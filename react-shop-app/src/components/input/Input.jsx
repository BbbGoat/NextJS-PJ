import classNames from 'classnames'
import React, { useState } from 'react'
import styles from './Input.module.scss'
import Icon from '../icon/Icon'

const Input = ({
  id,
  label,
  name = '',
  labelVisible,
  icon,
  email,
  password,
  placeholder = '',
  readOnly,
  disabled,
  value,
  error: errorProp,
  className = '',
  onChange,
  ...restProps
}) => {

  const [inputValue, setInputValue] = useState(value ? value : '');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const checkType = () => {
    if (email) {
      return 'email'
    }

    if (password) {
      return isPasswordVisible ? 'text' : 'password';
    }

    return 'text';
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);

    // 파라미터에 event 객체만 내려주면 됨 (상위 Input 컴포넌트에서 e => set변경함수()를 props로 내려줬기 때문에 여기서 값을 업데이트 해준다)
    onChange(e)
  }

  const iconType = isPasswordVisible ? 'show' : 'hide';
  const iconLabel = `비밀번호 ${isPasswordVisible ? '표시' : '감춤'}`;
  
  return (
    <div className={classNames(styles.formControl, className)}>
      <label 
        htmlFor={id} 
        className={classNames(styles.label, labelVisible || styles.labelHidden)}
      >
        {label}
      </label>

      <div 
        className={classNames(styles.inputWrapper, errorProp && styles.inputWrapperError)}
      >
        {icon ? <Icon type={icon} /> : null}
        <input 
          id={id}
          type={checkType()}
          name={name}
          className={classNames(styles.input)}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />
        {
          password 
          ? (<button
            type='button'
            className={styles.button}
            onClick={()=>{ setIsPasswordVisible(prev => !prev) }}
            disabled={disabled}
          >
            <Icon type={iconType} alt={iconLabel} title={iconLabel} />
          </button>) 
          : null
        }
      </div>
      {
        errorProp && (
          <span role='alert' className={styles.error}>
            {errorProp.message}
          </span>
        )
      }
      
    </div>
  )
}

export default Input