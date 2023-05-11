import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-content: center;
    
    h1 {
    border-radius: 4px;
    padding: 30px;
    margin: 9em auto;
    }
`

export const Container = styled.div`
    max-width: 700px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.2);
    padding: 30px;
    margin: 9em auto;

    @media (max-width:500px) {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.2);
    padding: 30px 12px;
    margin: 9em 4px;
    }
    
`

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1 {
        font-size: 30px;
        color: #0d2636;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`


export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;
`

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;

        & + li {
            margin-top: 12px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #0d2636;
        }

        div {
            flex: 1;
            margin-left: 12px;

            p {
                margin-top: 10px;
                font-size: 12px;
                color: #000;
            }
        }

        strong {
            font-size: 15px;

            a {
                text-decoration: none;
                color: #222;

                &:hover {
                    color: #0071db;
                }
            }

            span {
                background: #222;
                color: #fff;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                padding: 5px 7px;
                margin-left: 10px;
                display: flex;
                padding: 10px;
                margin: 10px;
            }

                svg {
                    color: red;
                    font-size: 52px;
                }
            }
        }
`

export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    button {
    display: flex;
    outline: 0;
    border: 0;
    background: #222;
    color: #fff;
    padding: 5px 30px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    text-align: center;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

        svg {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &:hover {
            background: #0080f9;
            color: #222;
        }
    }
`

export const FilterList = styled.div<{ active: number }>`
margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        outline: 0;
        border: 0;
        padding: 8px;
        border-radius: 4px;
        margin: 0 3px;


         &:nth-child(${props => props.active + 1}) {
      background-color: #0071db;
      color: #fff;
    }
    } 

`