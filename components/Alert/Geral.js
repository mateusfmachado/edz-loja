import React, { Component } from 'react';

class AlertGeral extends Component {
    render(){
        if(!this.props.aviso) return null;
        return (
            <div className="alert alert-danger">
                <span>{this.props.aviso.message}</span>
            </div>
        )
    }
}

export default AlertGeral;