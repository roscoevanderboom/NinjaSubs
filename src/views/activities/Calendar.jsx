/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useContext, useEffect, useState } from "react";
import GlobalState from '../../state/store'

// reactstrap components
import {
    Row, Col
} from "reactstrap";

import {
    makeStyles, Toolbar, Button
} from "@material-ui/core";

import { ArrowBackIos, ArrowForwardIos, Add } from "@material-ui/icons";

const styles = makeStyles(theme => ({
    day: {
        border: '1px solid black',
        margin: 0,
        padding: 0,
        backgroundColor: '#a59292'
    },
    toolbar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    btn: {
        color: 'white',
        border: '1px solid #f8f8ff63'
    },
    dayNumberHeader: {
        width: '100%',
        fontSize: '1rem',
        backgroundColor: '#564b4b',
        display: 'flex',
        justifyContent: 'space-between'
    },
    dayNumber: {
        padding: '5px 5px 5px 12px'
    },
    ul: {
        padding: 12,
        margin: 0,
        listStyle: 'none',
        fontSize: '1.25rem'
    },
    addBtn: {
        margin: 0,
    }
}))

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

const long = ['January', 'March', 'May',
    'July', 'August', 'October', 'December'];

const short = ['April', 'June', 'September', 'November']

const Calendar = () => {
    const classes = styles();
    const { state, methods, fb, filters, constants } = useContext(GlobalState);
    const [days, setDays] = useState(31);
    const [month, setMonth] = useState(months[0]);
    const [year, setYear] = useState(2020);

    const cycleMonths = (value) => {

        if (value) {
            setMonth(months[0 + 1])
        }
        
    }

    useEffect(() => {


    }, [])

    return (
        <React.Fragment>
            <Toolbar
                className={classes.toolbar}>
                <Button
                    className={classes.btn}
                    variant='outlined'>
                    <ArrowBackIos />
                </Button>
                {month} {`${year}`}
                <Button
                    className={classes.btn}
                    variant='outlined'>
                    <ArrowForwardIos />
                </Button>
            </Toolbar>

            <Row>
                {constants.mapFromNumber(days).map(day =>
                    <Col
                        lg='3' md='4' sm='12'
                        key={day}
                        className={classes.day}>
                        <div className={classes.dayNumberHeader}>
                            <div className={classes.dayNumber}>
                                {`${day + 1}`}
                            </div>
                            <Button className={classes.addBtn}>
                                <Add />
                            </Button>
                        </div>
                        <ul className={classes.ul}>
                            <li>khf</li>
                            <li>khf</li>
                            <li>khf</li>
                        </ul>
                    </Col>
                )}
            </Row>
        </React.Fragment >
    );
}

export default Calendar;
