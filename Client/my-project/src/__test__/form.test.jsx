import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import LoginForm from "../Pages/Login/LoginForm";
import authReducer from "../Pages/Login/authSlice";

describe("Login Form Test", () => {

  it("form submit", () => {

    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    const { getByTestId, getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );


    fireEvent.change(getByLabelText("Name"), {
      target: { value: "Deepak" },
    });

    fireEvent.change(getByLabelText("Email"), {
      target: { value: "deep651965@gmail.com" },
    });

    fireEvent.change(getByLabelText("Password"), {
      target: { value: "Password@123" },
    });

    fireEvent.click(getByTestId("formSubmit"));


    // expect(getByLabelText("Name").value).toBe("Deepak");
  });

});