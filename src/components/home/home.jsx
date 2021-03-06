import "./home.css";
import ListStudent from "../student/list-student";

//---je peux avoir n'import quel nom de composant
import FormStudent from "../student/new-student";

import React from "react";

import StudentModel from "./../../models/student-model";

import Form from "./form";
import axios from "../../utils/axios";

class Home extends React.Component {
  constructor() {
    //call the constructor of the parent class React.Component
    super();
    //data
    this.state = {
      nom: "",
      pren: "",
     avatar:"",
      email: "",
      updatedStudent_id:-1,
      list_student_data: [
        // new StudentModel("nom1","pren1","nom1@gmail.com","https://i.imgur.com/1o1zEDM.png",true),
        // new StudentModel("nom2","pren2","nom2@gmail.com","https://i.imgur.com/1o1zEDM.png",false),
        // new StudentModel("nom3","pren3","nom3@gmail.com","https://i.imgur.com/1o1zEDM.png",true),
      ],
      
      textBtnState:"Add Student",
      iconBtnState:"fas fa-plus-circle",
      action:"ADD"
    };
    console.log(this.state);
  }
  render() {
    return (
      <>
        <h1 className="text-center text-white mt-5">
          🧑‍🎓 LMS-APP : <span className="text-warning">Home</span> 🏠
        </h1>
        <div className="container-fluid d-flex p-4 ">
          {/* <Form handleChange={this.handleChange}/> */}
          {/* new student components*/}
   <FormStudent
          textBtn={this.state.textBtnState}
          iconBtn={this.state.iconBtnState}
         
            avatar={this.state.avatar}
            nom={this.state.nom}
            pren={this.state.pren}
            email={this.state.email}
            action={this.state.action}

           //  handleChange={this.handleChange}
           handleAddSubmit={this.addStudent}
           changeInput={this.handleChange}
           handleEditSubmit={this.submitEditStudent}
          />

  <ListStudent 
           dataList={this.state.list_student_data} 
           handleDeleteFromHome={this.deleteStudent}
           handleEditFromHome={this.editStudent}/>
        </div>
      </>
    );
  }
  handleChange = (event) => {
    let valueInput = event.target.value;
    let nameInput = event.target.name;
    this.setState({ [nameInput]: valueInput });
    console.log(valueInput, nameInput);
  };
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

  addStudent = (event) => {
    // alert("add student");
    //ne pas actualiser la page
    event.preventDefault();

    //clear the form pour vider l'input du formulaire
    event.target.reset();

    //validation du formulaire
    if (
      this.state.nom == "" ||
      this.state.pren == "" ||
      this.state.avatar == "" ||
      this.state.email == ""
    ) {
      alert("Veuillez remplir toutes les champs du formulaire");
    } else {
      //creer un objet de type student
      let nStudent = new StudentModel(
        0,
        this.state.nom,
        this.state.pren,
        this.state.email,
        this.state.avatar,
        false
      );

      //vider les states
      this.setState({
        nom: "",
        pren: "",
        email: "",
        avatar: "",
      });

      //ajouter student a la liste

      let newStudentList = this.state.list_student_data;
      newStudentList.push(nStudent);
      this.setState({
        List_student_data: newStudentList,
      });

      //ajouter l'etudiant a la partie serveur (firebase) en utilisant axios ,lancer nStudent dans le document students
      const data_student = {
        nom: nStudent.nom,
        pren: nStudent.pren,
        email: nStudent.email,
        avatar: nStudent.avatar,
        isPresent:nStudent.isPresent
      };

      axios.post("students.json", data_student).then((response) => {
        let id_new_student = response.data.name;

        //chercher l'etudiant qui a l'Id==0 sur la liste
        let newListStudent = this.state.list_student_data;
        newListStudent.forEach((s) => {
          if (s.id == 0) {
            s.id = id_new_student;
          }
          //modifier la liste sur le state
          
        });
        this.setState({list_student_data:newListStudent})
        // const myNewStudent={
        //   nom:nStudent.nom,
        //   pren:nStudent.pren,
        //   email:nStudent.email,
        //   avatar:nStudent.avatar,
        //   id:id_new_student
        // }

        // console.log(myNewStudent)
      });

      // console.log(this.state.list_student_data);
      //recuperer les infos
      // alert(this.state.nom+"\n"+this.state.pren+"\n"+this.state.email);
    }
  };
  //recuperer la liste des etudiants depuis firebase onload page avec firebase
  componentDidMount() {
    axios.get("students.json").then((response) => {
      if(response.data != null){
        //extraire toutes les clé de l'objet data
      let keys = Object.keys(response.data);

      //parcourir les keys
      let listEtudiant=keys.map((k) => {
        let ns = new StudentModel(
          k,
          response.data[k].nom,
          response.data[k].pren,
          response.data[k].email,
          response.data[k].avatar,
          response.data[k].isPresent
        );

        return ns;
      });

      //ajouter la liste
      this.setState({list_student_data:listEtudiant})

      console.log(listEtudiant);
      }
    });
  }

    //---HANDLE DELETE
    deleteStudent=(idStudent)=>{
      let choice=window.confirm("Are you sure?");

      if (choice==true){
        //supprimer un etudiant depuis firebase
      // alert(idStudent)
      // alert ("delete student")
      axios.delete("students/"+idStudent+".json").then(()=>{
        let newList=this.state.list_student_data;
        newList=newList.filter(
        (s)=>s.id !== idStudent);
        this.setState({list_student_data:newList})
      });
      }
    
  }

  //---editStudent l'orsqu'on click sur btn update icon (student)

  editStudent=(updatedStudent)=>{

    //changer le text button newStudent
    this.setState({textBtnState:"Edit Student"})

    //changer l'icon du button newStudent
    this.setState({iconBtnState:"fas fa-edit"})

    //ajouter les informations au state
    this.setState({
      nom:updatedStudent.nom,
      pren:updatedStudent.pren,
      avatar:updatedStudent.avatar,
      email:updatedStudent.email,
      updatedStudent_id:updatedStudent.id
    })
     
    //changer l'action du state
    this.setState({action:"EDIT"})

    console.log(updatedStudent)
  }

  //----submitEditStudent la fonction qui va changer l'etudiant depuis firebase
  submitEditStudent=(event)=>{

    // alert(1)

    //ne pas acctualiser la page
    event.preventDefault();

    //partie data a envoyer a firebase
    const student_data={
      nom:this.state.nom,
      pren:this.state.pren,
      email:this.state.email,
      avatar:this.state.avatar,

    }

    //appel a la fonction put de axios
    axios
    .put("students/"+this.state.updatedStudent_id+".json",student_data)
    .then((response)=>{
      
      //changer l'etudiant dans la liste
      let newList=this.state.list_student_data;
      newList.forEach((s)=>{
        if(s.id==this.state.updatedStudent_id){
          s.nom=response.data.nom;
          s.pren=response.data.pren;
          s.email=response.data.email;
          s.avatar=response.data.avatar;
        }
      });
      //modifier la liste du state
      this.setState({list_student_data:newList})

      //vider le formulaire
      event.target.reset();

      //vider les variables state
      this.setState({
        nom:"",
        pren:"",
        email:"",
        avatar:"",
        updatedStudent_id:-1,
        textBtnState:"Add Student",
      iconBtnState:"fas fa-plus-circle",
      action:"ADD",



      })
    });
  }
}

export default Home;
