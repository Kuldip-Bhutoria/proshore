import React from 'react';
// import axios
import axios from 'axios';

// import CSS files
import '../App.css';

// Import components
import { Table } from 'antd';
import { StarOutlined, EyeOutlined, ForkOutlined, EditOutlined, UserOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ConfigProvider, Input } from "antd";
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const { Title } = Typography;

const columns = [
    {
        title: <span><UserOutlined /> Repository Name</span>,
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: <span><EditOutlined /> Author</span>,
        dataIndex: 'owner',
        key: 'author',
        render: item => Object.values(item)[0],
    },
    {
        title: <span><StarOutlined /> Stars</span>,
        dataIndex: 'stargazers_count',
        key: 'stargazers_count',
        sorter: {
            compare: (a, b) => a.stargazers_count - b.stargazers_count,
            multiple: 1,
        },
    },
    {
        title: <span><EyeOutlined /> Watchers</span>,
        dataIndex: 'watchers',
        key: 'watchers',
        sorter: {
            compare: (a, b) => a.watchers - b.watchers,
            multiple: 1,
        },
    },
    {
        title: <span><ForkOutlined /> Forks</span>,
        dataIndex: 'forks',
        key: 'forks',
        sorter: {
            compare: (a, b) => a.forks - b.forks,
            multiple: 1,
        },
    },
    {
        title: <span><FieldTimeOutlined /> Updated At</span>,
        dataIndex: 'updated_at',
        key: 'updated',
        render: (item) => {
            let localDate = new Date(item);
            return localDate.toDateString();
        },
        sorter: (a, b) => moment(a.updated_at).unix() - moment(b.updated_at).unix()
    },
];


const Home = () => {
    const [sort, setSort] = useState('stars');
    const [query, setQuery] = useState('');
    const [data, setData] = useState();
    const [showData, setShowData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [runEffect, setRunEffect] = React.useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 1000,
    });
    let navigate = useNavigate();
    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = () => {
        setPagination({
            current: 1,
            pageSize: 10,
            total: 1000,
        });
        fetchData(pagination);
    }

    const fetchData = (pagination) => {
        setLoading(true);
        setRunEffect(true);
        axios.get(`https://api.github.com/search/repositories?q=${query}&page=${pagination.current}&per_page=${pagination.pageSize}&sort=${sort}`)
            .then(response => {
                let result = response.data.items
                setRunEffect(false);
                setData(result);
                setLoading(false);
                setShowData(true);

            });
    };

    const handleTableChange = (newPagination) => {
        setPagination(newPagination);
        setRunEffect(true);
    };

    console.log(pagination);

    useEffect(() => {
        if (runEffect) {
            fetchData(pagination)
        }
    }, [pagination, fetchData])

    useEffect(() => {
        setData(JSON.parse(window.localStorage.getItem('data')));
        setPagination(JSON.parse(window.localStorage.getItem('pagination')));
        setShowData(JSON.parse(window.localStorage.getItem('showData')));
        setQuery(window.localStorage.getItem('query'));

    }, []);

    useEffect(() => {
        window.localStorage.setItem('data', JSON.stringify(data));
        if (pagination !== null) { window.localStorage.setItem('pagination', JSON.stringify(pagination)) };
        window.localStorage.setItem('showData', (showData));
        window.localStorage.setItem('query', (query));
    }, [data, pagination, showData, query]);

    return (

        <div className="container">
            <header className="header">
                <h1 className="App-title">Repository Search</h1>
            </header>
            <div className="search">

                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#fbe56d',
                            colorTextLightSolid: '#000',
                        },
                    }}
                >
                    <Search
                        name="searchBox"
                        placeholder="Repository Name"
                        enterButton="Search"
                        size="large"
                        style={{
                            width: 'calc(30%)',
                            minWidth: '400px'
                        }}
                        loading={loading}
                        onPressEnter={handleSubmit}
                        onChange={handleChange}
                        onSearch={(value) => { handleSubmit(value) }}
                    />
                </ConfigProvider>
            </div>
            {showData ?
                <div className='table'>

                    <Table
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    navigate(`/detail/${record.id}`, { state: record })
                                }
                            };
                        }}
                        rowKey={(record) => record.id}
                        columns={columns}
                        dataSource={data}
                        pagination={pagination}
                        onChange={handleTableChange}
                        loading={loading}
                        expandable={{
                            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                            rowExpandable: (record) => record.name !== 'Not Expandable',
                        }}
                        scroll={{ y: 640 }}
                    />
                </div>

                :
                <Title style={{ color: '#fbe56d', marginTop: '4em', textAlign: 'center' }}>Search results will appear here...</Title>
            }


        </div >


    );


}


export default Home;