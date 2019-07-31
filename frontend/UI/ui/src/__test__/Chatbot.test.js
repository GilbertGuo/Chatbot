import React from 'react';
import { shallow } from 'enzyme';
import Chatbot from '../components/Chatbot';
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';

describe("[UNIT] Testing the Chatbot component", () => {
    let wrapper;

    describe("Component validation", () => {

        const historyMock = { push: jest.fn() };
        wrapper = shallow(<Chatbot history={historyMock} />)

        it('Chatbot renders without crashing', () => {
            expect(wrapper.find(Typography).text()).toEqual("Chatbot")
        });

        it('correct input chat textfield change', () => {
            wrapper.find(TextField).simulate('change', {target: {value: 'how are you'}});
            expect(wrapper.state('textValue')).toEqual('how are you');
        });

    });

});
