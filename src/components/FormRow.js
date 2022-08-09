import React from 'react'

const FormRow = ({name,type,value,handleChange,labelTxt}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className='form-label'>{labelTxt}</label>
      <input type={type} name={name} className='form-input' value={value} onChange={handleChange} />
      </div>
  )
}

export default FormRow