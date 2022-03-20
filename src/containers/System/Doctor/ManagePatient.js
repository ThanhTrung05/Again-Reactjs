import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import { getAllPatientForDoctor } from '../../../services/userServices'
// import { LANGUAGES } from "../../../utils"
// import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment'

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []

        }
    }
    async componentDidMount() {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate)


    }

    getDataPatient = async (user, formatedDate) => {
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
        }, () => {
            let { user } = this.props
            let { currentDate } = this.state
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate)
        })
    }

    handleBtnConfirm = () => {

    }

    handleBtnRemedy = () => {

    }

    render() {
        let { dataPatient } = this.state
        console.log('YUric check state: ', this.state)
        return (
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
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypeDataPatient.value_vi}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.value_vi}</td>
                                                <td>
                                                    <button
                                                        onClick={() => this.handleBtnConfirm()}
                                                        className="mp-btn-confirm"

                                                    >Xác nhận</button>
                                                    <button
                                                        onClick={() => this.handleBtnRemedy()}
                                                        className="mp-btn-remedy"

                                                    >Gửi hóa đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        No data
                                    </tr>
                                }

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
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
