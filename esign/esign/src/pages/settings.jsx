import { useState } from 'react'
import '../App.css'
function Settings() {

  const [formData, setFormData] = useState({
    "x-client-id": localStorage.getItem("x-client-id") || "",
    "x-client-secret": localStorage.getItem("x-client-secret")|| "",
    "x-product-instance-id": localStorage.getItem("x-product-instance-id")|| ""
  });

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  const handleSave=(e)=>{
    e.preventDefault();
    localStorage.setItem("x-client-id",formData['x-client-id']);
    localStorage.setItem("x-client-secret", formData['x-client-secret']);
    localStorage.setItem("x-product-instance-id", formData['x-product-instance-id']);
  }

  return (
    <div>
    <form className='settings__container' onSubmit={handleSave}>
      <label>x-client-id</label>
      <input type="text" name='x-client-id' value={formData['x-client-id']} onChange={handleChange}/>
      <label>x-client-secret</label>
      <input type="text" name='x-client-secret' value={formData['x-client-secret']} onChange={handleChange}/>
      <label>x-product-instance-id</label>
      <input type="text" name='x-product-instance-id' value={formData['x-product-instance-id']} onChange={handleChange}/>
      <button type='submit'>Save</button>
    </form>

    <div className='settings__info'>
        <p>Not safe to store in local storage</p>
    </div>
    </div>
  )
}

export default Settings
