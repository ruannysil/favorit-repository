import styled, { keyframes,css} from 'styled-components'

export const Container = styled.div`
    max-width: 700px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin: 20px auto;

    h1 {
        font-size: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;

        svg {
            margin-right: 10px;
        }
    }
`

export const Form = styled.form<{ error: boolean}>`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid ${props => (props.error ? '#ff0000' : '#ddd')};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`

const animated = keyframes`
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
`

export const SubmitButton = styled.button<{ loading: boolean }>`
    background: #0d2636;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
    }

    ${props => props.loading && css` 
        svg {
            animation: ${animated} 2s linear infinite;
        }
    `}
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
        span {
            svg {
              &:hover {
                color: #ff0000;
              }
            }
        }

        svg {
            &:hover {
                color: #1ba835;
            }
        }

        & + li {
            border-top: 1px solid #eee;
        }

        a {
            color: #0d2636;
            text-decoration: none;
        }
    }
`

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`

    margin-left: 6px;
    background: transparent;
    color: #0d2636;
    border: 0;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;

`