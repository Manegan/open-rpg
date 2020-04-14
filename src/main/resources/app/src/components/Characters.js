import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {deleteCharacter, getCharacters} from '../redux/actions';
import {Modal, Button, Dropdown} from 'react-bootstrap';

class Characters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            deleteCharacterId: null,

            page: 0,
            size: 10
        }
        this.props.getCharacters(this.props.token, this.state.page, this.state.size);
    }

    handleShow(id) {
        this.setState({
            showModal: true,
            deleteCharacterId: id
        });
    }

    handleClose() {
        this.setState({
            showModal: false,
            deleteCharacterId: null
        });
    }

    changePage(page) {
        if (page >= 0) {
            if (this.state.page < page && this.props.characters.length !== this.state.size) return
            this.setState({page})
        }
    }

    changeSize(e) {
        const size = Number(e.target.value)
        if (size > 0 && size <= 100)  {
            this.setState({
                page: 0,
                size
            })
        }
    }

    deleteCharacter() {
        this.props.deleteCharacter(this.props.characters[this.state.deleteCharacterId], this.props.token);
        this.handleClose();
    }

    renderCharacters() {
        if (!this.props.characters || this.props.characters.length < 1) {
            return <div className="list-group-item justify-content-between">No characters found.</div>;
        } else {
            return this.props.characters.map((char, i) =>
                (<div className="list-group-item d-flex justify-content-between" key={char.name + i}>
                    <div>{char.name}</div>
                    <Button
                        variant="danger"
                        onClick={() => this.handleShow(i)}>
                        <FontAwesomeIcon icon="trash"/>
                    </Button>
                </div>));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevState.size !== this.state.size ||
            prevState.page !== this.state.page ||
            prevState.deleteCharacterId !== this.state.deleteCharacterId
        ) {
            this.props.getCharacters(this.props.token, this.state.page, this.state.size)
        }
    }

    render() {
        if (this.props.loading) {
            return <div className="container-fluid">
                <FontAwesomeIcon icon="spinner" pulse/>
            </div>;
        }
        return <div className="container-fluid">
            <Modal show={this.state.showModal} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>Modal title</Modal.Header>
                <Modal.Body>Confirm the deletion of {this.props.characters[this.state.deleteCharacterId]?.name || ""}.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose.bind(this)}>Close</Button>
                    <Button variant="primary" onClick={this.deleteCharacter.bind(this)}>Confirm</Button>
                </Modal.Footer>
            </Modal>
            <div className="list-group m-auto shadow">
                <div className="list-group-item d-flex justify-content-between">
                    <Button
                        variant="primary"
                        style={{"padding": "1px 6px"}}
                        disabled={this.state.page <= 0}
                        onClick={() => this.changePage(this.state.page - 1)}>
                        &lt;
                    </Button>
                    <select name="size" value={this.state.size} onChange={this.changeSize.bind(this)}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={100}>100</option>
                    </select>
                    <Button
                        variant="primary"
                        style={{"padding": "1px 6px"}}
                        disabled={this.props.characters.length < this.state.size}
                        onClick={() => this.changePage(this.state.page + 1)}>
                        &gt;
                    </Button>
                </div>
                {this.renderCharacters()}
            </div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        characters: state.characters.characters,
        loading: state.characters.loading,
        token: state.auth.token
    };
};

export default connect(mapStateToProps, {getCharacters, deleteCharacter})(Characters);