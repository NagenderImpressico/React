import React, { Fragment, useEffect, useState } from "react";
import {getStreamers} from '../Action/JetDev'
import { connect } from 'react-redux'
import styled from "styled-components";
import LogoSrc from '../assets/user.jpg';

const JetDev = ({getStreamers, streamerListResponse}) => {

    const[streamerList, setStreamerList]= useState([]);

    // useEffect(() => {
    //   getStreamers();
    //  }, []);

     useEffect(() => {
         if(!streamerListResponse.length){
            getStreamers();
         }
      setStreamerList(streamerListResponse)
     }, [streamerListResponse]);
    
     useEffect(() => {
      const interval = setInterval(() => {
        getUpdate();

      }, 5000);
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [streamerList])
    
    /**
     * we are updating streamer list 
     */
    const getUpdate = () => {
      let data = streamerList;

      data[parseInt(Math.random()  * data.length)].score = data[parseInt(Math.random()  * data.length)].score + 1000;

      data.sort((a, b) => (a.score < b.score) ? 1 : -1)

      setStreamerList([...data])
    };
   
  
    const Table = styled.table` border-collapse: collapse; width: 100%`;
    const SerialNumber = styled.td`width:5%; padding: 10px; text-align: left; border-bottom: 1px solid #ddd; color:black`;
    const LogoColumn = styled.td`width:5% ;padding: 10px; text-align: left; border-bottom: 1px solid #ddd; color:black`;
    const NameColumn = styled.td`width:20%; padding: 10px; text-align: left; border-bottom: 1px solid #ddd; color:black`;
    const PointsColumn = styled.td`width:70% ; padding: 10px;color:orchid !important; text-align: right; border-bottom: 1px solid #ddd; color:black`;
    const Tr = styled.tr` Width:100%`;
    const Wrapper =  styled.div`width:80%;border-radius:10px;padding:2% 5% 2% 5%;background-color:hsl(0,0%,96.5%);; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);`;
    const Logo = styled.img`width: 25px;height: 25px;border-radius:50%;border:2px solid white`;
    const CicleNumber = styled.div` border-radius: 50%;  width: 22px; height: 22px; padding: 1px; background: red; color:white !important; text-align: center; font-size:15px;`
    return(
        <Fragment>
           
            {streamerList &&
                          streamerList.length > 0 ? (
                         <Wrapper>   
                            <Table>
                                {
                                     streamerList.map((data, i) => (
                                        <Tr>
                                        <SerialNumber >
                                        {i===0
                                           ? <CicleNumber style={{ backgroundColor: 'red' }}>{++i}</CicleNumber>
                                           : i===1 ? <CicleNumber style={{ backgroundColor: 'OrangeRed' }}>{++i}</CicleNumber>: i===2 ? <CicleNumber style={{ backgroundColor: 'orange' }}>{++i}</CicleNumber>: <CicleNumber style={{ backgroundColor: 'blue' }}>{++i}</CicleNumber>
                                         }
                                        </SerialNumber>    
                                        <LogoColumn><Logo src={LogoSrc} /></LogoColumn>
                                        <NameColumn>{data.displayName}</NameColumn>
                                        <PointsColumn>{data.score} pt</PointsColumn>
                                        </Tr> 
                                     ))
                                }
                            </Table>  
                        </Wrapper>        
                            ):(
                                <span>Not Found</span>
                            )}
             
        </Fragment>
    )
};
const mapStateToProps = (state) => {
    return {
        streamerListResponse: state.JetDevReducer?.streamerList
    };
  };

export default connect(mapStateToProps,{getStreamers}) (JetDev);