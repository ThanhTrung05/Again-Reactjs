import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss';
import { Modal } from 'reactstrap';
import moment from 'moment';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from '../../../utils'

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }



    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleOnChangeEmage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }

    }

    handleSendRemedy = () => {
        this.props.sendRemedyModal(this.state)
    }

    render() {
        // toggle={}
        let { isOpenModal, closeRemedyModal,
            dataModal, sendRemedyModal } = this.props
        let { email } = this.state
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered
            // backdrop={true}
            >
                <>
                    <div className="modal-header">
                        <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
                        <button type="button" className="close" aria-label="Close"
                            onClick={closeRemedyModal}
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6 form-group">
                                <div >
                                    <label>Email bệnh nhân</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={email}
                                        onChange={(e) => this.handleOnChangeEmail(e)}
                                    />
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <div >
                                    <label>Chọn file đơn thuốc</label>
                                    <input
                                        className="form-control-file"
                                        type="file"
                                        onChange={(e) => this.handleOnChangeEmage(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSendRemedy()}>Send</Button>{' '}
                        <Button color="secondary" onClick={closeRemedyModal}>Cancel</Button>
                    </ModalFooter>
                </>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
