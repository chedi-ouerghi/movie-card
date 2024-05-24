import React, { useState } from 'react';
import { Form, Input, Button, message, Select, Checkbox } from 'antd';
import movieService from '../../../services/movieService';

const { TextArea } = Input;
const { Option } = Select;

const PostAdmin = () => {
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);
    const [top, setTop] = useState(false);

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (values) => {
        if (!image) {
            message.error('Please upload an image');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('rating', values.rating);
            formData.append('director', values.director);
            formData.append('trailer', values.trailer);
            formData.append('genre', values.genre);
            formData.append('duration', values.duration);
            formData.append('origin', values.origin);
            formData.append('age', values.age);
            formData.append('top', top ? '1' : '0');

            const newMovie = await movieService.createMovie(formData);
            console.log('New movie created:', newMovie);
            form.resetFields();
            setImage(null);
            setTop(false);
            message.success('Movie created successfully');
        } catch (error) {
            console.error('Error creating movie:', error);
            message.error('Failed to create movie');
        }
    };

    return (
        <div style={{ height: '81vh' }}>
            <Form form={form} onFinish={handleSubmit} id="form_post_movie">
                <Form.Item name="title" rules={[{ required: true, message: 'Please enter the title' }]}>
                    <Input className="custom-input" placeholder="Title" />
                </Form.Item>
                <Form.Item name="description">
                    <TextArea className="custom-textarea" placeholder="Description" />
                </Form.Item>
                <Form.Item name="image" rules={[{ required: true, message: 'Please upload the image' }]}>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </Form.Item>
                <Form.Item name="rating" rules={[{ required: true, message: 'Please enter the rating' }]}>
                    <Input className="custom-input" type="number" placeholder="Rating" />
                </Form.Item>
                <Form.Item name="director">
                    <Input className="custom-input" placeholder="Director" />
                </Form.Item>
                <Form.Item name="trailer">
                    <Input className="custom-input" placeholder="Trailer URL" />
                </Form.Item>
                <Form.Item name="genre">
                    <Input className="custom-input" placeholder="Genre" />
                </Form.Item>
                <Form.Item name="duration">
                    <Input className="custom-input" placeholder="Duration" />
                </Form.Item>
                <Form.Item name="origin">
                    <Input className="custom-input" placeholder="Origin" />
                </Form.Item>
                <Form.Item name="age">
                    <Select placeholder="Select age">
                        <Option value="+6">+6</Option>
                        <Option value="+12">+12</Option>
                        <Option value="+16">+16</Option>
                        <Option value="+18">+18</Option>
                        <Option value="+21">+21</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="top" valuePropName="checked">
                    <Checkbox onChange={(e) => setTop(e.target.checked)}>Top</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="btnsave">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PostAdmin;
