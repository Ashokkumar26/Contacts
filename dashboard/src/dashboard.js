import React, { Component } from 'react'

export class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            act: 0,
            index: '',
            datas: []
        }
    }
    componentDidMount() {
        this.refs.fname.focus();
    }
    fSubmit = (e) => {
        e.preventDefault();
        console.log('try');

        let datas = this.state.datas;
        let fname = this.refs.fname.value;
        let lname = this.refs.lname.value;
        let pnumber = this.refs.pnumber.value;
        let email = this.refs.email.value;
        let company = this.refs.company.value;
        let address = this.refs.address.value;

        if (this.state.act === 0) {
            //new
            let data = {
                fname, lname, pnumber, email, company, address
            }
            datas.push(data);
        } else {
            //update
            let index = this.state.index;
            datas[index].fname = fname;
            datas[index].lname = lname;
            datas[index].pnumber = pnumber;
            datas[index].email = email;
            datas[index].company = company;
            datas[index].address = address;
        }
        this.setState({
            datas: datas,
            act: 0
        });
        this.refs.myForm.reset();
        this.refs.fname.focus();

    }
    fRemove = (i) => {
        let datas = this.state.datas;
        datas.splice(i, 1);
        this.setState({
            datas
        });
        this.refs.myForm.reset();
        this.refs.fname.focus();
    }
    fEdit = (i) => {
        let data = this.state.datas[i];
        this.refs.fname.value = data.fname;
        this.refs.lname.value = data.lname;
        this.refs.pnumber.value = data.pnumber;
        this.refs.email.value = data.email;
        this.refs.company.value = data.company;
        this.refs.address.value = data.address;
        this.setState({
            act:1,
            index:i
        });
        this.refs.fname.focus();
    }
    render() {
        let datas = this.state.datas;
        return (
            <div className='container-fluid bg-light'>
                <div className='container'>
                    <div className='row'>
                        <div className='lg-col-7'>
                            <div className='flex'>
                                <div>
                                    <i className="fas fa-address-book" style={{ fontSize: '48px', color: 'red' }}></i>
                                </div>
                                <div>
                                    <h3 className='heading'>Contacts</h3>
                                    <small>Welcome to the CRM contact page</small>
                                </div>
                                <div>
                                    <label>Sort by:</label>
                                    <select>
                                        <option value="1" selected>Date Created</option>
                                        <option value="2">name</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <input className='searchbar' type="search" placeholder="  Search contacts" />
                                <button className="btn-hover color-2 pb-3 pt-2 px-3"
                                    data-toggle="modal" data-target="#myModal"
                                >+ Add Contact</button>
                                <div className="modal" id="myModal">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title">Add to your contacts</h4>
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            </div>
                                            <div className="modal-body">
                                                <form ref='myForm' className='myForm'>
                                                    <input type='text' ref='fname' className='form-control mt-2' placeholder='first name' />
                                                    <input type='text' ref='lname' className='form-control mt-2' placeholder='last name' />
                                                    <input type='number' ref='pnumber' className='form-control mt-2' placeholder='phone number' />
                                                    <input type='email' ref='email' className='form-control mt-2' placeholder='email address' />
                                                    <input type='text' ref='company' className='form-control mt-2' placeholder='company name' />
                                                    <input type='text' ref='address' className='form-control mt-2' placeholder='Address' />
                                                    <button onClick={(e) => this.fSubmit(e)} className="btn btn-success">save</button>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th><input type='checkbox' /></th>
                                        <th>Basic Info</th>
                                        <th>Company</th>
                                    </tr>
                                </thead>
                            <tbody>
                            {datas.map((data, i) => <tr>
                                <td><input type='checkbox'/></td>
                            <td>{data.fname} {data.lname} <br/>
                            <small>{data.email}</small>
                            </td>
                            <td>{data.company}</td>
                            </tr>
                            )}
                            </tbody>
                            </table>
                        </div>
                        <div className='lg-col-5'>
                            {datas.map((data, i) =>
                                <div key={i}> <p>
                                    <p>Fullname: {data.fname} {data.lname}</p>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.pnumber}</p>
                                    <p>Company: {data.company}</p>
                                    <p>Address: {data.address}</p>
                                    <button onClick={() => this.fRemove(i)}>remove</button>
                                    <button onClick={() => this.fEdit(i)}>Edit</button>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
