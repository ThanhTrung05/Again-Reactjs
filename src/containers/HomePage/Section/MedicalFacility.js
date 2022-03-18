import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from "react-slick";
import { getAllClinic } from '../../../services/userServices'
import { withRouter } from 'react-router';




class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)

    }


    render() {
        let { dataClinic } = this.state
        return (
            <div className="section-share section-medical-facility">
                <div className="section-containter">
                    <div className="section-header">
                        <span className="title-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section">xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>

                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className="section-customize clinic-child " key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >
                                            <div className="bg-image section-medical-facility"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="clinic-name">{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
