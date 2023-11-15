import React, { useState } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap';

function MainPage() {
  const [vegetable, setVegetable] = useState('');
  const [price, setPrice] = useState('');
  const [displayedData, setDisplayedData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'vegetable') {
      setVegetable(value);
    } else if (name === 'price') {
      setPrice(value);
    }
  };

  const handleSave = () => {
    if (vegetable && price) {
      const newData = { vegetable, price };
      setDisplayedData([...displayedData, newData]);
      setVegetable('');
      setPrice('');
    }
  };

  return (
    <div className='Maindiv'>
      <section className='intro'>
        <div
          className='bg-image h-100'
          style={{ backgroundImage: "url('https://mdbootstrap.com/img/Photos/new-templates/tables/img2.jpg')" }}
        >
          <div className='mask d-flex align-items-center h-100' style={{ backgroundColor: 'rgba(0,0,0,.25)' }}>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-12'>
                  <div className='card bg-dark shadow-2-strong'>
                    <div className='card-body'>
                      <div className='table-responsive'>
                        <table className='table table-dark table-borderless mb-0'>
                          <thead>
                            <tr>
                              <th scope='col'>Vegetables</th>
                              <th scope='col'>Prices</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedData.map((data, index) => (
                              <tr key={index}>
                                <td>{data.vegetable}</td>
                                <td>{data.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div>
                          <input type='text' name='vegetable' value={vegetable} onChange={handleInputChange} className='inpt1' />
                          <input type='number' name='price' value={price} onChange={handleInputChange} className='inpt2' />
                          <button onClick={handleSave}>Save</button>
                          <Link to={"/Map"}><button className='btnlocation'>Go To Location</button></Link>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    

    </div>
  );
}

export default MainPage;
