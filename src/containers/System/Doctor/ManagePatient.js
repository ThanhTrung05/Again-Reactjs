import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userServices'
import { LANGUAGES } from "../../../utils"
// import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'
import RemedyModal from './RemedyModal'
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay-ts';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }
    async componentDidMount() {

    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime();


        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        }, async () => {

            await this.getDataPatient()
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
        })
    }

    sendRemedyModal = async (dataChild) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })

        let res = await postSendRemedy({
            email: dataModal.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send Remedy Succeeds!')
            await this.getDataPatient();
            this.closeRemedyModal()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Send Remedy Failed!')
            console.log('error send remedy: ', res)
        }
    }

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state
        let language = this.props.language;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    snipper
                    text='Loading...'

                >
                    <div className="manage-patient-container">
                        <div className="m-p-title">
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className="m-p-body row">
                            <div className="col-4 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    selected={this.state.currentDate}
                                />
                            </div>
                            <div className="col-12 form-group table-manage-patient">

                                <table
                                    className="table table-dark table-striped "
                                    style={{ width: '100%' }}
                                >
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.value_vi
                                                    : item.timeTypeDataPatient.value_en;
                                                let gender = language === LANGUAGES.VI ? item.patientData.genderData.value_vi
                                                    : item.patientData.genderData.value_en;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                                className="mp-btn-confirm"

                                                            >Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: 'center' }}>No data</td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedyModal={this.sendRemedyModal}
                    />

                </LoadingOverlay>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
