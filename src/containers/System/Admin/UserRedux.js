import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewimgURL: '',
            isOpen: false,
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // this.props.dispatch(actions.fetchGenderStart());
        // this.props.dispatch(actions.fetchGenderStart());
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,

            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,

            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,

            })
        }
    }

    handleOnChangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewimgURL: objectUrl
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewimgURL) return;

        this.setState({
            isOpen: true,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;
        return (
            <div className="user-redux-container">
                <div className="title">Learn React-Redux voi hoi Yuric </div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3"> <FormattedMessage id="manage-user.add" /></div>
                            <div className="col-12 ">{isGetGenders === true ? 'Loading genders' : ''}</div>

                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.email" /></label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.password" /></label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.first-name" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.last-name" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.phone-number" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-9 my-3">
                                <label> <FormattedMessage id="manage-user.address" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control">
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} selected>
                                                    {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control">
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} selected>
                                                    {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control">
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} selected>
                                                    {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.image" /></label>
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
                            <div className="col-12 my-3">
                                <button className="btn btn-primary"> <FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && <Lightbox
                    mainSrc={this.state.previewimgURL}
                    onCloseRequest={() => this.setState({ isOpen: false })}

                />}

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
