import React, { useState } from 'react';
import { Fragment } from 'react';
import HeaderProps from '../components/HeaderProps';
import { AiOutlineClose } from 'react-icons/ai';

function PackagesNew() {
  const [inputFields, setInputFields] = useState([
    {
      itemName: '',
      price: '',
      category: null,
    },
  ]);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === 'itemName') {
      values[index].itemName = event.target.value;
    } else if (event.target.name === 'price') {
      values[index].price = event.target.value;
    } else {
      values[index].category = event.target.value;
    }
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ itemName: '', price: '', category: '' });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onSave = (e) => {
    e.preventDefault();
    console.log(inputFields);
  };

  return (
    <>
      <HeaderProps title="Create Package" link="/" />
      <div className="pnew-wrapper">
        <div className="pnew-details">Package Details</div>
        <div className="pnew-name">
          <div className="pnew-name-1">Name*</div>
          <div className="pnew-name-2">
            <input
              type="text"
              className="custom-form-port"
              placeholder="e.g. Professional Photoshoot Session"
            />
          </div>
        </div>
        <div className="pnew-desc">
          <div className="pnew-desc-1">Description</div>
          <div className="pnew-desc-2">
            <input
              type="text"
              className="custom-form-port"
              placeholder="Type collection description"
            />
          </div>
        </div>
        <div className="pnew-image">
          <div className="pnew-image-1">Images</div>
          <div className="pnew-image-2">
            <input type="file" />
          </div>
        </div>
        <div className="pnew-items">
          <div className="pnew-items-text">Package Item</div>
          {inputFields.map((inputField, index) => (
            <div className="pnew-items-main">
              <form>
                <div className="pnew-form">
                  <Fragment key={`${inputField}~${index}`}>
                    <div className="pnew-form-close">
                      <span onClick={() => handleRemoveFields(index)}>
                        <AiOutlineClose />
                      </span>
                    </div>
                    <div className="pnew-form-text-1">
                      <div className="pnew-form-text-1-name">
                        <label htmlFor="itemName">Item Name*</label>
                      </div>
                      <div className="pnew-form-text-1-input">
                        <input
                          className="custom-form-port"
                          type="text"
                          id="itemName"
                          name="itemName"
                          value={inputField.itemName}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                      </div>
                    </div>
                    <div className="pnew-form-text-2">
                      <div className="pnew-form-text-1-name">
                        <label htmlFor="price">Price*</label>
                      </div>
                      <div className="pnew-form-text-1-input">
                        <input
                          className="custom-form-port"
                          type="text"
                          id="price"
                          name="price"
                          value={inputField.price}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                      </div>
                    </div>
                    <div className="pnew-form-text-3">
                      <div className="pnew-form-text-1-name">
                        <label htmlFor="category">Category*</label>
                      </div>
                      <div className="pnew-form-text-1-input">
                        <select
                          className="custom-form-port"
                          value={inputField.category}
                          onChange={(event) => handleInputChange(index, event)}
                        >
                          <option hidden>Select Category</option>
                          <option value="photoSession">Photo Session</option>
                          <option value="print">Print</option>
                          <option value="digital">Digital</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </Fragment>
                </div>
              </form>
            </div>
          ))}
          <div className="pnew-items-button">
            <button onClick={() => handleAddFields()}>+ Add Item</button>
          </div>
        </div>
        <div className="pnew-save">
          <button onClick={onSave}>Save</button>
        </div>
      </div>
    </>
  );
}

export default PackagesNew;
