import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'
import { toast } from 'react-toastify';
import _ from 'lodash'
import { saveBulkScheduleDoctor } from '../../../services/userServices'

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: [],
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux()
        this.props.fetchAllScheduleTimeRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                // cach 1
                // data.map(item => {
                //     item.isSelected = false
                //     return item
                // })

                // cach 2
                data = data.map(item => ({
                    ...item,
                    isSelected: false
                }))
            }
            this.setState({
                rangeTime: data
            })
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
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

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })


    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let results = []
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid doctor ! ')
            return;
        }

        if (!currentDate) {
            toast.error('Invalid date ! ')
            return;
        }

        // let FormattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let FormattedDate = moment(currentDate).unix()
        let FormattedDate = new Date(currentDate).getTime()




        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                // eslint-disable-next-line array-callback-return
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value
                    object.date = FormattedDate
                    object.timeType = schedule.keyMap
                    results.push(object)
                })

            } else {
                toast.error('Invalid selected time ! ')

            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: results,
            doctorId: selectedDoctor.value,
            FormattedDate: '' + FormattedDate
        })

        if (res && res.errCode === 0) {
            toast.success('Save the schedule successfully')
        } else {
            console.log('error saveBulkScheduleDoctor >>> res: ', res)
        }
    }

    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-6">
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                // value={this.state.currentDate}
                                selected={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0
                                && rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                                        </button>
                                    )
                                })

                            }
                        </div>
                        <div className="col-12">
                            <button
                                className="btn btn-primary btn-save-schedule"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save-info" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

