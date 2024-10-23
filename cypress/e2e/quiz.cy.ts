// e2e tests for the quiz

describe("Tech Quiz", () => {
beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });
  // test initial rendering of the quiz component and the start quiz button
  it("should render the start quiz button on page load", () => {
    cy.visit("http://localhost:3001/");
    cy.contains("Start Quiz").should("exist");
  });

  // test the rendering of the first question after the start quiz button is clicked
  it("should display the first question after clicking the start quiz button", () => {
    // intercept the api request for questions before the button is clicked
    cy.intercept("GET", "/api/questions/random", { fixture: "questions.json" }).as(
      "getRandomQuestions"
    );
    // click the start quiz button
    cy.contains("Start Quiz").click();
    // check if question is displayed
    cy.get("h2").should("exist");
  });

  // test navigation to the next question after answering the current question
  it("should navigate to the next question after answering the current question", () => {
    // click the start quiz button
    cy.contains("Start Quiz").click();
    // intercept the api request for questions after the button is clicked
    cy.intercept("GET", "/api/questions/random", { fixture: "questions.json" }).as(
      "getRandomQuestions"
    );
   // loop through the questions and choose the first answer option for each question
   for (let i = 1; i <= 10; i++) {
    cy.get("button").first().click();
   }
   // check that quiz completed is displayed after the last question is answered
   cy.contains("Quiz Completed").should("exist");
  });

  // test the final score display after answering all questions
  it('should display the final score after answering all questions', () => {
    cy.contains('Start Quiz').click();
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getRandomQuestions');
    for (let i = 1; i <= 10; i++) {
      cy.get('button').first().click();
    }
    cy.contains('Your score:').should('exist');
    cy.contains('Take New Quiz').should('exist');
  });

  // test the restart quiz button
  it("should allow the user to retake the quiz after completion", () => {
    cy.contains("Start Quiz").click();
    cy.intercept("GET", "/api/questions/random", { fixture: "questions.json" }).as(
      "getRandomQuestions"
    );
    for (let i = 1; i <= 10; i++) {
      cy.get("button").first().click();
    }
    // check that the restart quiz button is displayed after the last question is answered
    cy.contains("Take New Quiz").click();
    // check that the questions immediately start again once the button is clicked
    cy.get("h2").should("exist");
  });
  });