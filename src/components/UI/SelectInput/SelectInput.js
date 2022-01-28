import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SelectLabel = styled.span`
    font-weight: 400;
    font-size: 0.7rem;
    margin-right: 10px;
`

const Form = styled(FormControl)`
    min-width: 200;
`

const SelectInput = React.memo((props) => {

    return (
        <Wrapper>
            <SelectLabel>{props.label}</SelectLabel>
            <Form variant="outlined" >
                <Select
                    native
                    value={props.value}
                    onChange={props.handleChange}
                >
                    <option defaultValue={props.defaultValue} value="">{props.defaultNameValue}</option>
                    {props.valuesArr.map((val, index) => {
                        return <option value={val == '' ? '' : val} key={`${val}-public-ip-${index}`}>{val == '' ? 'All' : val}</option>
                    })}
                </Select>
            </Form>
            <input
                type="text"
                autoComplete="on"
                value=""
                onFocus={() => { }}
                style={{ display: 'none', opacity: 0, position: 'absolute' }}
                readOnly={true}
            />
        </Wrapper>
    );
})
export default SelectInput;