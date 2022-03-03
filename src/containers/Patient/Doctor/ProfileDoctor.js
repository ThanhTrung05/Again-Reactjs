import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userServices'
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = [];
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInforDoctor(this.props.doctorId)
        }
    }



    render() {
        let { dataProfile } = this.state
        let { language } = this.props
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            // eslint-disable-next-line no-unused-vars
            nameVi = `${dataProfile.positionData.value_vi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            // eslint-disable-next-line no-unused-vars
            nameEn = `${dataProfile.positionData.value_en}, ${dataProfile.firstName} ${dataProfile.lastName}`

        }
        console.log('Yuric check state: ', this.state)
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div className="content-left"
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >
                    </div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {dataProfile
                                && dataProfile.Markdown
                                && dataProfile.Markdown.description
                                && <span>
                                    {dataProfile.Markdown.description}
                                </span>
                            }
                        </div>
                    </div>
                </div>

                <div className="price">
                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI
                        &&
                        <NumberFormat
                            className="currency"
                            value={dataProfile.Doctor_Infor.priceTypeData.value_vi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    }

                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN
                        &&
                        <NumberFormat
                            className="currency"
                            value={dataProfile.Doctor_Infor.priceTypeData.value_en}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
