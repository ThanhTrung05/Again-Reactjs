import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAllCodeService } from "../../../services/userServices"
import { LANGUAGES } from "../../../utils"

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                this.setState({
                    genderArr: res.data
                })
            }
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        let genders = this.state.genderArr
        let language = this.props.language
        return (
            <div className="user-redux-container">
                <div className="title">Learn React-Redux voi hoi Yuric </div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mt-3"> <FormattedMessage id="manage-user.add" /></div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.email" /></label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.password" /></label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.first-name" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.last-name" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.phone-number" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-9 mt-3">
                                <label> <FormattedMessage id="manage-user.address" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-3 mt-3">
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
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label> <FormattedMessage id="manage-user.image" /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-12 mt-3">
                                <button className="btn btn-primary"> <FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
