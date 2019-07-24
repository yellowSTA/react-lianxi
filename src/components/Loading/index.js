import React from 'react';
import { Spin } from 'antd';

function Loading(props) {
    if(props.error) {
        return (<div>Error! <button onClick={ props.retry }>Retry</button></div>)
    } else {
        return <Spin/>;
    }
}

export default Loading;