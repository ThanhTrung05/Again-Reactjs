import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import './DoctorSchedule.scss';
import { getDetailInfoDoctor, getScheduleDoctorByDate } from '../../../services/userServices'
import { LANGUAGES } from "../../../utils"
import Select from 'react-select'
import moment from 'moment'
import localization from 'moment/locale/vi'


class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = {
            allDays: [],
        }
    }
    componentDidMount() {
        let { language } = this.props;

        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            } else if (language === LANGUAGES.EN) {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM")
                console.log('Yuric check label', object.label)
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDays.push(object);
            console.log('Yuric check allDays: ', arrDays)
        }
        this.setState({
            allDays: arrDays,
        })
        this.setArrDays(language)

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language)
        }


    }

    setArrDays = (language) => {
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            } else if (language === LANGUAGES.EN) {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM")
                console.log('Yuric check label', object.label)
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDays.push(object);
            console.log('Yuric check allDays: ', arrDays)
        }


        this.setState({
            allDays: arrDays,
        })
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.propsdoctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log('Yuric check res: ', res)
        }
    }

    render() {
        let { allDays } = this.state
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
                <div className="all-available-time"></div>
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
