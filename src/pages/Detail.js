import React from 'react';
import { Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from 'antd';
const { Meta } = Card;

const Detail = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    return (

        <div className="container">

            <span className="detail-header">
                <Button onClick={() => navigate(-1)}>
                    back
                </Button>
                <h1 className="header">Details</h1>
            </span>

            <Card className='detail-card'
                style={{ width: 400 }}
                cover={<img alt="example" src={state.owner.avatar_url} />}
            >
                <Meta
                    title={<>Owner Name : <a href={state.owner.html_url}>{state.owner.login}</a></>}
                    description={
                        <div>
                            Repository Name : <a href={state.svn_url}>{state.name}</a>
                            <li>Open Issues: {state.open_issues_count}</li>
                            <li>Default Branch: {state.default_branch}</li>
                        </div>
                    } />
            </Card>
        </div>
    );
};

export default Detail;