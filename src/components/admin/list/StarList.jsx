import React, { useState, useEffect } from 'react';
import starService from '../../../services/starService';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Popover, Select, Input } from 'antd';

const { Option } = Select;
const { Search } = Input;

const baseApiUrl = 'http://localhost:5320';

const StarList = ({ token }) => {
    const [stars, setStars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popoverContent, setPopoverContent] = useState(null);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [countrys, setCountrys] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchStars = async () => {
            let url = `${baseApiUrl}/api/stars/`;
            if (selectedCountry) {
                url = `${baseApiUrl}/filtre/stars/country/${selectedCountry}`;
            }
            try {
                const response = await starService.getAllStars(url);
                console.log("Données récupérées :", response);
                if (Array.isArray(response)) {
                    setStars(response); 
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStars();
    }, [selectedCountry]);

    useEffect(() => {
        const fetchCountrys = async () => {
            try {
                const response = await axios.get(`${baseApiUrl}/filtre/countries`);
                setCountrys(response.data);
                console.log(response.data, 'data country');
            } catch (err) {
                console.error('Error fetching countrys:', err);
            }
        };

        fetchCountrys();
    }, []);
    
    const handleModalOpen = (star) => {
        setSelectedCountry(star);
        setModalVisible(true);
    };

    const handleInputChange = (field, value) => {
        setSelectedCountry(prevstar => ({
            ...prevstar,
            [field]: value
        }));
    };

    const handleModalSubmit = async () => {
        try {
            await axios.put(`${baseApiUrl}/api/stars/${selectedCountry.id}`, selectedCountry, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setStars(prevStars => prevStars.map(star => 
                star.id === selectedCountry.id ? selectedCountry : star
            ));
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating star:', error);
            // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
        }
    };

    const handlePopoverOpen = async (starId) => {
        try {
            const response = await axios.get(`${baseApiUrl}/api/stars/${starId}`);
            const star = response.data;
            setPopoverContent(
                <div>
                    <p>Name: {star.name}</p>
                    <p>Date of Birth: {star.date_of_birth}</p>
                    <p>Country: {star.country}</p>
                    <p>Description: {star.description}</p>
                </div>
            );
            setPopoverVisible(true);
        } catch (error) {
            console.error('Error fetching star details:', error);
        }
    };

    const handlePopoverClose = () => {
        setPopoverVisible(false);
    };

    const handleModalClose = () => {
        setSelectedCountry(null);
        setModalVisible(false);
    };

    const handleCountryChange = (value) => {
        console.log("Pays sélectionné :", value);
        setSelectedCountry(value);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const filteredStars = stars.filter(star => 
        (star.name && star.name.toLowerCase().includes(searchValue.toLowerCase())) &&
        (!selectedCountry || star.country === selectedCountry)
    );

    
    return (
        <div style={{ width: '75%', margin: 'auto', height:'88vh', overflowY:'auto' }}>
            <div style={{ display:'flex', width:'100%', height:'10vh', alignItems:'centre', justifyContent:'space-between', padding: '10px', marginBottom: '3%', border:'1px solid' }}>
                <h2 style={{ color: 'green', height: '100%' }}>Star List</h2>
                <div style={{ width: '35%', height: '100%', background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <Select style={{ width: 200 }} placeholder="Select country" onChange={handleCountryChange}>
                        {countrys.map((country,index) => (
                            <Option key={index} value={country}>{country}</Option>
                        ))}
                    </Select>
          <Search
            placeholder="Search by Name"
            onChange={handleSearchChange}
            style={{ width: 200, marginLeft: '1em' }}
          />
        </div>
               <button style={{ width: '15%', height: '100%', background: '#000', color: '#fff', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Link to='/admin/post-star' style={{textDecoration:'none'}}>post new Star</Link>
                </button>
      </div>
            <div style={{ overflowY: 'auto',    height: '70vh' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <thead style={{ backgroundColor: '#f5f5f5' }}>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Image</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Date of Birth</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Country</th>
                                      <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                       </tr>
                    </thead>
                    <tbody>
                        {filteredStars.map(star => (
                            <tr key={star.id} style={{ borderBottom: '1px solid #ddd',backgroundColor: 'rgb(169 184 196)'  }} onDoubleClick={() => handlePopoverOpen(star.id)}>
                                <td style={{ padding: '10px', textAlign: 'left' }}><img src={star.image} alt={star.name} style={{ width: '50px', height: 'auto' }} /></td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{star.name}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{star.date_of_birth}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{star.country}</td>
                                              <button onClick={() => handleModalOpen(star)}>Edit</button>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

                  <Popover
        title="Stars Details"
        content={popoverContent}
        visible={popoverVisible}
        onVisibleChange={handlePopoverClose}
        trigger="click"
      >
        <div />
      </Popover>

              <Modal
  title="Edit star"
  open={modalVisible}
  onCancel={handleModalClose}
  footer={[
    <Button key="cancel" onClick={handleModalClose}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" onClick={handleModalSubmit}>
      Save Changes
    </Button>,
  ]}
>
  {/* Form for editing star */}
  {selectedCountry && (
    <div>
      <p>Name:</p>
      <Input
        value={selectedCountry.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
      <p>date_of_birth:</p>
      <Input.TextArea
        value={selectedCountry.date_of_birth}
        onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
      />
      <p>Image:</p>
      <Input
        value={selectedCountry.image}
        onChange={(e) => handleInputChange('image', e.target.value)}
      />
      <p>country:</p>
      <Input
        value={selectedCountry.country}
        onChange={(e) => handleInputChange('country', e.target.value)}
      />
      <p>description:</p>
      <Input
        value={selectedCountry.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
      />
      <p>Date Insert:</p>
      <Input
        value={selectedCountry.date_insert}
        onChange={(e) => handleInputChange('date_insert', e.target.value)}
      />
    </div>
  )}
            </Modal>
            
        </div>
    );
};

export default StarList;
