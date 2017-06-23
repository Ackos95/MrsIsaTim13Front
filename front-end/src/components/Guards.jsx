import React from 'react';
import { Redirect } from 'react-router-dom'

export const EmployeePasswordGuard = (component) => (props) => props.user && !props.user.changedPassword ? <Redirect to="/change-password" /> : <component {...props} /> 
