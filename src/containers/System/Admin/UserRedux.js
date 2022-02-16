import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser'

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewimgURL: '',
            isOpen: false,



            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
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
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''

            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''

            })
        }
        console.log('check prevProps.listUsers: ')

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux
            let arrPositions = this.props.positionRedux


            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,

            })
        }
    }

    handleOnChangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewimgURL: objectUrl,
                avatar: file
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewimgURL) return;

        this.setState({
            isOpen: true,
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;

        let { action } = this.state

        //let action = this.state.action

        if (action === CRUD_ACTIONS.CREATE) {



            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edut user

            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position
                // avatar: this.state.avatar
            })


        }

    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber',
            'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                // eslint-disable-next-line no-unused-vars
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break
            }
        }

        return isValid;
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state }

        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('hoidanit check input onchange: ', this.state)
        })
    }

    handleEditUserFromParent = (user) => {
        console.log('check handle edit user from parent: ', user)
        this.setState({
            email: user.email,
            password: 'HASHCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        // let email = this.state.email;

        let { email, password, firstName, lastName, phoneNumber,
            address, gender, position, role } = this.state;




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
                                <input type="email" className="form-control"
                                    value={email}
                                    onChange={(e) => this.onChangeInput(e, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.password" /></label>
                                <input type="password" className="form-control"
                                    value={password}
                                    onChange={(e) => this.onChangeInput(e, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.first-name" /></label>
                                <input type="text" className="form-control"
                                    value={firstName}
                                    onChange={(e) => this.onChangeInput(e, 'firstName')}
                                />
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.last-name" /></label>
                                <input type="text" className="form-control"
                                    value={lastName}
                                    onChange={(e) => this.onChangeInput(e, 'lastName')}
                                />
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.phone-number" /></label>
                                <input type="text" className="form-control"
                                    value={phoneNumber}
                                    onChange={(e) => this.onChangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className="col-9 my-3">
                                <label> <FormattedMessage id="manage-user.address" /></label>
                                <input type="text" className="form-control"
                                    value={address}
                                    onChange={(e) => this.onChangeInput(e, 'address')}
                                />
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                    value={gender}
                                    onChange={(e) => this.onChangeInput(e, 'gender')}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.value_vi : item.value_en}                                               </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control"
                                    onChange={(e) => this.onChangeInput(e, 'position')}
                                    value={position}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.value_vi : item.value_en}                                               </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3 my-3">
                                <label> <FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control"
                                    onChange={(e) => this.onChangeInput(e, 'role')}
                                    value={role}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.value_vi : item.value_en}                                               </option>
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
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT
                                        ? <FormattedMessage id="manage-user.edit" />
                                        : <FormattedMessage id="manage-user.save" />}

                                </button>
                            </div>

                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
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
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);



