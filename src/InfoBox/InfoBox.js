import React from 'react'
import './InfoBox.css'

function InfoBox(props) {
    return (
        <div className='containerBox' style={{ backgroundColor: props.backgroundcolor }}>
            <span style={{ marginTop: '4px', marginRight: '5px' }}>{props.icon}</span>
            <span>
                {props.text} {props.textTimeHr ? props.textTimeHr : null} {props.textTimeHr ? 'Hrs' : null} {props.textTimeMm ? props.textTimeMm : null} {props.textTimeMm ? 'mm' : null}
            </span>
        </div>
    )
}

export default InfoBox
