import "./home.css";
import ListStudent from "../student/list-student";
import NewStudent from "../student/new-student";
import StudentModel from "./../../models/student-model";
import React from "react";
import Form from "./form";


class Home extends React.Component{
  constructor(){
    //call the constructor of the parent class React.Component
    super();
    //data
    this.state={
      nom:"",
      pren:"",
      
      email:"",

      list_student_data:[
        // new StudentModel("nom1","pren1","nom1@gmail.com","https://i.imgur.com/1o1zEDM.png",true),
        // new StudentModel("nom2","pren2","nom2@gmail.com","https://i.imgur.com/1o1zEDM.png",false),
        // new StudentModel("nom3","pren3","nom3@gmail.com","https://i.imgur.com/1o1zEDM.png",true),
      ],
    };
    console.log(this.state);
  }
    render(){
      return(
        <>
         <h1 className="text-center text-white mt-5">
            🧑‍🎓 LMS-APP : <span className="text-warning">Home</span> 🏠
          </h1>
          <div className="container-fluid d-flex p-4 ">
            {/* <Form handleChange={this.handleChange}/> */}
            {/* new student components*/}
             <NewStudent 
            handleSubmit={this.addStudent}
            changeInput={this.handleChange}
             
             /> 
             
            

            {/* list of student */}
            <ListStudent dataList={this.state.list_student_data} /> 
          </div>
        </>
        );
    
    
    
    
    
      
      
      }
      handleChange=(event)=>{
        let valueInput=event.target.value;
        let nameInput=event.target.name;
        this.setState({[nameInput]:valueInput})
        console.log(valueInput,nameInput)
      }
    // //1er méthode
    // changeInput=(event)=>{
    //   let value=event.target.value;
    //   let input=event.target.name;
    //   this.setState({[input]:value})
    // }
    
    //2ème méthode 
    // changeInput=(event)=>{
    //   this.setState({nom:event.target.value})
    // }
    // changeInputPren=(event)=>{
    //   this.setState({pren:event.target.value})
    // }
    // changeInputAvatar=(event)=>{
    //   this.setState({Avatar:event.target.value})
    // }
    // changeInputEmail=(event)=>{
    //   this.setState({email:event.target.value})
    // }



    addStudent=(event)=>{
      // alert("add student");
      //ne pas actualiser la page
      event.preventDefault();
     
      //clear the form pour vider l'input du formulaire
      event.target.reset();

      //validation du formulaire
      if(
        this.state.nom==""||
        this.state.pren==""||
        this.state.avatar==""||
        this.state.email==""
      ){
        alert("Veuillez remplir toutes les champs du formulaire");
      }else{
        //creer un objet de type student
      let nStudent=new StudentModel(
        this.state.list_student_data.length +1,
        this.state.nom,
        this.state.pren,
        this.state.email,
        this.state.avatar,
        false
      );

      //vider les states
      this.setState({
        nom:"",
        pren:"",
        email:"",
        avatar:""
      })
      
      //ajouter student a la liste

      let newStudentList=this.state.list_student_data;
      newStudentList.push(nStudent);
      this.setState(
        {
          List_student_data:newStudentList
        }
        )
      console.log(this.state.list_student_data);
      //recuperer les infos
      // alert(this.state.nom+"\n"+this.state.pren+"\n"+this.state.email);
    }
    };

}

export default Home;