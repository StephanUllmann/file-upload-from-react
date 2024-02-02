import { useState } from 'react';
import './App.css';

function App() {
  const [formOne, setFormOne] = useState({ profile_pic: null });
  const [formTwo, setFormTwo] = useState({ cat_pics: null });
  const [links, setLinks] = useState([]);

  const handleFormOne = async (e) => {
    e.preventDefault();
    if (!formOne.profile_pic) return;
    const formData = new FormData();
    formData.append('profile_pic', formOne.profile_pic);
    try {
      const res = await fetch('http://localhost:8000/react-single', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      setLinks(data.links);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormTwo = async (e) => {
    e.preventDefault();
    if (!formTwo.cat_pics) return;
    const formData = new FormData();
    for (const file of formTwo.cat_pics) {
      formData.append('cat_pics', file);
    }
    try {
      const res = await fetch('http://localhost:8000/react-multiple', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      setLinks(data.links);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleFormOne}>
        <div>
          <label htmlFor='profile_pic'>Select your profile picture:&nbsp;</label>
          <input
            name='profile_pic'
            type='file'
            id='profile_pic'
            onChange={(e) => setFormOne({ profile_pic: e.target.files[0] })}
          />
        </div>
        <div>
          <input type='submit' value='Upload' />
        </div>
      </form>
      <hr />

      <form onSubmit={handleFormTwo}>
        <div>
          <label htmlFor='cat_pics'>Select your cat pictures:&nbsp;</label>
          <input
            multiple='multiple'
            name='cat_pics'
            id='cat_pics'
            type='file'
            onChange={(e) => setFormTwo({ cat_pics: e.target.files })}
          />
        </div>
        <div>
          <input type='submit' value='Upload Cat Pics' />
        </div>
      </form>
      <a href='/get-pics'>Get pics!</a>
      <br />
      {links.length > 0 &&
        links.map((link) => (
          <img
            key={link}
            src={link}
            width={250}
            height={200}
            style={{ objectFit: 'contain', marginInline: '15px' }}
            alt=''
          />
        ))}
    </>
  );
}

export default App;
