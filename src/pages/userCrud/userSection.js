import React from 'react';
import {EmpHTTP} from '../../components/Interceptors/empInterceptor'
import { URL } from '../../modal/url';
import { toast } from 'react-toastify';
import BootstrapTable from 'react-bootstrap-table-next';

import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    PaginationTotalStandalone,
    SizePerPageDropdownStandalone
  } from 'react-bootstrap-table2-paginator';
  
  
class UserSection extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            res_ppage: 4,
            users: null,
            no_of_pages:1,
             totalCount:null,
            columns:[
               {dataField:'empId', text:"Emp Id"},
                { dataField:'name',text:"Name"},
                {dataField:'email',text:"Email"},
                {dataField:'active',text:"Active"},
                 {dataField:'superAdmin',text:"SuperAdmin"}
            ]
        }
    }

    getUsers = () => {
        let url = URL.GET_USERS + "?res_ppage=" + this.state.res_ppage + "&page=" + this.state.page;
        EmpHTTP.get(url).then(data => {
            let resp_data = data.data;
            if (resp_data.status == true) {
                this.setState({
                    ...this.state,
                     no_of_pages:resp_data.users.pages,
                    users: [].concat(resp_data.users.page_user),
                    totalCount:resp_data.users.totaluserCount
                })
             console.log(resp_data.users)
            } else {
                toast.error('Error');
            }

        }).catch(err => {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
    }


      changePage=(newpage)=>{
        console.log(newpage);
        this.getUsers()
       this.setState({
           ...this.state,
           page:newpage
       })
      
      }
    componentDidMount() {
        this.getUsers()
    }

    render() {
        return (
            <React.Fragment>
                <section className="section bg-light" style={{ paddingTop: "7rem" }} id="blog">
                {this.state.users && this.state.users.length!=0?
                     
                     <PaginationProvider
                     pagination={ paginationFactory({
                         page:this.state.page,
                          paginationSize:this.state.no_of_pages,
                         sizePerPage:this.state.res_ppage,
                         onPageChange: this.changePage
                        
                     }) }
                   >
                     {
                       ({
                         paginationProps,
                         paginationTableProps
                       }) => (
                         <div>
                          
                           {/* <SizePerPageDropdownStandalone
                             { ...paginationProps }
                           />
                           <PaginationTotalStandalone
                             { ...paginationProps }
                           /> */}
                           <BootstrapTable
                           version="4"
                           keyField="empId"
                           columns={this.state.columns}
                             data={this.state.users }
                           
                             { ...paginationTableProps }
                           />
                           {/* {this.state.columns.map((col,key)=>(
                          <TableHeaderColumn key={key+col.dataField} dataField={col.dataField}>{col.text}</TableHeaderColumn>
  
                           ))} */}
                                                   <PaginationListStandalone
                             { ...paginationProps }
                           />
                         </div>
                       )
                     }
                   </PaginationProvider>:null
             
            } 


                </section>

            </React.Fragment>
        )
    }
}

export default UserSection;