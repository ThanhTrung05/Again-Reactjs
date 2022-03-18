import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss';
import { createNewClinic, } from '../../../services/userServices'
// import { LANGUAGES } from "../../../utils"
// import { FormattedMessage } from 'react-intl';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import { CommonUtils } from '../../../utils'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';



const mdParser = new MarkdownIt();

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewimgURL: '',
            isOpen: false,
            name: '',
            address: '',
            avatar: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewimgURL: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewimgURL) return;

        this.setState({
            isOpen: true,
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text

        })
    }

    handleChangeInput = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleSaveClinic = async () => {

        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Create a new Clinic succeed ! ')

            this.setState({
                name: '',
                address: '',
                avatar: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewimgURL: '',

            })

        } else {
            toast.error('Create a new Clinic error ! ')
            console.log('Yuric check res: ', res)
        }

    }

    render() {

        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý phòng khám</div>

                <div className="add-new-specialty row">
                    <div className="col-6">
                        <label>Tên phòng khám</label>
                        <input className="form-control" type="text"
                            onChange={(e) => this.handleChangeInput(e, 'name')}
                            value={this.state.name}
                        />
                    </div>
                    <div className="col-6 ">
                        <label>Ảnh phòng khám</label>

                        <div className="preview-img-container">
                            <input id="previewimg" type="file" hidden
                                onChange={(e) => this.handleOnChangeImage(e)}

                            />
                            <label className="label-upload" htmlFor="previewimg">Tải ảnh<i className="fas fa-upload"></i></label>
                            <div className="preview-image"
                                style={{ backgroundImage: `url(${this.state.previewimgURL})` }}
                                onClick={() => this.openPreviewImage()}
                            >

                            </div>
                        </div>

                    </div>

                    <div className="col-6 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input className="form-control" type="text"
                            onChange={(e) => this.handleChangeInput(e, 'address')}
                            value={this.state.address}
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <button className="btn-save-specialty"
                            onClick={() => this.handleSaveClinic()}
                        >Save</button>
                    </div>

                    {this.state.isOpen === true && <Lightbox
                        mainSrc={this.state.previewimgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />}

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
