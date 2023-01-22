// import React, { Component } from 'react';
// import { ConfigProvider, Input } from "antd";

// const { Search } = Input;

// export default class SearchBar extends Component {
//     render() {
//         return (
//             <>
//                 <ConfigProvider
//                     theme={{
//                         token: {
//                             colorPrimary: '#fbe56d',
//                             colorTextLightSolid: '#000',
//                         },
//                     }}
//                 >
//                     <Search
//                         name="searchBox"
//                         placeholder="Repository Name"
//                         enterButton="Search"
//                         size="large"
//                         style={{
//                             width: 'calc(30%)',
//                             minWidth: '400px'
//                         }}
//                         loading={props.loading}
//                         onPressEnter={props.handleSubmit}
//                         onChange={props.handleChange}
//                         onSearch={(value) => { props.handleSubmit(value) }}
//                     />
//                 </ConfigProvider>
//             </>
//         )
//     }
// }