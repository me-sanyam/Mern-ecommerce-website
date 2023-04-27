import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute() {
    const { isAuthenticated } = useSelector(state => state.user)
    return isAuthenticated ? <Outlet /> : <Navigate to="/account/login" />
}