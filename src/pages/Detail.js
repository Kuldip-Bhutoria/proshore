import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';



const Detail = () => {
    let navigate = useNavigate();
    return <>
        <Button onClick={() => navigate(-1)}>
            back
        </Button>
        <h1>Detail</h1></>;
};

export default Detail;