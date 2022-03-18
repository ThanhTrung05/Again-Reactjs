import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss';
import { getDetailClinicById, getAllCodeService } from '../../../services/userServices'
import { LANGUAGES } from "../../../utils"
// import { FormattedMessage } from 'react-intl';
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor'
import _ from 'lodash'

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            showing: true
        }
    }
    //29, 49,50
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailClinicById({
                id: id,
            })

            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic

                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })

                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }



    handleShowSpecialty = (status) => {
        this.setState({
            showing: status
        })
    }
    //show-description-specialty 
    render() {
        let { arrDoctorId, dataDetailClinic,
            showing } = this.state
        console.log('Yucric check state: ', this.state)
        let { language } = this.props
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {showing === true &&
                            <>
                                <div className="hide-description-specialty ">

                                    {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                                        &&
                                        <>
                                            <div>{dataDetailClinic.name}</div>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}
                                            >

                                            </div>
                                        </>
                                    }

                                </div>
                                <div className="more-specialty">
                                    <span
                                        onClick={() => this.handleShowSpecialty(false)}
                                    >Xem thêm</span>
                                </div>
                            </>
                        }

                        {showing === false &&
                            <>
                                <div className="show-description-specialty ">

                                    {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                                        &&
                                        <div
                                            dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}
                                        >

                                        </div>
                                    }

                                </div>
                                <div className="more-specialty">
                                    <span
                                        onClick={() => this.handleShowSpecialty(true)}
                                    >Ẩn</span>
                                </div>
                            </>
                        }
                    </div>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-specialty" key={index}>
                                    <div className="detail-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isSkhowLinkDetail={true}
                                                isShowPrice={false}
                                            //  dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className="detail-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                doctorIdFromParent={item}

                                            />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>

                                    </div>
                                </div>

                            )
                        })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
