import React from 'react'
import styled from '@emotion/styled'

export const AppBar = () => {
  return (
    <Bar>Github Search</Bar>
  )
}

const Bar = styled.div`
  width: 100%;
  height: 50px;
  background-color: #6b7280;
  display: flex;
  align-items: center;
  color: white;
  padding-left: 30px;
  
`