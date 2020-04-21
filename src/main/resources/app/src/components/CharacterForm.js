import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {createCharacter} from '../redux/actions';
import DefaultAvatar from '../images/default-avatar-svg.png';

class CharacterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            aspects: [],
            phases: [],
            skills: [],
            avatar: undefined,

            currentAspect: "",
            currentPhase: ""
        };
    }

    addAspect() {
        const aspects = [...this.state.aspects];
        aspects.push(this.state.currentAspect);
        this.setState({
            aspects,
            currentAspect: ""
        });
    }

    removeAspect(id) {
        const aspects = [...this.state.aspects];
        aspects.splice(id, 1);
        this.setState({aspects});
    }

    addPhase() {
        const phases = [...this.state.phases];
        phases.push(this.state.currentPhase);
        this.setState({
            phases,
            currentPhase: ""
        });
    }

    removePhase(id) {
        const phases = [...this.state.phases];
        phases.splice(id, 1);
        this.setState({phases})
    }

    createCharacter() {
        this.props.createCharacter({
            ...this.state,
            currentAspect: undefined,
            currentPhase: undefined
        }, this.props.token);
    }

    loadDefaultAvatar() {
        fetch(DefaultAvatar)
            .then(response => response.blob())
            .then(blob => this.setState({avatar: URL.createObjectURL(blob)}))
    }

    render() {
        if (!this.state.avatar) {
            this.loadDefaultAvatar();
        }

        return <div className="container-fluid">
            <div className="card shadow">
                <div className="card-body">
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="nameInput">Name</label>
                            <input type="text"
                                   className="form-control-plaintext"
                                   id="nameInput"
                                   placeholder="Name of your character"
                                   value={this.state.name}
                                   onChange={e => this.setState({name: e.target.value})}/>
                        </div>
                        <div className="form-group d-flex">
                            <div>
                                <label htmlFor="avatarInput">Avatar</label>
                                <input type="file"
                                       id="avatarInput"
                                       className="form-control-file"
                                       onChange={e => this.setState({avatar: URL.createObjectURL(e.target.files[0])})}
                                />
                            </div>
                            <div>
                                <img src={this.state.avatar}
                                     style={{objectFit: "cover", maxHeight: "120px"}} />
                            </div>
                        </div>
                        <div className="list-group">
                            <label>Aspects</label>
                            {this.state.aspects.map((aspect, i) => (
                                <div key={"aspect"+i} className="list-group-item d-flex justify-content-between">
                                    <span>{aspect}</span>
                                    <Button variant="danger" onClick={() => this.removeAspect(i)}>
                                        <FontAwesomeIcon icon="trash" />
                                    </Button>
                                </div>
                            ))}
                            <div className="list-group-item">
                                <input type="text"
                                       value={this.state.currentAspect}
                                       onChange={e => this.setState({currentAspect: e.target.value})}
                                />
                                <Button variant="primary" onClick={this.addAspect.bind(this)}>Add</Button>
                            </div>
                        </div>
                        <div className="list-group">
                            <label>Phases</label>
                            {this.state.phases.map((phase, i) => (
                                <div key={"phase"+i} className="list-group-item d-flex justify-content-between">
                                    <span>{phase}</span>
                                    <Button variant="danger" onClick={() => this.removePhase(i)}>
                                        <FontAwesomeIcon icon="trash" />
                                    </Button>
                                </div>
                            ))}
                            <div className="list-group-item">
                                <input type="text"
                                       value={this.state.currentPhase}
                                       onChange={(e) => this.setState({currentPhase: e.target.value})}
                                />
                                <Button variant="primary" onClick={this.addPhase.bind(this)}>Add</Button>
                            </div>
                        </div>
                        <Button variant="primary" onClick={this.createCharacter.bind(this)}>Create</Button>
                    </form>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps, {createCharacter})(CharacterForm);