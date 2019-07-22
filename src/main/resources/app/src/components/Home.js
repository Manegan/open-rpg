import React from 'react';
import { connect } from "react-redux";

function Home() {
    return (
        <div className="container-fluid">
            <h2>Hello, World!</h2>
        </div>);
}

export default connect()(Home);
