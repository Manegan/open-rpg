import React from 'react';
import { connect } from "react-redux";

function Home() {
    return (
        <h2>Hello, World!</h2>
    );
}

export default connect()(Home);
