import React, { Component } from 'react';
// import axios
import axios from 'axios';

// import CSS files
import './App.css';
import 'antd/dist/reset.css';

// Import components
import SearchBar from './components/searchbar.js';
import { Table } from 'antd';
import { StarOutlined, EyeOutlined, ForkOutlined, EditOutlined, UserOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import moment from 'moment';

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
      console.log(localDate);
      return localDate.toDateString();
    },
    sorter: (a, b) => moment(a.updated_at).unix() - moment(b.updated_at).unix()
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      sort: 'stars',
      loading: false,
      result: [],
      showResults: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1000,
      },

    };
  }

  componentDidMount() {
    console.log("compnentDidMount");
  }


  render() {
    const handleTableChange = (pagination) => {
      console.log(pagination);
      this.setState({
        pagination: pagination,
      });
      console.log(this.state.pagination);

      if (pagination.current !== this.state.pagination.current) {
        // this.setState({ result: [] })
        this.getRepo(this.state.value);
      }

      if (pagination.pageSize !== this.state.pagination.pageSize) {
        // this.setState({ result: [] })
        this.getRepo(this.state.value);
      }
    };
    return (

      <div className="container">
        <header className="header">
          <h1 className="App-title">Repository Search</h1>
        </header>
        <div className="search">
          <SearchBar
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            loading={this.state.loading}
          />
        </div>
        {this.state.showResults ?
          <div className='table'>

            <Table
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={this.state.result}
              pagination={this.state.pagination}
              onChange={handleTableChange}
              loading={this.state.loading}
              expandable={{
                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                rowExpandable: (record) => record.name !== 'Not Expandable',
              }}
              scroll={{ y: 640 }}
            />
          </div>

          : <Title style={{ marginTop: '4em', textAlign: 'center' }}>Search results will appear here...</Title>}
      </div >
    );
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit = () => {
    const input = this.state.value
    this.getRepo(input);
  }


  async getRepo(input) {
    const api_url = `https://api.github.com/search/repositories?q=${input}&page=${this.state.pagination.current}&per_page=${this.state.pagination.pageSize}&sort=${this.state.sort}`
    if (input !== '') {
      this.setState({ loading: true });
      axios.get(`${api_url}`)
        .then(response => {
          let result = response.data.items
          this.setState({
            result: result,
            showResults: true,
            loading: false,
            pagination: {
              ...this.state.pagination,
            }
          })
          return result;
        })
    } else {
      alert('Please provide search input')
    }
  }
}

export default App;