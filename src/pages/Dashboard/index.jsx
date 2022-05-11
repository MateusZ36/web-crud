import React from "react";

import Header from "../../components/Header";
import {Alert, Col, Row} from "react-bootstrap";
import CountDepartment from "../Department/component/CountDepartment";
import CountPatrimony from "../Patrimony/component/CountPatrimony";
import CountCategory from "../Category/component/CountCategory";

export default function DashboardPage() {
    return(
        <React.Fragment>
            <Header />
            <Alert variant="success">
              <Alert.Heading>Olá, seja bem vindo</Alert.Heading>
              <p>Selecione a opção desejada no menu acima.</p>
            </Alert>
            <Row>
              <Col>
                <CountDepartment/>
              </Col>
              <Col>
                <CountCategory/>
              </Col>
              <Col>
                <CountPatrimony/>
              </Col>
            </Row>
        </React.Fragment>
    );
}