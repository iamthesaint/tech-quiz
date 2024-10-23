// component tests for the quiz component

// @ts-ignore
import Quiz from "../../src/components/Quiz.jsx";

// test initial rendering of the quiz component and the start button
describe("<Quiz />", () => {
  it("should render the start quiz button on page load", () => {
    // mount the quiz component
    cy.mount(<Quiz />);
    // check that the start button exists
    cy.contains("Start Quiz").should("exist");
  });

  // tests for clicking the start quiz button and displaying the first question
  it("should display the first question after clicking the start quiz button", () => {
    // mount the quiz component
    cy.mount(<Quiz />);
    cy.intercept("GET", "/api/questions", { fixture: "questions.json" }).as(
      "getQuestions"
    );
    // click the start button
    cy.contains("Start Quiz").click();
    // wait for the questions to load
    cy.wait("@getRandomQuestions");
    // check that the question heading exists
    cy.get("h2").should("exist");
  });

  // tests navigating between questions
  it("should navigate to the next question after an answer is selected", () => {
    // mount the quiz component
    cy.mount(<Quiz />);
    cy.intercept("GET", "/api/questions/random", { fixture: "questions.json" }).as(
      "getRandomQuestions"
    );
    // click the start button
    cy.contains("Start Quiz").click();
    // wait for the questions to load
    cy.wait("@getRandomQuestions");
    // select the first answer
    cy.get("button").first().click();
    // verify next question is displayed
    cy.get("h2").should("contain", "Question 2");
  });
});


