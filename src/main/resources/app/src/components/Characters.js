import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {deleteCharacter, getCharacters} from '../redux/actions';

class Characters extends React.Component {
    constructor(props) {
        super(props);
        this.props.getCharacters(this.props.token);
    }

    deleteCharacter(id) {
        this.props.deleteCharacter(this.props.characters[id], this.props.token)
    }

    render() {
        if (!this.props.characters || this.props.characters.length < 1) return <div>loading...</div>;
        return <div className="container-fluid">
            <div className="list-group m-auto shadow">
                {this.props.characters.map((char, i) =>
                    (<div className="list-group-item d-flex justify-content-between" key={char.name + i}>
                        <div>{char.name}</div>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.deleteCharacter(i)}>
                            <FontAwesomeIcon icon="trash"/>
                        </button>
                    </div>)
                )}
            </div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        characters: state.characters.characters,
        token: state.auth.token
    };
};

export default connect(mapStateToProps, {getCharacters, deleteCharacter})(Characters);