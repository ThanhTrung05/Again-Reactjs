import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './ManageDoctor.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils'


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';




const mdParser = new MarkdownIt();


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux()

    }

    buildDataInputSelect = (inputData) => {
        let results = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            // eslint-disable-next-line array-callback-return
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id

                results.push(object);

            })
        }

        return results
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    handleSaveContentMarkdown = () => {
        console.log('check state: ', this.state)
        this.props.saveDetailDoctorRedux({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            description: this.state.description,
            doctorId: this.state.selectedOption.value
        })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    handleOnChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    Tao them thong tin doctor
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>Chọn Bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className="content-right form-group">
                        <label>Thông tin giới thiệu</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    className="save-content-doctor"
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    Lưu thông tin
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
