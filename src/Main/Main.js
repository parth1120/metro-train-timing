import React, { useState, useEffect, useRef } from 'react'
import './Main.css'
import axios from '../config/axios'
import DatePicker from "react-datepicker";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SpeedIcon from '@material-ui/icons/Speed';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ForwardIcon from '@material-ui/icons/Forward';

import InfoBox from '../InfoBox/InfoBox'
import Table from '../Table/Table'

import Moment from 'react-moment';
import 'moment-timezone';
import LoadingOverlay from 'react-loading-overlay';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


const useStyles = makeStyles((theme) => ({
    rootCalender: {
        position: 'absolute', 
        marginTop: '4px', 
        marginLeft: '-20px', 
        color: '#00bddc'
    },
}));



function Main() {
    const classes = useStyles();
    const [toDate, settoDate] = useState(1593613371659)
    const [fromDate, setfromDate] = useState(1577888571659)
    const [userdata, setuserdata] = useState({})
    const [loading, setloading] = useState(false)
    const inputFrom = useRef(null);
    const inputTo = useRef(null);

    useEffect(() => {
        getData(1593613371659, 1577888571659)
        return () => {
            // cleanup
        }
    }, [])


    const getData = (to, from) => {
        setloading(true)
        const body = {
            "clientId": 10,
            "dataRecord": {
                "userRoleId": 4,
                "userRoleName": "COMPANY",
                "userId": 10
            },
            "fromDate": from,
            "toDate": to,
            "tripId": 36
        }
        axios.post('/trip-controller-web/v1/vehicle/wise/summary/36', body)
            .then((res) => {
                setuserdata(res.data.data)
                setTimeout(() => {
                    setloading(false)
                }, 500);

            }, (error) => {
                console.log(error);
                setloading(false)
            })
    }
    // 1578406971
    const handleChangeToDate = (e) => {
        var datum = Date.parse(e);
        console.log(datum)
        settoDate(datum);
    }

    const handleChangeFromDate = (e) => {
        var datum = Date.parse(e);
        console.log(datum)
        setfromDate(datum)
    }



    // console.log(userdata);

    return (
        <LoadingOverlay
            active={loading}
            spinner
            text='Loading...'
        >

            <div className="container">
                <div className="headerBar">
                    <div>
                        <Typography variant='h6'>
                            Trip Summary
                    </Typography>
                        <Typography variant='caption'>
                            <span className="subLink">Dashboard</span> / Trip Summary
                    </Typography>
                    </div>
                    <div className="headerBar">
                        <div className="mr">
                            From
                    </div>
                        <div className="mr">
                            <DatePicker
                                style={{ position: 'relative' }}
                                selected={fromDate}
                                onChange={handleChangeFromDate}
                                ref={inputFrom}
                            />
                            <CalendarTodayIcon onClick={() => inputFrom.current.input.focus()} fontSize={'inherit'} className={classes.rootCalender} />
                        </div>
                        <div className="mr">
                            To
                    </div>
                        <div className="mr">
                            <DatePicker
                                selected={toDate}
                                onChange={handleChangeToDate}
                                style={{ position: 'relative' }}
                                ref={inputTo}
                            />
                            <CalendarTodayIcon onClick={() => inputTo.current.input.focus()} fontSize={'inherit'} className={classes.rootCalender} />
                        </div>
                        <div className="mr">
                            <Button variant="contained" color="primary" size={'default'} onClick={(e) => { getData(toDate, fromDate) }}><SearchIcon fontSize={'inherit'} /></Button>
                        </div>
                        <div className="mr">
                            <Button variant="outlined" color="primary" size={'small'} startIcon={<SystemUpdateAltIcon />} onClick={() => { alert('Export') }}>Export</Button>
                        </div>
                    </div>
                </div>
                <div className="infoBoxes">
                    <Grid container >
                        <Grid item md={8}>
                            <Grid container item spacing={3}>
                                <Grid item md={4} >
                                    <InfoBox
                                        backgroundcolor={'#29bdc2'}
                                        icon={<LocalShippingIcon />}
                                        text={userdata?.vehicleNo} />
                                </Grid>
                                <Grid item md={4}>
                                    <InfoBox
                                        backgroundcolor={'#c2993b'}
                                        icon={<LocalShippingIcon />}
                                        text={`Total Trips: ${userdata?.totalTrips}`}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <InfoBox backgroundcolor={'#005a93'}
                                        icon={<SpeedIcon />}
                                        text={`Total KM: ${userdata?.totalKm} KM`}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item spacing={3}>
                                <Grid item md={4}>
                                    <InfoBox backgroundcolor={'#00a74b'}
                                        icon={<WatchLaterIcon />}
                                        text={'Total Time:'}
                                        textTimeHr={<Moment unix format="hh">{parseInt(userdata?.totalTime)}</Moment>}
                                        textTimeMm={<Moment unix format="mm">{parseInt(userdata?.totalTime)}</Moment>}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <InfoBox backgroundcolor={'#962297'}
                                        icon={<WatchLaterIcon />}
                                        text={'Total Time: '}
                                        textTimeHr={<Moment unix format="hh">{parseInt(userdata?.totalTripTime)}</Moment>}
                                        textTimeMm={<Moment unix format="mm">{parseInt(userdata?.totalTripTime)}</Moment>}
                                    />

                                </Grid>
                                <Grid item md={4}>
                                    <InfoBox backgroundcolor={'#6a5718'}
                                        icon={<AccountBalanceWalletIcon />}
                                        text={`Total Exp : ${userdata?.totalExpences}`}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item md={4}>
                            <div className='blackBoxContainer'>
                                <div className='blackBox'>
                                    <span style={{ marginTop: '4px', marginRight: '5px' }}><AccountBalanceWalletIcon /></span> <span>Other Exp: Rs {userdata?.otherExpenses}</span><span style={{ marginTop: '4px', marginLeft: '5px' }}><ForwardIcon fontSize={'inherit'} /></span>
                                </div>
                            </div>

                        </Grid>
                    </Grid>
                </div>
                <div className="tableContainer">
                    <Table data={userdata?.tripDetails} />
                </div>
            </div >
        </LoadingOverlay>
    )
}

export default Main
