import React from "react";

import Header from "../../components/Header";
import {Alert, Col, Row} from "react-bootstrap";
import CountDepartment from "../Department/component/CountDepartment";
import CountPatrimony from "../Patrimony/component/CountPatrimony";
import CountCategory from "../Category/component/CountCategory";

export default function DashboardPage() {
  return(
    <React.Fragment>
      <Header/>
      <div className="container">
        <Alert variant="success" className="mx-auto">
          <Alert.Heading>Olá, seja bem vindo</Alert.Heading>
          <p>Selecione a opção desejada no menu acima.</p>
        </Alert>

        <div className="row">
          <div className="col">
            <div className="card bg-dark text-white">
              <div className="card-header">Departamentos</div>
              <div className="card-body"><CountDepartment/></div>
              <div className="card-footer">Departamentos cadastrados</div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-light">
              <div className="card-header">Categorias</div>
              <div className="card-body"><CountCategory/></div>
              <div className="card-footer">Categorias cadastradas</div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-success text-white">
              <div className="card-header">Patrimônios</div>
              <div className="card-body"><CountPatrimony/></div>
              <div className="card-footer">Patrimônios cadastrados</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}