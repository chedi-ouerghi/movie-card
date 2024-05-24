import React, { useState, useEffect } from 'react';
import starService from '../../../services/starService';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Upload, message, Select, Modal, Popover } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

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
    const [form] = Form.useForm();
    const [selectedStar, setSelectedStar] = useState(null);

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

    const handleChange = (e) => {
        setSelectedStar({ ...selectedStar, [e.target.name]: e.target.value });
    };

    const handleFileChange = ({ fileList }) => {
        form.setFieldsValue({ image: fileList });
    };

const handleModalSubmit = async () => {
    const formData = new FormData();
    formData.append('name', selectedStar.name);
    formData.append('date_of_birth', selectedStar.date_of_birth);
    formData.append('country', selectedStar.country);
    formData.append('description', selectedStar.description);

    const image = form.getFieldValue('image');
    if (image && image.length > 0 && image[0].originFileObj) {
        formData.append('image', image[0].originFileObj);
    }
    
    try {
        // Mettre à jour selectedStar avec les nouvelles valeurs
        setSelectedStar(prevStar => ({
            ...prevStar,
            name: formData.get('name'),
            date_of_birth: formData.get('date_of_birth'),
            country: formData.get('country'),
            description: formData.get('description'),
            image: formData.get('image')
        }));
        
        await axios.put(`${baseApiUrl}/api/stars/${selectedStar.id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setStars(prevStars => prevStars.map(star => 
            star.id === selectedStar.id ? selectedStar : star
        ));
        setModalVisible(false);
    } catch (error) {
        console.error('Error updating star:', error);
        // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
    }
};


    const handleModalOpen = (star) => {
        setSelectedStar(star);
        setModalVisible(true);
    };

    const handleInputChange = (field, value) => {
        setSelectedStar(prevStar => ({
            ...prevStar,
            [field]: value
        }));
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
                                <td style={{ padding: '10px', textAlign: 'left' }}><img src={`http://localhost:5320/uploads/stars/${star.image}`} alt={star.name} style={{ width: '50px', height: 'auto' }} /></td>
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
    visible={modalVisible}
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
   {selectedStar && (
    <div>
        <p>Name:</p>
        <Input value={selectedStar.name} name="name" onChange={handleChange} />

        <p>date_of_birth:</p>
        <Input type='date' value={selectedStar.date_of_birth} onChange={(e) => handleInputChange('date_of_birth', e.target.value)} />

        <p>Image:</p>
        <Upload
            accept="image/*"
            multiple={false}
            beforeUpload={() => false}
            fileList={form.getFieldValue('image') || []}
            onChange={handleFileChange}
        >
            <Button>Select Image</Button>
        </Upload>

        <p>country:</p>
        <Input value={selectedStar.country} name="country" onChange={handleChange} />

        <p>description:</p>
        <TextArea value={selectedStar.description} name="description" onChange={(e) => handleInputChange('description', e.target.value)} />

        <p>Date Insert:</p>
        <Input
            value={selectedStar.date_insert}
            onChange={(e) => handleInputChange('date_insert', e.target.value)}
        />
    </div>
)}

</Modal>

            
        </div>
    );
};

export default StarList;
