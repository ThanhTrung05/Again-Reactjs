import React, { Component } from 'react';
import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUsers } from '../../services/userServices'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }

    }

    /** Life cycle
    *   Run component
    * 1. Run constructor => init state
    * 2. Did mount (setState)
    * 3. Render
    *
    */

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <div className="title text-center">
                    Manage users with Yuric
                </div>
                <div className="users-table mt-3 mx-1">
                    <table>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {arrUsers && arrUsers.map((item, index) => {
                            console.log('Yuric check map', item, index)
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
