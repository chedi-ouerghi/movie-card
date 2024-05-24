import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, DatePicker, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

const baseApiUrl = 'http://localhost:5320';

const UpdateStarForm = ({ starData, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        date_of_birth: null,
        country: '',
        description: '',
        image: null,
    });

    useEffect(() => {
        const fetchStar = async () => {
            try {
                const response = await axios.get(`${baseApiUrl}/api/stars/${starData.id}`);
                const star = response.data;
                setFormData({
                    name: star.name,
                    date_of_birth: moment(star.date_of_birth),
                    country: star.country,
                    description: star.description,
                    image: null,
                });
            } catch (error) {
                console.error('Erreur lors de la récupération de la star à mettre à jour:', error);
                message.error('Erreur lors de la récupération des données de la star à mettre à jour.');
            }
        };
        fetchStar();
    }, [starData.id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date_of_birth: date });
    };

    const handleImageChange = (info) => {
        if (info.file.status === 'done') {
            setFormData({ ...formData, image: info.file.originFileObj });
        } else if (info.file.status === 'error') {
            message.error('Erreur lors du téléchargement de l\'image.');
        }
    };

    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            for (let key in formData) {
                if (formData[key] !== null) {
                    if (key === 'date_of_birth') {
                        formDataToSend.append(key, formData[key].format('YYYY-MM-DD'));
                    } else {
                        formDataToSend.append(key, formData[key]);
                    }
                }
            }

            await axios.put(`${baseApiUrl}/api/stars/${starData.id}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            message.success('Star mise à jour avec succès.');
            onSubmit();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la star:', error);
            message.error('Erreur lors de la mise à jour de la star.');
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item label="Nom" name="name" rules={[{ required: true, message: 'Veuillez entrer le nom de la star.' }]}>
                <Input value={formData.name} name="name" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Date de naissance" name="date_of_birth" rules={[{ required: true, message: 'Veuillez entrer la date de naissance de la star.' }]}>
                <DatePicker value={formData.date_of_birth} onChange={handleDateChange} />
            </Form.Item>
            <Form.Item label="Pays" name="country" rules={[{ required: true, message: 'Veuillez entrer le pays de la star.' }]}>
                <Input value={formData.country} name="country" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Veuillez entrer la description de la star.' }]}>
                <TextArea value={formData.description} name="description" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Image">
                <Upload name="image" onChange={handleImageChange} showUploadList={false} beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Choisir une image</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Mettre à jour Star</Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateStarForm;
