import React from 'react';
import {connect} from 'react-redux';
import {getCharacters} from "../redux/actions";

class Characters extends React.Component {
    constructor(props) {
        super(props);
        this.props.getCharacters(this.props.token);
    }

    render() {
        if (!this.props.characters || this.props.characters.length < 1) return <div>loading...</div>;
        return <div>
            {this.props.characters.map(char =>
                (<div>
                    <span>{char.name}</span>
                </div>)
            )}
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        characters: state.characters.characters,
        token: state.auth.token
    };
};

export default connect(mapStateToProps, {getCharacters})(Characters);