import React, { Component } from "react";
import Header from '../Components/Headers/Header';
import SupplierTable from '../Components/SupplierTable';
import { domain, api } from '../Configurations/Config';
import axios from 'axios';
import InventoryPopup from "../Components/InventoryPopup";
import 'bootstrap/dist/css/bootstrap.min.css';
import SupplierForm from '../Components/SupplierForm';

class SupplierList extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],editSupObj: [],isEdit:false,
            showSupplierForm : false, 
        }
        this.addSupplierFun = this.addSupplierFun.bind(this)
        this.editSupplier = this.editSupplier.bind(this)
    }

    componentDidMount() {
        axios.get(api + 'api/Store/Suppliers')
            .then(response => {
                const items = response.data;
                this.setState({ data: items });
            })
    }
    componentDidUpdate(prevState) {
        if (prevState.data != this.state.data || prevState.showSupplierForm != this.state.showSupplierForm) {
            //HTTP get request
            axios.get(api + 'api/Store/Suppliers')
                .then(response => {
                    const items = response.data;
                    this.setState({ data: items });
                })
        }
    }

    addSupplierFun(previousState) {
        this.setState(
            {
                isEdit : false,
                showSupplierForm: !previousState,
            }
        )
        //this.componentDidMount();
    }

    editSupplier(supplier) { 
        this.setState({  
              editSupObj : supplier,
              isEdit: true,
              showSupplierForm: true,
            });
        //axios.put(api + 'api/Store/updateSupplier/' + supplier.id).then(result=>{  });
    } 

    checkSupplierAction = () => {
        window.location.href = domain
    }

    render() {

        //this.componentDidMount();
        return (
        <div>
            <Header />
            <div className="container">
                <div className="row" >
                    <div className="col-sm-12 text-right mt-1">
                        <button className="btn btn-warning mt-1" onClick={() => this.addSupplierFun(this.state.showSupplierForm)}>
                              {!this.state.showSupplierForm
                                ? "Add Supplier"
                                : "Go to Suppplier List"}
                        </button>
                    </div>
                </div>

                <div className="row" >
                    {!this.state.showSupplierForm ?
                        <div className="col-sm-12  ">
                            <SupplierTable data={this.state.data} editSupplier={this.editSupplier} />
                        </div> 
                        : null
                    }
                    {this.state.showSupplierForm || this.state.isEdit?
                        <SupplierForm editSupObj={this.state.editSupObj} isEdit={this.state.isEdit}/>
                        : null
                    }
                </div>
            </div>
        </div>
        )
    }
}

export default SupplierList;