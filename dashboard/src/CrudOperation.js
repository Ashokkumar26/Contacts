import React, { Component } from 'react'

export class CrudOperation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             title: 'React simple CRUD Application',
             act: 0,
             index: '',
             datas:[]
        }
    }
    componentDidMount(){
        this.refs.fname.focus();
    }
    fSubmit = (e) =>{
        e.preventDefault();
        console.log('try');

        let datas = this.state.datas;
        let fname = this.refs.fname.value;
        let lname = this.refs.lname.value;
        let pnumber = this.refs.pnumber.value;
        let email = this.refs.email.value;
        let company = this.refs.company.value;
        let address = this.refs.address.value;

        if(this.state.act === 0) {
            //new
            let data = {
                fname,lname,pnumber,email,company, address
            }
            datas.push(data);
        }else{ 
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
            act:0
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
            <div>
                <h2>{this.state.title}</h2>
                <form ref='myForm' className='myForm'>
                    <input type='text' ref='fname' placeholder='FirstName'/>
                    <input type='text' ref='lname' placeholder='LastName'/>
                    <input type='number' ref='pnumber' placeholder='Enternumber'/>
                    <input type='email' ref='email' placeholder='Enteremail'/>
                    <input type='text' ref='company' placeholder='Entercompany'/>
                    <input type='text' ref='address' placeholder='EnterAddress'/>
                    <button onClick={(e)=>this.fSubmit(e)}>Submit</button>
                </form>
                <pre>
                    {datas.map((data, i)=>
                    <li key={i}>
                        {i+1}. {data.fname}, {data.address}
                        <button onClick={()=>this.fRemove(i)}>remove</button>
                        <button onClick={()=>this.fEdit(i)}>Edit</button>
                    </li>
                    )}
                </pre>
            </div>
        )
    }
}

export default CrudOperation
