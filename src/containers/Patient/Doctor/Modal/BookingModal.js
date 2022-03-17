import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { postPatientBookAppointment } from '../../../../services/userServices'
import { LANGUAGES } from "../../../../utils"
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../../Doctor/ProfileDoctor'
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker'
import * as actions from '../../../../store/actions'
import Select from 'react-select'
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            timeType: '',
            genders: '',
        }
    }
    async componentDidMount() {
        this.props.getGenderRedux()
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.value_vi : item.value_en
                object.value = item.keyMap
                result.push(object);
            })
            return result;
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genderRedux)
            })
        }
        if (this.props.genderRedux !== prevProps.genderRedux) {

            this.setState({
                genders: this.buildDataGender(this.props.genderRedux)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            let dataTime = this.props.dataTime
            let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
            let timeType = dataTime && !_.isEmpty(dataTime) ? dataTime.timeType : '';



            this.setState({
                doctorId: doctorId,
                timeType: timeType
            })
        }
    }

    handleOnchangeInput = (e, id) => {
        let valueInput = e.target.value;
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy,
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    hangleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        //validate input
        let date = new Date(this.state.birthday).getTime()

        let timeString = this.buildTimeBooking(this.props.dataTime)

        let doctorName = this.buildDoctorName(this.props.dataTime)

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment successfully ! ')
            this.props.closeBookingModal()
        } else {
            toast.error('Booking a new appointment error ! ')

        }

    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')



            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.value_vi
                :
                dataTime.timeTypeData.value_en

            return `${time} - ${date}`
        }
        return ``
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return name;

        }
        return ``
    }

    render() {
        // toggle={}
        let { isOpenModal, closeBookingModal,
            dataTime } = this.props
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';

        let { genders } = this.state




        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered
            // backdrop={true}
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className="left">
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className="right"
                            onClick={closeBookingModal}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isSkhowLinkDetail={false}
                                isShowPrice={true}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(e) => this.handleOnchangeInput(e, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                </label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />

                                </label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(e) => this.handleOnchangeInput(e, 'reason')}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birthday" />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.birthday}

                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <Select
                                    options={genders}
                                    value={this.state.selectedGender}
                                    onChange={this.hangleChangeSelect}
                                    placeholder={
                                        <FormattedMessage id="patient.booking-modal.chooseGender" />

                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className="btn-booking-confirm"
                            onClick={() => this.handleConfirmBooking()}
                        >
                            <FormattedMessage id="patient.booking-modal.confirm" />
                        </button>
                        <button className="btn-booking-cancel"
                            onClick={closeBookingModal}
                        >
                            <FormattedMessage id="patient.booking-modal.cancel" />

                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderRedux: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
