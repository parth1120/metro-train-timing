import React from 'react';
import './Table.css'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Moment from 'react-moment';
import 'moment-timezone';
import Button from '@material-ui/core/Button';
import ForwardIcon from '@material-ui/icons/Forward';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '60%',
        flexShrink: 0,
        color: '#fff',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: '#fff',
    },
    colorWhite: {
        color: '#fff',
    },
    margins: {
        marginRight: '10px'
    }
}));

export default function Table(props) {
    const classes = useStyles();
    // console.log('Tale', props.data);


    const calculateExp = (e) => {
        // console.log(e);
        for (let i = 0; i < 1; i++) {
            if (e[i].tripExpenses.length) {
                return e[i].tripExpenses.reduce((result, item) => result + item.amount, 0)
            } else {
                return 0
            }

        }
    }

    const calculateTimeDiff = (date11, date21) => {
        let date1 = new Date(parseInt(date21))
        let date2 = new Date(parseInt(date11))
        var difference = date1.getTime() - date2.getTime();

        var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        difference -= hoursDifference * 1000 * 60 * 60

        var minutesDifference = Math.floor(difference / 1000 / 60);
        difference -= minutesDifference * 1000 * 60

        return ((hoursDifference) + ' Hrs ' + (minutesDifference) + ' Minutes')
    }

    return (
        <div className={classes.root}>
            {props.data && props.data.map((info, index) => {
                return (
                    <Accordion defaultExpanded={true} key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className={classes.colorWhite} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>Date: <Moment unix format="DD/MM/YYYY">{parseInt(info?.startDay / 1000)}</Moment> at <Moment unix format="LT">{parseInt(info?.startDay / 1000)}</Moment> -  <Moment unix format="DD-MM-YYYY">{parseInt(info?.endDay / 1000)}</Moment> at <Moment unix format="LT">{parseInt(info?.endDay / 1000)}</Moment> ({calculateTimeDiff(info?.startDay, info?.endDay)})
                            </Typography>
                            <Typography className={classes.secondaryHeading}>
                                Total KM: {info.tripLists.reduce((result, item) => result + parseInt(item.totalKm), 0)} KM
                                <span style={{ color: '#dae01e', marginLeft: '10px' }}>Total Expense: {calculateExp(info.tripLists)}</span>


                                {/* Total Expense: {info.tripLists && info.tripLists.map((e) => {
                                        return e.tripExpenses.reduce((result, item) => result + item.amount, 0)
                                    }
                                    )
                                } */}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>#</th>
                                        <th>Trip Starts(Node) Trip Ends(Node)</th>
                                        <th>Driver Name</th>
                                        <th>Trip Expenses</th>
                                        <th>Trip Km</th>
                                        <th>Trip GPS Km</th>
                                        <th>Trip Time</th>
                                        <th>Odometer Reading</th>
                                        <th>Action</th>
                                    </tr>
                                    {info.tripLists && info.tripLists.map((tableData, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{tableData.startPointNode}(<Moment unix format="LT">{parseInt(tableData?.startTripDate / 1000)}</Moment>) <span style={{ marginTop: '4px', marginLeft: '5px', color: '#00bddc' }}><ForwardIcon fontSize={'inherit'} /></span> {tableData.endPointNode}(<Moment unix format="LT">{parseInt(tableData?.endTripDate / 1000)}</Moment>)</td>
                                                <td>{tableData.driverName}</td>
                                                <td >
                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <div>Rs. {tableData.tripExpenses[0]?.amount || 0}
                                                        </div>
                                                        <div>
                                                            <span style={{ marginTop: '4px', color: '#00bddc' }}><InfoIcon fontSize={'inherit'} /></span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{tableData.totalKm} Km</td>
                                                <td>{tableData.gpsDistance.toFixed(2)} Km</td>
                                                <td>{calculateTimeDiff(tableData?.startTripDate, tableData?.endTripDate)}</td>
                                                <td>
                                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                                        {tableData.startODOMeter || 'N/A'} <span style={{ marginTop: '4px', marginLeft: '5px', color: '#00bddc' }}><ForwardIcon fontSize={'inherit'} /></span>  {tableData.endODOMeter || 'N/A'}
                                                    </div>

                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Button className={classes.margins} size={'small'} variant="contained" color="primary" onClick={() => { alert('Movement Report') }}>Movement Report
                                                          </Button>
                                                        <Button variant="contained" color="primary" size={'small'} onClick={() => { alert('Stoppage Report') }}>Stoppage Report
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </table>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    );
}