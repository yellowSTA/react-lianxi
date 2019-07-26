import React from 'react';
import { Spin } from 'antd';

function Loading(props) {
    if(props.error) {
        return (<div>Error! <button onClick={ props.retry }>Retry</button></div>)
    } else {
        return <div style={{textAlign: "center",padding: 20}}><Spin/></div>;
    }
}

export default Loading;