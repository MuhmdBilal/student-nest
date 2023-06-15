import React, { useState } from 'react'

function Secondrport() {
    const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      };
       
      // handle click event of the Remove button
      const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };
       
      // handle click event of the Add button
      const handleAddClick = () => {
        setInputList([...inputList, { firstName: "", lastName: "" }]);
      };
    return (
        <div className="App">
    <h3><a href="https://cluemediator.com">Clue Mediator</a></h3>
    {inputList.map((x, i) => {
      return (
        <div className="box">
          <input
            name="firstName"
 placeholder="Enter First Name"
            value={x.firstName}
            onChange={e => handleInputChange(e, i)}
          />
          <input
            className="ml10"
            name="lastName"
 placeholder="Enter Last Name"
            value={x.lastName}
            onChange={e => handleInputChange(e, i)}
          />
          <div className="btn-box">
            {inputList.length !== 1 && <button
              className="mr10"
              onClick={() => handleRemoveClick(i)}>Remove</button>}
            {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
          </div>
        </div>
      );
    })}
    <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
    )
}

export default Secondrport



















// import React, { useState } from 'react'

// function Secondrport() {
//     const [inputFields, setInputFields] = useState([{
//         fullName: '',
//         emailAddress: '',
//         salary: ''
//     }]);

//     const addInputField = () => {
//         setInputFields([...inputFields, {
//             fullName: '',
//             emailAddress: '',
//             salary: ''
//         }])

//     }
//     const removeInputFields = (index) => {
//         const rows = [...inputFields];
//         rows.splice(index, 1);
//         setInputFields(rows);
//     }
//     const handleChange = (index, evnt) => {

//         const { name, value } = evnt.target;
//         const list = [...inputFields];
//         list[index][name] = value;
//         setInputFields(list);
//     }

//     console.log("inputFields", inputFields);
//     return (
//         <div>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-sm-8">
//                         {
//                             inputFields.map((data, index) => {
//                                 const { fullName, emailAddress, salary } = data;
//                                 return (
//                                     <div className="row my-3" key={index}>
//                                         <div className="col">
//                                             <div className="form-group">
//                                                 <input type="text" onChange={(evnt) => handleChange(index, evnt)} value={fullName} name="fullName" className="form-control" placeholder="Full Name" />
//                                             </div>
//                                         </div>
//                                         <div className="col">
//                                             <input type="email" onChange={(evnt) => handleChange(index, evnt)} value={emailAddress} name="emailAddress" className="form-control" placeholder="Email Address" />
//                                         </div>
//                                         <div className="col">
//                                             <input type="text" onChange={(evnt) => handleChange(index, evnt)} value={salary} name="salary" className="form-control" placeholder="Salary" />
//                                         </div>
//                                         <div className="col">


//                                             {(inputFields.length !== 1) ? <button className="btn btn-outline-danger" onClick={removeInputFields}>Remove</button> : ''}


//                                         </div>
//                                     </div>
//                                 )
//                             })
//                         }

//                         <div className="row">
//                             <div className="col-sm-12">
//                                 <button className="btn btn-outline-success " onClick={addInputField}>Add New</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-sm-4">
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Secondrport