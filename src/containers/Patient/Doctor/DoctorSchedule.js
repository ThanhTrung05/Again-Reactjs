import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import './DoctorSchedule.scss';
import { getDetailInfoDoctor, getScheduleDoctorByDate } from '../../../services/userServices'
import { LANGUAGES } from "../../../utils"
import Select from 'react-select'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';


class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let arrDays = this.getArrDays(language)
        this.setState({
            allDays: arrDays,

        })

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let arrDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: arrDays
            })
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let { language } = this.props;

            let arrDays = this.getArrDays(language)

            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, arrDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today

                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi)
                }

            } else if (language === LANGUAGES.EN) {
                if (i === 0) {
                    let ddMM = moment(new Date()).locale('en').format("DD/MM")
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM")
                }

            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDays.push(object);
        }

        return arrDays

    }

    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }

        }
    }

    render() {
        let { allDays, allAvailableTime } = this.state
        let { language } = this.props
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(e) => this.handleOnChangeSelect(e)}>
                        {allDays
                            && allDays.length > 0
                            && allDays.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })

                        }
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <i className="fa fa-calendar-alt">
                            <span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </i>
                    </div>
                    <div className="time-content">
                        {allAvailableTime
                            && allAvailableTime.length > 0 ?
                            <>
                                <div className="time-content-btns">
                                    {allAvailableTime.map((item, index) => {
                                        return (
                                            <button key={index} className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}>
                                                {language === LANGUAGES.VI ? item.timeTypeData.value_vi : item.timeTypeData.value_en}
                                            </button>

                                        )
                                    })}
                                </div>

                                <div className="book-free">
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.choose" />
                                        <i className="far fa-hand-point-up"></i>
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </span>
                                </div>
                            </>
                            :
                            <div className="no-schedule">
                                <FormattedMessage id="patient.detail-doctor.no-schedule" />
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
