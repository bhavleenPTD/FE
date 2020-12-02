import React from 'react'
import { toast } from 'react-toastify'
import { EmpHTTP } from '../../components/Interceptors/empInterceptor'
import { URL } from '../../modal/url';
import SwitchControl from '../../components/Toggle/switch';
import Pagination from "react-js-pagination";
import { Badge } from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
class LocAllocate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            perpage: 10,
            pages: 0,
            totalCount: null,
            locAlloc: [],
            rows: [],
            options: {
                totalSize: 0
            }

        }
    }

    handlePageChange = (page) => {
        this.getAllocation(page)
    }


    timeConverter = (UNIX_timestamp) => {
        const newDate = new Date(UNIX_timestamp * 1000);
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const year = newDate.getFullYear();
        const month = months[newDate.getMonth()];
        const date = newDate.getDate();
        const time = date + ' ' + month + ' ' + year;
        return time;
    };

    getAllocation = (page) => {
        // let url = URL.GET_EMP_ALLOC + "?page=" + this.state.page + "&perpage=" + this.state.perpage
        // EmpHTTP.get(url).then(data => {
        //     let resp_data = data.data;
        //     if (resp_data != null) {
        //         console.log(resp_data);
        //     } else {
        //         toast.error('Error Occured');
        //     }
        // }).catch(err => {
        //     if (err.response) {
        //         toast.error(err.response.data.message);
        //     } else {
        //         toast.error(err.message);
        //     }
        // })

        setTimeout(() => {
            let newloc = [
                {
                    user_name: 'Robb Stark',
                    user_email: 'rob@gmail',
                    user_status: false,
                    user_role: 'Analyst',
                    iat: 1599638569,
                },
                {
                    user_name: 'Jon Snow',
                    user_email: 'jon@gmail',
                    user_status: false,
                    user_role: 'FSD',
                    iat: 1596538547,
                },
                {
                    user_name: 'Walter White',
                    user_email: 'bb@gmail',
                    user_status: true,
                    user_role: 'Manager',
                    iat: 1551632145,
                },
                {
                    user_name: 'White Walker',
                    user_email: 'got@gmail.com',
                    user_status: true,
                    user_role: 'Agent',
                    iat: 1556659632,
                },
                {
                    user_name: 'Elon Musk',
                    user_email: 'elon@gmail',
                    user_status: true,
                    user_role: 'Field Agent',
                    iat: 1539637532,
                },
                {
                    user_name: 'Robb Stark',
                    user_email: 'rob@gmail',
                    user_status: false,
                    user_role: 'Analyst',
                    iat: 1599638569,
                },
                {
                    user_name: 'Jon Snow',
                    user_email: 'jon@gmail',
                    user_status: false,
                    user_role: 'FSD',
                    iat: 1596538547,
                },
                {
                    user_name: 'Walter White',
                    user_email: 'bb@gmail',
                    user_status: true,
                    user_role: 'Manager',
                    iat: 1551632145,
                },
                {
                    user_name: 'White Walker',
                    user_email: 'got@gmail.com',
                    user_status: true,
                    user_role: 'Agent',
                    iat: 1556659632,
                },
                {
                    user_name: 'Elon Musk',
                    user_email: 'elon@gmail',
                    user_status: true,
                    user_role: 'Field Agent',
                    iat: 1539637532,
                },
                {
                    user_name: 'Robb Stark',
                    user_email: 'rob@gmail',
                    user_status: false,
                    user_role: 'Analyst',
                    iat: 1599638569,
                },
                {
                    user_name: 'Jon gfdSnow',
                    user_email: 'jon@gmail',
                    user_status: false,
                    user_role: 'FSD',
                    iat: 1596538547,
                },
                {
                    user_name: 'Walter White',
                    user_email: 'bb@gmail',
                    user_status: true,
                    user_role: 'Manager',
                    iat: 1551632145,
                },
                {
                    user_name: 'Whitesfg Walker',
                    user_email: 'got@gmail.com',
                    user_status: true,
                    user_role: 'Agent',
                    iat: 1556659632,
                },
                {
                    user_name: 'Elondgf Musk',
                    user_email: 'elon@gmail',
                    user_status: true,
                    user_role: 'Field Agent',
                    iat: 1539637532,
                },
                {
                    user_name: 'Robbgdfgd Stark',
                    user_email: 'rob@gmail',
                    user_status: false,
                    user_role: 'Analyst',
                    iat: 1599638569,
                },
                {
                    user_name: 'Jonfd Snow',
                    user_email: 'jon@gmail',
                    user_status: false,
                    user_role: 'FSD',
                    iat: 1596538547,
                },
                {
                    user_name: 'Walter White',
                    user_email: 'bb@gmail',
                    user_status: true,
                    user_role: 'Manager',
                    iat: 1551632145,
                },
                {
                    user_name: 'White Walker',
                    user_email: 'got@gmail.com',
                    user_status: true,
                    user_role: 'Agent',
                    iat: 1556659632,
                },
                {
                    user_name: 'Elonfgs Musk',
                    user_email: 'elon@gmail',
                    user_status: true,
                    user_role: 'Field Agent',
                    iat: 1539637532,
                }
            ].filter((obj, key) => {
                return key >= (page - 1) * this.state.perpage && key <page * this.state.perpage
            })

            this.setState({
                ...this.state,
                page: page,
                options: {
                    ...this.state.options,
                    totalSize: 20
                },
                pages: 3,
                rows: newloc.map((loc, key) => {
                    return {
                        id: ((page - 1) * 10) + key + 1,
                        user_name: loc.user_name,
                        user_email: loc.user_email,
                        user_role: loc.user_role,
                        user_status: loc.user_status,
                        iat: loc.iat,
                        displayDate: this.timeConverter(loc.iat)
                    }
                }),
                locAlloc: newloc
            })
        }, 1000)
    }



    componentDidMount() {
        this.getAllocation(this.state.page)

    }

    render() {



        const roles = [
            { id: 1, name: 'Analyst' },
            { id: 2, name: 'Agent' },
            { id: 3, name: 'Manager' },
            { id: 4, name: 'FSD' },
            { id: 5, name: 'Field Agent' },
        ];




        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                // setShowRoleUpdateModal(!showRoleUpdateModal);
                console.log(`clicked on row with index: ${rowIndex}`);
            },
        };

        const columns = [
            {
                dataField: 'id',
                text: 'Sr. No.',
                editable: false,
                headerStyle: (column, colIndex) => {
                    return { width: '80px' };
                },
            },
            {
                dataField: 'user_name',
                text: 'Name',
                editable: false,
                headerStyle: (column, colIndex) => {
                    return { width: '250px' };
                },
            },
            {
                dataField: 'user_email',
                text: 'Email',
                editable: false,
                headerStyle: (column, colIndex) => {
                    return { width: '250px' };
                },
            },
            {
                dataField: 'user_role',
                text: 'Role',
                editable: true,
                headerStyle: (column, colIndex) => {
                    return { width: '150px' };
                },

                editor: {
                    type: Type.SELECT,
                    getOptions: (setOptions, { row, column }) => {
                        console.log(`current editing row id: ${row._id}`);
                        console.log(`current editing column: ${column.dataField}`);
                        const data = roles.map((role) => ({
                            label: role.name,
                            value: role.name,
                        }));
                        return data;
                    },
                },
            },
            {
                dataField: 'user_status',
                text: 'Status',
                editable: true,
                editorRenderer: (
                    editorProps,
                    value,
                    row,
                    column,
                    rowIndex,
                    columnIndex,
                ) => <SwitchControl {...editorProps} index={rowIndex} value={value} />,
                headerStyle: (column, colIndex) => {
                    return { width: '180px' };
                },
                formatter: (cellContent, row, editor) => {
                    if (cellContent == true) {
                        return (
                            <h5>
                                <Badge color="success">Active</Badge>
                            </h5>
                        );
                    }
                    return (
                        <h5>
                            <Badge color="danger">Not Active</Badge>
                        </h5>
                    );
                },
            },
            {
                dataField: 'displayDate',
                text: 'Date',
                editable: false,
                headerStyle: (column, colIndex) => {
                    return { width: '150px' };
                },
                sort: true,
                sortValue: (cell, rows) => rows.iat,
            },
        ];
        return (
            <div style={{ marginTop: "10rem", marginLeft: "15rem" }}>
                <div>
                    {this.state.rows != null && this.state.rows.length != 0 ?
                        <div>
                            <BootstrapTable
                                keyField="id"
                                data={this.state.rows}
                                columns={columns}
                                rowEvents={rowEvents}
                                cellEdit={cellEditFactory({
                                    mode: 'click',
                                    blurToSave: false,
                                })}

                            />
                            <Pagination
                                activePage={this.state.page}
                                itemsCountPerPage={this.state.perpage}
                                totalItemsCount={this.state.options.totalSize}
                                pageRangeDisplayed={5}
                                itemClass="page-item"
                                linkClass="page-link"
                                onChange={this.handlePageChange}
                            />
                        </div>

                        : null}
                </div>
            </div>
        )
    }

}


export default LocAllocate;