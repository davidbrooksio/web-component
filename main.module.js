import styles from "./main.module.css";

/**
 * Custom element representing a todo list component.
 * @extends HTMLElement
 */
export class MyComponent extends HTMLElement {
  /**
   * Constructs a new MyComponent.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.base = this.shadowRoot.querySelector("#app");
    this.data = {
      heading: "My Todos",
      todos: ["Swim", "Climb", "Jump", "Play"],
      emoji: "👋🎉",
    };
    this.render();
  }

  /**
   * Returns a list of attributes to be observed for changes.
   * @static
   * @returns {Array} List of observed attributes.
   */
  static get observedAttributes() {
    return []; // Add observed attributes here
  }

  /**
   * Called when the element is inserted into the DOM.
   */
  connectedCallback() {
    // Add any initialization logic here
  }

  /**
   * Called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    // Clean up logic goes here
  }

  /**
   * Called when observed attributes change.
   * @param {string} attribute - The name of the attribute that changed.
   * @param {string} previousValue - The previous value of the attribute.
   * @param {string} currentValue - The new value of the attribute.
   */
  attributeChangedCallback(attribute, previousValue, currentValue) {
    // Handle attribute changes here
  }

  /**
   * Renders the component.
   */
  render() {
    this.base.innerHTML = `
      <style>
        ${styles.toString()}
      </style>
      <div class="${styles.locals.base}" id="app">
        <h1>${this.data.heading} ${this.data.emoji}</h1>
        <ul>
          ${this.data.todos.map(todo => `<li key="${todo}">${todo}</li>`).join("")}
        </ul>
      </div>
    `;
  }
}

// Define the new web component
if ("customElements" in window) {
  customElements.define("my-component", MyComponent);
}
