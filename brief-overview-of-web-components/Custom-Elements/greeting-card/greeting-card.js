class GreetingCard extends HTMLElement {
  // Specify which attributes should be observed for changes
  static observedAttributes = ["name"];
  constructor() {
    super();
    // Initialize with a default name
    this._name = 'World';
  }

  // Called when the element is inserted into the DOM
  connectedCallback() {
    this.render();
    this.addChangeNameButtonClickEvent();
  }


  // Called when an observed attribute has been added, removed, updated, or replaced
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name' && oldValue !== newValue) {
      this._name = newValue || this._name;
      this.updateGreeting();
    }
  }

  // Getter for the name property
  get name() {
    return this._name;
  }

  // Setter for the name property
  set name(value) {
    if (value !== this._name) {
      this.setAttribute('name', value);
    }
  }

  // Render the initial structure of the component
  render() {
    this.innerHTML = `
      <div id="greeting"></div>
      <button id="changeNameBtn">Change Name</button>
    `;
    this.updateGreeting();
  }

  // Update only the greeting part of the component
  updateGreeting() {
    const greetingDiv = this.querySelector('#greeting');
    if (greetingDiv) {
      greetingDiv.innerHTML = `<h2>Hello, ${this.name}!</h2>`;
    }
  }

  // Add event listener to the change name button
  addChangeNameButtonClickEvent() {
    this.querySelector('#changeNameBtn').addEventListener('click', () => {
      this.changeNameRandomly();
    });
  }

  // Change the name to a random value
  changeNameRandomly() {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    this.setAttribute('name', randomName);
  }
}

// Register the custom element with the browser
customElements.define('c-greeting-card', GreetingCard);

/*
Sequence of processing:

1. When the browser encounters a <greeting-card> element:
   a. The GreetingCard constructor is called, initializing this._name to 'World'.
   b. If a 'name' attribute is present, attributeChangedCallback is called, updating this._name.
   c. connectedCallback is triggered, which:
      - Calls render() to set up the initial HTML structure.
      - Calls updateGreeting() to set the initial greeting text.
      - Calls addChangeNameButton() to attach the click event listener.

2. When the 'name' attribute is changed (either programmatically or via setAttribute):
   a. attributeChangedCallback is triggered.
   b. this._name is updated with the new value.
   c. updateGreeting() is called to refresh the greeting text.

3. When the "Change Name" button is clicked:
   a. changeNameRandomly() is called.
   b. A random name is selected and set using setAttribute('name', randomName).
   c. This triggers the attributeChangedCallback, following the same process as step 2.

4. If the name property is set using the setter (e.g., greetingCard.name = 'New Name'):
   a. The setter calls setAttribute('name', value).
   b. This triggers the attributeChangedCallback, following the same process as step 2.

This sequence ensures that whether the name is changed via attribute, property, or button click, 
the component always updates consistently, maintaining synchronization between its internal state 
(this._name) and its visual representation.
*/