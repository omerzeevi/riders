import React, { Component } from 'react';
import Form from './common/form';
import Input from './common/input';
import PageHeader from './common/pageHeader';

class Signup extends Form {
    state = {  }
    render() { 
        return ( <div className="container homePage">
            <PageHeader titleText="הרשמה ל ISRiders" />
            <div className="row">
                <div className="col-12 homePageDescription">
                    <p>עוד צעד אחד תהיה/י נגיש/ה למאגר הגדול ביותר של מדריכי/ות הסקי והסנובורד הישראלים/יות בעולם.</p>
                    <p>מלא/י את הפרטים והתחבר/י</p>
                </div>
            </div>
            {this.renderInput("name", "שם מלא", "שם שגוי")}
            {this.renderInput("email", "אימייל", "אימייל שגוי", "email")}
            {this.renderInput("password", "סיסמה", "סיסמה שגויה", "password")}
            {this.renderButton("הרשם")}
        </div> );
    }
}
 
export default Signup;

