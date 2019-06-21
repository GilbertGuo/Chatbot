import React from "react";
import{render,cleanup,waitForElement} from "@testing-library/react";
import "jest-dom/extend-expect";
import axiosMock from "../__mocks__/axios";
import Apimock from "../Apimock";

afterEach(cleanup);

it("Display idle", async () => {

    const url = "http://localhost:9000/helloworld";

    let {getByTestId} = render(<Apimock url={url} />);

    expect(getByTestId('waiting')).toHaveTextContent("Please wait a sec!");


});

it("send Get Request and display the only data", async () => {
    axiosMock.get.mockResolvedValueOnce({data:{response:"hello world!"}});

    const url = "http://localhost:9000/helloworld";

    let {getByTestId} = render(<Apimock url={url} />);

    const rs = await waitForElement(()=> getByTestId("transmiting"));

    expect(rs).toHaveTextContent("hello world!");

});

it("send Get Request and display data selectively", async () => {
    axiosMock.get.mockResolvedValueOnce({data:{id:"123",response:"hello world!"}});

    const url = "http://localhost:9000/helloworld";

    let {getByTestId} = render(<Apimock url={url} />);

    const rs = await waitForElement(()=> getByTestId("transmiting"));

    expect(rs).toHaveTextContent("hello world!");

});
